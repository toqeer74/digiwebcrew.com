import { NextRequest, NextResponse } from "next/server";
import { prisma, connectToDatabase } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth-middleware";
import { logAudit } from "@/lib/audit";
import { BrandingConfig, DEFAULT_BRANDING_CONFIG } from "@/lib/branding-shared";

async function getBrandingConfig(): Promise<BrandingConfig> {
  await connectToDatabase();
  const doc = await prisma.setting.findUnique({ where: { key: "admin.branding" } });
  const value = (doc?.value || {}) as Partial<BrandingConfig>;
  return { ...DEFAULT_BRANDING_CONFIG, ...value };
}

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.success) return NextResponse.json({ success: false, error: (auth as any).error }, { status: (auth as any).status });

  try {
    await logAudit({ action: "VIEW_DASHBOARD", resource: "branding" });
    const config = await getBrandingConfig();
    return NextResponse.json({ success: true, config });
  } catch (error) {
    await logAudit({ action: "VIEW_DASHBOARD", error: String(error), success: false });
    return NextResponse.json({ success: false, error: "Failed to load branding" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminSession();
  if (!auth.success) return NextResponse.json({ success: false, error: (auth as any).error }, { status: (auth as any).status });

  try {
    await logAudit({ action: "UPDATE_BRANDING", resource: "branding" });
    const existing = await getBrandingConfig();
    const body = (await request.json()) as Partial<BrandingConfig>;
    const allowedFields: Array<keyof BrandingConfig> = ["siteName", "primaryColor", "logoDataUrl"];
    const updated: Partial<BrandingConfig> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) updated[field] = body[field];
    }

    await connectToDatabase();
    await prisma.setting.upsert({
      where: { key: "admin.branding" },
      update: { value: { ...existing, ...updated } },
      create: { key: "admin.branding", value: { ...existing, ...updated } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    await logAudit({ action: "UPDATE_BRANDING", error: String(error), success: false });
    return NextResponse.json({ success: false, error: "Failed to save branding" }, { status: 500 });
  }
}
