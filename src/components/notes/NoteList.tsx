'use client';

import { useNotes } from "@/libs/hooks/useNotes";
import Loader from "@/components/ui/Loader";
import NoteCard from "@/components/notes/NoteCard";

const NotesList = () => {
    const { data: notes, isLoading, error } = useNotes();

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center py-8">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full flex items-center justify-center py-8">
                <p className="text-red-500">Error loading notes</p>
            </div>
        );
    }

    if (!notes || notes.length === 0) {
        return (
            <div className="w-full flex items-center justify-center py-8">
                <p className="text-gray-500">No notes yet. Create your first note!</p>
            </div>
        );
    }

    return (
        <div className="w-[96%] pb-4 max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-2">
            {notes.map((note) => (
                <NoteCard key={note._id} id={note._id} content={note.content} />
            ))}
        </div>
    );
};

export default NotesList;