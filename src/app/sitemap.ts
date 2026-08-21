import { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/types/i18n';
import { serviceCatalog, techLabs } from '@/lib/services-data';
import { getBlogPosts, getCaseStudies } from '@/lib/content-engine';
import { localePath } from '@/lib/locale-path';
import { SITE_URL, absoluteUrl, languageAlternates } from '@/lib/seo';

/**
 * Routes that should be indexed, with the crawl priority we want to signal.
 *
 * Commercial pages (services, pricing, quote) rank above informational ones.
 * `/thank-you` is deliberately absent — it is noindex.
 */
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/services/custom-software', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/ai-chatbots-automation', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/ecommerce', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/seo-growth-retainers', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/conversion-funnels', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/devops-cloud', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/automation-internal-tools', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/maintenance-support', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/quote', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/book-consultation', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/case-studies', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'daily' },
  { path: '/industries', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/process', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faqs', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
];

/**
 * One sitemap entry per locale, each carrying the full hreflang set so the
 * en/ur/ar versions reinforce rather than compete with each other.
 */
function entriesFor(
  path: string,
  opts: { priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; lastModified?: Date }
): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: absoluteUrl(localePath(locale, path)),
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency,
    // Non-default locales rank lower for our primary (English) market.
    priority: locale === defaultLocale ? opts.priority : Math.max(0.1, opts.priority - 0.2),
    alternates: { languages: languageAlternates(path) },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, studies] = await Promise.all([getBlogPosts(), getCaseStudies()]);

  const staticEntries = STATIC_ROUTES.flatMap((route) =>
    entriesFor(route.path, { priority: route.priority, changeFrequency: route.changeFrequency })
  );

  const serviceEntries = serviceCatalog.flatMap((cat) =>
    entriesFor(`/services/category/${cat.slug}`, { priority: 0.7, changeFrequency: 'monthly' })
  );

  const techEntries = techLabs.flatMap((lab) =>
    entriesFor(`/tech/${lab.slug}`, { priority: 0.6, changeFrequency: 'monthly' })
  );

  // Real publish dates, so "lastModified" is a truthful freshness signal
  // instead of always being "now".
  const blogEntries = posts.flatMap((post) =>
    entriesFor(`/blog/${post.slug}`, {
      priority: 0.7,
      changeFrequency: 'monthly',
      lastModified: post.updated ? new Date(post.updated) : new Date(post.date),
    })
  );

  const studyEntries = studies.flatMap((study) =>
    entriesFor(`/case-studies/${study.slug}`, { priority: 0.7, changeFrequency: 'monthly' })
  );

  return [...staticEntries, ...serviceEntries, ...techEntries, ...blogEntries, ...studyEntries];
}

// Re-exported so a mis-set env var surfaces as a build-time import error
// rather than a silently wrong live sitemap.
export { SITE_URL };
