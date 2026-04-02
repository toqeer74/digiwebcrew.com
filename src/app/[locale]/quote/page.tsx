import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { QuoteWizard } from "@/components/sections/quote-wizard";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

const whenBetter = [
  "you need help defining the project",
  "you may need more than one service",
  "the project has a few moving parts",
  "you want to explain things clearly before a call",
  "you are comparing priorities, timeline, or budget",
  "you are not fully sure what should be built first",
];

const scopeNeeds = [
  "what type of help you need",
  "what kind of business you run",
  "your main goal",
  "what services may be involved",
  "what stage the project is in",
  "your timeline",
  "your budget range",
  "how to contact you",
  "anything else important about the project",
];

const fitItems = [
  "want help defining the project properly",
  "may need website work plus SEO, funnels, or automation",
  "prefer to think through the details before a call",
  "have a project with multiple moving parts",
  "want to share budget and timeline upfront",
  "need a more structured starting point",
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

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = (await getDictionary(locale)) as any;
  const sectionCardClass = "site-card overflow-hidden relative p-8 lg:p-10";
  const interactiveCardClass = "site-card site-card-interactive overflow-hidden relative p-6 lg:p-8";
  const gradientTop = <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />;


  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <AnimatedSection className="text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--site-primary)]/10 border border-[var(--site-primary)]/20 text-[var(--site-primary)] mb-8 animate-in fade-in zoom-in duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--site-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--site-primary)]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Engineering Lab</span>
              <span className="w-px h-3 bg-[var(--site-primary)]/30 mx-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Project Scoping</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-foreground leading-[1.1] text-balance">
              Get a Custom Project Scope Built Around <br className="hidden md:block" /> <span className="text-[var(--site-primary)]">What Your Business Needs.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl leading-relaxed mx-auto">
              Tell us what you need help with, what goals you are working toward, and where your project stands. We will use that information to shape the right service direction and a clearer next step.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#scope-form" className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group">
                <span>Start Project Scope</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-white font-bold px-10 py-5 transition-all hover:bg-white dark:hover:bg-white/10 group">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <AnimatedSection className={cn(sectionCardClass, "md:col-span-12 lg:col-span-8")}>
              {gradientTop}
              <span className="mb-4 inline-block rounded-full bg-[var(--site-primary)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--site-primary)]">Strategy</span>
              <h2 className="text-3xl font-display font-black text-foreground mb-6 tracking-tight">A Better Way to Start When the Project Needs More Definition</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Not every business is ready to jump straight into a consultation.</p>
                <p>Sometimes the need is clear, but the exact project is not. You may know that the current website is weak, the lead flow is not working well, or the business needs better structure, but you may not know exactly which service mix makes the most sense yet.</p>
                <p>That is what this project scope path is for.</p>
                <p>Instead of forcing you into a call too early, it gives you a structured way to explain your business, your goals, your timeline, and the kind of help you may need. From there, the project becomes easier to understand and the next step becomes easier to recommend.</p>
              </div>
            </AnimatedSection>

            <div className="md:col-span-12 lg:col-span-4 space-y-8">
              <AnimatedSection className={cn(sectionCardClass, "h-full")}>
                {gradientTop}
                <span className="mb-4 inline-block rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Context</span>
                <h2 className="text-2xl font-display font-black text-foreground mb-6">When This Is Better</h2>
                <ul className="space-y-4">
                  {whenBetter.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection className={sectionCardClass}>
              {gradientTop}
              <span className="mb-4 inline-block rounded-full bg-amber-50 dark:bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Information</span>
              <h2 className="text-2xl font-display font-black text-foreground mb-6">What We Need to Learn From the Scope</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {scopeNeeds.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className={sectionCardClass}>
              {gradientTop}
              <span className="mb-4 inline-block rounded-full bg-violet-50 dark:bg-violet-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">Process</span>
              <h2 className="text-2xl font-display font-black text-foreground mb-6">How It Works</h2>
              <div className="space-y-4">
                {[
                  { step: "Step 1", title: "Share the basics", text: "Tell us what you need help with and what kind of business you run." },
                  { step: "Step 2", title: "Define the goal", text: "Explain what you are trying to improve, launch, fix, or grow." },
                  { step: "Step 3", title: "Add project details", text: "Select the services, timeline, stage, and budget range." },
                  { step: "Step 4", title: "Submit your information", text: "Send the scope so the project can be reviewed." },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <span className="text-[10px] font-black uppercase text-[var(--site-primary)] mt-1">{item.step}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        <div id="scope-form" className="mt-24">
          <AnimatedSection className={cn(sectionCardClass, "mb-12 text-center max-w-4xl mx-auto")}>
            {gradientTop}
            <h2 className="text-3xl font-display font-black text-foreground mb-4">Tell Us About the Project</h2>
            <p className="text-muted-foreground">
              Use the form below to share the key details around your business, goals, timeline, and service needs. The more clearly you describe the situation, the easier it is to recommend the right direction.
            </p>
          </AnimatedSection>
          <QuoteWizard dict={dict} isRtl={locale === "ar" || locale === "ur"} locale={locale} />
        </div>

        <div className="max-w-6xl mx-auto space-y-12 mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection className={sectionCardClass}>
              {gradientTop}
              <h2 className="text-2xl font-display font-black text-foreground mb-4">Why This Is a Strong Conversion Path</h2>
              <p className="text-muted-foreground leading-relaxed">
                A custom project scope does more than collect contact details. It helps clarify the project, qualify the lead, surface the right service mix, and create a better starting point for a useful conversation.
              </p>
            </AnimatedSection>

            <AnimatedSection className={sectionCardClass}>
              {gradientTop}
              <h2 className="text-2xl font-display font-black text-foreground mb-6">Who This Is Best For</h2>
              <ul className="space-y-3">
                {fitItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--site-primary)] mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          <AnimatedSection className={cn(sectionCardClass, "text-center bg-slate-50 dark:bg-transparent border-2 border-[var(--site-primary)]/10")}>
            {gradientTop}
            <h2 className="text-3xl font-display font-black text-foreground mb-6">Questions About the Project Scope Process</h2>
            <div className="max-w-3xl mx-auto text-left">
              <Accordion items={faqItems} />
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card overflow-hidden relative text-center p-12 lg:p-16 border-2 border-[var(--site-primary)]/20 shadow-[0_40px_80px_-40px_rgba(var(--site-primary-rgb),0.3)]">
            {gradientTop}
            <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mb-6 tracking-tight">Ready to Define the Right Project Scope?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              If you want a clearer view of what your project needs before moving forward, start the custom scope process and take the next step with more structure and less guesswork.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#scope-form" className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group">
                <span>Start Project Scope</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-white font-bold px-10 py-5 transition-all hover:bg-white dark:hover:bg-white/10 group">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>

        </div>
      </Container>
    </main>
  );
}
