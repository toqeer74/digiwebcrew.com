import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { FeaturesRow } from "@/components/sections/features-row";
import { ServicesOverview } from "@/components/sections/services-overview";
import { AIProjectCalculator } from "@/components/tools/ai-project-calculator";
import { ServiceConfigurator } from "@/components/tools/service-configurator";
import { ProcessVisualization } from "@/components/sections/process-visualization";
import { TechStackDisplay } from "@/components/sections/tech-stack-display";
import { Testimonials } from "@/components/sections/testimonials";
import { Footer } from "@/components/layout/footer";
import { getDictionary } from "@/lib/get-dictionary";
import { Container } from "@/components/layout/layout-primitives";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar" || locale === "ur";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground" dir={isRtl ? "rtl" : "ltr"}>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1">
        <section className="relative">
          <Hero dict={dict} locale={locale} />
        </section>

        <FeaturesRow />

        <ServicesOverview dict={dict} />

        <section className="py-16 md:py-20 border-y border-border bg-background">
          <Container>
            <ProcessVisualization />
          </Container>
        </section>

        <section className="py-24 bg-secondary/20 border-y border-border">
          <Container>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-foreground tracking-tight leading-tight">
                    Architect Your <span className="text-primary">Enterprise</span> Future
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {dict.hero.description}
                  </p>
                </div>
                <AIProjectCalculator />
              </div>
              <div className="space-y-8">
                <ServiceConfigurator />
              </div>
            </div>
          </Container>
        </section>

        <TechStackDisplay />
        <Testimonials />
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
