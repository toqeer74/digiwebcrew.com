"use server";

import { prisma, connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function getLeads() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  return prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
}

export async function updateLeadStatus(id: string, status: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  await connectToDatabase();
  await prisma.lead.update({ where: { id }, data: { status: status as any } });
  return { success: true };
}
