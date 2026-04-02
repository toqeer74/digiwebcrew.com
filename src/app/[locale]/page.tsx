import Link from "next/link";
import { ArrowRight, Shield, Globe, Smartphone, Monitor, Layers } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { Hero } from "@/components/sections/hero";
import { BlogInsightsPreview } from "@/components/sections/blog-insights-preview";
import { ClientLogos } from "@/components/sections/client-logos";
import { FeaturesRow } from "@/components/sections/features-row";
import { AIProjectCalculator } from "@/components/tools/ai-project-calculator";
import { ServiceConfigurator } from "@/components/tools/service-configurator";
import { ProcessVisualization } from "@/components/sections/process-visualization";
import { StackSlider } from "@/components/sections/stack-slider";
import { SystemWorkflow } from "@/components/sections/system-workflow";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TeamSection } from "@/components/sections/team-section";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustedPlatforms } from "@/components/sections/trusted-platforms";
import { HomePageCards } from "@/components/sections/homepage-cards";
import { FluidBackground } from "@/components/sections/homepage-visuals";
import { getBlogPosts, getClientLogosData, getHomePricingData, getHomepageData, getTeamData, getTestimonialsData, getTrustedPlatformsData } from "@/lib/content-engine";
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
  const featuredPosts = (await getBlogPosts()).slice(0, 3);
  const testimonialsData = await getTestimonialsData(locale);
  const clientLogosData = await getClientLogosData(locale);
  const teamData = await getTeamData(locale);
  const trustedPlatformsData = await getTrustedPlatformsData(locale);
  const homePricingData = await getHomePricingData(locale);
  const homepageData = await getHomepageData(locale);

  return (
    <main className="flex-1">
      <section className="relative">
        <Hero locale={locale} />
      </section>

      <ClientLogos data={clientLogosData} />

      <FeaturesRow />

      <StackSlider />

      <SystemWorkflow />

      <WhyChooseUs />

      <section className="py-24 border-t border-slate-200 dark:border-white/10">
        <Container>
          <div className="max-w-6xl mx-auto space-y-6">
            <HomePageCards 
              locale={locale} 
              homepageData={homepageData} 
              homePricingData={homePricingData} 
            />

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
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#34D399] via-[var(--site-primary)] to-[#60A5FA] z-20 opacity-50" />
                
                <div className="relative z-10">
                  <span className="mb-4 inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">{homepageData.industriesSection.eyebrow}</span>
                  <h2 className="mb-4 text-3xl font-display font-black leading-tight tracking-tight text-foreground">{homepageData.industriesSection.title}</h2>
                  <p className="mb-8 text-sm leading-relaxed text-muted-foreground font-medium max-w-md">{homepageData.industriesSection.description}</p>
                </div>
                
                <div className="relative z-10">
                  <Link href={localePath(locale, "/industries")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-8 py-4 text-sm font-black text-white dark:shadow-[0_20px_40px_-15px_rgba(var(--site-primary-rgb),0.5)] shadow-none hover:bg-[var(--site-primary-hover)] hover:-translate-y-1 transition-all duration-300">
                    Explore Solutions <ArrowRight size={16} />
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            <ProcessVisualization />
            <Testimonials data={testimonialsData} />
            <TrustedPlatforms data={trustedPlatformsData} />
            <TeamSection locale={locale} data={teamData} />

            {/* Row 4 - AI + Pricing (text left, visual right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedSection className="site-card site-card-interactive overflow-hidden relative flex flex-col justify-between p-8 lg:p-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F59E0B] to-[#34D399]" />
                <div>
                  <span className="mb-3 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">{homepageData.aiSection.eyebrow}</span>
                  <h2 className="mb-4 text-2xl font-display font-black text-foreground leading-snug">{homepageData.aiSection.title}</h2>
                  <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                    {homepageData.aiSection.bullets.map((item: string) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection className="site-card site-card-interactive overflow-hidden relative flex flex-col justify-between p-8 lg:p-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] to-[#F59E0B]" />
                <div>
                  <span className="mb-3 inline-block rounded-full bg-[rgba(var(--site-primary-rgb),0.08)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">Pricing</span>
                  <h2 className="mb-4 text-2xl font-display font-black text-foreground leading-snug">{homePricingData.title}</h2>
                  <div className="space-y-2.5 mb-6">
                    {homePricingData.packages.map((item: any) => (
                      <div key={item.label} className="rounded-xl border border-slate-200 dark:border-white/10 px-4 py-3 bg-slate-50 dark:bg-white/5">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600 dark:text-[#C2D2E1]">{item.label}</span>
                          <span className="text-sm font-black text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">{item.price}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-[#8EA3B8]">
                          <span>{item.timeline}</span>
                          <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-[#8EA3B8]" />
                          <span>{item.fit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-slate-200/90 bg-white/75 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-[#8EA3B8]">{homePricingData.comparisonTitle}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-[#C2D2E1]">
                      {homePricingData.comparisonRows.map((row: any) => (
                        <div key={row.label} className="contents">
                          <p>{row.label}</p>
                          <p className="font-semibold text-right">{row.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={localePath(locale, "/pricing")} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--site-primary)] px-6 py-3 text-sm font-bold text-white dark:shadow-[0_16px_40px_-20px_rgba(var(--site-primary-rgb),0.5)] shadow-none hover:bg-[var(--site-primary-hover)] transition-all">
                    View Pricing <ArrowRight size={14} />
                  </Link>
                  <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 dark:border-white/15 px-6 py-3 text-sm font-bold text-slate-700 dark:text-[#D7E3EF] hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                    Get Custom Quote <ArrowRight size={14} />
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            <BlogInsightsPreview locale={locale} posts={featuredPosts} />

            {/* AI project Calculator & Service Configurator moved lower */}
            <AnimatedSection className="py-12 bg-white border-y border-slate-200 dark:bg-transparent dark:border-white/10">
              <div className="max-w-4xl mx-auto text-center space-y-2 mb-6">
                <h2 className="text-3xl xl:text-4xl font-black text-slate-950 tracking-tight leading-tight dark:text-white">
                  {homepageData.enterpriseBlock.titlePrefix}{" "}
                  <span className="text-[var(--site-primary)]">{homepageData.enterpriseBlock.titleAccent}</span>{" "}
                  {homepageData.enterpriseBlock.titleSuffix}
                </h2>
                <p className="text-base xl:text-lg text-muted-foreground">{homepageData.enterpriseBlock.description}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <div className="space-y-6">
                  <AIProjectCalculator />
                </div>
                <div className="space-y-6">
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
            <AnimatedSection className="site-card overflow-hidden relative text-center p-10 md:p-14 bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.08),rgba(52,211,153,0.06))] dark:bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.14),rgba(52,211,153,0.04))]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#60A5FA] via-[var(--site-primary)] to-[#34D399]" />
              <div className="hidden dark:block absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-[rgba(var(--site-primary-rgb),0.10)] blur-3xl pointer-events-none" />
              <div className="hidden dark:block absolute -top-10 -left-10 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <span className="mb-4 inline-block rounded-full bg-[var(--site-primary)]/10 border border-[var(--site-primary)]/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
                  READY TO TURN TRAFFIC INTO LEADS?
                </span>
                <h2 className="mb-4 text-3xl md:text-5xl font-display font-black text-foreground leading-tight">
                  Ready to turn your website into a growth system?
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground font-medium">
                  Get your free website audit and next-step growth plan. We'll audit your current setup, identify the biggest growth levers, and map out a tailored plan.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-8 py-4 font-bold text-white dark:shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.6)] shadow-none transition-all hover:bg-[var(--site-primary-hover)] hover:-translate-y-1">
                    <span>Book Consultation</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                  <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/80 px-8 py-4 font-bold text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-white transition-all hover:bg-white dark:hover:bg-white/10 hover:-translate-y-1">
                    <span>Get Custom Quote</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                  <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-50/50 px-8 py-4 font-bold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 transition-all hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:-translate-y-1">
                    <span>Get Free Website Audit</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
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
