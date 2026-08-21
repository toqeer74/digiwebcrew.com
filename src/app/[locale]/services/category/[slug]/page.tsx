import { serviceCatalog } from "@/lib/services-data";
import { ServiceTemplate } from "@/components/sections/service-template";
import { getDictionary } from "@/lib/get-dictionary";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = serviceCatalog.find((c) => c.slug === slug);
  if (!category) return {};

  return buildPageMetadata({
    locale,
    path: `/services/category/${slug}`,
    title: category.title,
    description: category.description,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === 'ar' || locale === 'ur';

  const category = serviceCatalog.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <ServiceTemplate
      category={category}
      dict={dict}
      locale={locale}
    />
  );
}

import { locales } from "@/types/i18n";

export async function generateStaticParams() {
  const params = [];

  for (const locale of locales) {
    for (const service of serviceCatalog) {
      params.push({ locale, slug: service.slug });
    }
  }

  return params;
}
