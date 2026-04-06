import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma, connectToDatabase } from "@/lib/db";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const db = await connectToDatabase();
  if (!db) return NextResponse.json({ success: false, error: "Database unavailable" }, { status: 503 });

  const draft = await prisma.contentDraft.findUnique({ where: { id } });
  if (!draft) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

  return NextResponse.json({
    success: true,
    draft: { id: draft.id, type: draft.type, promptKey: draft.promptKey, title: draft.title || "", content: draft.content, modelName: draft.modelName || "", workflowRunId: draft.workflowRunId || "", createdAt: draft.createdAt, updatedAt: draft.updatedAt },
  });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await connectToDatabase();
  await prisma.contentDraft.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
