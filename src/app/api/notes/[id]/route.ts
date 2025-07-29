import { authOptions } from "@/libs/authOptions";
import { connectDB } from "@/libs/database/db";
import { Note } from "@/libs/database/models/Note";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
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
        const note = await Note.findOne({ id: params.id, userId: id });
        if (!note) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }
        await Note.deleteOne({ id: params.id, userId: id });
        return NextResponse.json({ message: "Note deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};