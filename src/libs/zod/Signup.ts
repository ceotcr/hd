import { z } from "zod";
export const fullSchema = z.object({
    name: z.string().min(1, "Name is required"),
    dob: z.string().min(1, "Date of birth is required"),
    email: z.string().email("Invalid email address"),
    otp: z.string().min(6, "OTP must be 6 digits").max(6).optional(),
});

export type FormData = z.infer<typeof fullSchema>;