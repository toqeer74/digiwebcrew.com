import { cache } from "react";
import { prisma, connectToDatabase } from "@/lib/db";
import { DEFAULT_PRICING_CONFIG, normalizePricingConfig, type PricingConfig } from "@/lib/pricing-shared";

export type { PricingConfig, PricingTier, QuickComparisonRow } from "@/lib/pricing-shared";
export { DEFAULT_PRICING_CONFIG, splitPrice } from "@/lib/pricing-shared";

export const PRICING_SETTING_KEY = "admin.pricing";

/**
 * Public pricing, read once per request. Any failure (including the dummy
 * DATABASE_URL used at build time) falls back to the bundled defaults so the
 * marketing pages always render.
 */
export const getPublicPricingConfig = cache(async (): Promise<PricingConfig> => {
  try {
    await connectToDatabase();
    const doc = await prisma.setting.findUnique({ where: { key: PRICING_SETTING_KEY } });
    if (!doc?.value) return DEFAULT_PRICING_CONFIG;
    return normalizePricingConfig(doc.value);
  } catch {
    return DEFAULT_PRICING_CONFIG;
  }
});
