import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
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
  const isRtl = locale === "ar" || locale === "ur";
  const sectionCardClass =
    "rounded-xl border border-slate-200 bg-white/96 p-8 shadow-[0_18px_36px_-24px_rgba(15,23,42,0.12)] dark:border-[#1E1E2E] dark:bg-[#13131E]";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground" dir={isRtl ? "rtl" : "ltr"}>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1 pt-40 pb-24 md:pt-44">
        <Container>
          <div className="max-w-5xl mx-auto space-y-8">
            <AnimatedSection className="text-center">
              <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-950 dark:text-[#F8F8FF] md:text-6xl">
                Clear Starting Pricing for Custom Digital Work
              </h1>
              <p className="mb-6 text-lg text-slate-600 dark:text-[#94A3B8]">
                Every project is shaped around your goals, scope, and technical requirements. To help you plan with more confidence, we provide starting prices for our core services while keeping room for the right level of customization.
              </p>
              <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {supportPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3.5 text-sm text-slate-700 shadow-[0_14px_28px_-22px_rgba(15,23,42,0.12)] dark:border-[#1E1E2E] dark:bg-[linear-gradient(180deg,rgba(23,35,50,0.98),rgba(11,18,29,0.98))] dark:text-[#C2D2E1] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_36px_-26px_rgba(0,0,0,0.56)]"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--site-primary)] shadow-[0_0_0_5px_rgba(0,0,0,0.08)] dark:shadow-[0_0_0_5px_rgba(var(--site-primary-rgb),0.12)]" />
                    <span className="font-medium">{point}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={localePath(locale, "/book-consultation")} className="rounded-full bg-[var(--site-primary)] px-8 py-4 font-bold text-white transition-colors hover:bg-[var(--site-primary-hover)]">Book Consultation</Link>
                <Link href={localePath(locale, "/quote")} className="rounded-full border border-slate-300 bg-white/90 px-8 py-4 font-bold text-slate-950 transition-colors hover:bg-slate-50 dark:border-[#1E1E2E] dark:bg-[#13131E] dark:text-[#F8F8FF] dark:hover:bg-[#0F0F18]">Get Custom Project Scope</Link>
              </div>
            </AnimatedSection>

            <AnimatedSection className={sectionCardClass}>
              <h2 className="mb-4 text-2xl font-bold text-slate-950 dark:text-[#F8F8FF]">Pricing That Filters for Fit and Leaves Room for the Right Scope</h2>
              <p className="mb-3 text-slate-600 dark:text-[#94A3B8]">Not every project needs the same level of work. A focused landing page is not priced like a custom multi-page website.</p>
              <p className="mb-3 text-slate-600 dark:text-[#94A3B8]">Digital Web Crew uses starting prices to make the investment level more transparent while keeping each project tailored to the real business need.</p>
              <p className="text-slate-600 dark:text-[#94A3B8]">If you already know what you need, you can book a consultation. If you want help defining the right direction first, the custom project scope flow is the better place to start.</p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="mb-4 text-2xl font-bold text-slate-950 dark:text-[#F8F8FF]">Starting Investment Levels</h2>
              <p className="mb-5 max-w-3xl text-slate-600 dark:text-[#94A3B8]">These starting prices reflect the base level for our core services.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tiers.map((tier) => (
                  <div
                    key={tier.title}
                    className="group flex h-full flex-col rounded-[22px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(241,245,249,0.98)_100%)] p-4 shadow-[0_18px_36px_-24px_rgba(15,23,42,0.14)] transition-all duration-300 hover:border-[color:rgba(var(--site-primary-rgb),0.35)] dark:border-[#1E1E2E] dark:bg-[linear-gradient(180deg,rgba(26,39,56,0.995)_0%,rgba(12,20,32,0.995)_100%)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.11),inset_0_22px_46px_-30px_rgba(255,255,255,0.06),0_0_0_1px_rgba(255,255,255,0.68),0_34px_62px_-30px_rgba(0,0,0,0.84),0_24px_48px_-22px_rgba(var(--site-primary-rgb),0.3)] dark:hover:border-white/60"
                  >
                    <div className="mb-4">
                      <div className="mb-4 inline-flex rounded-full border border-[color:rgba(var(--site-primary-rgb),0.35)] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-[var(--site-primary)] dark:border-white/45 dark:text-white">
                        {tier.badge}
                      </div>
                      <h3 className="max-w-sm text-[1.26rem] font-semibold leading-[1.08] tracking-tight text-slate-950 dark:text-white">
                        {tier.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-[0.84rem] leading-5 text-slate-600 dark:text-[#B3C0CF]">
                        {tier.desc}
                      </p>
                    </div>

                    <div className="mb-4 border-t border-slate-200 pt-4 dark:border-white/12">
                      <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                        {tier.factors.map((factor) => (
                          <div key={factor} className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[var(--site-primary)] dark:text-white" />
                            <span className="text-[0.82rem] leading-5 text-slate-700 dark:text-[#E4ECF4]">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto flex flex-col gap-2.5 border-t border-slate-200 pt-4 sm:flex-row sm:items-end sm:justify-between dark:border-white/12">
                      <div>
                        <p className="text-[1.32rem] font-semibold tracking-tight text-slate-950 dark:text-white">{tier.price}</p>
                        <p className="text-[0.75rem] text-slate-500 dark:text-[#A7B4C3]">Starting investment for this service</p>
                      </div>
                      <Link
                        href={localePath(locale, tier.href)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--site-primary)] px-3.5 py-2 text-[0.82rem] font-semibold text-white transition-all duration-300 hover:bg-[var(--site-primary-hover)]"
                      >
                        Start
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className={sectionCardClass}>
              <h2 className="mb-4 text-2xl font-bold text-slate-950 dark:text-[#F8F8FF]">When a Custom Quote Makes More Sense</h2>
              <p className="mb-3 text-slate-600 dark:text-[#94A3B8]">Some projects are too broad or too specific for a simple starting-price model.</p>
              <ul className="mb-4 list-disc list-inside space-y-2 text-slate-600 dark:text-[#94A3B8]">
                {customExamples.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-slate-600 dark:text-[#94A3B8]">If your project includes multiple services or a higher level of technical depth, we will shape the quote around the actual requirements.</p>
            </AnimatedSection>

            <AnimatedSection className={sectionCardClass}>
              <h2 className="mb-4 text-2xl font-bold text-slate-950 dark:text-[#F8F8FF]">What Usually Changes the Price</h2>
              <p className="mb-3 text-slate-600 dark:text-[#94A3B8]">The final cost of a project depends on the amount of work involved and the complexity behind it.</p>
              <ul className="mb-4 list-disc list-inside space-y-2 text-slate-600 dark:text-[#94A3B8]">
                {priceFactors.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-slate-600 dark:text-[#94A3B8]">A clear scope helps us recommend the right build level without overcomplicating the project.</p>
            </AnimatedSection>

            <AnimatedSection className={sectionCardClass}>
              <h2 className="mb-4 text-2xl font-bold text-slate-950 dark:text-[#F8F8FF]">Built for Businesses Investing in Better Digital Infrastructure</h2>
              <p className="text-slate-600 dark:text-[#94A3B8]">Digital Web Crew is designed for businesses that understand the value of stronger digital presentation, better lead flow, cleaner systems, and long-term growth support.</p>
            </AnimatedSection>

            <AnimatedSection className={sectionCardClass}>
              <h2 className="mb-4 text-2xl font-bold text-slate-950 dark:text-[#F8F8FF]">Who This Pricing Is Best Suited For</h2>
              <ul className="mb-4 list-disc list-inside space-y-2 text-slate-600 dark:text-[#94A3B8]">
                {bestFit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-slate-600 dark:text-[#94A3B8]">If your priority is business value, clarity, and a stronger long-term system, this pricing model is built for that kind of project.</p>
            </AnimatedSection>

            <AnimatedSection className={sectionCardClass}>
              <h2 className="mb-4 text-2xl font-bold text-slate-950 dark:text-[#F8F8FF]">Two Ways to Move Forward</h2>
              <p className="mb-2 text-slate-600 dark:text-[#94A3B8]"><strong className="text-slate-950 dark:text-[#F8F8FF]">Option 1 Book Consultation:</strong> Best for businesses that already have a clear need and want to discuss the project directly.</p>
              <p className="mb-4 text-slate-600 dark:text-[#94A3B8]"><strong className="text-slate-950 dark:text-[#F8F8FF]">Option 2 Get Custom Project Scope:</strong> Best for businesses that want help defining the right service mix, priorities, timeline, and budget before booking a call.</p>
              <p className="text-slate-600 dark:text-[#94A3B8]">Both paths are designed to make the next step easier and more aligned with where you are in the decision process.</p>
            </AnimatedSection>

            <AnimatedSection>
              <h2 className="mb-4 text-2xl font-bold text-slate-950 dark:text-[#F8F8FF]">Questions About Pricing</h2>
              <Accordion items={faqItems} />
            </AnimatedSection>

            <AnimatedSection className={`${sectionCardClass} text-center`}>
              <h2 className="mb-3 text-2xl font-bold text-slate-950 dark:text-[#F8F8FF]">Ready to Scope the Right Project for Your Business?</h2>
              <p className="mb-6 text-slate-600 dark:text-[#94A3B8]">Whether you need a website, a landing page system, automation support, or ongoing SEO work, the next step is to define the right scope.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={localePath(locale, "/book-consultation")} className="rounded-full bg-[var(--site-primary)] px-8 py-4 font-bold text-white transition-colors hover:bg-[var(--site-primary-hover)]">Book Consultation</Link>
                <Link href={localePath(locale, "/quote")} className="rounded-full border border-slate-300 bg-white/90 px-8 py-4 font-bold text-slate-950 transition-colors hover:bg-slate-50 dark:border-[#1E1E2E] dark:bg-[#0F0F18] dark:text-[#F8F8FF] dark:hover:bg-[#13131E]">Get Custom Project Scope</Link>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
