import Link from "next/link";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { ServiceProcessSteps } from "@/components/sections/service-process-steps";
import { localePath } from "@/lib/locale-path";

const supportingPoints = [
  "Built for long-term visibility and growth",
  "Focused on search, structure, and ongoing improvement",
  "Designed to support websites after launch",
  "Suitable for local and service-based businesses",
];

const whoFor = [
  "law firms that want stronger local and service-related visibility",
  "clinics, dental practices, and med spas that need better search presence and local discovery",
  "home service businesses that rely on local searches and service pages",
  "consultants, coaches, and agencies improving authority and inbound leads",
  "businesses that launched a new site and need continued support",
  "companies that want ongoing improvements without rebuilding from scratch",
  "businesses that want search growth tied to real service pages and user experience",
];

const serviceAreas = [
  "On-page SEO",
  "Local SEO",
  "Technical SEO",
  "Content optimization",
  "Page improvements",
  "Internal linking improvements",
  "Metadata updates",
  "Performance checks",
  "Website updates",
  "Reporting and review",
];

const included = [
  ["On-page SEO improvements", "Better page structure, headings, metadata, and content alignment across key pages."],
  ["Local SEO support", "Improvements that help location-based businesses appear more clearly for relevant local searches."],
  ["Technical SEO foundations", "Support for crawlability, indexing health, structure, and other technical details that affect visibility."],
  ["Content refinement", "Updates that improve clarity, keyword alignment, usefulness, and page quality over time."],
  ["Website updates", "Ongoing adjustments to keep pages current, accurate, and aligned with changing offers or business goals."],
  ["Performance review", "Checks on site quality, usability, and areas that may be affecting results."],
  ["Growth-focused recommendations", "Practical direction on where the site can improve next based on what matters most."],
  ["Reporting and support", "Regular visibility into what is being worked on and where improvements are being made."],
];

const problems = [
  "weak search visibility",
  "poor local presence",
  "service pages that are not structured well",
  "missing or weak metadata",
  "outdated content",
  "technical issues affecting search performance",
  "no clear internal linking strategy",
  "no consistent website improvements after launch",
  "low traffic to important pages",
  "no plan for continued digital growth",
];

const bestUseCases = [
  "improving local search visibility",
  "strengthening service pages after launch",
  "updating weak or outdated content",
  "fixing technical SEO issues",
  "improving page structure and internal linking",
  "supporting a new site with ongoing search work",
  "combining updates, optimization, and ongoing support in one retainer",
  "maintaining growth momentum without needing a full rebuild",
];

const relatedServices = [
  "Custom Website Development",
  "Conversion Funnels and Landing Pages",
  "Technical SEO",
  "Local SEO",
  "Website Maintenance and Support",
  "AI Chatbots and Automation",
];

const faqItems = [
  {
    value: "faq-1",
    title: "Do you offer SEO as a standalone service?",
    content:
      "Yes, depending on fit. In some cases SEO works best as part of a broader website or growth engagement, but standalone support can also make sense.",
  },
  {
    value: "faq-2",
    title: "What kind of SEO do you provide?",
    content:
      "We support on-page SEO, local SEO, technical SEO, and content-focused improvements based on the needs of the site.",
  },
  {
    value: "faq-3",
    title: "Do you only work on websites you built?",
    content:
      "No. We can also work on existing websites if the project is a good fit and the site allows for meaningful improvement.",
  },
  {
    value: "faq-4",
    title: "Will this include website updates too?",
    content:
      "Yes. Depending on the retainer scope, website updates and ongoing improvements can be part of the service.",
  },
  {
    value: "faq-5",
    title: "How long should a business stay on SEO support?",
    content:
      "That depends on the business, market, and goals. SEO and growth support usually works best as an ongoing effort rather than a one-time task.",
  },
];

