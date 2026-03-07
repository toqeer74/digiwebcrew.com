import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { ContentDraft } from "@/lib/models/content-draft";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await connectToDatabase();

    const draft = await ContentDraft.findById(id).lean();
    if (!draft) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      draft: {
        id: (draft as any)._id.toString(),
        type: (draft as any).type,
        promptKey: (draft as any).promptKey,
        title: (draft as any).title || "",
        content: (draft as any).content || "",
        variables: (draft as any).variables || {},
        modelName: (draft as any).modelName || "",
        createdAt: (draft as any).createdAt,
        updatedAt: (draft as any).updatedAt,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to load draft" }, { status: 500 });
  }
}
