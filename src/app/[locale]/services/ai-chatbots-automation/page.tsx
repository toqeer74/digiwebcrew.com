import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { ServiceProcessSteps } from "@/components/sections/service-process-steps";
import { localePath } from "@/lib/locale-path";

const supportingPoints = [
  "Built for faster response and better lead flow",
  "Designed around real business tasks",
  "Connected to forms, CRM, and follow-up systems",
  "Structured to support growth without adding chaos",
];

const whoFor = [
  "law firms handling consultation inquiries",
  "clinics, dental practices, and med spas managing booking and lead questions",
  "home service businesses dealing with calls, form submissions, and service requests",
  "consultants and agencies handling inbound leads and discovery call requests",
  "businesses that lose leads because response is too slow",
  "teams that want clearer lead routing and better follow-up",
  "businesses that need support systems without hiring more people right away",
];

const buildTypes = [
  "Website chatbots",
  "Lead qualification flows",
  "CRM automation",
  "Email follow-up systems",
  "SMS and WhatsApp workflows",
  "Inquiry routing systems",
  "Appointment and booking support flows",
  "Support response systems",
  "Internal workflow automation",
  "AI-assisted lead handling systems",
];

const included = [
  ["Chatbot setup", "A website chat experience built to answer common questions, guide visitors, and support lead capture."],
  ["Lead qualification logic", "Question flows that help sort leads based on service type, urgency, fit, or next-step intent."],
  ["Workflow automation", "Automated actions that reduce manual tasks and move leads or requests through the right process."],
  ["CRM integration", "Connection with CRM tools so lead details, notes, and status updates are handled more cleanly."],
  ["Follow-up support", "Automated email, SMS, or WhatsApp steps where they make sense for the business."],
  ["Routing and escalation", "Logic that sends inquiries to the right person, team, or next action based on need."],
  ["Support flow design", "A clearer structure for handling repeated customer questions or early-stage inquiries."],
  ["System planning", "A setup built around how the business actually works instead of adding random automation on top."],
];

const problems = [
  "slow response to new inquiries",
  "missed leads after hours",
  "repeated questions taking too much team time",
  "poor follow-up after form submission",
  "no clear lead qualification process",
  "too much manual admin work",
  "disconnected communication tools",
  "confusion about who should respond next",
  "leads getting lost between systems",
  "inconsistent handling of inbound requests",
];

const bestUseCases = [
  "handling website inquiries outside business hours",
  "qualifying leads before a sales call or consultation",
  "routing form submissions to the right person",
  "sending faster follow-up after contact",
  "reducing repetitive support questions",
  "supporting booking or appointment requests",
  "organizing lead communication across channels",
  "improving first-response experience without extra staff pressure",
];

const futureExpansion = [
  "voice-based lead intake",
  "more advanced qualification logic",
  "deeper CRM process automation",
  "support escalation flows",
  "connected website, funnel, and automation systems",
];

const relatedServices = [
  "Conversion Funnels and Landing Pages",
  "Custom Website Development",
  "SEO and Growth Retainers",
  "CRM Integration",
  "Website Maintenance and Support",
  "DevOps and Cloud",
];

const faqItems = [
  {
    value: "faq-1",
    title: "Do I need a chatbot to use automation?",
    content:
      "No. Some projects involve a chatbot, while others focus more on follow-up, routing, CRM updates, or internal workflow improvements.",
  },
  {
    value: "faq-2",
    title: "Can you connect automation to my CRM or booking tools?",
    content:
      "Yes. We can support integrations with CRM, booking, forms, and communication tools depending on the project.",
  },
  {
    value: "faq-3",
    title: "Will this replace human support?",
    content:
      "Not fully. The goal is usually to improve speed, reduce repetitive work, and make handoff easier. Human support still matters in many cases.",
  },
  {
    value: "faq-4",
    title: "Can automation help after someone fills out a form?",
    content:
      "Yes. Follow-up, routing, confirmation, tagging, and next-step actions are common parts of this kind of setup.",
  },
  {
    value: "faq-5",
    title: "Can I start small and expand later?",
    content:
      "Yes. Many businesses begin with one focused system and add more workflow layers as the need grows.",
  },
];

