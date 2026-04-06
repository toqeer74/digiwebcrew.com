import { NextRequest, NextResponse } from "next/server";
import { prisma, connectToDatabase } from "@/lib/db";
import { processChatMessage } from "@/lib/chat-engine";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { sessionId, message } = await req.json();

    if (!sessionId || !message) {
      return NextResponse.json({ success: false, error: "Missing sessionId or message" }, { status: 400 });
    }

    const session = await prisma.chatSession.findUnique({
      where: { sessionId },
      include: { messages: { orderBy: { timestamp: "asc" } } },
    });

    if (!session) {
      return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 });
    }

    const assistantReply = await processChatMessage(session, message);

    // Refresh to get latest state after processChatMessage updates
    const updated = await prisma.chatSession.findUnique({ where: { sessionId } });

    return NextResponse.json({
      success: true,
      reply: assistantReply,
      mode: updated?.mode,
      leadScore: updated?.leadScore,
      isConverted: updated?.isConverted,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("OPENAI_API_KEY")) {
      return NextResponse.json({ success: false, error: "OPENAI_API_KEY is missing or not configured" }, { status: 500 });
    }
    console.error("AI Chat Message Error:", error);
    return NextResponse.json({ success: false, error: "Message processing failed" }, { status: 500 });
  }
}
