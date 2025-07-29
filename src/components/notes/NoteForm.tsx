'use client';

import { useState } from "react";
import { useCreateNote } from "@/libs/hooks/useNotes";

const NoteForm = () => {
    const [content, setContent] = useState('');
    const { mutate: createNote, isPending } = useCreateNote();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            createNote(content);
            setContent('');
        }
        else {

        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:border-l border-slate-300 md:pl-4">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-full p-4 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Write your notes here..."
                disabled={isPending}
            />
            <button
                type="submit"
                disabled={isPending || !content.trim()}
                className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isPending ? 'Creating...' : 'Create Note'}
            </button>
        </form>
    );
};

export default NoteForm;