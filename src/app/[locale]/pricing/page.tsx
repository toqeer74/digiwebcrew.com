import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";

const supportPoints = [
  "Clear starting prices",
  "Custom scope for larger builds",
  "Built for serious business projects",
  "Flexible across single and multi-service work",
];

const tiers = [
  {
    title: "Custom Website Development",
    price: "$3,500",
    desc: "Best for businesses that need a stronger website foundation, better presentation, clearer structure, and a more professional digital presence.",
    factors: ["Number of pages", "Content complexity", "Custom design depth", "CMS needs", "Integrations", "Technical requirements"],
    cta: "Explore Website Development",
    href: "/services/custom-software",
    badge: "Most Popular",
  },
  {
    title: "Conversion Funnels and Landing Pages",
    price: "$2,000",
    desc: "Best for businesses that need a focused page system for lead generation, service promotion, campaign traffic, bookings, or consultations.",
    factors: ["Single page or multi-step funnel", "Offer complexity", "Copy and messaging needs", "Form or booking integration", "Tracking setup", "Follow-up flow requirements"],
    cta: "Explore Funnels and Landing Pages",
    href: "/services/conversion-funnels",
    badge: "Lead Focused",
  },
  {
    title: "AI Chatbots and Automation",
    price: "$2,500",
    desc: "Best for businesses that want faster lead handling, better inquiry routing, reduced manual follow-up, and smarter connected workflows.",
    factors: ["Number of workflows", "Tool integrations", "CRM requirements", "Channel setup", "Qualification logic", "Follow-up complexity"],
    cta: "Explore AI Chatbots and Automation",
    href: "/services/ai-chatbots-automation",
    badge: "Automation Ready",
  },
  {
    title: "SEO and Growth Retainers",
    price: "$1,000 per month",
    desc: "Best for businesses that need ongoing search visibility improvements, content refinement, website updates, and continued performance support after launch.",
    factors: ["Website size", "Current SEO condition", "Content needs", "Local competition", "Update frequency", "Level of monthly support"],
    cta: "Explore SEO and Growth Retainers",
    href: "/services/seo-growth-retainers",
    badge: "Ongoing Growth",
  },
];

const customExamples = [
  "Large multi-page websites",
  "Multi-service systems",
  "Advanced automation setups",
  "Full funnel ecosystems",
  "Web applications",
  "Mobile application projects",
  "DevOps-heavy builds",
  "Complex integrations",
  "Broader growth infrastructure projects",
];

const priceFactors = [
  "number of pages",
  "design depth",
  "content structure",
  "custom functionality",
  "CMS requirements",
  "integrations with forms, CRM, booking, or other tools",
  "automation logic",
  "technical setup",
  "timeline and urgency",
  "level of ongoing support needed",
];

