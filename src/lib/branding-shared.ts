export type BrandingConfig = {
  siteName: string;
  primaryColor: string;
  logoDataUrl: string;
};

export const DEFAULT_BRANDING_CONFIG: BrandingConfig = {
  siteName: "Digi Web Crew",
  primaryColor: "#114B97",
  logoDataUrl: "",
};

export function normalizeHex(color: string): string {
  const value = color.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return value.toUpperCase();
  if (/^#[0-9a-fA-F]{3}$/.test(value)) {
    return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`.toUpperCase();
  }
  return DEFAULT_BRANDING_CONFIG.primaryColor;
}

function hexToRgb(hex: string) {
  const normalized = normalizeHex(hex).slice(1);
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function mix(hex: string, target: string, weight: number) {
  const from = hexToRgb(hex);
  const to = hexToRgb(target);
  const clamp = Math.max(0, Math.min(1, weight));
  const value = {
    r: Math.round(from.r + (to.r - from.r) * clamp),
    g: Math.round(from.g + (to.g - from.g) * clamp),
    b: Math.round(from.b + (to.b - from.b) * clamp),
  };
  return `#${[value.r, value.g, value.b].map((part) => part.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

export function deriveBrandingVars(primaryColor: string) {
  const primary = normalizeHex(primaryColor);
  const { r, g, b } = hexToRgb(primary);

  return {
    "--site-primary": primary,
    "--site-primary-hover": mix(primary, "#000000", 0.1),
    "--site-primary-soft": mix(primary, "#FFFFFF", 0.28),
    "--site-primary-border": mix(primary, "#FFFFFF", 0.18),
    "--site-primary-rgb": `${r}, ${g}, ${b}`,
    "--site-primary-contrast": "#FFFFFF",
    "--site-primary-dark-text": "#08131C",
  } as const;
}