export default async function SEOGrowthRetainersPage({
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
          <AnimatedSection className="text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--site-primary)]/10 border border border-[var(--site-primary)]/20 text-[var(--site-primary)] mb-8 animate-in fade-in zoom-in duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--site-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--site-primary)]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Engineering Lab</span>
              <span className="w-px h-3 bg-[var(--site-primary)]/30 mx-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Growth Lab</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-slate-950 dark:text-[#F8F8FF] leading-[1.1] text-balance">
              SEO & <span className="text-[var(--site-primary)]">Growth</span> Support <br className="hidden md:block" /> for Continued Performance.
            </h1>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-12 max-w-3xl leading-relaxed mx-auto">
              We help businesses improve search visibility, strengthen website performance, and keep their digital systems moving forward through ongoing SEO and optimization.
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
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Launch Is Only the Start</h2>
            <div className="space-y-6 text-slate-600 dark:text-[#94A3B8] text-lg leading-relaxed max-w-4xl">
              <p>
                A website can look strong on day one and still underperform over time if no one is improving it.
              </p>
              <p>
                Digital Web Crew offers ongoing SEO and growth support for businesses that want better visibility, stronger page structure, and continued improvement after launch.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 lg:p-12 border border-slate-200 dark:border-[#1E1E2E] rounded-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] to-emerald-500 opacity-50" />
            <h2 className="text-2xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">A More Practical Growth Retainer</h2>
            <div className="space-y-6 text-slate-600 dark:text-[#94A3B8] text-lg leading-relaxed max-w-4xl">
              <p>
                This service is not built around vague monthly activity or inflated promises.
              </p>
              <p>
                It is meant for businesses that want real website improvement, stronger visibility, and ongoing support tied to how the site actually performs and develops over time. That means focusing on useful updates, search structure, content quality, and the parts of the website that support trust and lead generation.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Who This Service Is Built For</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-10 max-w-3xl leading-relaxed">
              SEO and growth support is a strong fit for businesses that depend on search visibility, local presence, service discovery, or ongoing website performance.
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
            <h2 className="text-3xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Core Growth Pillars</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-10 max-w-3xl leading-relaxed">
              SEO and growth support can cover a mix of visibility work, content improvements, technical fixes, and ongoing website updates.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {serviceAreas.map((item) => (
                <div key={item} className="site-card flex items-center justify-center p-4 text-center text-sm font-semibold text-slate-700 dark:text-[#94A3B8] bg-slate-50/50 dark:bg-white/5">
                  {item}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-8 tracking-tight">What&apos;s Included</h2>
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
            <h2 className="text-3xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">What Growth Support Can Fix</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-10 max-w-3xl leading-relaxed">
              Many businesses have a decent website but still struggle with visibility, weak service pages, or outdated content.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full mb-8">
              {problems.map((item) => (
                <div key={item} className="flex items-center gap-3 text-left">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500/50 shrink-0" />
                  <span className="text-slate-600 dark:text-[#94A3B8] text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--site-primary)] to-transparent" />
            <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Strategy-First Optimization</h2>
            <div className="space-y-6 text-slate-600 dark:text-[#94A3B8] text-lg leading-relaxed max-w-4xl">
              <p>We start by looking at the current state of the site.</p>
              <p>
                That means reviewing page structure, service presentation, search-readiness, content quality, and the areas most likely to affect visibility. We keep the work practical and tied to real business results.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Best Use Cases</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-10 max-w-3xl leading-relaxed">
              This service works especially well for businesses that want their website to improve steadily instead of staying static.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {bestUseCases.map((item) => (
                <div key={item} className="flex items-center gap-3 text-left">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/50 shrink-0" />
                  <span className="text-slate-600 dark:text-[#94A3B8] text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--site-primary)] to-transparent" />
            <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6">Related Protocol Support</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-10 max-w-2xl leading-relaxed">Growth work becomes stronger when the website, page structure, and lead flow are built properly.</p>
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
                { title: "Review", description: "We assess the current website, page quality, structure, and the main visibility or performance gaps." },
                { title: "Prioritize", description: "We identify what should be improved first based on impact, business goals, and current weaknesses." },
                { title: "Improve", description: "We implement updates across SEO, content, structure, and website performance as needed." },
                { title: "Monitor and Refine", description: "We continue improving over time based on progress, opportunities, and changing business needs." },
              ]}
              ctaHref={localePath(locale, "/process")}
              ctaLabel="View Full Process"
            />
          </AnimatedSection>

          <AnimatedSection className="site-card p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Starting Investment</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-8 max-w-3xl leading-relaxed">
              SEO and growth retainers vary based on website size, current condition, and the level of support required.
            </p>
            <div className="site-card p-8 mb-10 bg-slate-50/50 dark:bg-[#1A1A2E]/50 border-[var(--site-primary)]/20 border-2 w-full max-w-xl">
              <p className="text-2xl md:text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] tracking-tight">SEO & Growth Support starting at $1,000 per month</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] font-bold px-10 py-5 transition-all hover:bg-white dark:hover:bg-white/10 group">
                <span>Get Quote</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-[#F8F8FF] mb-4">Questions About SEO and Growth Support</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>

          <AnimatedSection className="site-card p-12 text-center flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
            <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 leading-tight tracking-tight">Need Ongoing Support to Improve Visibility?</h2>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-10 max-w-3xl leading-relaxed">
              If your website is live but not improving, the right growth support can help you strengthen visibility, refine key pages, and create better long-term performance. Book a consultation or get a custom project scope to move forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] font-bold px-10 py-5 transition-all hover:bg-white dark:hover:bg-white/10 group">
                <span>Get Quote</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>

        </div>
      </Container>
    </main>
  );
}
