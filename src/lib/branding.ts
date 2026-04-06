import { cache } from "react";
import { prisma, connectToDatabase } from "@/lib/db";
import {
  BrandingConfig,
  DEFAULT_BRANDING_CONFIG,
  normalizeHex,
} from "@/lib/branding-shared";

export type { BrandingConfig } from "@/lib/branding-shared";
export { DEFAULT_BRANDING_CONFIG, deriveBrandingVars } from "@/lib/branding-shared";

export const getPublicBrandingConfig = cache(async (): Promise<BrandingConfig> => {
  try {
    await connectToDatabase();
    const doc = await prisma.setting.findUnique({ where: { key: "admin.branding" } });
    const value = (doc?.value || {}) as Partial<BrandingConfig>;

    return {
      siteName: value.siteName?.trim() || DEFAULT_BRANDING_CONFIG.siteName,
      primaryColor: normalizeHex(value.primaryColor || DEFAULT_BRANDING_CONFIG.primaryColor),
      logoDataUrl: value.logoDataUrl || DEFAULT_BRANDING_CONFIG.logoDataUrl,
    };
  } catch {
    return DEFAULT_BRANDING_CONFIG;
  }
});
