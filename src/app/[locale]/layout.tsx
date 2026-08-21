import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Suspense } from "react";
import { Inter, IBM_Plex_Mono, DM_Sans } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/lib/get-dictionary";
import { MotionProvider } from "@/components/MotionProvider";
import { PageTransition } from "@/components/ui/page-transition";
import { ChatbotUI } from "@/components/chatbot/chatbot-ui";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ConsentBanner } from "@/components/ui/consent-banner";
import { deriveBrandingVars, getPublicBrandingConfig } from "@/lib/branding";
import { localePath } from "@/lib/locale-path";
import { GlobalDecorativeBackground } from "@/components/GlobalDecorativeBackground";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, absoluteUrl, organizationSchema, websiteSchema } from "@/lib/seo";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plex = IBM_Plex_Mono({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-plex" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: {
      default: dict.meta.title,
      template: `%s | Digi Web Crew`
    },
    description: dict.meta.description,
    keywords: ["software agency", "custom software", "next.js", "premium design", "automation", "AI automation", "Digi Web Crew", "Toqeer Shafique"],
    authors: [{ name: "Toqeer Shafique" }],
    creator: "Digi Web Crew",
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDesc,
      url: absoluteUrl(localePath(locale, "/")),
      siteName: "Digi Web Crew",
      locale: locale,
      type: "website",
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Digi Web Crew Engineering'
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDesc,
      images: ['/og-image.png'],
    },
    // NOTE: no `alternates` here on purpose. Layout metadata is inherited by
    // every page, so a canonical set at this level pointed all 27 pages at "/"
    // and Google collapsed them as duplicates. Each page now sets its own via
    // buildPageMetadata(); the homepage's lives in ./page.tsx.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === 'ar' || locale === 'ur';
  const branding = await getPublicBrandingConfig();
  const brandingVars = deriveBrandingVars(branding.primaryColor);

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${plex.variable} ${dmSans.variable} scroll-smooth`}
      suppressHydrationWarning
      style={{ ...brandingVars, colorScheme: 'light' } as CSSProperties}
    >
      <head>
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      </head>
      <body className="bg-[#f7f7f8] text-foreground font-sans font-medium antialiased transition-colors duration-300 pt-28">
          <GlobalDecorativeBackground />
          <Navbar dict={dict} locale={locale} siteName={branding.siteName} logoDataUrl={branding.logoDataUrl} />
          <MotionProvider>
            <PageTransition>
              <Suspense fallback={null}>
                {children}
              </Suspense>
            </PageTransition>
            <ChatbotUI />
          </MotionProvider>
          <Footer dict={dict} locale={locale} siteName={branding.siteName} logoDataUrl={branding.logoDataUrl} />
        <ConsentBanner />
      </body>
    </html>
  );
}
