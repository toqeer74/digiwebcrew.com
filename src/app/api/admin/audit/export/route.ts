import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { AuditLog } from "@/lib/models/audit-log";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();

  const params = request.nextUrl.searchParams;
  const group = params.get("group") || "all";
  const success = params.get("success") || "all";

  const query: any = {};

  const groupMap: Record<string, string[]> = {
    auth: ["LOGIN_SUCCESS", "LOGIN_FAILED", "LOGOUT"],
    ai: ["RUN_AI_PROMPT", "RUN_AI_WORKFLOW", "CREATE_DRAFT"],
    lead: ["VIEW_LEADS", "VIEW_LEAD_DETAIL", "EXPORT_DATA"],
    system: ["VIEW_DASHBOARD", "VIEW_CHATS", "VIEW_DRAFTS", "VIEW_WORKFLOW_RUNS", "UPDATE_BRANDING", "UPDATE_SETTINGS"],
  };

  if (group !== "all" && groupMap[group]) {
    query.action = { $in: groupMap[group] };
  }

  if (success === "1") query.success = true;
  if (success === "0") query.success = false;

  const logs = await AuditLog.find(query).sort({ createdAt: -1 }).limit(5000).lean();

  const header = ["Action", "Success", "User Email", "Resource", "Resource ID", "IP", "Created At", "Error"];
  const rows = logs.map((log: any) => [
    log.action || "",
    log.success ? "true" : "false",
    log.userEmail || "",
    log.resource || "",
    log.resourceId || "",
    log.ip || "",
    log.createdAt ? new Date(log.createdAt).toISOString() : "",
    log.error || "",
  ]);

  const esc = (value: string) => `"${String(value).replace(/"/g, '""')}"`;
  const csv = [header, ...rows].map((row) => row.map(esc).join(",")).join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="audit-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
