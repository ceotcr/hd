"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { FormField } from "@/components/ui/FormField";
import { fullSchema, FormData } from "@/libs/zod/Signup";
import { signIn } from "next-auth/react";
import { getOtp } from "@/libs/helpers/getOtp";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
    const [step, setStep] = useState<1 | 2>(1);
    const [initialEmail, setInitialEmail] = useState<string>("");
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [otpTimer, setOtpTimer] = useState<number>(60);
    const [canResend, setCanResend] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (step === 2 && otpSent && otpTimer > 0) {
            interval = setInterval(() => {
                setOtpTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [step, otpSent, otpTimer]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        resetField
    } = useForm<FormData>({
        resolver: zodResolver(fullSchema),
    });

    const email = watch("email");

    useEffect(() => {
        if (step === 2 && email !== initialEmail) {
            setStep(1);
            resetField("otp");
        }
    }, [email, initialEmail]);

    const sendOtp = async () => {
        const response = await getOtp(email);
        if (response.success) {
            setOtpSent(true);
            setOtpTimer(60);
            setCanResend(false);
            setStep(2);
            toast.success("OTP sent to your email");
            return true;
        } else {
            toast.error(response.error ?? "Failed to send OTP. Please try again.")
            return false;
        }
    }
    const [resending, setResending] = useState<boolean>(false);
    const handleResendOtp = async () => {
        setResending(true);
        if (canResend) {
            const success = await sendOtp();
            if (success) {
                toast.success("OTP has been resent to your email")
            }
        }
        setResending(false);
    }

    const onSubmit = async (data: FormData) => {
        if (step === 1) {
            const success = await sendOtp();
            if (success) {
                setInitialEmail(data.email);
            }
        } else {
            const response = await signIn("otp-signup", {
                ...data,
                redirect: false,
            });
            if (response?.error) {
                toast.error(response.error);
            }
            else {
                toast.success("OTP verified successfully!");
                router.push("/");
            }
        }
    };

    return (
        <div className="max-w-sm w-full mx-auto">
            <h1 className="text-4xl max-md:text-center font-bold text-gray-800 mb-1">Sign up</h1>
            <p className="text-gray-400 max-md:text-center mb-8">Sign up to enjoy the feature of HD</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField label="Your Name" error={errors.name?.message}>
                    <input
                        {...register("name")}
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Jonas Khanwald"
                    />
                </FormField>

                <FormField label="Date of Birth" error={errors.dob?.message}>
                    <input
                        {...register("dob")}
                        type="date"
                        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </FormField>

                <FormField label="Email" error={errors.email?.message}>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MdEmail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            {...register("email")}
                            type="email"
                            className="w-full pl-10 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="jonas_kahnwald@gmail.com"
                        />
                    </div>
                </FormField>

                {step === 2 && (
                    <>
                        <FormField label="OTP" error={errors.otp?.message}>
                            <input
                                {...register("otp")}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter 6-digit OTP"
                            />
                        </FormField>
                        <div className="text-sm text-gray-500 mt-2 md:text-left">
                            {canResend ? (
                                <button
                                    type="button"
                                    disabled={resending}
                                    onClick={handleResendOtp}
                                    className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer disabled:opacity-50 transition"
                                >
                                    {resending ? "Resending..." : "Resend OTP"}
                                </button>
                            ) : (
                                <span>Request OTP again in {otpTimer} seconds</span>
                            )}
                        </div>
                    </>
                )}

                <div className="mt-8">
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full flex justify-center items-center py-3 cursor-pointer px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition"
                    >
                        {isSubmitting ? "Processing..." : step === 1 ? "Get OTP" : "Sign Up"}
                    </button>
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="./signin" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </div>
            </form>

            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-400 text-sm">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="">
                <button
                    type="button"
                    onClick={() => {
                        signIn("google", {
                            callbackUrl: "/",
                        });
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50 transition"
                >
                    <Image
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                    />
                    <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>
            </div>
        </div>
    );
}