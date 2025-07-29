'use client';

import { RiDeleteBin5Line } from "react-icons/ri";
import { useDeleteNote } from "@/libs/hooks/useNotes";
import { memo } from "react";

type NoteCardProps = {
    id: string;
    content: string;
};

const NoteCard = memo(({ id, content }: NoteCardProps) => {
    const { mutate: deleteNote, isPending } = useDeleteNote();

    return (
        <div className="bg-white rounded-xl flex gap-2">
            <div className="w-[calc(100%-3rem)] p-4">
                <p className="overflow-hidden line-clamp-1 md:line-clamp-3 text-gray-800">
                    {content}
                </p>
            </div>
            <button
                onClick={() => deleteNote(id)}
                disabled={isPending}
                className="text-slate-600 h-full transition-colors hover:bg-red-100 hover:text-red-400 cursor-pointer rounded-r-md !w-12 flex items-center justify-center ml-auto"
                aria-label="Delete note"
            >
                <RiDeleteBin5Line size={24} />
            </button>
        </div>
    );
});

NoteCard.displayName = 'NoteCard';

export default NoteCard;