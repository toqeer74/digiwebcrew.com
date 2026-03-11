import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { ServiceProcessSteps } from "@/components/sections/service-process-steps";
import { localePath } from "@/lib/locale-path";

const supportingPoints = [
  "Built for lead generation and action",
  "Designed around the offer and user journey",
  "Structured for clarity, speed, and response",
  "Connected to forms, booking, and follow-up systems",
];

const whoFor = [
  "law firms promoting a specific service or consultation offer",
  "clinics and med spas driving bookings for treatments or offers",
  "home service businesses running local campaigns",
  "consultants and agencies selling strategy calls or service packages",
  "businesses launching a new offer or promotion",
  "companies sending paid traffic to a single targeted page",
  "businesses that need better conversion without rebuilding the entire site",
];

const buildTypes = [
  "Lead generation landing pages",
  "Service offer pages",
  "Consultation booking pages",
  "Campaign landing pages",
  "Local service pages",
  "Sales pages",
  "Multi-step funnel pages",
  "Thank you pages",
  "Form-first conversion pages",
  "Call-first conversion pages",
];

const included = [
  ["Offer-focused page structure", "A page layout built around one clear objective and one strong next step."],
  ["Messaging alignment", "Clearer section flow and copy structure that helps visitors understand the offer faster."],
  ["Conversion-focused design", "Page design that reduces friction and keeps attention on the action that matters."],
  ["Form and booking integration", "Connection with forms, calendars, CRM tools, and lead capture systems where needed."],
  ["Thank you flow planning", "A better post-submit path that supports follow-up, confirmation, and next actions."],
  ["Mobile-friendly layout", "A page experience that works properly across desktop, tablet, and mobile."],
  ["Tracking readiness", "A structure that supports event tracking, campaign analysis, and better performance review."],
  ["Funnel expansion options", "Support for multi-step flows where a single page is not enough."],
];

const problems = [
  "too many distractions on the page",
  "weak or unclear service offer",
  "low form submissions",
  "poor booking rates",
  "confusing section flow",
  "generic design that does not support the offer",
  "no clear path from ad click to action",
  "weak mobile performance",
  "poor follow-up after submission",
  "campaign traffic going to the wrong destination",
];

const bestUseCases = [
  "paid ad campaigns",
  "service-specific lead generation",
  "booking consultations or appointments",
  "local service promotion",
  "offer launches",
  "lead magnets or downloadable resources",
  "webinar or event registration",
  "replacing weak service pages with stronger conversion pages",
];

const integrations = [
  "CRM systems",
  "booking tools",
  "contact forms",
  "email follow-up",
  "SMS or WhatsApp workflows",
  "analytics and conversion tracking",
  "chatbot or qualification systems",
];

const relatedServices = [
  "Custom Website Development",
  "SEO and Growth Retainers",
  "AI Chatbots and Automation",
  "Technical SEO",
  "CRM Integration",
  "Website Maintenance and Support",
];

const faqItems = [
  {
    value: "faq-1",
    title: "What is the difference between a landing page and a funnel?",
    content:
      "A landing page is usually a single focused page built around one goal. A funnel can include multiple connected pages and steps designed to move someone from interest to action more intentionally.",
  },
  {
    value: "faq-2",
    title: "Can you build pages for paid advertising campaigns?",
    content:
      "Yes. This service is a strong fit for ad campaigns where traffic needs to go to a focused page built for conversion.",
  },
  {
    value: "faq-3",
    title: "Can you connect forms and booking tools?",
    content:
      "Yes. We can connect landing pages and funnels with forms, CRM tools, calendars, and follow-up systems depending on the project.",
  },
  {
    value: "faq-4",
    title: "Do I need a full website before getting a landing page?",
    content:
      "No. Some businesses start with a landing page or funnel first, especially when they want to promote a specific offer or service quickly.",
  },
  {
    value: "faq-5",
    title: "Can you improve an existing landing page instead of building a new one?",
    content:
      "Yes. In some cases, improving the current page is the right move. In others, rebuilding it gives a better result.",
  },
];

