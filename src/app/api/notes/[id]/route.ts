// src/app/api/notes/[id]/route.ts
import { authOptions } from "@/libs/authOptions";
import { connectDB } from "@/libs/database/db";
import { Note } from "@/libs/database/models/Note";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

export const DELETE = async (
    request: NextRequest,
    { params }: RouteParams
): Promise<NextResponse> => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const user = session.user.id;
        await connectDB();
        const noteId = (await params).id;
        const note = await Note.findOne({ _id: noteId, user });
        if (!note) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        await Note.deleteOne({ _id: noteId, user });
        return NextResponse.json(
            { message: "Note deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting note:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
};