import Link from "next/link";
import { ArrowRight, FileSearch, ShieldCheck, Clock3, Layers, MessagesSquare } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { QuoteWizard } from "@/components/sections/quote-wizard";
import { QuoteHeroVisual } from "@/components/sections/quote-hero-visual";
import { QuoteSteps } from "@/components/sections/quote-steps";
import { QuoteFit } from "@/components/sections/quote-fit";
import { QuoteAsks } from "@/components/sections/quote-asks";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

const heroMeta = [
  { icon: Clock3, label: "About 2 minutes" },
  { icon: Layers, label: "9 quick questions" },
  { icon: ShieldCheck, label: "No obligation" },
  { icon: MessagesSquare, label: "Reply within 1 business day" },
];

const faqItems = [
  {
    value: "faq-1",
    title: "Should I use this instead of booking a consultation?",
    content:
      "Use this path if you want help defining the project more clearly before a call. If you already know you want to discuss it directly, booking a consultation may be the faster option.",
  },
  {
    value: "faq-2",
    title: "Do I need to know exactly which service I need?",
    content:
      "No. You can still complete the scope even if you are not fully sure yet. That is part of what the process is meant to help with.",
  },
  {
    value: "faq-3",
    title: "Can I choose more than one service?",
    content:
      "Yes. This path is especially useful for projects that may involve multiple services working together.",
  },
  {
    value: "faq-4",
    title: "Will I get a final quote immediately after submitting?",
    content:
      "Not always. The scope helps define the direction first. Final pricing depends on how clear and complete the project requirements are.",
  },
  {
    value: "faq-5",
    title: "What if my project is still early?",
    content:
      "That is fine. As long as you can explain the business need and the direction you are considering, the scope can still be useful.",
  },
];

