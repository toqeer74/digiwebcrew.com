import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma, connectToDatabase } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const envStatus = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
    ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
  };

  let dbConnected = false;
  let error = "";

  try {
    await connectToDatabase();
    await prisma.lead.count();
    dbConnected = true;
  } catch (err: any) {
    error = err?.message || "Database connection failed";
  }

  return NextResponse.json({
    success: true,
    dbConnected,
    postgres: dbConnected,
    openai: !!process.env.OPENAI_API_KEY,
    adminEmail: process.env.ADMIN_EMAIL || "",
    envStatus,
    error,
    checkedAt: new Date().toISOString(),
  });
}
