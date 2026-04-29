import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma, connectToDatabase } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const db = await connectToDatabase();
    if (!db) return NextResponse.json({ success: false, error: "Database unavailable" }, { status: 503 });

    const drafts = await prisma.contentDraft.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      select: { id: true, type: true, promptKey: true, title: true, modelName: true, createdAt: true, updatedAt: true },
    });

    return NextResponse.json({
      success: true,
      drafts: drafts.map((d: any) => ({
        id: d.id,
        type: d.type,
        promptKey: d.promptKey,
        title: d.title || "",
        modelName: d.modelName || "",
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      })),
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to load drafts" }, { status: 500 });
  }
}
