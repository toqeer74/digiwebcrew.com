/**
 * Topic clusters: which guides support which service page.
 *
 * Service pages are the commercial targets ("money pages") and blog posts are
 * the supporting content. Linking them in both directions is what builds
 * topical authority — posts already link out to services, and this map drives
 * the reverse links so each cluster reinforces its hub.
 *
 * Slugs are validated against real content at build time by the RelatedGuides
 * component, which silently drops anything missing rather than rendering a
 * dead link.
 */
export const SERVICE_CLUSTERS: Record<string, string[]> = {
  "custom-software": [
    "build-vs-buy-custom-software",
    "custom-website-cost",
    "how-long-website-takes",
    "future-of-agency-dev",
  ],
  "ai-chatbots-automation": [
    "ai-chatbot-lead-generation",
    "back-office-automation-guide",
  ],
  "automation-internal-tools": [
    "back-office-automation-guide",
    "build-vs-buy-custom-software",
  ],
  ecommerce: [
    "headless-vs-shopify-ecommerce",
    "core-web-vitals-guide",
    "custom-website-cost",
  ],
  "seo-growth-retainers": [
    "core-web-vitals-guide",
    "law-firm-website-conversion",
  ],
  "conversion-funnels": [
    "law-firm-website-conversion",
    "ai-chatbot-lead-generation",
  ],
  "devops-cloud": ["core-web-vitals-guide", "future-of-agency-dev"],
  "maintenance-support": ["website-maintenance-guide", "core-web-vitals-guide"],
};

/** Guides shown on the pricing page, where buyers are weighing cost. */
export const PRICING_CLUSTER = [
  "custom-website-cost",
  "how-long-website-takes",
  "build-vs-buy-custom-software",
  "hiring-offshore-development-team",
];
