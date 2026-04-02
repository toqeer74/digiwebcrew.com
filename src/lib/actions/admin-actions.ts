"use server";

import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/lib/models/lead";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function getLeads() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  const leads = await Lead.find().sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(leads));
}

export async function updateLeadStatus(id: string, status: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  await Lead.findByIdAndUpdate(id, { status });
  return { success: true };
}