function SectionHeading({
  kicker,
  title,
  accent,
  description,
}: {
  kicker: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <AnimatedSection className="mx-auto mb-14 max-w-3xl text-center">
      <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)] shadow-[0_0_8px_rgba(var(--site-primary-rgb),0.8)]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">{kicker}</span>
      </div>

      <h2 className="mb-5 text-balance font-display text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
        {title}
        {accent && (
          <>
            {" "}
            <span className="bg-gradient-to-r from-[var(--site-primary)] via-emerald-500 to-sky-500 bg-clip-text text-transparent">
              {accent}
            </span>
          </>
        )}
      </h2>

      {description && (
        <p className="text-pretty text-base leading-relaxed text-slate-500 md:text-lg">{description}</p>
      )}
    </AnimatedSection>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/quote",
    title: "Get a Custom Project Quote",
    description: "Tell us your scope and get a tailored quote with timeline and budget range. No obligation, and answered by an engineer rather than a salesperson.",
    keywords: ["software project quote", "web development quote", "custom software cost estimate"],
  });
}

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = (await getDictionary(locale)) as any;

  return (
    <main className="relative flex-1 overflow-x-hidden">
      {/* ───────────── 1. HERO ───────────── */}
      <section className="relative overflow-hidden pb-20 pt-10 md:pb-24">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-0 h-[760px] w-[130%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--site-primary)]/12 via-emerald-500/[0.04] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[760px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-10">
            <AnimatedSection>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--site-primary)]/25 bg-[var(--site-primary)]/[0.07] px-4 py-1.5 shadow-sm backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--site-primary)]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--site-primary)]">
                  Project Scope
                </span>
              </div>

              <h1 className="mb-6 text-balance font-display text-[2.75rem] font-black leading-[1.05] tracking-tight text-slate-900 drop-shadow-sm md:text-[4rem]">
                Tell us the goal.{" "}
                <span className="bg-gradient-to-r from-[var(--site-primary)] via-emerald-500 to-sky-500 bg-clip-text text-transparent">
                  We&apos;ll scope the project.
                </span>
              </h1>

              <p className="mb-8 max-w-xl text-lg font-medium leading-relaxed text-slate-600">
                Answer a few short questions about your business, goals, and timeline. You&apos;ll get a clear
                recommended direction — the right service mix and a realistic next step — before anyone asks you to
                get on a call.
              </p>

              {/* Effort + reassurance meta */}
              <div className="mb-9 flex flex-wrap gap-x-6 gap-y-3">
                {heroMeta.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="flex items-center gap-2">
                      <Icon size={15} className="text-[var(--site-primary)]" strokeWidth={2} />
                      <span className="text-[13px] font-bold text-slate-600">{m.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#scope-form"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--site-primary)] px-7 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-[var(--site-primary)]/25 transition-all hover:-translate-y-0.5 hover:brightness-110"
                >
                  Start Project Scope
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href={localePath(locale, "/book-consultation")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white/60 px-7 py-3.5 text-[15px] font-bold text-slate-800 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white"
                >
                  Book Consultation
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15} className="lg:pl-6">
              <QuoteHeroVisual />
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* ───────────── 2. HOW IT WORKS ───────────── */}
      <section className="border-y border-slate-200/80 bg-slate-50/60 py-20 shadow-[inset_0_4px_20px_rgba(0,0,0,0.02)] md:py-28">
        <Container>
          <SectionHeading
            kicker="How It Works"
            title="Four steps to a clear"
            accent="direction"
            description="No long forms and no sales pressure. Each step takes seconds, and you can leave anything you're unsure about blank."
          />
          <QuoteSteps />
        </Container>
      </section>

      {/* ───────────── 3. THE FORM ───────────── */}
      <section id="scope-form" className="scroll-m-28 py-20 md:py-28">
        <Container>
          <SectionHeading
            kicker="Your Project"
            title="Tell us about the"
            accent="project"
            description="The more clearly you describe the situation, the easier it is to recommend the right direction. Everything here stays between us."
          />

          <AnimatedSection className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 md:p-10">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--site-primary)] via-emerald-400 to-sky-400" />
              <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[var(--site-primary)]/[0.07] blur-[80px]" />

              <div className="relative z-10">
                <div className="mb-8 flex items-center gap-3 border-b border-slate-100 pb-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--site-primary)]/10 text-[var(--site-primary)]">
                    <FileSearch size={20} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-black tracking-tight text-slate-900">
                      Project scope
                    </h3>
                    <p className="text-[13px] font-medium text-slate-500">
                      9 questions · about 2 minutes · no obligation
                    </p>
                  </div>
                </div>

                <QuoteWizard dict={dict} isRtl={locale === "ar" || locale === "ur"} locale={locale} />
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ───────────── 4. WHAT WE ASK ───────────── */}
      <section className="border-y border-slate-200/80 bg-slate-50/60 py-20 shadow-[inset_0_4px_20px_rgba(0,0,0,0.02)] md:py-28">
        <Container>
          <SectionHeading
            kicker="What We Ask"
            title="Everything we need, and"
            accent="nothing more"
            description="Nine questions, no jargon. Here is exactly what the scope covers before you start."
          />
          <QuoteAsks />
        </Container>
      </section>

      {/* ───────────── 5. WHICH PATH ───────────── */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            kicker="Which Path"
            title="Not sure if this is the right"
            accent="starting point?"
            description="Both routes reach the same place. This one just does more of the thinking up front."
          />
          <QuoteFit locale={locale} />
        </Container>
      </section>

      {/* ───────────── 6. FAQ + CTA ───────────── */}
      <section className="border-t border-slate-200/80 bg-slate-50/60 py-20 md:py-28">
        <Container>
          <SectionHeading
            kicker="FAQ"
            title="Questions about the scope"
            accent="process"
          />

          <AnimatedSection className="mx-auto max-w-3xl">
            <Accordion items={faqItems} />
          </AnimatedSection>

          <AnimatedSection className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-[20px] border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 p-8 text-center shadow-sm md:p-10">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[560px] -translate-x-1/2 rounded-full bg-[var(--site-primary)]/10 blur-[90px]" />

            <div className="relative z-10">
              <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Ready when you are
              </span>
              <h2 className="mb-3 font-display text-2xl font-black leading-tight text-slate-900 md:text-4xl">
                Let&apos;s define the right project.
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                Share the scope and we&apos;ll come back with a recommended direction, a realistic timeline, and a
                clear next step — usually within one business day.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="#scope-form"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--site-primary)] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[var(--site-primary)]/25 transition-all hover:brightness-110"
                >
                  Start Project Scope <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={localePath(locale, "/pricing")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-50"
                >
                  See Pricing
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </main>
  );
}
