import { NextAuthOptions } from "next-auth"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from "@/libs/database/db"
import { Otp } from "@/libs/database/models/Otp"
import { User } from "@/libs/database/models/User"

declare module "next-auth" {
    interface User {
        id: string;
    }
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            id: 'otp-signup',
            name: 'OTP Sign Up',
            credentials: {
                name: { label: 'Name', type: 'text' },
                dob: { label: 'Birthdate', type: 'date' },
                email: { label: 'Email', type: 'email' },
                otp: { label: 'OTP', type: 'text' },
            },
            async authorize(credentials) {
                await connectDB()
                if (!credentials) throw new Error("Missing credentials")
                const otp = await Otp.findOne({ email: credentials.email, code: credentials.otp })
                if (!otp || otp.expiresAt < new Date()) throw new Error('Invalid or expired OTP')
                await Otp.deleteMany({ email: credentials.email })
                const user = await User.findOneAndUpdate(
                    { email: credentials.email },
                    { name: credentials.name, birthdate: credentials.dob },
                    { upsert: true, new: true }
                )
                return { id: user._id.toString(), email: user.email }
            }
        }),
        CredentialsProvider({
            id: 'otp-signin',
            name: 'OTP Sign In',
            credentials: {
                email: { label: 'Email', type: 'email' },
                otp: { label: 'OTP', type: 'text' }
            },
            async authorize(credentials) {
                await connectDB()
                if (!credentials) throw new Error("Missing credentials")
                const otp = await Otp.findOne({ email: credentials.email, code: credentials.otp })
                if (!otp || otp.expiresAt < new Date()) throw new Error('Invalid or expired OTP')
                await Otp.deleteMany({ email: credentials.email })
                const user = await User.findOne({ email: credentials.email })
                if (!user) throw new Error('User not found')
                return { id: user._id.toString(), email: user.email, name: user.name }
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                try {
                    await connectDB();

                    const googleProfile = profile as GoogleProfile;

                    const existingUser = await User.findOne({ email: googleProfile.email });

                    if (!existingUser) {
                        const newUser = new User({
                            name: googleProfile.name,
                            email: googleProfile.email,
                            image: googleProfile.picture,
                            provider: account.provider,
                            emailVerified: googleProfile.email_verified,
                        });

                        await newUser.save();
                        user.id = newUser._id.toString();
                    } else {
                        user.id = existingUser._id.toString();
                    }

                    return true;
                } catch (error) {
                    console.error("Google sign-in error:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    session: {
        strategy: "jwt"
    },
}
