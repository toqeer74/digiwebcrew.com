import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Layers,
  Handshake,
  SlidersHorizontal,
  Compass,
  FileSignature,
  Smartphone,
  Gauge,
  LineChart,
  Headphones,
} from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { localePath } from "@/lib/locale-path";
import { PricingTiers } from "@/components/sections/pricing-tiers";
import { getPublicPricingConfig } from "@/lib/pricing";
import { PricingComparison } from "@/components/sections/pricing-comparison";
import { PricingDrivers } from "@/components/sections/pricing-drivers";
import { PricingJourney } from "@/components/sections/pricing-journey";
import { PricingFit } from "@/components/sections/pricing-fit";

const supportPoints = [
  { icon: ShieldCheck, title: "Clear starting prices", desc: "Published numbers, no discovery fee to see them." },
  { icon: SlidersHorizontal, title: "Custom scope for larger builds", desc: "Priced around depth, not a rigid package." },
  { icon: Layers, title: "Built for serious projects", desc: "Engineered systems, not template assembly." },
  { icon: Handshake, title: "Single or multi-service", desc: "Take one workstream or combine several." },
];

const alwaysIncluded = [
  { icon: Compass, label: "Discovery & scoping workshop" },
  { icon: FileSignature, label: "Fixed-price written proposal" },
  { icon: Smartphone, label: "Mobile-first responsive build" },
  { icon: Gauge, label: "Core Web Vitals performance pass" },
  { icon: LineChart, label: "Analytics & tracking wired up" },
  { icon: Headphones, label: "30 days post-launch support" },
];

const faqItems = [
  {
    value: "faq-1",
    title: "Do you offer fixed packages?",
    content:
      "We use starting prices instead of rigid fixed packages so projects can be scoped around real business needs.",
  },
  {
    value: "faq-2",
    title: "Can I hire you for one service only?",
    content:
      "Yes. Some clients come to us for one focused project, while others need a combination of services.",
  },
  {
    value: "faq-3",
    title: "Will I get an exact quote before starting?",
    content:
      "Yes. Once the scope is clear, we can define the project direction and provide pricing based on the actual requirements.",
  },
  {
    value: "faq-4",
    title: "What if I am not sure which service I need?",
    content:
      "The custom project scope flow is the best place to start if you want help defining what fits your business.",
  },
  {
    value: "faq-5",
    title: "Do you offer monthly support after launch?",
    content:
      "Yes. Ongoing support, SEO, updates, and optimization can be provided depending on the project and the level of support needed.",
  },
];

