import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma, connectToDatabase } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth-middleware";
import { logAudit } from "@/lib/audit";
import { DEFAULT_PRICING_CONFIG, normalizePricingConfig } from "@/lib/pricing-shared";
import { PRICING_SETTING_KEY } from "@/lib/pricing";

async function readPricingConfig() {
  await connectToDatabase();
  const doc = await prisma.setting.findUnique({ where: { key: PRICING_SETTING_KEY } });
  if (!doc?.value) return DEFAULT_PRICING_CONFIG;
  return normalizePricingConfig(doc.value);
}

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.success) {
    return NextResponse.json(
      { success: false, error: (auth as any).error },
      { status: (auth as any).status }
    );
  }

  try {
    const config = await readPricingConfig();
    return NextResponse.json({ success: true, config });
  } catch (error) {
    await logAudit({ action: "VIEW_DASHBOARD", resource: "pricing", error: String(error), success: false });
    return NextResponse.json({ success: false, error: "Failed to load pricing" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminSession();
  if (!auth.success) {
    return NextResponse.json(
      { success: false, error: (auth as any).error },
      { status: (auth as any).status }
    );
  }

  try {
    const body = await request.json();
    // Never trust the payload: coerce it into a known-good shape before storing.
    const config = normalizePricingConfig(body);

    await connectToDatabase();
    await prisma.setting.upsert({
      where: { key: PRICING_SETTING_KEY },
      update: { value: config },
      create: { key: PRICING_SETTING_KEY, value: config },
    });

    await logAudit({ action: "UPDATE_SETTINGS", resource: "pricing" });

    // Push the change to the public pages that render these numbers.
    revalidatePath("/[locale]", "page");
    revalidatePath("/[locale]/pricing", "page");

    return NextResponse.json({ success: true, config });
  } catch (error) {
    await logAudit({ action: "UPDATE_SETTINGS", resource: "pricing", error: String(error), success: false });
    return NextResponse.json({ success: false, error: "Failed to save pricing" }, { status: 500 });
  }
}
