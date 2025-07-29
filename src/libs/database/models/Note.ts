import mongoose, { Schema, models } from 'mongoose'
const NoteSchema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export const Note = models.Note || mongoose.model('Note', NoteSchema)