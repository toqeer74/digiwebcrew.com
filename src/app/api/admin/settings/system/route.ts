import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { Setting } from "@/lib/models/setting";

const KEY = "admin.system";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const doc = await Setting.findOne({ key: KEY }).lean();

  return NextResponse.json({
    success: true,
    config: {
      notificationEmail: (doc as any)?.value?.notificationEmail || "",
    },
  });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const notificationEmail = String(body?.notificationEmail || "").trim();

  await connectToDatabase();
  await Setting.findOneAndUpdate(
    { key: KEY },
    { $set: { value: { notificationEmail } } },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true });
}

