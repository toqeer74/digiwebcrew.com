import type { Metadata } from "next";
import { locales, defaultLocale, type Locale } from "@/types/i18n";
import { localePath } from "@/lib/locale-path";

/**
 * Single source of truth for the public origin.
 *
 * Previously sitemap.ts and layout.tsx each had their own fallback and they
 * disagreed — sitemap fell back to a domain we don't own, which shipped a live
 * sitemap pointing every URL off-site. Everything now reads this one constant.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_APP_URL || "https://digiwebcrew.com"
).replace(/\/$/, "");

export const SITE_NAME = "Digi Web Crew";
/**
 * Social card. /og is a generated image route — the old /og-image.png was
 * never a real file, so shared links rendered no preview.
 */
export function ogImageFor(title: string, kicker?: string) {
  const params = new URLSearchParams({ title });
  if (kicker) params.set("kicker", kicker);
  return `/og?${params.toString()}`;
}

export const DEFAULT_OG_IMAGE = "/og";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * hreflang map for one logical page across every locale, plus x-default.
 * Google needs these to be absolute and reciprocal.
 */
export function languageAlternates(path = "/") {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(localePath(locale, path));
  }
  languages["x-default"] = absoluteUrl(localePath(defaultLocale, path));
  return languages;
}

export interface PageSeoInput {
  locale: Locale | string;
  /** Locale-agnostic path, e.g. "/services/custom-software". */
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  type?: "website" | "article";
  /** Set for pages that must never be indexed (thank-you, internal tools). */
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

/**
 * Builds per-page metadata with a self-referencing canonical.
 *
 * The root layout used to set `alternates.canonical` to "/" for every page,
 * so all 27 pages canonicalised to the homepage and Google treated them as
 * duplicates. Every page must call this with its own path.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  ogImage,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
}: PageSeoInput): Metadata {
  const canonical = absoluteUrl(localePath(locale, path));
  // Fall back to a generated card showing this page's own title.
  const image = ogImage || ogImageFor(title);

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(type === "article"
        ? {
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            ...(authors?.length ? { authors } : {}),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noIndex
      ? { robots: { index: false, follow: true, googleBot: { index: false, follow: true } } }
      : {}),
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                     */
/* ------------------------------------------------------------------ */

type Json = Record<string, unknown>;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * ProfessionalService rather than bare Organization: it is the type Google
 * associates with agency//service-business queries and it accepts areaServed.
 */
export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: absoluteUrl(DEFAULT_OG_IMAGE) },
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description:
      "Digi Web Crew builds custom software, high-performance websites, and AI automation for companies in the US and UK.",
    founder: {
      "@type": "Person",
      name: "Toqeer Shafique",
      sameAs: [
        "https://pk.linkedin.com/in/toqeer-shafique",
        "https://github.com/toqeer74",
      ],
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Australia" },
    ],
    availableLanguage: ["English", "Urdu", "Arabic"],
    knowsAbout: [
      "Custom software development",
      "Next.js development",
      "AI automation",
      "Workflow automation",
      "Ecommerce development",
      "Technical SEO",
      "DevOps and cloud infrastructure",
    ],
    sameAs: [
      "https://pk.linkedin.com/in/toqeer-shafique",
      "https://github.com/toqeer74",
    ],
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
  };
}

/** Service schema for an individual service page. */
export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  locale: Locale | string;
  serviceType?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(localePath(input.locale, input.path)),
    provider: { "@id": ORGANIZATION_ID },
    ...(input.serviceType ? { serviceType: input.serviceType } : {}),
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
    ],
  };
}

/** Breadcrumbs. Pass crumbs in order, root first. */
export function breadcrumbSchema(
  locale: Locale | string,
  crumbs: { name: string; path: string }[]
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(localePath(locale, crumb.path)),
    })),
  };
}

/**
 * FAQPage. Only emit this when the same Q&A is visible on the page —
 * Google treats hidden FAQ markup as a structured-data violation.
 */
export function faqSchema(faqs: { question: string; answer: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Article schema for blog posts. */
export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  locale: Locale | string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  image?: string;
}): Json {
  const url = absoluteUrl(localePath(input.locale, input.path));
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: { "@type": "Person", name: input.authorName },
    publisher: { "@id": ORGANIZATION_ID },
    image: absoluteUrl(input.image || DEFAULT_OG_IMAGE),
    inLanguage: input.locale,
  };
}
