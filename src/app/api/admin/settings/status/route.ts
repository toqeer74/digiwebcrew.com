import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/lib/models/lead";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const envStatus = {
    MONGODB_URI: !!process.env.MONGODB_URI,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
    ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
  };

  let dbConnected = false;
  let error = "";

  try {
    await connectToDatabase();
    await Lead.countDocuments().limit(1);
    dbConnected = true;
  } catch (err: any) {
    dbConnected = false;
    error = err?.message || "Database connection failed";
  }

  return NextResponse.json({
    success: true,
    dbConnected,
    mongo: dbConnected,
    openai: !!process.env.OPENAI_API_KEY,
    adminEmail: process.env.ADMIN_EMAIL || "",
    envStatus,
    error,
    checkedAt: new Date().toISOString(),
  });
}
