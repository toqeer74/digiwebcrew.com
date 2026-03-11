import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

const discussionPoints = [
  "what your business needs help with",
  "what is not working in the current setup",
  "whether the project is a good fit",
  "which service or service mix makes the most sense",
  "what the likely scope looks like",
  "timeline expectations",
  "budget range and investment level",
  "the best next step after the call",
];

const shouldBook = [
  "already know they want to discuss a project",
  "have a clear business need but want expert direction",
  "are comparing options and want a clearer view of fit",
  "want to talk through scope before making decisions",
  "may need more than one service working together",
  "are ready for a more serious conversation about the build",
];

const prepareItems = [
  "a short explanation of your business",
  "what you need help with",
  "your main goal",
  "your current website or system if you have one",
  "a rough timeline",
  "any examples or references you like",
  "a rough sense of budget if known",
];

const afterBooking = [
  "a recommended scope",
  "a service direction",
  "next-step advice",
  "a quote or proposal path where relevant",
  "a decision on whether the project is a strong fit",
];

const faqItems = [
  {
    value: "faq-1",
    title: "What should I book a consultation for?",
    content:
      "A consultation is best for discussing a website project, landing page system, SEO support, automation setup, or a broader digital build where you want direct guidance.",
  },
  {
    value: "faq-2",
    title: "Do I need everything figured out before booking?",
    content:
      "No. You only need enough clarity to explain the business need and what kind of help you are looking for.",
  },
  {
    value: "faq-3",
    title: "What if I am not sure which service I need?",
    content:
      "That can still be covered in the consultation. If you want a more structured first step, the custom project scope form is another good option.",
  },
  {
    value: "faq-4",
    title: "Will I get pricing during the consultation?",
    content:
      "You can discuss budget range and likely investment direction. Exact pricing depends on the final project scope.",
  },
  {
    value: "faq-5",
    title: "Is the consultation only for large projects?",
    content:
      "No. It can work for focused projects as well, as long as there is a real business need and a serious interest in moving forward.",
  },
];

