import { headers } from "next/headers";
import { AuditLog, IAuditLog, AuditAction } from "@/lib/models/audit-log";
import { connectToDatabase } from "./db";

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
    const ip = headersList.get("x-forwarded-for") || 
              headersList.get("x-real-ip") || 
              "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    await AuditLog.create({
      ...params,
      success: params.success ?? true,
      ip,
      userAgent,
    });
  } catch (e) {
    // Silently fail to avoid breaking main flow
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
    const query: any = {};
    if (filters?.userId) query.userId = filters.userId;
    if (filters?.action) query.action = filters.action;
    if (filters?.resource) query.resource = filters.resource;

    const logs = await AuditLog.find(query)
      .sort({ createdAt: -1 })
      .limit(filters?.limit || 100)
      .skip(filters?.offset || 0)
      .lean();

    return logs;
  } catch {
    return [];
  }
}
