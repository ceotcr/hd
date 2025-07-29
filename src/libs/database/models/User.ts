import mongoose, { Schema, models } from 'mongoose'

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    birthdate: { type: Date, required: true },
}, { timestamps: true })

export const User = models.User || mongoose.model('User', UserSchema)
