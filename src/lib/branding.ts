import { cache } from "react";
import { connectToDatabase } from "@/lib/db";
import { Setting } from "@/lib/models/setting";
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
    const doc = await Setting.findOne({ key: "admin.branding" }).lean();
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
