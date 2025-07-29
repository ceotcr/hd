import { toast } from "react-toastify";

export type Note = {
    _id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};

export const getNotes = async (): Promise<Note[]> => {
    const response = await fetch('/api/notes');
    if (!response.ok) {
        toast.error('Failed to fetch notes')
    }
    return response.json();
};

export const createNote = async (content: string): Promise<Note> => {
    const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });
    if (!response.ok) {
        toast.error('Failed to create note')
    }
    toast.success('Note created successfully')
    return response.json();
};

export const deleteNote = async (id: string): Promise<void> => {
    const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        toast.error('Failed to delete note')
    }
    toast.success('Note deleted successfully')
};