const bestFit = [
  "rely on qualified leads, calls, bookings, or consultations",
  "need stronger trust and presentation online",
  "want custom work instead of a generic template setup",
  "value clear process and professional implementation",
  "are investing in growth, not just a basic online presence",
  "may need support beyond just one website page",
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

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const sectionCardClass = "site-card overflow-hidden relative p-8 lg:p-10";
  const gradientTop = <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />;

  return (
    <main className="flex-1 pt-32 pb-24">
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
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Pricing & Investment</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-slate-950 dark:text-[#F8F8FF] leading-[1.1] text-balance">
              Clear Starting <span className="text-[var(--site-primary)]">Pricing</span> for <br className="hidden md:block" /> <span className="text-slate-950 dark:text-[#F8F8FF]">Custom Digital Work.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-12 max-w-3xl leading-relaxed mx-auto">
              Every project is shaped around your goals, scope, and technical requirements. We provide starting prices for our core services while keeping room for the right level of customization.
            </p>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 w-full">
              {supportPoints.map((point) => (
                <div key={point} className="site-card p-4 flex items-center justify-center text-center text-sm font-bold text-slate-700 dark:text-[#94A3B8] relative overflow-hidden group">
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
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>

          {/* Pricing Factors - Alternating Bento */}
          <div className="space-y-24">
            <AnimatedSection className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-6 space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-[#94A3B8]">
                  Structure & Scope
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-slate-950 dark:text-[#F8F8FF] leading-tight">
                  Pricing That Filters for Fit and Leaves Room for Scope
                </h2>
                <div className="space-y-4">
                  <p className="text-slate-600 dark:text-[#94A3B8] text-lg leading-relaxed">
                    Not every project needs the same level of work. A focused landing page is not priced like a custom multi-page website.
                  </p>
                  <p className="text-slate-600 dark:text-[#94A3B8] text-lg leading-relaxed">
                    We use starting prices to make the investment level more transparent while keeping each project tailored to the real business need.
                  </p>
                </div>
              </div>
              <div className="md:col-span-6">
                <div className={cn(sectionCardClass, "border-2 border-[var(--site-primary)]/10")}>
                  {gradientTop}
                  <h3 className="text-xl font-bold mb-6 text-slate-950 dark:text-[#F8F8FF]">Custom Quote Factors</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {priceFactors.map((factor) => (
                      <div key={factor} className="flex items-start gap-3">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--site-primary)] shrink-0" />
                        <span className="text-sm text-slate-600 dark:text-[#94A3B8] capitalize">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Investment Levels */}
            <AnimatedSection className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-3xl md:text-6xl font-display font-black text-slate-950 dark:text-[#F8F8FF] tracking-tight">Starting Investment Levels</h2>
                <p className="text-slate-600 dark:text-[#94A3B8] text-lg leading-relaxed">
                  These starting prices reflect the base level for our core services, built on premium engineering foundations.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tiers.map((tier) => (
                  <div key={tier.title} className="site-card site-card-interactive p-8 lg:p-10 flex flex-col relative overflow-hidden group border-2 border-transparent">
                    {gradientTop}
                    <div className="flex justify-between items-start mb-8">
                      <div className="inline-block px-3 py-1 rounded-full bg-[var(--site-primary)]/10 text-[10px] font-bold uppercase tracking-wider text-[var(--site-primary)]">
                        {tier.badge}
                      </div>
                      <div className="text-right">
                        <p className="text-[2.5rem] md:text-[3.5rem] font-display font-black leading-none text-slate-950 dark:text-[#F8F8FF] tracking-tighter">{tier.price}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] mt-1">Starting from</p>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-display font-black mb-4 text-slate-950 dark:text-[#F8F8FF] tracking-tight leading-tight">{tier.title}</h3>
                    <p className="text-slate-600 dark:text-[#94A3B8] mb-10 leading-relaxed italic text-[16px]">
                      {tier.desc}
                    </p>

                    <div className="space-y-6 mb-12">
                      <div className="flex items-center gap-2">
                        <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/20 whitespace-nowrap">Key Factors</p>
                        <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                        {tier.factors.map((factor) => (
                          <div key={factor} className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-[var(--site-primary)] shrink-0" />
                            <span className="text-sm font-bold text-slate-700 dark:text-[#94A3B8]">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link href={localePath(locale, tier.href)} className="flex items-center justify-between w-full group/btn relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-white/5 p-5 transition-all border-2 border-transparent hover:border-[var(--site-primary)]/20 group">
                        <span className="font-bold relative z-10 transition-colors group-hover/btn:text-white">{tier.cta}</span>
                        <ArrowRight size={22} className="relative z-10 transition-all group-hover/btn:translate-x-1 group-hover/btn:text-white" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--site-primary)] to-[var(--site-primary-soft)] opacity-0 group-hover/btn:opacity-100 transition-all duration-300" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>


            {/* Who This Pricing Is For - Alternating Bento */}
            <AnimatedSection className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-6 md:order-2 space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-[#94A3B8]">
                  Ideal Partner Fit
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-slate-950 dark:text-[#F8F8FF] leading-tight">
                  Built for Businesses Investing in Growth
                </h2>
                <div className="space-y-4">
                  <p className="text-slate-600 dark:text-[#94A3B8] text-lg leading-relaxed">
                    Digital Web Crew is designed for businesses that understand the value of stronger digital presentation, better lead flow, and cleaner systems.
                  </p>
                  <p className="text-slate-600 dark:text-[#94A3B8] text-lg leading-relaxed italic">
                    If your priority is business value, clarity, and a stronger long-term system, this pricing model is built for you.
                  </p>
                </div>
              </div>
              <div className="md:col-span-6 md:order-1">
                <div className={cn(sectionCardClass, "border-2 border-emerald-500/10")}>
                  {gradientTop}
                  <h3 className="text-xl font-bold mb-6 text-slate-950 dark:text-[#F8F8FF]">Who This Fits Best</h3>
                  <div className="space-y-4">
                    {bestFit.map((item) => (
                      <div key={item} className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 group-hover:border-[var(--site-primary)]/20 transition-colors">
                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600 dark:text-[#94A3B8] leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className={cn(sectionCardClass, "text-center bg-slate-50 dark:bg-[#0A0A0F] border-2 border-[var(--site-primary)]/10")}>
            {gradientTop}
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-8 tracking-tight text-center">Questions About Pricing</h2>
            <div className="max-w-4xl mx-auto text-left">
              <Accordion items={faqItems} />
            </div>
          </AnimatedSection>


          <AnimatedSection className="site-card p-12 lg:p-16 text-center space-y-8 relative overflow-hidden border-2 border-[var(--site-primary)]/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--site-primary)] to-transparent" />
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-6xl font-display font-black text-slate-950 dark:text-[#F8F8FF] leading-tight">
                Ready to Scope the Right Project?
              </h2>
              <p className="text-xl text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                Whether you need a website, automation support, or ongoing SEO work, the next step is to define the right scope.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-12 py-6 text-lg text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.6)] group">
                <span>Book Consultation</span>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] font-bold px-12 py-6 text-lg transition-all hover:bg-white dark:hover:bg-white/10 group">
                <span>Get Quote</span>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </main>

  );
}
