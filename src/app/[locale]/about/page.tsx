import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";

const supportingPoints = [
  "Built for businesses that need more than a basic website",
  "Focused on clarity, performance, and growth",
  "Structured for real business use, not just visual presentation",
  "Designed to support both launch and long-term improvement",
];

const values = [
  ["Clarity over confusion", "A website or digital system should make the business easier to understand, not harder."],
  ["Quality over shortcuts", "Good work needs structure, thought, and proper execution. Quick fixes usually create bigger problems later."],
  ["Strategy over guesswork", "The build should reflect real goals, real priorities, and the actual needs of the business."],
  ["Custom work over generic setups", "Different businesses need different solutions. One-size-fits-all work rarely supports growth well."],
  ["Modern systems over outdated approaches", "Businesses need digital tools and structures that match how people search, browse, decide, and contact today."],
];

const builds = [
  "Custom websites",
  "Landing pages and funnels",
  "SEO improvements and growth support",
  "Chatbot and automation systems",
  "Technical support and connected digital infrastructure",
];

const fit = [
  "Law firms",
  "Clinics, dental practices, and med spas",
  "Home service businesses",
  "Consultants, coaches, and agencies",
  "SaaS and B2B service companies",
  "Education and training businesses",
];

const reasons = [
  "They have outgrown a basic website",
  "Their current site does not reflect the quality of the business",
  "They need better conversion paths",
  "They want one partner who understands both build and growth",
  "They need support that goes beyond design alone",
  "They want cleaner systems for leads, content, and next steps",
];

const faqItems = [
  { value: "faq-1", title: "What kind of agency is Digital Web Crew?", content: "Digital Web Crew is a web, funnels, SEO, and automation agency focused on helping businesses build stronger digital systems for growth." },
  { value: "faq-2", title: "Do you only work on websites?", content: "No. We also work on landing pages, SEO support, chatbot systems, automation, and broader digital infrastructure depending on the project." },
  { value: "faq-3", title: "Do you work with businesses in the US and Canada?", content: "Yes. Those are the primary target markets, with room to work with other strong-fit clients as well." },
  { value: "faq-4", title: "Are you focused on certain industries?", content: "Yes. We are especially well aligned with law firms, clinics, home services, consultants, SaaS, and education-related businesses." },
  { value: "faq-5", title: "Can I start with one service and expand later?", content: "Yes. Many projects begin with one focused service and grow into a broader digital system over time." },
];

