import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from "./libs/database/db"
import { Otp } from "./libs/database/models/Otp"
import { User } from "./libs/database/models/User"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            id: 'otp-signup',
            name: 'OTP Sign Up',
            credentials: {
                name: { label: 'Name', type: 'text' },
                birthdate: { label: 'Birthdate', type: 'date' },
                email: { label: 'Email', type: 'email' },
                code: { label: 'OTP', type: 'text' }
            },
            async authorize(credentials) {
                await connectDB()
                if (!credentials) {
                    throw new Error('Credentials are required for OTP Sign Up')
                }
                const otp = await Otp.findOne({ email: credentials.email, code: credentials.code })
                if (!otp || otp.expiresAt < new Date()) throw new Error('Invalid or expired OTP')
                await Otp.deleteMany({ email: credentials.email })

                const user = await User.findOneAndUpdate(
                    { email: credentials.email },
                    { name: credentials.name, birthdate: credentials.birthdate },
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
                code: { label: 'OTP', type: 'text' }
            },
            async authorize(credentials) {
                await connectDB()
                if (!credentials) {
                    throw new Error('Credentials are required for OTP Sign In')
                }
                const otp = await Otp.findOne({ email: credentials.email, code: credentials.code })
                if (!otp || otp.expiresAt < new Date()) throw new Error('Invalid or expired OTP')
                await Otp.deleteMany({ email: credentials.email })

                const user = await User.findOne({ email: credentials.email })
                if (!user) throw new Error('User not found')
                return { id: user._id.toString(), email: user.email }
            }
        }),
    ],
    session: {
        strategy: 'jwt'
    },
})