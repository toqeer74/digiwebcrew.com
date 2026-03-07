import { Container } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServiceSelection } from "@/components/sections/service-selection";
import { getDictionary } from "@/lib/get-dictionary";

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale) as any;
  const isRtl = locale === 'ar' || locale === 'ur';

  return (
    <div className="flex flex-col min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1 pt-60 pb-20">
        <Container>
          <ServiceSelection dict={dict} isRtl={isRtl} locale={locale} />
        </Container>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
