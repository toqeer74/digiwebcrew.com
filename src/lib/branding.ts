import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma, connectToDatabase } from "@/lib/db";
import {
  BrandingConfig,
  DEFAULT_BRANDING_CONFIG,
  normalizeHex,
} from "@/lib/branding-shared";

export type { BrandingConfig } from "@/lib/branding-shared";
export { DEFAULT_BRANDING_CONFIG, deriveBrandingVars } from "@/lib/branding-shared";

/** Cache tag used to flush branding when the admin panel saves a change. */
export const BRANDING_CACHE_TAG = "public-branding";

/**
 * The root layout reads branding on every page, and this was an uncached
 * Prisma query — so every request paid a database round trip before any HTML
 * was sent, which measured as a 3.4s TTFB on the homepage.
 *
 * unstable_cache persists the result across requests (React's `cache` only
 * dedupes within one). The admin branding route revalidates the tag on save,
 * so edits still appear immediately.
 */
const loadBrandingConfig = unstable_cache(
  async (): Promise<BrandingConfig> => {
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
  },
  ["public-branding-config"],
  { revalidate: 3600, tags: [BRANDING_CACHE_TAG] }
);

export const getPublicBrandingConfig = cache(
  async (): Promise<BrandingConfig> => loadBrandingConfig()
);