export default async function ConversionFunnelsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar" || locale === "ur";

  return (
    <main className="flex-1 pt-32 pb-24 text-slate-950 dark:text-[#F8F8FF]">
      <Container>
        <div className="max-w-6xl mx-auto space-y-24">
          {/* Hero Section */}
          <AnimatedSection className="text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--site-primary)]/10 border border-[var(--site-primary)]/20 text-[var(--site-primary)] mb-8 animate-in fade-in zoom-in duration-700">

              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--site-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--site-primary)]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Engineering Lab</span>
              <span className="w-px h-3 bg-[var(--site-primary)]/30 mx-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Funnel Lab</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-slate-950 dark:text-[#F8F8FF] leading-[1.1] text-balance">
              Conversion <span className="text-[var(--site-primary)]">Funnels</span> and <br className="hidden md:block" /> Landing Pages.
            </h1>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-12 max-w-3xl leading-relaxed mx-auto">
              We build focused page systems that help businesses generate more inquiries, bookings, consultations, and qualified leads through clearer offers and stronger conversion flow.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 w-full">
              {supportingPoints.map((point) => (
                <div key={point} className="site-card p-4 flex items-center justify-center text-center text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-[#94A3B8] relative overflow-hidden group">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
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
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] font-bold px-10 py-5 transition-all hover:bg-white dark:hover:bg-white/10 group">
                <span>Get Quote</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>


          <AnimatedSection className="site-card p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">A Better Page Can Change the Result</h2>
            <div className="space-y-6 text-slate-600 dark:text-[#94A3B8] text-lg leading-relaxed max-w-4xl">
              <p>
                Not every visitor needs a full website experience. In many cases, what works better is a focused page built around one goal, one offer, and one next step.
              </p>
              <p>
                Digital Web Crew builds conversion funnels and landing pages for businesses that want stronger campaign performance, cleaner service promotion, and less friction between interest and action.
              </p>
            </div>
          </AnimatedSection>


          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-[#F8F8FF] mb-6">Who This Service Is Built For</h2>
            <p className="text-[#94A3B8] mb-8 max-w-3xl leading-relaxed">
              Conversion funnels and landing pages are a strong fit for businesses that want a more focused path to action than a standard website page usually provides.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {whoFor.map((item) => (
                <div key={item} className="flex items-center gap-3 text-left p-2 text-[#94A3B8]">
                  <div className="h-2 w-2 rounded-full bg-[#6366F1] shrink-0" />
                  <span className="text-[15px]">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-[#F8F8FF] mb-6">What We Can Build</h2>
            <p className="text-[#94A3B8] mb-8 max-w-3xl leading-relaxed">
              Different businesses need different conversion paths. Some need a single landing page. Others need a small funnel with multiple pages and a stronger post-submit flow.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full text-[#94A3B8]">
              {buildTypes.map((item) => (
                <div key={item} className="site-card flex items-center justify-center p-4 text-center text-sm font-semibold">
                  {item}
                </div>
              ))}
            </div>
            <p className="text-[#94A3B8] mt-8 max-w-3xl">
              The right structure depends on the traffic source, the offer, the audience, and the action you want the visitor to take.
            </p>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-[#F8F8FF] mb-8">What&apos;s Included in This Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
              {included.map(([title, desc]) => (
                <div key={title} className="site-card p-6 flex flex-col items-center text-center">
                  <h3 className="font-bold text-xl text-[#F8F8FF] mb-3">{title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-[#F8F8FF] mb-6">What a Better Funnel or Landing Page Can Fix</h2>
            <p className="text-[#94A3B8] mb-8 max-w-3xl leading-relaxed">
              Many businesses send traffic to pages that are too broad, too cluttered, or too weak in structure to convert well. A better conversion page can help solve problems like:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full mb-8">
              {problems.map((item) => (
                <div key={item} className="flex items-center gap-3 text-left">
                  <div className="h-2 w-2 rounded-full bg-red-500/50 shrink-0" />
                  <span className="text-[#94A3B8] text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[#94A3B8] max-w-3xl italic">
              The goal is not just to make the page look better. It is to help more of the right visitors take the next step.
            </p>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-[#F8F8FF] mb-6">How We Approach Funnel and Landing Page Projects</h2>
            <p className="text-[#94A3B8] mb-4 max-w-3xl leading-relaxed">
              We start by understanding the offer, the traffic source, the audience, and the action you want the visitor to take.
            </p>
            <p className="text-[#94A3B8] mb-4 max-w-3xl leading-relaxed">
              From there, we shape the page around conversion. That means simplifying the message, organizing sections more intentionally, improving the user path, and reducing anything that distracts from the main goal.
            </p>
            <p className="text-[#F8F8FF] font-semibold mt-4">
              Some projects need one strong landing page. Others need a full funnel with multiple stages, follow-up logic, and connected systems. The structure depends on what will give the business the best result.
            </p>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-[#F8F8FF] mb-6">Best Use Cases for This Service</h2>
            <p className="text-[#94A3B8] mb-8 max-w-3xl leading-relaxed">
              This service works especially well for businesses that need a focused page system tied to a specific goal.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {bestUseCases.map((item) => (
                <div key={item} className="flex items-center gap-3 text-left">
                  <div className="h-2 w-2 rounded-full bg-emerald-500/50 shrink-0" />
                  <span className="text-[#94A3B8] text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--site-primary)] to-transparent" />
            <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6">Built to Connect With the Tools You Use</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-10 max-w-2xl leading-relaxed">
              Landing pages and funnels perform best when connected to the systems that handle leads after the click.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {integrations.map((item) => (
                <div key={item} className="site-card flex items-center justify-center p-4 text-center text-sm font-semibold text-slate-700 dark:text-[#94A3B8] bg-slate-50/50 dark:bg-white/5">
                  {item}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--site-primary)] to-transparent" />
            <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6">Related Protocol Support</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-10 max-w-2xl leading-relaxed">Landing pages work best when supported by the right traffic, follow-up, and website structure.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {relatedServices.map((item) => (
                <div key={item} className="site-card p-4 rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-700 dark:text-[#94A3B8] text-center">
                  {item}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <ServiceProcessSteps
              title="What the Process Looks Like"
              steps={[
                { title: "Discover", description: "We learn about the offer, the audience, the traffic source, and the action you want visitors to take." },
                { title: "Scope", description: "We define the right page or funnel structure, required integrations, and conversion priorities." },
                { title: "Design and Build", description: "We create the page system, connect the needed tools, and shape the flow around the target action." },
                { title: "Launch and Improve", description: "We publish the page, review the experience, and support updates or next-step improvements where needed." },
              ]}
              ctaHref={localePath(locale, "/process")}
              ctaLabel="View Full Process"
            />
          </AnimatedSection>

          <AnimatedSection className="site-card p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Starting Investment</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-8 max-w-3xl leading-relaxed">
              Landing page and funnel projects vary based on scope, integrations, number of pages, and the level of conversion optimization required.
            </p>
            <div className="site-card p-8 mb-10 bg-slate-50/50 dark:bg-[#1A1A2E]/50 border-[var(--site-primary)]/20 border-2 w-full max-w-xl">
              <p className="text-2xl md:text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] tracking-tight">Conversion Funnels & Landing Pages starting at $1,200</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] font-bold px-10 py-5 transition-all hover:bg-white dark:hover:bg-white/10 group">
                <span>Get Quote</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-4">Questions About Funnels and Landing Pages</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>

          <AnimatedSection className="site-card p-12 text-center flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
            <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Ready to Turn Clicks Into Clients?</h2>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-10 max-w-3xl leading-relaxed">
              If your traffic is not converting, a focused landing page or funnel built around your offer and audience can make a real difference. Book a consultation or get a custom scope to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] font-bold px-10 py-5 transition-all hover:bg-white dark:hover:bg-white/10 group">
                <span>Get Quote</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </main>
  );
}
