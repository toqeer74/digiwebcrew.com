import { Container } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import ServiceDomainsOverview from "@/components/sections/service-domains-overview";
import { getDictionary } from "@/lib/get-dictionary";

export default async function ServicesHub({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === 'ar' || locale === 'ur';

  return (
    <div className="flex flex-col min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar dict={dict} locale={locale} />

      {/* Service Schema for machine understanding */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Enterprise Web Development & SEO Architecture",
            "provider": { "@type": "Organization", "name": "Digi Web Crew" },
            "description": "Premium full-stack development and technical SEO solutions designed for high-scale enterprise environments.",
            "areaServed": "Global",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Technical Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full-Stack Development" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Technical SEO & GEO" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Automation" } }
              ]
            }
          })
        }}
      />

      <main className="flex-1 pt-60 pb-20">
        <Container>
          <ServiceDomainsOverview dict={dict} locale={locale} />
        </Container>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
