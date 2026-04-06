import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma, connectToDatabase } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();

  const params = request.nextUrl.searchParams;
  const q = params.get("q") || "";
  const status = params.get("status") || "ALL";
  const tier = params.get("tier") || "ALL";

  const where: any = {};
  if (q) {
    where.OR = [
      { fullName: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { company: { contains: q, mode: "insensitive" } },
    ];
  }
  if (status !== "ALL") where.status = status;
  if (tier !== "ALL") where.leadTier = tier;

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: { fullName: true, email: true, company: true, status: true, leadTier: true, serviceCategory: true, budgetRange: true, createdAt: true },
  });

  const header = ["Name", "Email", "Company", "Status", "Tier", "Service", "Budget", "Created At"];
  const rows = leads.map((l) => [l.fullName, l.email, l.company || "", l.status, l.leadTier, l.serviceCategory, l.budgetRange || "", l.createdAt.toISOString()]);
  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [header, ...rows].map((row) => row.map(esc).join(",")).join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
