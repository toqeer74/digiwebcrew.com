import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Setting } from "@/lib/models/setting";
import { requireAdminSession } from "@/lib/auth-middleware";
import { logAudit } from "@/lib/audit";

type BrandingConfig = {
  siteName: string;
  primaryColor: string;
  logoDataUrl: string;
};

const DEFAULT_BRANDING_CONFIG: BrandingConfig = {
  siteName: "Software Lab",
  primaryColor: "#7C3AED",
  logoDataUrl: "",
};

async function getBrandingConfig(): Promise<BrandingConfig> {
  await connectToDatabase();
  const doc = await Setting.findOne({ key: "admin.branding" }).lean();
  const value = (doc?.value || {}) as Partial<BrandingConfig>;
  return { ...DEFAULT_BRANDING_CONFIG, ...value };
}

export async function GET() {
  const auth = await requireAdminSession();
  if (auth.error) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    await logAudit({
      action: "VIEW_DASHBOARD",
      resource: "branding",
      userEmail: auth.session?.user?.email || undefined,
    });

    const config = await getBrandingConfig();
    return NextResponse.json({ success: true, config });
  } catch (error) {
    const detail = error instanceof Error ? error.message : undefined;
    await logAudit({
      action: "VIEW_DASHBOARD",
      error: detail,
      success: false,
      userEmail: auth.session?.user?.email || undefined,
    });
    return NextResponse.json(
      { success: false, error: "Failed to load branding" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminSession();
  if (auth.error) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
  }

  try {
    await logAudit({
      action: "UPDATE_BRANDING",
      resource: "branding",
      userEmail: auth.session?.user?.email || undefined,
    });

    const existing = await getBrandingConfig();
    const body = (await request.json()) as Partial<BrandingConfig>;

    const allowedFields: Array<keyof BrandingConfig> = ["siteName", "primaryColor", "logoDataUrl"];

    const updatedConfig: Partial<BrandingConfig> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updatedConfig[field] = body[field];
      }
    }

    await connectToDatabase();
    await Setting.findOneAndUpdate(
      { key: "admin.branding" },
      { $set: { value: { ...existing, ...updatedConfig } } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    const detail = error instanceof Error ? error.message : undefined;
    await logAudit({
      action: "UPDATE_BRANDING",
      error: detail,
      success: false,
      userEmail: auth.session?.user?.email || undefined,
    });
    return NextResponse.json({ success: false, error: "Failed to save branding" }, { status: 500 });
  }
}
