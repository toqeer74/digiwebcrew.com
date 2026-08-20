/** Presentation metadata for portfolio projects — thumbnail, tint plate, and logo tile. */
export type WorkVisual = {
  image: string;
  tint: string;
  logoBg: string;
  logoMark: string;
};

export const WORK_VISUALS: Record<string, WorkVisual> = {
  "fintech-scalability": { image: "/images/work/p-dashboard.jpg", tint: "#eef2f7", logoBg: "#1e3a8a", logoMark: "NF" },
  "ecommerce-scale": { image: "/images/work/p-website.jpg", tint: "#fdf3ea", logoBg: "#c2410c", logoMark: "SG" },
  "nexus-legal": { image: "/images/work/p-webdesign.jpg", tint: "#f2f0fb", logoBg: "#4338ca", logoMark: "NL" },
  "vanguard-property": { image: "/images/work/p-code.jpg", tint: "#eaf5f1", logoBg: "#6d28d9", logoMark: "VP" },
  "peak-physio": { image: "/images/work/p-analytics.jpg", tint: "#eef4fb", logoBg: "#047857", logoMark: "PP" },
  "apex-saas": { image: "/images/work/p-mobile.jpg", tint: "#fbf1f4", logoBg: "#0369a1", logoMark: "AS" },
};

export const FALLBACK_WORK_VISUAL: WorkVisual = {
  image: "/images/work/p-webdesign.jpg",
  tint: "#f1f2f4",
  logoBg: "#334155",
  logoMark: "DW",
};

export function getWorkVisual(slug: string): WorkVisual {
  return WORK_VISUALS[slug] ?? FALLBACK_WORK_VISUAL;
}

/**
 * Splits a markdown body into `## heading` sections so the detail page can render
 * each one as a two-column row (section label on the left, prose on the right).
 * Anything before the first `##` is returned as `intro`.
 */
export function splitMarkdownSections(markdown: string): {
  intro: string;
  sections: { id: string; heading: string; body: string }[];
} {
  // Drop a leading H1 — the page renders the title itself.
  const withoutH1 = markdown.replace(/^\s*#\s+.*$/m, "").trim();

  const parts = withoutH1.split(/^##\s+/m);
  const intro = (parts.shift() ?? "").trim();

  const sections = parts.map((part) => {
    const newline = part.indexOf("\n");
    const heading = (newline === -1 ? part : part.slice(0, newline)).trim();
    const body = (newline === -1 ? "" : part.slice(newline + 1)).trim();
    return {
      id: heading
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
      heading,
      body,
    };
  });

  return { intro, sections };
}
