import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";

const steps = [
  {
    num: "01",
    title: "Discover",
    color: "from-[var(--site-primary)] to-[#60A5FA]",
    badge: "Phase 1",
    badgeColor: "bg-[rgba(var(--site-primary-rgb),0.08)] text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]",
    body: "Every project starts by understanding the business behind it.",
    subheading: "What this stage helps define:",
    items: ["Business goals", "Audience needs", "Service priorities", "Current website or system gaps", "Lead generation needs", "Timeline expectations", "Scope direction"],
  },
  {
    num: "02",
    title: "Scope",
    color: "from-[#34D399] to-[var(--site-primary)]",
    badge: "Phase 2",
    badgeColor: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    body: "Once the direction is clear, we shape the project around what is actually needed.",
    subheading: "What this stage helps define:",
    items: ["Recommended service mix", "Page and content requirements", "Feature needs", "Technical direction", "Integrations and tools", "Project timeline", "Budget alignment"],
  },
  {
    num: "03",
    title: "Build",
    color: "from-[#A78BFA] to-[#60A5FA]",
    badge: "Phase 3",
    badgeColor: "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
    body: "With the scope in place, we move into design, development, and implementation.",
    subheading: "What this stage can include:",
    items: ["Website design and development", "Landing page and funnel creation", "Content structure implementation", "Automation setup", "CRM or booking integration", "SEO foundation work", "Testing and refinement"],
  },
  {
    num: "04",
    title: "Launch & Grow",
    color: "from-[#F59E0B] to-[#34D399]",
    badge: "Phase 4",
    badgeColor: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
    body: "Once the project is ready, we move into launch, review, and continued support.",
    subheading: "What this stage can include:",
    items: ["Launch support", "Deployment", "Quality checks", "Post-launch fixes", "SEO and growth support", "Maintenance", "Conversion improvements", "Future expansion planning"],
  },
];

const fitProjects = [
  "Custom website projects",
  "Website redesigns",
  "Landing page and funnel builds",
  "SEO support engagements",
  "Chatbot and automation setups",
  "Multi-service digital systems",
  "Businesses that need help defining the right direction before building",
];

const faqItems = [
  { value: "faq-1", title: "Do all projects go through the same process?", content: "The overall structure stays consistent, but the depth of each stage can vary depending on the size and type of project." },
  { value: "faq-2", title: "What if I am not fully sure what I need yet?", content: "That is exactly what the custom project scope path is for. It helps define the direction before anything is built." },
  { value: "faq-3", title: "Can a project include more than one service?", content: "Yes. Many projects include a mix of website work, landing pages, SEO, or automation depending on what the business needs." },
  { value: "faq-4", title: "Do you provide support after launch?", content: "Yes. Post-launch support can include updates, SEO, maintenance, improvements, and future expansion work." },
  { value: "faq-5", title: "How long does the process take?", content: "That depends on the scope, complexity, and timeline of the project. Smaller projects move faster, while larger builds need more planning and implementation time." },
];

const ctaPrimary = "inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-8 py-4 font-bold text-white shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] transition-all hover:bg-[var(--site-primary-hover)]";
const ctaSecondary = "inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 px-8 py-4 font-bold text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] transition-all hover:bg-white dark:hover:bg-white/10";

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const gradientTop = <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />;

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
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Our Protocol</span>
            </div>
          
            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-slate-950 dark:text-[#F8F8FF] leading-[1.1]">
              A Clear Path From <br className="hidden md:block" /> <span className="text-[var(--site-primary)]">Discovery</span> to Launch.
            </h1>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-12 max-w-3xl leading-relaxed">
              We use a structured engineering process to make sure every website, funnel, SEO, and automation project is aligned with real business goals, clear priorities, and the right level of implementation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white/50 dark:border-white/10 dark:bg-white/5 px-10 py-5 text-slate-700 dark:text-[#F8F8FF] font-bold transition-all hover:bg-slate-100 dark:hover:bg-white/10 group">
                <span>Get Quote</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>

          {/* Why Process */}
          <AnimatedSection className="site-card site-card-interactive overflow-hidden relative p-8 lg:p-10">
            {gradientTop}
            <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-4">A Better Process Leads to Better Work</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-3">Strong digital work does not come from jumping straight into design or development without direction.</p>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-3">Digital Web Crew follows a process built to keep projects clear, practical, and aligned with the real needs of the business.</p>
            <p className="text-slate-600 dark:text-[#94A3B8]">Some projects are focused and simple. Others include multiple services and a broader implementation path.</p>
          </AnimatedSection>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step) => (
              <AnimatedSection key={step.num} className="site-card site-card-interactive overflow-hidden relative flex flex-col p-8 lg:p-10">
                {gradientTop}
                <div className="flex items-center gap-3 mb-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${step.badgeColor}`}>{step.badge}</span>
                  <span className="font-display text-3xl font-black text-slate-200 dark:text-white/10 select-none">{step.num}</span>
                </div>
                <h2 className="text-xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-3">Step {step.num} — {step.title}</h2>
                <p className="text-sm text-slate-600 dark:text-[#94A3B8] mb-3">{step.body}</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-[#6B7E8E] mb-3">{step.subheading}</p>
                <ul className="space-y-2">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-[#94A3B8]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--site-primary)]" />{item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>

          {/* Fit + How to Enter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection className="site-card site-card-interactive overflow-hidden relative p-8 lg:p-10">
              {gradientTop}
              <h2 className="text-xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-4">A Good Fit For These Projects</h2>
              <ul className="space-y-2.5">
                {fitProjects.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-[#94A3B8]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--site-primary)]" />{item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className="site-card site-card-interactive overflow-hidden relative p-8 lg:p-10">
              {gradientTop}
              <h2 className="text-xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-4">How to Enter the Process</h2>
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4">
                  <p className="font-semibold text-slate-800 dark:text-[#F8F8FF] mb-1">Option 1 — Book Consultation</p>
                  <p className="text-sm text-slate-500 dark:text-[#94A3B8]">Best if you already know what you want and want to discuss the project directly.</p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4">
                  <p className="font-semibold text-slate-800 dark:text-[#F8F8FF] mb-1">Option 2 — Get Quote</p>
                  <p className="text-sm text-slate-500 dark:text-[#94A3B8]">Best if you want to define the need more clearly before booking a call.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* FAQ */}
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-4">Questions About the Process</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection className="site-card overflow-hidden relative text-center p-10 bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.08),rgba(52,211,153,0.06))] dark:bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.14),rgba(52,211,153,0.04))]">
            {gradientTop}
            <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-3">Want a Clearer Path From Idea to Launch?</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-6 max-w-xl mx-auto">If you want a project that is shaped around business goals, clear scope, and practical execution, the next step is simple.</p>
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
