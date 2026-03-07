import { serviceCatalog } from "@/lib/services-data";
import { ServiceTemplate } from "@/components/sections/service-template";
import { getDictionary } from "@/lib/get-dictionary";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { notFound } from "next/navigation";

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === 'ar' || locale === 'ur';

  const category = serviceCatalog.find(c => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar dict={dict} locale={locale} />
      <ServiceTemplate 
        category={category} 
        dict={dict} 
        locale={locale} 
      />
      <Footer dict={dict} locale={locale} />
    </div>
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
