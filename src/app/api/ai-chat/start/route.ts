import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import ChatSession from "@/lib/models/chat";
import { v4 as uuidv4 } from "uuid";

// Force absolute refresh on path change: /api/ai-chat/start
export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const sessionId = `dwc-session-${uuidv4().split('-')[0]}`;

        const newSession = await ChatSession.create({
            sessionId,
            mode: "INTRO",
            messages: [],
            metadata: {},
            leadScore: 0
        });

        return NextResponse.json({
            success: true,
            sessionId: newSession.sessionId,
            mode: newSession.mode
        });
    } catch (error) {
        console.error("AI Chat Start Error:", error);
        return NextResponse.json({ success: false, error: "Initialization failed" }, { status: 500 });
    }
}

