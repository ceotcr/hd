'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotes, createNote, deleteNote } from "@/libs/helpers/notes";

export const useNotes = () => {
    return useQuery({
        queryKey: ['notes'],
        queryFn: getNotes,
    });
};

export const useCreateNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });
};

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        },
    });
};