const cardClass = "site-card site-card-interactive overflow-hidden relative p-8 lg:p-10";
const gradientTop = <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />;
const ctaPrimary = "inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-8 py-4 font-bold text-white shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] transition-all hover:bg-[var(--site-primary-hover)]";
const ctaSecondary = "inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 px-8 py-4 font-bold text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-white transition-all hover:bg-white dark:hover:bg-white/10";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Hero */}
          <AnimatedSection className="text-center flex flex-col items-center">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--site-primary)]/10 border border-[var(--site-primary)]/20 text-[var(--site-primary)] mb-8 animate-in fade-in zoom-in duration-700"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--site-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--site-primary)]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Engineering Lab</span>
              <span className="w-px h-3 bg-[var(--site-primary)]/30 mx-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">About Our Crew</span>
            </div >
            
            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-foreground leading-[1.1]">
              A Modern Digital Partner <br className="hidden md:block" /> for Growth-Focused <span className="text-[var(--site-primary)]">Businesses.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl leading-relaxed">
              Digital Web Crew helps businesses build stronger websites, sharper conversion systems, better search visibility, and more efficient lead handling through custom development, funnels, SEO, and automation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12 w-full max-w-2xl">
              {supportingPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/80 dark:border-white/10 dark:bg-white/5 px-4 py-3 text-sm font-bold text-slate-700 dark:text-[#C2D2E1]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--site-primary)]" />
                  {point}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white/50 dark:border-white/10 dark:bg-white/5 px-10 py-5 text-slate-700 dark:text-white font-bold transition-all hover:bg-slate-100 dark:hover:bg-white/10 group">
                <span>Get Quote</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>

          {/* Story */}
          <AnimatedSection className={cardClass}>
            {gradientTop}
            <span className="mb-3 inline-block rounded-full bg-[rgba(var(--site-primary-rgb),0.08)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">Our Story</span>
            <h2 className="text-2xl font-display font-black text-foreground mb-4">Built for Businesses That Need Stronger Digital Infrastructure</h2>
            <p className="text-muted-foreground mb-3">Digital Web Crew was created for businesses that want more than a website that simply looks modern.</p>
            <p className="text-muted-foreground mb-3">Many businesses need a stronger system behind their online presence — better presentation, clearer service structure, stronger lead paths, improved visibility, and more practical support.</p>
            <p className="text-muted-foreground">We combine custom website development, landing pages, SEO support, and automation into digital systems designed to help businesses present themselves better and operate more effectively.</p>
          </AnimatedSection>

          {/* Values */}
          <AnimatedSection className={cardClass}>
            {gradientTop}
            <span className="mb-3 inline-block rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Values</span>
            <h2 className="text-2xl font-display font-black text-foreground mb-5">What We Value</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map(([title, desc]) => (
                <div key={title} className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-1.5">{title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Two col — What We Build + Who We Work Best With */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection className={cardClass}>
              {gradientTop}
              <span className="mb-3 inline-block rounded-full bg-[rgba(var(--site-primary-rgb),0.08)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">Services</span>
              <h2 className="text-xl font-display font-black text-foreground mb-4">What We Build</h2>
              <ul className="space-y-2.5">
                {builds.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--site-primary)]" />{item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className={cardClass}>
              {gradientTop}
              <span className="mb-3 inline-block rounded-full bg-violet-50 dark:bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Best Fit</span>
              <h2 className="text-xl font-display font-black text-foreground mb-4">Who We Work Best With</h2>
              <ul className="space-y-2.5">
                {fit.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />{item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          {/* Approach */}
          <AnimatedSection className={cardClass}>
            {gradientTop}
            <span className="mb-3 inline-block rounded-full bg-amber-50 dark:bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Approach</span>
            <h2 className="text-2xl font-display font-black text-foreground mb-4">More Than Design. More Than Traffic.</h2>
            <p className="text-muted-foreground mb-3">Some providers focus only on building websites. Others only on traffic. Others talk about automation without connecting it to how the business actually works.</p>
            <p className="text-muted-foreground mb-3">Digital Web Crew takes a more connected approach. We look at how the website presents the business, how pages guide action, how visibility improves, and how lead handling can become more efficient.</p>
          </AnimatedSection>

          {/* Why Choose */}
          <AnimatedSection className={cardClass}>
            {gradientTop}
            <h2 className="text-2xl font-display font-black text-foreground mb-4">Why Businesses Choose to Work With Us</h2>
            <p className="text-muted-foreground mb-4">Businesses usually come to us because they want a stronger digital setup with more clarity and better execution.</p>
            <ul className="space-y-2.5 mb-4">
              {reasons.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--site-primary)]" />{item}
                </li>
              ))}
            </ul>
            <Link href={localePath(locale, "/process")} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] hover:underline">
              View Full Process <ArrowRight size={14} />
            </Link>
          </AnimatedSection>

          {/* FAQ */}
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-foreground mb-4">Questions About Digital Web Crew</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection className="site-card overflow-hidden relative text-center p-10 bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.08),rgba(52,211,153,0.06))] dark:bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.14),rgba(52,211,153,0.04))]">
            {gradientTop}
            <h2 className="text-2xl font-display font-black text-foreground mb-3">Looking for a Stronger Digital Partner?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">If your business needs more than a basic website and you want a clearer, more capable digital system, we can help define the right next step.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className={ctaPrimary}>
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15"><ArrowRight className="h-4 w-4" /></span>
              </Link>
              <Link href={localePath(locale, "/quote")} className={ctaSecondary}>
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10"><ArrowRight className="h-4 w-4" /></span>
              </Link>
            </div>
          </AnimatedSection>

        </div>
      </Container>
    </main>
  );
}
