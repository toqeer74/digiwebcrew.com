import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { ContentDraft } from "@/lib/models/content-draft";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: false, error: "Database unavailable" }, { status: 503 });
    }

    const drafts = await ContentDraft.find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .select({ type: 1, promptKey: 1, title: 1, modelName: 1, createdAt: 1, updatedAt: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      drafts: drafts.map((d: any) => ({
        id: d._id.toString(),
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

