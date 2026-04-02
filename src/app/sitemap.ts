import { MetadataRoute } from 'next';
import { locales } from '@/types/i18n';
import { serviceCatalog, techLabs } from '@/lib/services-data';
import { getBlogPosts, getCaseStudies } from '@/lib/content-engine';
import { localePath } from '@/lib/locale-path';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://software-lab.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const studies = await getCaseStudies();

  const routes = [
    '/',
    '/services',
    '/tech',
    '/process',
    '/pricing',
    '/about',
    '/blog',
    '/case-studies',
    '/quote'
  ];

  // Static routes for each locale
  const staticEntries = locales.flatMap(locale => 
    routes.map(route => ({
      url: `${baseUrl}${localePath(locale, route)}`,
      lastModified: new Date(),
    }))
  );

  // Dynamic Service routes
  const serviceEntries = locales.flatMap(locale => 
    serviceCatalog.map(cat => ({
      url: `${baseUrl}${localePath(locale, `/services/category/${cat.slug}`)}`,
      lastModified: new Date(),
    }))
  );

  // Dynamic Tech routes
  const techEntries = locales.flatMap(locale => 
    techLabs.map(lab => ({
      url: `${baseUrl}${localePath(locale, `/tech/${lab.slug}`)}`,
      lastModified: new Date(),
    }))
  );

  // Dynamic Blog routes
  const blogEntries = locales.flatMap(locale => 
    posts.map(post => ({
      url: `${baseUrl}${localePath(locale, `/blog/${post.slug}`)}`,
      lastModified: new Date(),
    }))
  );

  // Dynamic Case Study routes
  const studyEntries = locales.flatMap(locale => 
    studies.map(study => ({
      url: `${baseUrl}${localePath(locale, `/case-studies/${study.slug}`)}`,
      lastModified: new Date(),
    }))
  );

  return [
    ...staticEntries,
    ...serviceEntries,
    ...techEntries,
    ...blogEntries,
    ...studyEntries
  ];
}