export default async function BookConsultationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const sectionCardClass = "site-card overflow-hidden relative p-8 lg:p-10";
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
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Expert Advisor</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-slate-950 dark:text-[#F8F8FF] leading-[1.1] text-balance">
              Book a Consultation to Discuss <br className="hidden md:block" /> the Right <span className="text-[var(--site-primary)]">Next Step.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-12 max-w-3xl leading-relaxed mx-auto">
              If you already have a project in mind and want to talk through goals, scope, timeline, and fit, book a consultation and let&apos;s discuss what your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://calendly.com/digiweb/consultation"
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group"
              >
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
              <Link
                href={localePath(locale, "/quote")}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] font-bold px-10 py-5 transition-all hover:bg-white dark:hover:bg-white/10 group"
              >
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>


          <AnimatedSection className={cn(sectionCardClass, "max-w-4xl mx-auto p-4 md:p-6")}>
            {gradientTop}
            <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-4">Select Your Time</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-6">
              Select a time directly in the scheduler below. If it does not load, use the direct booking link above.
            </p>
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0A0A0F]">
              <iframe
                title="Calendly Booking"
                src="https://calendly.com/digiweb/consultation"
                className="w-full min-h-[760px] dark:invert dark:hue-rotate-180 dark:contrast-125"
              />
            </div>
          </AnimatedSection>


          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <AnimatedSection className={cn(sectionCardClass, "md:col-span-12 lg:col-span-8")}>
              {gradientTop}
              <span className="mb-4 inline-block rounded-full bg-[var(--site-primary)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--site-primary)]">Purpose</span>
              <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">A Direct Way to Start the Conversation</h2>
              <div className="space-y-4 text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                <p>Some businesses already know they are ready to move forward. They may not have every detail finalized, but they know they need the right conversation to shape the next step.</p>
                <p>This consultation page is for that stage.</p>
                <p>If you want to discuss a custom website, landing page system, SEO support, automation setup, or a broader digital build, a consultation helps bring the project into clearer focus. It gives space to review the business need, talk through goals, identify the right service direction, and decide what makes sense next.</p>
              </div>
            </AnimatedSection>

            <div className="md:col-span-12 lg:col-span-4 h-full">
              <AnimatedSection className={cn(sectionCardClass, "h-full")}>
                {gradientTop}
                <span className="mb-4 inline-block rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Discussion</span>
                <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6">What We Cover</h2>
                <ul className="space-y-4">
                  {discussionPoints.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate-600 dark:text-[#94A3B8]">
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
              <span className="mb-4 inline-block rounded-full bg-violet-50 dark:bg-violet-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">Best Fit</span>
              <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6">Who Should Book</h2>
              <ul className="space-y-3">
                {shouldBook.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-600 dark:text-[#94A3B8]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className={sectionCardClass}>
              {gradientTop}
              <span className="mb-4 inline-block rounded-full bg-amber-50 dark:bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Preparation</span>
              <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6">What Helps Before</h2>
              <ul className="space-y-3">
                {prepareItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-600 dark:text-[#94A3B8]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>


          <AnimatedSection className={sectionCardClass}>
            {gradientTop}
            <span className="mb-4 inline-block rounded-full bg-[var(--site-primary)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--site-primary)]">Outcome</span>
            <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">What Happens Next</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p className="text-slate-600 dark:text-[#94A3B8] leading-relaxed">Once the consultation is booked, the next step is simple. You select a time, share the relevant details, and we review the information before the conversation.</p>
                <ul className="space-y-4">
                  {afterBooking.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-slate-600 dark:text-[#94A3B8] font-bold">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4 text-slate-600 dark:text-[#94A3B8] leading-relaxed border-l border-slate-200 dark:border-white/10 pl-8 italic">
                <p>Digital projects often go wrong when people skip the thinking stage and rush straight into execution.</p>
                <p>A consultation helps avoid that. It creates a chance to look at the business need properly, discuss the options, and shape the right approach before time and money go into the wrong direction.</p>
              </div>
            </div>
          </AnimatedSection>


          <AnimatedSection className={cn(sectionCardClass, "bg-slate-950 text-white")}>
            {gradientTop}
            <h2 className="text-2xl font-display font-black mb-4 tracking-tight">Need Help Defining the Project First?</h2>
            <p className="opacity-70 mb-8 max-w-2xl">
              If you are not ready to talk live yet and would rather explain your needs in a more structured way, the custom project scope path is a better fit.
            </p>
            <Link
              href={localePath(locale, "/quote")}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[var(--site-primary)] text-white font-bold rounded-full hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] transition-all"
            >
              <span>Get Quote</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </AnimatedSection>


          <AnimatedSection className={cn(sectionCardClass, "text-center bg-slate-50 dark:bg-[#0A0A0F] border-2 border-[var(--site-primary)]/10")}>
            {gradientTop}
            <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Questions About Booking</h2>
            <div className="max-w-3xl mx-auto text-left">
              <Accordion items={faqItems} />
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card overflow-hidden relative text-center p-12 lg:p-16 border-2 border-[var(--site-primary)]/20 shadow-[0_40px_80px_-40px_rgba(var(--site-primary-rgb),0.3)]">
            {gradientTop}
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Ready to Talk Through the Project?</h2>
            <p className="text-xl text-slate-600 dark:text-[#94A3B8] mb-10 max-w-2xl mx-auto">
              If you have a clear need and want to discuss the right direction, book a consultation and take the next step with more confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://calendly.com/digiweb/consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group"
              >
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
              <Link
                href={localePath(locale, "/quote")}
                className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] font-bold px-10 py-5 transition-all hover:bg-white dark:hover:bg-white/10 group"
              >
                <span>Get Quote</span>
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
