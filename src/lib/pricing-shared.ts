/**
 * Shared pricing types + defaults.
 *
 * Kept free of server-only imports (no prisma) so the admin editor can import it
 * in the browser, mirroring `branding-shared.ts`.
 */

/** Palette slot. Each consumer maps these to its own class strings. */
export const ACCENT_KEYS = ["blue", "violet", "amber", "teal"] as const;
export type AccentKey = (typeof ACCENT_KEYS)[number];

/** Icon slot, mapped to a lucide icon by each consumer. */
export const ICON_KEYS = ["code", "zap", "bot", "search"] as const;
export type IconKey = (typeof ICON_KEYS)[number];

export type PricingTier = {
  /** Stable key; used for React keys and to keep ordering edits safe. */
  id: string;
  /** Tier name, e.g. "Custom Website Development". */
  name: string;
  /** Headline figure, e.g. "$3,500". Free text so currency/symbol is editable. */
  price: string;
  /** Qualifier shown next to the price, e.g. "starting" or "per month". */
  unit: string;
  /** Delivery window shown as a chip, e.g. "4–8 weeks". */
  timeline: string;
  /** Long description, used on the pricing page tier card. */
  description: string;
  /** One-line "best for" note, used on the compact homepage card. */
  fit: string;
  /** Bullet list of what moves the price within this tier. */
  drivers: string[];
  ctaLabel: string;
  /** Site-relative path; locale prefix is applied at render time. */
  href: string;
  popular: boolean;
  accent: AccentKey;
  icon: IconKey;
};

export type QuickComparisonRow = { label: string; value: string };

export type PricingConfig = {
  /** Homepage pricing section heading. */
  headline: string;
  tiers: PricingTier[];
  quickComparisonTitle: string;
  quickComparisonRows: QuickComparisonRow[];
};

/**
 * Seeded from the live pricing page tiers, plus the quick-comparison rows that
 * were already authored in content/locales/en/pricing-home.json.
 */
export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  headline: "Transparent Starting Prices",
  tiers: [
    {
      id: "web",
      name: "Custom Website Development",
      price: "$3,500",
      unit: "starting",
      timeline: "4–8 weeks",
      description:
        "A stronger website foundation — clearer structure, better presentation, and a professional digital presence built to last.",
      fit: "Business website rebuilds",
      drivers: ["Number of pages", "Content complexity", "Custom design depth", "CMS & integrations"],
      ctaLabel: "Explore Web Development",
      href: "/services/custom-software",
      popular: false,
      accent: "blue",
      icon: "code",
    },
    {
      id: "funnels",
      name: "Funnels & Landing Pages",
      price: "$2,000",
      unit: "starting",
      timeline: "2–4 weeks",
      description:
        "A focused page system for lead generation, service promotion, campaign traffic, bookings, or consultations.",
      fit: "Lead-generation campaigns",
      drivers: [
        "Single page or multi-step",
        "Offer & messaging depth",
        "Form or booking integration",
        "Tracking & follow-up flow",
      ],
      ctaLabel: "Explore Funnels & Pages",
      href: "/services/conversion-funnels",
      popular: true,
      accent: "violet",
      icon: "zap",
    },
    {
      id: "ai",
      name: "AI Chatbots & Automation",
      price: "$2,500",
      unit: "starting",
      timeline: "3–6 weeks",
      description:
        "Faster lead handling, better inquiry routing, and smarter connected workflows across your tools.",
      fit: "Sales and support workflows",
      drivers: ["Number of workflows", "Tool & CRM integrations", "Qualification logic", "Channel setup"],
      ctaLabel: "Explore AI & Automation",
      href: "/services/ai-chatbots-automation",
      popular: false,
      accent: "amber",
      icon: "bot",
    },
    {
      id: "seo",
      name: "SEO & Growth Retainers",
      price: "$1,000",
      unit: "per month",
      timeline: "Ongoing",
      description:
        "Continued search visibility, content refinement, website updates, and performance support long after launch.",
      fit: "Ongoing visibility growth",
      drivers: ["Website size", "Current SEO condition", "Local competition", "Level of monthly support"],
      ctaLabel: "Explore SEO & Retainers",
      href: "/services/seo-growth-retainers",
      popular: false,
      accent: "teal",
      icon: "search",
    },
  ],
  quickComparisonTitle: "Quick Package Comparison",
  quickComparisonRows: [
    { label: "SEO Setup Included", value: "Standard+" },
    { label: "Integrations", value: "Available" },
    { label: "Revision Rounds", value: "Defined per scope" },
    { label: "Post-Launch Support", value: "Optional plans" },
  ],
};

