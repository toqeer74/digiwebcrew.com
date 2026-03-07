import type { Metadata } from "next";
import { Suspense } from "react";
import "../globals.css";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/get-dictionary";
import { MotionProvider } from "@/components/MotionProvider";
import { PageTransition } from "@/components/ui/page-transition";
import { ChatbotUI } from "@/components/chatbot/chatbot-ui";
import { ConsentBanner } from "@/components/ui/consent-banner";

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
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://digiwebcrew.com'),
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDesc,
      url: `/${locale}`,
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
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'ur': '/ur',
        'ar': '/ar',
      },
    },
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
  const isRtl = locale === 'ar' || locale === 'ur';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: '{"@context":"https://schema.org","@type":"Organization","name":"Digi Web Crew","url":"https://digiwebcrew.com/","logo":"https://digiwebcrew.com/logo.png","founder":{"@type":"Person","name":"Toqeer Shafique","sameAs":["https://pk.linkedin.com/in/toqeer-shafique","https://github.com/toqeer74","https://www.upwork.com/freelancers/toqeer","https://www.fiverr.com/toqeer486","https://www.freelancer.pk/u/toqeer74"]},"description":"Specialized development of high-performance web applications and technical SEO strategies."}'
          }}
        />
      </head>
      <body className="font-sans antialiased bg-raly-base dark:bg-midnight-950 text-foreground transition-all duration-300 font-medium">
        <MotionProvider>
          <PageTransition>
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </PageTransition>
          <ChatbotUI />
        </MotionProvider>
        <ConsentBanner />
      </body>
    </html>
  );
}
