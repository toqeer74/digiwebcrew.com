import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/lib/models/lead";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const params = request.nextUrl.searchParams;
  const q = params.get("q") || "";
  const status = params.get("status") || "ALL";
  const tier = params.get("tier") || "ALL";

  const query: any = {};
  if (q) {
    query.$or = [
      { fullName: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { company: { $regex: q, $options: "i" } },
    ];
  }
  if (status !== "ALL") query.status = status;
  if (tier !== "ALL") query.leadTier = tier;

  const leads = await Lead.find(query)
    .sort({ createdAt: -1 })
    .select({ fullName: 1, email: 1, company: 1, status: 1, leadTier: 1, serviceCategory: 1, budgetRange: 1, createdAt: 1 })
    .lean();

  const header = ["Name", "Email", "Company", "Status", "Tier", "Service", "Budget", "Created At"];
  const rows = leads.map((lead: any) => [
    lead.fullName || "",
    lead.email || "",
    lead.company || "",
    lead.status || "",
    lead.leadTier || "",
    lead.serviceCategory || "",
    lead.budgetRange || "",
    lead.createdAt ? new Date(lead.createdAt).toISOString() : "",
  ]);

  const esc = (value: string) => `"${String(value).replace(/"/g, '""')}"`;
  const csv = [header, ...rows].map((row) => row.map(esc).join(",")).join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}