function SectionHeading({
  kicker,
  title,
  accent,
  suffix,
  description,
}: {
  kicker: string;
  title: string;
  accent?: string;
  suffix?: string;
  description?: string;
}) {
  return (
    <AnimatedSection className="mx-auto mb-14 max-w-3xl text-center">
      <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)] shadow-[0_0_8px_rgba(var(--site-primary-rgb),0.8)]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          {kicker}
        </span>
      </div>

      <h2 className="mb-5 text-balance font-display text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
        {title}
        {accent && (
          <>
            {" "}
            <span className="bg-gradient-to-r from-[var(--site-primary)] via-emerald-500 to-sky-500 bg-clip-text text-transparent">
              {accent}
            </span>
          </>
        )}
        {suffix ? ` ${suffix}` : ""}
      </h2>

      {description && (
        <p className="text-pretty text-base leading-relaxed text-slate-500 dark:text-slate-400 md:text-lg">{description}</p>
      )}
    </AnimatedSection>
  );
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pricing = await getPublicPricingConfig();

  return (
    <main className="flex-1 -mt-28 overflow-x-hidden pt-28 relative">
      {/* Background Visuals */}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--site-primary)]/15 via-[var(--site-primary)]/5 to-background" />
        <div className="absolute top-0 left-0 right-0 h-[1000px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-7xl mx-auto space-y-6 pt-12 pb-16">
          
          {/* 1. HERO SECTION */}
          <AnimatedSection className="pt-0 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4 items-center relative">
              
              {/* LEFT: Typography & Graphic */}
              <div className="relative z-10 text-center lg:text-left">
                {/* Background Scribble Graphic */}
                <div className="absolute top-1/2 left-1/2 lg:-left-20 -translate-x-1/2 lg:translate-x-0 -translate-y-[45%] w-[110%] lg:w-[130%] h-[300px] opacity-15 dark:opacity-20 pointer-events-none -rotate-3 z-0 mix-blend-multiply dark:mix-blend-screen max-w-[800px]">
                  <svg viewBox="-50 -50 500 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="heroStripeGradientPricing" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--site-primary)" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                    <path d="M-40 120 C 20 -60, 140 -40, 160 100 C 180 260, 260 260, 300 140 C 340 20, 420 20, 460 120" stroke="url(#heroStripeGradientPricing)" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--site-primary)]/30 bg-[var(--site-primary)]/10 px-3.5 py-1 mb-5 shadow-sm backdrop-blur-md mx-auto lg:mx-0">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--site-primary)] dark:bg-[var(--site-primary-soft)]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
                      Pricing &amp; Investment
                    </span>
                  </div>
                  
                  <h1 className="text-[3rem] md:text-[4rem] font-black font-display tracking-tight mb-4 leading-[1.05] text-balance drop-shadow-sm bg-gradient-to-r from-[#1746A2] via-blue-500 to-blue-400 bg-clip-text text-transparent">
                    Transparent pricing for <br className="hidden md:block" /> 
                    serious digital work.
                  </h1>
                  
                  <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 drop-shadow-sm">
                    Every system is scoped around your growth goals and technical requirements. We publish honest starting points, then price the real work once the scope is clear.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
                    <Button href={localePath(locale, "/quote")} className="bg-[var(--site-primary)] hover:brightness-110 text-white shadow-xl shadow-[var(--site-primary)]/20 rounded-full px-6 h-10 flex items-center gap-2 group transition-all text-[13px] font-bold border-0">
                      <span>Get a Custom Quote</span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </Button>
                    <Button href={localePath(locale, "/book-consultation")} className="bg-slate-900 hover:bg-slate-800 text-white shadow-md rounded-full px-6 h-10 flex items-center gap-2 group transition-all text-[13px] font-bold dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                      <span>Book Scoping Call</span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1 dark:bg-slate-900/10">
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* RIGHT: Floating Badges / Visuals */}
              <div className="hidden lg:flex flex-col gap-4 pl-12 relative z-10 h-full justify-center">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-48 h-48 bg-[var(--site-primary)]/20 blur-[80px] rounded-full pointer-events-none" />
                
                {supportPoints.map((point, idx) => {
                  const Icon = point.icon;
                  // Alternate rotation and positioning for the floating aesthetic
                  let transformClass = "";
                  if (idx === 0) transformClass = "transform -rotate-2 hover:rotate-0 translate-x-4";
                  else if (idx === 1) transformClass = "transform rotate-1 hover:rotate-0 -translate-x-4";
                  else if (idx === 2) transformClass = "transform -rotate-1 hover:rotate-0 translate-x-2";
                  else transformClass = "transform rotate-2 hover:rotate-0 -translate-x-2";
                  
                  return (
                    <div key={idx} className={`bg-white/90 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-4 w-72 ml-auto transition-transform duration-500 ${transformClass}`}>
                      <div className="h-10 w-10 rounded-full bg-[var(--site-primary)]/10 text-[var(--site-primary)] flex items-center justify-center shrink-0">
                        <Icon size={18} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-foreground leading-tight">{point.title}</p>
                        <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{point.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
            </div>
          </AnimatedSection>
        </div>
      </Container>

      {/* ───────────────────────── 2. INVESTMENT TIERS ───────────────────────── */}
      <section className="relative border-y border-slate-200/80 bg-slate-50/60 py-20 shadow-[inset_0_4px_20px_rgba(0,0,0,0.02)] md:py-28 dark:border-white/10 dark:bg-white/[0.015] dark:shadow-none">
        <Container className="relative z-10">
          <SectionHeading
            kicker="Investment Tiers"
            title="Starting points, priced by"
            accent="scope"
            description="Four core engagements, each with a published floor. Where you land inside a tier depends on the depth of the build — never on how many hours we happen to log."
          />

          <PricingTiers locale={locale} tiers={pricing.tiers} />

          {/* Always included strip */}
          <AnimatedSection
            delay={0.1}
            className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-8 dark:border-white/8 dark:bg-white/[0.04] dark:shadow-none dark:backdrop-blur-sm"
          >
            <div className="mb-6 flex flex-col gap-1 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-white/8">
              <div>
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
                  No matter the tier
                </span>
                <h3 className="font-display text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Included in every engagement
                </h3>
              </div>
              <p className="text-[13px] font-medium text-slate-400 dark:text-slate-500">
                Baseline standards, never billed as extras.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {alwaysIncluded.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/12 dark:text-emerald-400">
                      <Icon size={15} strokeWidth={1.9} />
                    </span>
                    <span className="text-[13.5px] font-semibold text-slate-700 dark:text-slate-300">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ───────────────────────── 3. COMPARISON MATRIX ───────────────────────── */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            kicker="Side by Side"
            title="Compare what each engagement"
            accent="delivers"
            description="A clear view of what ships as standard, what is available as an add-on, and what simply does not apply — so you can pick the right starting point before we ever talk numbers."
          />

          <PricingComparison />

          <AnimatedSection delay={0.1} className="mt-8 text-center">
            <p className="text-[13.5px] font-medium text-slate-500 dark:text-slate-400">
              Not sure which column is yours?{" "}
              <Link
                href={localePath(locale, "/quote")}
                className="font-bold text-[var(--site-primary)] underline-offset-4 hover:underline dark:text-[var(--site-primary-soft)]"
              >
                Run the custom scope flow
              </Link>{" "}
              and we will point you at the right one.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ───────────────────────── 4. COST DRIVERS ───────────────────────── */}
      <section className="relative border-y border-slate-200/80 bg-slate-50/60 py-20 shadow-[inset_0_4px_20px_rgba(0,0,0,0.02)] md:py-28 dark:border-white/10 dark:bg-white/[0.015] dark:shadow-none">
        <Container className="relative z-10">
          <SectionHeading
            kicker="Cost Drivers"
            title="Ten variables that shape your"
            accent="estimate"
            description="No black box. These are the exact factors we weigh when scoping a project, ranked by how much each one typically moves the final number."
          />

          <PricingDrivers />
        </Container>
      </section>

      {/* ───────────────────────── 5. HOW PRICING WORKS ───────────────────────── */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            kicker="How Pricing Works"
            title="From first call to fixed"
            accent="proposal"
            description="Four steps between your first message and a signed scope — with a real number in your hands before any commitment."
          />

          <PricingJourney />
        </Container>
      </section>

      {/* ───────────────────────── 6. PARTNER FIT ───────────────────────── */}
      <section className="relative border-y border-slate-200/80 bg-slate-50/60 py-20 shadow-[inset_0_4px_20px_rgba(0,0,0,0.02)] md:py-28 dark:border-white/10 dark:bg-white/[0.015] dark:shadow-none">
        <Container className="relative z-10">
          <SectionHeading
            kicker="Partner Fit"
            title="Honest about who we work"
            accent="best with"
            description="Great engagements start with a match. Here is where our process creates the most value — and where it probably will not."
          />

          <PricingFit />
        </Container>
      </section>

      {/* ───────────────────────── 7. FAQ + FINAL CTA ───────────────────────── */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-7xl space-y-6">
            <AnimatedSection>
              <div className="mb-8 text-center">
                <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                  Common Questions
                </span>
                <h2 className="font-display text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="mx-auto max-w-3xl">
                <Accordion items={faqItems} />
                <div className="mt-6 text-center">
                  <Link
                    href={localePath(locale, "/faqs")}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--site-primary)] underline-offset-4 hover:underline dark:text-[var(--site-primary-soft)]"
                  >
                    View All FAQs <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="relative mt-16 overflow-hidden rounded-[20px] border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 p-8 text-center shadow-sm md:p-10 dark:border-white/10 dark:from-white/5 dark:to-transparent">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[560px] -translate-x-1/2 rounded-full bg-[var(--site-primary)]/10 blur-[90px]" />

              <div className="relative z-10">
                <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Ready to take the next step?
                </span>
                <h2 className="mb-3 font-display text-2xl font-black leading-tight text-slate-900 dark:text-white md:text-4xl">
                  Ready to scope the right project?
                </h2>
                <p className="mx-auto mb-6 max-w-2xl text-sm font-medium leading-relaxed text-muted-foreground md:text-base">
                  Whether you need a website, automation support, or ongoing SEO work, the next step is defining the
                  right scope. We&apos;ll audit your current setup and identify the biggest growth levers.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href={localePath(locale, "/book-consultation")}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-md dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                  >
                    Book Consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={localePath(locale, "/quote")}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    Get Custom Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={localePath(locale, "/quote")}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-200 bg-emerald-50/50 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:border-emerald-300 hover:bg-emerald-100 hover:shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
                  >
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
