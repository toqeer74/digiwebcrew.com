import Link from "next/link";
import { ArrowRight, Shield, Globe, Smartphone, Monitor, Layers } from "lucide-react";
import { SiOpenai, SiZapier, SiN8N, SiHubspot } from "react-icons/si";
import { Container } from "@/components/layout/layout-primitives";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { ProfileHero } from "@/components/sections/profile-hero";
import { ClientLogos } from "@/components/sections/client-logos";
import { FeaturesRow } from "@/components/sections/features-row";
import { AIProjectCalculator } from "@/components/tools/ai-project-calculator";
import { ServiceConfigurator } from "@/components/tools/service-configurator";
import { ProcessVisualization } from "@/components/sections/process-visualization";
import { StackSlider } from "@/components/sections/stack-slider";
import { HowItWorks } from "@/components/sections/how-it-works";
import { HomepagePricing } from "@/components/sections/homepage-pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { FluidBackground } from "@/components/sections/homepage-visuals";
import { getClientLogosData, getHomepageData, getTestimonialsData } from "@/lib/content-engine";
import { getPublicPricingConfig } from "@/lib/pricing";
import { getPublicBrandingConfig } from "@/lib/branding";
import { getDictionary } from "@/lib/get-dictionary";
import { localePath } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const industryIcons = [Shield, Globe, Smartphone, Monitor, Layers, Shield];
  const industryColors = [
    "text-blue-500",
    "text-emerald-500",
    "text-orange-500",
    "text-purple-500",
    "text-indigo-500",
    "text-amber-500"
  ];
  const bulletIcons = [SiOpenai, SiZapier, SiN8N, SiHubspot];
  const bulletColors = [
    "text-[#10A37F] bg-[#10A37F]/5 border-[#10A37F]/20 dark:bg-[#10A37F]/10 dark:border-[#10A37F]/30",
    "text-[#FF4F00] bg-[#FF4F00]/5 border-[#FF4F00]/20 dark:bg-[#FF4F00]/10 dark:border-[#FF4F00]/30",
    "text-[#FF6D5A] bg-[#FF6D5A]/5 border-[#FF6D5A]/20 dark:bg-[#FF6D5A]/10 dark:border-[#FF6D5A]/30",
    "text-[#FF7A59] bg-[#FF7A59]/5 border-[#FF7A59]/20 dark:bg-[#FF7A59]/10 dark:border-[#FF7A59]/30"
  ];
  const [
    testimonialsData,
    clientLogosData,
    pricingConfig,
    homepageData,
    branding,
    dict
  ] = await Promise.all([
    getTestimonialsData(locale),
    getClientLogosData(locale),
    getPublicPricingConfig(),
    getHomepageData(locale),
    getPublicBrandingConfig(),
    getDictionary(locale)
  ]);
  const heroHeading = "We build digital";
  const heroDescription = dict?.hero?.description ??
    "Expert-led full-stack development, AI automation, and high-conversion digital solutions. From MVP to enterprise scale.";

  return (
    <main className="flex-1 -mt-28 overflow-x-hidden">
      <ProfileHero
        locale={locale}
        siteName={branding.siteName}
        logoDataUrl={branding.logoDataUrl}
        heading={heroHeading}
        description={heroDescription}
        ctaLabel="Book Consultation"
      />

      <FeaturesRow />

      <ClientLogos data={clientLogosData} />

      <StackSlider />

      <HowItWorks />

      <section className="py-24 border-t border-slate-200 dark:border-white/10">
        <Container>
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Row 3 - Industries (visual left, text right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
              <div className="hidden dark:block absolute -inset-20 bg-[var(--site-primary)]/5 blur-[120px] pointer-events-none rounded-full" />

              <AnimatedSection className="site-card overflow-hidden relative p-8 lg:p-10 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 hover:border-[var(--site-primary)]/20 dark:border-white/5 dark:bg-white/5">
                <div className="hidden dark:block absolute -left-10 -top-10 h-64 w-64 rounded-full bg-[rgba(52,211,153,0.1)] blur-[80px]" />
                <div className="grid grid-cols-1 gap-4 relative z-10">
                  {homepageData.industries.map((i: string, idx: number) => {
                    const IndustryIcon = industryIcons[idx % industryIcons.length];
                    const industryColor = industryColors[idx % industryColors.length];
                    return (
                      <div key={i} className="group/item flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md px-6 py-5 text-sm font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-white dark:hover:shadow-[0_0_20px_rgba(var(--site-primary-rgb),0.15)] dark:border-white/5 dark:bg-white/[0.03] dark:text-[#D7E3EF] dark:hover:border-white/20 dark:hover:bg-white/[0.08] shadow-none">
                        <div className="flex items-center gap-4">
                          <IndustryIcon size={16} className={cn(industryColor, "transform transition-transform group-hover/item:scale-110")} />
                          <span className="tracking-tight">{i}</span>
                        </div>
                        <ArrowRight size={16} className="opacity-0 -translate-x-3 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0 text-[var(--site-primary)]" />
                      </div>
                    );
                  })}
                </div>
              </AnimatedSection>

              <AnimatedSection className="site-card site-card-interactive overflow-hidden relative flex flex-col justify-between border border-slate-200 bg-white/85 p-8 backdrop-blur-xl transition-all duration-700 hover:border-emerald-500/30 dark:border-white/5 dark:bg-white/5">
                <FluidBackground />

                <div className="relative z-10">
                  <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{homepageData.industriesSection.eyebrow}</span>
                  <h2 className="mb-4 text-3xl font-display font-black leading-tight tracking-tight text-foreground">{homepageData.industriesSection.title}</h2>
                  <p className="mb-8 text-sm leading-relaxed text-muted-foreground font-medium max-w-md">{homepageData.industriesSection.description}</p>
                </div>

                <div className="relative z-10">
                  <Link href={localePath(locale, "/industries")} className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                    Explore Solutions <ArrowRight size={16} />
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            <ProcessVisualization />
            <Testimonials data={testimonialsData} />

            {/* AI Automation */}
            <AnimatedSection className="site-card site-card-interactive overflow-hidden relative flex flex-col md:flex-row gap-8 justify-between p-8 lg:p-12">
              <div className="md:w-1/3">
                <span className="mb-3 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{homepageData.aiSection.eyebrow}</span>
                <h2 className="mb-4 text-2xl font-display font-black text-foreground leading-snug">{homepageData.aiSection.title}</h2>
              </div>
              <div className="md:w-2/3">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-500 dark:text-slate-400">
                  {homepageData.aiSection.bullets.map((item: string, idx: number) => {
                    const IconComponent = bulletIcons[idx % bulletIcons.length] || SiOpenai;
                    const colorClasses = bulletColors[idx % bulletColors.length];
                    return (
                      <li key={item} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-white/5 dark:bg-white/5 transition-all duration-300 hover:border-slate-200 dark:hover:border-white/10 hover:shadow-sm">
                        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border", colorClasses)}>
                          <IconComponent size={18} />
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 leading-snug">{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </AnimatedSection>

            {/* New Full Width Pricing Section */}
            <HomepagePricing data={pricingConfig} locale={locale} />

            {/* AI project Calculator & Service Configurator moved lower */}
            <AnimatedSection className="py-10 bg-slate-50/50 border-y border-slate-200/80 shadow-[inset_0_4px_20px_rgba(0,0,0,0.02)] dark:bg-transparent dark:border-white/10">
              <div className="max-w-4xl mx-auto text-center space-y-1.5 mb-6">
                <h2 className="text-2xl xl:text-4xl font-black text-slate-950 tracking-tight leading-tight dark:text-white">
                  {homepageData.enterpriseBlock.titlePrefix}{" "}
                  <span className="text-[var(--site-primary)]">{homepageData.enterpriseBlock.titleAccent}</span>{" "}
                  {homepageData.enterpriseBlock.titleSuffix}
                </h2>
                <p className="text-sm xl:text-base text-muted-foreground max-w-2xl mx-auto">{homepageData.enterpriseBlock.description}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
                <div className="flex flex-col">
                  <AIProjectCalculator />
                </div>
                <div className="flex flex-col">
                  <ServiceConfigurator />
                </div>
              </div>
            </AnimatedSection>

            {/* FAQ */}
            <AnimatedSection>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              <Accordion items={homepageData.faq} />
              <div className="mt-4">
                <Link href={localePath(locale, "/faqs")} className="text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] font-semibold">View All FAQs</Link>
              </div>
            </AnimatedSection>


            {/* Final CTA */}
            <AnimatedSection className="relative overflow-hidden rounded-[20px] border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 p-8 text-center md:p-10 shadow-sm dark:border-white/10 dark:from-white/5 dark:to-transparent">
              <div className="relative z-10">
                <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Ready to turn traffic into leads?
                </span>
                <h2 className="mb-3 text-2xl md:text-4xl font-display font-black text-foreground leading-tight">
                  Ready to turn your website into a growth system?
                </h2>
                <p className="mx-auto mb-6 max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground font-medium">
                  Get your free website audit and next-step growth plan. We'll audit your current setup, identify the biggest growth levers, and map out a tailored plan.
                </p>

                <div className="flex flex-wrap gap-3 justify-center items-center">
                  <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-md dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                    Book Consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                    Get Custom Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-200 bg-emerald-50/50 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-100 hover:border-emerald-300 hover:shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20">
                    Get Free Website Audit <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </Container>
      </section>
    </main>
  );
}