export default async function AIChatbotsAutomationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar" || locale === "ur";

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Hero Section */}
          <AnimatedSection className="text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--site-primary)]/10 border border-[var(--site-primary)]/20 text-[var(--site-primary)] mb-8 animate-in fade-in zoom-in duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--site-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--site-primary)]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Engineering Lab</span>
              <span className="w-px h-3 bg-[var(--site-primary)]/30 mx-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Automation Lab</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-slate-950 dark:text-[#F8F8FF] leading-[1.1] text-balance">
              AI Chatbots & <span className="text-[var(--site-primary)]">Workflow</span> Automation.
            </h1>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-12 max-w-3xl leading-relaxed mx-auto">
              We build practical chatbot and automation systems that help businesses capture leads, qualify inquiries, and improve customer communication speed.
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
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Automation Should Make the Business Run Better</h2>
            <div className="space-y-6 text-slate-600 dark:text-[#94A3B8] text-lg leading-relaxed max-w-4xl">
               <p>Most businesses do not need more tools. They need better systems.</p>
               <p>
                Digital Web Crew builds chatbot and automation setups that help businesses respond faster, route inquiries more clearly, reduce repetitive work, and create a smoother path from first contact to next step.
              </p>
            </div>
          </AnimatedSection>


          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Who This Service Is Built For</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-10 max-w-3xl leading-relaxed">
              This service is a strong fit for businesses that deal with incoming leads, repeated questions, manual follow-up, or slow response times.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {whoFor.map((item) => (
                <div key={item} className="flex items-center gap-3 text-left p-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)]" />
                  <span className="text-slate-700 dark:text-[#94A3B8] text-[15px] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-[#F8F8FF] mb-6">What We Can Build</h2>
            <p className="text-[#94A3B8] mb-8 max-w-3xl leading-relaxed">
              The right automation setup depends on your lead flow, current tools, and what parts of the process take too much manual work today.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {buildTypes.map((item) => (
                <div key={item} className="site-card flex items-center justify-center p-4 text-center text-sm font-semibold text-[#94A3B8]">
                  {item}
                </div>
              ))}
            </div>
            <p className="text-[#94A3B8] mt-8 max-w-3xl">
              Some businesses need a focused chatbot setup. Others need a wider automation layer connected to lead handling, communication, and internal workflows.
            </p>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-8 tracking-tight">What&apos;s Included in This Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {included.map(([title, desc]) => (
                <div key={title} className="site-card p-8 flex flex-col items-center text-center bg-slate-50/50 dark:bg-white/5 border-2 border-transparent hover:border-[var(--site-primary)]/10 transition-all">
                  <h3 className="font-display font-black text-xl text-slate-950 dark:text-[#F8F8FF] mb-4">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-[#F8F8FF] mb-6">What Better Automation Can Fix</h2>
            <p className="text-[#94A3B8] mb-8 max-w-3xl leading-relaxed">
              Many businesses lose time and leads because too much depends on manual response, slow follow-up, or disconnected tools. This service can help solve problems like:
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
              The goal is not to automate everything. It is to improve the parts of the process that are slowing the business down.
            </p>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-6">How We Approach Automation Projects</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-4 max-w-3xl leading-relaxed">We start by looking at what happens now.</p>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-4 max-w-3xl leading-relaxed">
              That means understanding how leads come in, what information matters, where the delays are, and which tasks are repeated too often. From there, we define a setup that fits the business instead of forcing the business to fit the tool.
            </p>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-4 max-w-3xl leading-relaxed">
              Some projects need only a chatbot and a simple follow-up flow. Others need multiple connected actions across forms, CRM, messaging, and internal systems.
            </p>
            <p className="text-[#F8F8FF] font-semibold mt-4">We keep the focus on practical use. Clear entry points, better handoff, faster response, and less manual work.</p>
          </AnimatedSection>

          <AnimatedSection>
            <ServiceProcessSteps
              title="What the Process Looks Like"
              steps={[
                { title: "Discover", description: "We review your lead flow, communication gaps, current tools, and the manual tasks creating friction." },
                { title: "Scope", description: "We define the right automation structure, chatbot behavior, integrations, and next-step logic." },
                { title: "Build and Connect", description: "We set up the system, connect the tools, and shape the flow around your business process." },
                { title: "Test and Improve", description: "We review how it performs, adjust weak points, and support the next phase as needed." },
              ]}
              ctaHref={localePath(locale, "/process")}
              ctaLabel="View Full Process"
            />
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-6">Best Use Cases for This Service</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-8 max-w-3xl leading-relaxed">
              This service works especially well for businesses that need faster and more consistent lead handling. The setup is designed to be useful now and flexible enough to grow later.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
              {bestUseCases.map((item) => (
                <div key={item} className="flex items-center gap-3 text-left">
                  <div className="h-2 w-2 rounded-full bg-emerald-500/50 shrink-0" />
                  <span className="text-slate-600 dark:text-[#94A3B8] text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
              {futureExpansion.map((item) => (
                <div key={item} className="site-card px-6 py-3 text-sm font-semibold text-slate-600 dark:text-[#94A3B8]">
                  {item}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--site-primary)] to-transparent" />
            <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6">Related Protocol Support</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-10 max-w-2xl leading-relaxed">Automation works best when it is connected to the rest of your engineering ecosystem.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {relatedServices.map((item) => (
                <div key={item} className="site-card p-4 rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-700 dark:text-[#94A3B8] text-center">
                  {item}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Starting Investment</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-8 max-w-3xl leading-relaxed">
              Automation projects vary based on the number of workflows, platform integrations, communication channels, and logic complexity.
            </p>
            <div className="site-card p-8 mb-10 bg-slate-50/50 dark:bg-[#1A1A2E]/50 border-[var(--site-primary)]/20 border-2 w-full max-w-xl">
              <p className="text-2xl md:text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] tracking-tight">AI Automation Solutions starting at $3,500</p>
            </div>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-10 max-w-3xl">
              Larger workflow systems, multi-channel follow-up, and more advanced automation setups are scoped separately based on requirements.
            </p>
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
            <h2 className="text-2xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-4">Questions About Chatbots and Automation</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>

          <AnimatedSection className="site-card p-12 text-center flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
            <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 leading-tight tracking-tight">Need Better Lead Handling Without More Manual Work?</h2>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-10 max-w-3xl leading-relaxed">
              If your team is losing time to slow response, repeated questions, or disconnected follow-up, the right chatbot or automation setup can help. Book a consultation or get a custom project scope to move forward.
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
