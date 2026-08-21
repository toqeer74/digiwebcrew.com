import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/**
 * NOTE: a static `public/robots.txt` takes precedence over this route in
 * Next.js. That file has been removed so this one is authoritative — keep it
 * that way, or changes here will silently do nothing.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/digiadmin/',
          '/api/',
          '/thank-you',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
