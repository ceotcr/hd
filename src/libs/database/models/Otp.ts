import mongoose, { Schema, models } from 'mongoose'

const OtpSchema = new Schema({
    email: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true }
}, { timestamps: true })

export const Otp = models.Otp || mongoose.model('Otp', OtpSchema)
