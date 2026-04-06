import { NextRequest, NextResponse } from "next/server";
import { prisma, connectToDatabase } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(_req: NextRequest) {
  try {
    await connectToDatabase();
    const sessionId = `dwc-session-${uuidv4().split("-")[0]}`;

    const newSession = await prisma.chatSession.create({
      data: { sessionId, mode: "INTRO", leadScore: 0 },
    });

    return NextResponse.json({ success: true, sessionId: newSession.sessionId, mode: newSession.mode });
  } catch (error) {
    console.error("AI Chat Start Error:", error);
    return NextResponse.json({ success: false, error: "Initialization failed" }, { status: 500 });
  }
}
