import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/libs/authOptions";
import { connectDB } from "@/libs/database/db";
import { Note } from "@/libs/database/models/Note";

export const GET = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const id = session.user.id;
        await connectDB();
        const notes = await Note.find({ user: id }).sort({ createdAt: -1 });
        return NextResponse.json(notes, { status: 200 });
    } catch (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
};

export const POST = async (request: NextRequest) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const id = session.user.id;
        const { content } = await request.json();
        if (!content) {
            return NextResponse.json(
                { error: "Content is required" },
                { status: 400 }
            );
        }
        await connectDB();
        const newNote = new Note({
            user: id,
            content
        });
        await newNote.save();
        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        console.error("Error creating note:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
};