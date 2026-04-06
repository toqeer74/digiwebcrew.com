import { headers } from "next/headers";
import { prisma, connectToDatabase } from "@/lib/db";
import { AuditAction } from "../generated/prisma";

export type { AuditAction };

export async function logAudit(params: {
  action: AuditAction;
  resource?: string;
  resourceId?: string;
  success?: boolean;
  error?: string;
  metadata?: Record<string, any>;
  userId?: string;
  userEmail?: string;
}) {
  try {
    await connectToDatabase();
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    await prisma.auditLog.create({
      data: {
        ...params,
        success: params.success ?? true,
        ip,
        userAgent,
      },
    });
  } catch (e) {
    console.error("Failed to log audit:", e);
  }
}

export async function getAuditLogs(filters?: {
  userId?: string;
  action?: AuditAction;
  resource?: string;
  limit?: number;
  offset?: number;
}) {
  try {
    await connectToDatabase();
    return prisma.auditLog.findMany({
      where: {
        ...(filters?.userId ? { userId: filters.userId } : {}),
        ...(filters?.action ? { action: filters.action } : {}),
        ...(filters?.resource ? { resource: filters.resource } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: filters?.limit || 100,
      skip: filters?.offset || 0,
    });
  } catch {
    return [];
  }
}
