import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma, connectToDatabase } from "@/lib/db";

const KEY = "admin.system";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const doc = await prisma.setting.findUnique({ where: { key: KEY } });
  return NextResponse.json({
    success: true,
    config: { notificationEmail: (doc?.value as any)?.notificationEmail || "" },
  });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const notificationEmail = String(body?.notificationEmail || "").trim();

  await connectToDatabase();
  await prisma.setting.upsert({
    where: { key: KEY },
    update: { value: { notificationEmail } },
    create: { key: KEY, value: { notificationEmail } },
  });

  return NextResponse.json({ success: true });
}
