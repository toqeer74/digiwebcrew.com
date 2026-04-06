import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma, connectToDatabase } from "@/lib/db";

type TrackingConfig = {
  gtm_id: string; ga4_id: string; meta_pixel_id: string;
  meta_access_token: string; linkedin_partner_id: string; google_ads_id: string;
};

const DEFAULT_TRACKING_CONFIG: TrackingConfig = {
  gtm_id: process.env.NEXT_PUBLIC_GTM_ID || "",
  ga4_id: process.env.NEXT_PUBLIC_GA4_ID || "",
  meta_pixel_id: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  meta_access_token: process.env.META_ACCESS_TOKEN || "",
  linkedin_partner_id: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || "",
  google_ads_id: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "",
};

async function getTrackingConfig(): Promise<TrackingConfig> {
  await connectToDatabase();
  const doc = await prisma.setting.findUnique({ where: { key: "admin.tracking" } });
  const value = (doc?.value || {}) as Partial<TrackingConfig>;
  return { ...DEFAULT_TRACKING_CONFIG, ...value };
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const config = await getTrackingConfig();
  return NextResponse.json({
    config: {
      ...config,
      meta_access_token: config.meta_access_token
        ? "••••••••" + config.meta_access_token.slice(-8)
        : "",
    },
  });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const existing = await getTrackingConfig();
    const body = await request.json();
    const allowedFields = ["gtm_id", "ga4_id", "meta_pixel_id", "meta_access_token", "linkedin_partner_id", "google_ads_id"];
    const updated: Record<string, string> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === "meta_access_token" && String(body[field]).includes("••••")) {
          updated[field] = existing.meta_access_token;
        } else {
          updated[field] = body[field];
        }
      }
    }

    await connectToDatabase();
    await prisma.setting.upsert({
      where: { key: "admin.tracking" },
      update: { value: { ...existing, ...updated } },
      create: { key: "admin.tracking", value: { ...existing, ...updated } },
    });

    return NextResponse.json({ success: true, message: "Tracking configuration saved successfully" });
  } catch (error) {
    console.error("Failed to save tracking config:", error);
    return NextResponse.json({ success: false, error: "Failed to save configuration" }, { status: 500 });
  }
}
