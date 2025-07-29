import { connectDB } from '@/libs/database/db'
import { Otp } from '@/libs/database/models/Otp'
import { User } from '@/libs/database/models/User'
import { sendOtpEmail } from '@/libs/helpers/mail'
import { NextResponse } from 'next/server'

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: Request) {
    const { email, isSigIn = false } = await req.json()
    if (!email || typeof email !== 'string') {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    await connectDB()
    const existingUser = await User.findOne({ email })
    if (isSigIn) {
        if (!existingUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }
    }
    else {
        if (existingUser) {
            return NextResponse.json({ error: 'Email already in use | Sign In' }, { status: 400 })
        }
    }
    const otp = generateOtp()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await Otp.deleteMany({ email })
    await Otp.create({ email, code: otp, expiresAt })

    await sendOtpEmail(email, otp)
    return NextResponse.json({ success: true })
}
