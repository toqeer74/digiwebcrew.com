import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma, connectToDatabase } from "@/lib/db";

const GROUP_MAP: Record<string, string[]> = {
  auth: ["LOGIN_SUCCESS", "LOGIN_FAILED", "LOGOUT"],
  ai: ["RUN_AI_PROMPT", "RUN_AI_WORKFLOW", "CREATE_DRAFT"],
  lead: ["VIEW_LEADS", "VIEW_LEAD_DETAIL", "EXPORT_DATA"],
  system: ["VIEW_DASHBOARD", "VIEW_CHATS", "VIEW_DRAFTS", "VIEW_WORKFLOW_RUNS", "UPDATE_BRANDING", "UPDATE_SETTINGS"],
};

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();

  const params = request.nextUrl.searchParams;
  const group = params.get("group") || "all";
  const success = params.get("success") || "all";

  const where: any = {};
  if (group !== "all" && GROUP_MAP[group]) where.action = { in: GROUP_MAP[group] as any };
  if (success === "1") where.success = true;
  if (success === "0") where.success = false;

  const logs = await prisma.auditLog.findMany({ where, orderBy: { createdAt: "desc" }, take: 5000 });

  const header = ["Action", "Success", "User Email", "Resource", "Resource ID", "IP", "Created At", "Error"];
  const rows = logs.map((l) => [l.action, l.success ? "true" : "false", l.userEmail || "", l.resource || "", l.resourceId || "", l.ip || "", l.createdAt.toISOString(), l.error || ""]);
  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [header, ...rows].map((row) => row.map(esc).join(",")).join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="audit-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