/** Longest field values we will persist, to keep the Setting row sane. */
const LIMITS = {
  short: 120,
  long: 600,
  drivers: 12,
  tiers: 12,
  rows: 12,
} as const;

function str(value: unknown, fallback: string, max: number): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  return trimmed.slice(0, max);
}

function oneOf<T extends readonly string[]>(value: unknown, allowed: T, fallback: T[number]): T[number] {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T[number])
    : fallback;
}

/** Only site-relative paths — never an absolute or protocol-relative URL. */
function safeHref(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return fallback;
  return trimmed.slice(0, LIMITS.short);
}

function normalizeTier(raw: unknown, index: number): PricingTier {
  const base = DEFAULT_PRICING_CONFIG.tiers[index] ?? DEFAULT_PRICING_CONFIG.tiers[0];
  const value = (raw ?? {}) as Partial<PricingTier>;

  const drivers = Array.isArray(value.drivers)
    ? value.drivers
        .filter((d): d is string => typeof d === "string" && d.trim().length > 0)
        .map((d) => d.trim().slice(0, LIMITS.short))
        .slice(0, LIMITS.drivers)
    : base.drivers;

  return {
    id: str(value.id, base.id, 60),
    name: str(value.name, base.name, LIMITS.short),
    price: str(value.price, base.price, 40),
    unit: str(value.unit, base.unit, 40),
    timeline: str(value.timeline, base.timeline, 60),
    description: str(value.description, base.description, LIMITS.long),
    fit: str(value.fit, base.fit, LIMITS.short),
    drivers: drivers.length > 0 ? drivers : base.drivers,
    ctaLabel: str(value.ctaLabel, base.ctaLabel, LIMITS.short),
    href: safeHref(value.href, base.href),
    popular: typeof value.popular === "boolean" ? value.popular : base.popular,
    accent: oneOf(value.accent, ACCENT_KEYS, base.accent),
    icon: oneOf(value.icon, ICON_KEYS, base.icon),
  };
}

/**
 * Coerce arbitrary stored/submitted JSON into a valid config, falling back to
 * defaults field by field so a partial or corrupt row can never break a page.
 */
export function normalizePricingConfig(raw: unknown): PricingConfig {
  const value = (raw ?? {}) as Partial<PricingConfig>;

  const tiers = Array.isArray(value.tiers) && value.tiers.length > 0
    ? value.tiers.slice(0, LIMITS.tiers).map(normalizeTier)
    : DEFAULT_PRICING_CONFIG.tiers;

  // Exactly one tier may carry the "popular" ribbon.
  const firstPopular = tiers.findIndex((t) => t.popular);
  const dedupedTiers = tiers.map((t, i) => ({ ...t, popular: i === firstPopular }));

  const rows = Array.isArray(value.quickComparisonRows)
    ? value.quickComparisonRows
        .map((row) => {
          const r = (row ?? {}) as Partial<QuickComparisonRow>;
          return {
            label: typeof r.label === "string" ? r.label.trim().slice(0, LIMITS.short) : "",
            value: typeof r.value === "string" ? r.value.trim().slice(0, LIMITS.short) : "",
          };
        })
        .filter((r) => r.label && r.value)
        .slice(0, LIMITS.rows)
    : DEFAULT_PRICING_CONFIG.quickComparisonRows;

  return {
    headline: str(value.headline, DEFAULT_PRICING_CONFIG.headline, LIMITS.short),
    tiers: dedupedTiers,
    quickComparisonTitle: str(
      value.quickComparisonTitle,
      DEFAULT_PRICING_CONFIG.quickComparisonTitle,
      LIMITS.short
    ),
    quickComparisonRows: rows,
  };
}

/** Split "$1,000/mo" into ["$1,000", "mo"] for the compact homepage card. */
export function splitPrice(price: string): [string, string | undefined] {
  const [amount, period] = price.split("/");
  return [amount, period];
}
