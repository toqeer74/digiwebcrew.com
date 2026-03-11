import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { Hero } from "@/components/sections/hero";
import { FeaturesRow } from "@/components/sections/features-row";
import { AIProjectCalculator } from "@/components/tools/ai-project-calculator";
import { ServiceConfigurator } from "@/components/tools/service-configurator";
import { ProcessVisualization } from "@/components/sections/process-visualization";
import { TechStackDisplay } from "@/components/sections/tech-stack-display";
import { Testimonials } from "@/components/sections/testimonials";
import { localePath } from "@/lib/locale-path";

const capabilities = [
  "WordPress Development",
  "Next.js Development",
  "Web Applications",
  "E-commerce Development",
  "AI Workflows & Agents",
  "DevOps & Cloud Support",
  "Local SEO",
  "Technical SEO",
  "Website Maintenance & Support",
];

const industries = [
  "Law Firms",
  "Dental, Medical, Clinics & Med Spas",
  "Home Services",
  "Consultants, Coaches & Agencies",
  "SaaS & B2B Service Companies",
  "Education, Training & eLearning",
];

const faq = [
  { value: "1", title: "What types of businesses do you work with?", content: "We work with growth-focused businesses that want stronger digital systems for credibility, lead generation, SEO, and automation. Our strongest fit includes law firms, clinics, home services, consultants, SaaS, and education-related businesses." },
  { value: "2", title: "Do you build custom websites or use templates?", content: "We position our work around custom solutions tailored to business goals, content structure, and conversion needs. The right approach depends on the project, but our focus is on building systems that fit the business properly." },
  { value: "3", title: "Can you handle SEO and automation too?", content: "Yes. Our services include custom websites, conversion funnels, SEO support, AI chatbots, and automation workflows, allowing us to build more complete digital growth systems." },
  { value: "4", title: "How does the custom project scope process work?", content: "The scope flow helps you define what you need, what your goals are, and where your project stands. It gives us the information needed to recommend the right direction and next steps." },
  { value: "5", title: "Do you offer ongoing support after launch?", content: "Yes. We can provide ongoing support, maintenance, SEO, optimization, and improvement work after launch depending on your needs." },
  { value: "6", title: "How do you use AI in your services?", content: "We use AI where it adds real value, including chat support, lead qualification, workflow automation, content support, and customer communication systems." },
];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar" || locale === "ur";
  const homeCardClass = "site-card site-card-interactive p-8";
  const homeCardTitleClass = "site-card-title mb-3 text-2xl font-bold";
  const homeCardTextClass = "site-card-muted mb-4 text-[15px] leading-7 dark:text-[#D7E3EF]";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground" dir={isRtl ? "rtl" : "ltr"}>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1">
        <section className="relative">
          <Hero dict={dict} locale={locale} />
        </section>

        <FeaturesRow />

        <ProcessVisualization />

        <section className="py-16 bg-white border-y border-slate-200 dark:bg-[#0A0A0F] dark:border-[#1E1E2E]">
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-3 mb-8">
              <h2 className="text-3xl xl:text-4xl font-black text-slate-950 tracking-tight leading-tight dark:text-[#F8F8FF]">
                Architect Your <span className="text-[var(--site-primary)]">Enterprise</span> Future
              </h2>
              <p className="text-base xl:text-lg text-slate-600 dark:text-[#94A3B8]">{dict.hero.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <div className="space-y-6">
                <AIProjectCalculator />
              </div>
              <div className="space-y-6">
                <ServiceConfigurator />
              </div>
            </div>
          </Container>
        </section>

        <TechStackDisplay />
        <Testimonials />

        <section className="border-b border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] pt-12 pb-14 md:pt-16 md:pb-18 dark:border-[#1E1E2E] dark:bg-gradient-to-b dark:from-[#0A0A0F] dark:to-[#0F0F18]">
          <Container>
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(var(--site-primary-rgb),0.25)] bg-[rgba(var(--site-primary-rgb),0.08)] px-3 py-1 dark:bg-[#6366F1]/10 dark:border-[#6366F1]/30">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--site-primary)]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--site-primary)]">Digital Growth Systems</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-950 dark:text-[#F8F8FF] md:text-6xl lg:text-7xl">
                Custom Websites, Funnels & AI Automation That Turn Traffic Into Qualified Leads
              </h1>
              <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-[#94A3B8]">
                We design and build custom digital systems that help growth-focused businesses improve visibility, capture better leads, and scale with more confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={localePath(locale, "/book-consultation")} className="px-8 py-4 bg-[var(--site-primary)] text-white font-bold rounded-lg text-center shadow-[0_26px_60px_-36px_rgba(0,0,0,0.6)] transition-colors hover:bg-[var(--site-primary-hover)] dark:shadow-[0_26px_60px_-36px_rgba(255,255,255,0.12)]">Book Consultation</Link>
                <Link href={localePath(locale, "/quote")} className="rounded-lg border border-slate-300 bg-[var(--site-primary)] px-8 py-4 text-center font-bold text-[var(--site-primary-dark-text)] shadow-[0_26px_60px_-36px_rgba(0,0,0,0.6)] transition-colors hover:bg-[var(--site-primary-hover)] dark:border-[#1E1E2E] dark:text-white dark:shadow-[0_26px_60px_-36px_rgba(255,255,255,0.12)]">Get Custom Project Scope</Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="pt-24 pb-24">
          <Container>
            <div className="max-w-6xl mx-auto space-y-8">
              <AnimatedSection className={homeCardClass}>
                <h2 className={homeCardTitleClass}>Built for More Than Basic Websites</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  {capabilities.map((c) => (
                    <span key={c} className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 dark:border-[color:rgba(var(--site-primary-rgb),0.22)] dark:bg-[rgba(var(--site-primary-rgb),0.06)] dark:text-[#C2D2E1]">{c}</span>
                  ))}
                </div>
                <p className={homeCardTextClass}>Whether you need a focused website project or a broader digital growth system, we can shape the right service mix around your goals.</p>
              </AnimatedSection>

              <AnimatedSection className={homeCardClass}>
                <h2 className={homeCardTitleClass}>Built for High-Value, Growth-Focused Industries</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                  {industries.map((i) => (
                    <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-600 dark:border-[color:rgba(var(--site-primary-rgb),0.22)] dark:bg-[rgba(var(--site-primary-rgb),0.05)] dark:text-[#D7E3EF]">{i}</div>
                  ))}
                </div>
                <Link href={localePath(locale, "/industries")} className="site-card-accent font-semibold">View Industries We Serve</Link>
              </AnimatedSection>

              <AnimatedSection className={homeCardClass}>
                <h2 className={homeCardTitleClass}>Selected Work</h2>
                <p className={homeCardTextClass}>From custom websites to automation workflows, our work is built to support real business objectives with stronger design, clearer structure, and better digital performance.</p>
                <Link href={localePath(locale, "/case-studies")} className="site-card-accent font-semibold">View Work</Link>
              </AnimatedSection>

              <AnimatedSection className={homeCardClass}>
                <h2 className={homeCardTitleClass}>A Clear Process from Strategy to Launch</h2>
                <p className={homeCardTextClass}>Discover - Scope - Build - Launch & Grow</p>
                <Link href={localePath(locale, "/process")} className="site-card-accent font-semibold">View Full Process</Link>
              </AnimatedSection>

              <AnimatedSection className={homeCardClass}>
                <h2 className={homeCardTitleClass}>AI Where It Actually Improves Growth</h2>
                <ul className="site-card-muted space-y-2 text-[15px] leading-7 dark:text-[#D7E3EF]">
                  <li>AI chat for first-response support</li>
                  <li>Automation for lead capture and routing</li>
                  <li>Workflow systems that reduce manual tasks</li>
                  <li>Smarter support structures for growing businesses</li>
                </ul>
              </AnimatedSection>

              <AnimatedSection className={homeCardClass}>
                <h2 className={homeCardTitleClass}>Starting Pricing</h2>
                <ul className="site-card-muted mb-6 space-y-2 text-[15px] leading-7 dark:text-[#D7E3EF]">
                  <li>Custom Website Development - Starting at $3,500</li>
                  <li>Conversion Funnels & Landing Pages - Starting at $2,000</li>
                  <li>AI Chatbots & Automation - Starting at $2,500</li>
                  <li>SEO & Growth Retainers - Starting at $1,000/month</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={localePath(locale, "/pricing")} className="px-8 py-4 bg-[#6366F1] text-white font-bold rounded-lg text-center">View Pricing</Link>
                  <Link href={localePath(locale, "/quote")} className="rounded-lg border border-slate-300 bg-white/90 px-8 py-4 text-center font-bold text-slate-950 dark:border-[color:rgba(var(--site-primary-rgb),0.28)] dark:bg-[rgba(var(--site-primary-rgb),0.06)] dark:text-[#F8F8FF]">Get Custom Project Scope</Link>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="mb-4 text-2xl font-bold text-slate-950 dark:text-[#F8F8FF]">Frequently Asked Questions</h2>
                <Accordion items={faq} />
                <div className="mt-4">
                  <Link href={localePath(locale, "/faqs")} className="text-[#6366F1] font-semibold">View All FAQs</Link>
                </div>
              </AnimatedSection>

              <AnimatedSection className={`${homeCardClass} text-center`}>
                <h2 className={homeCardTitleClass}>Ready to Build a Smarter Growth System?</h2>
                <p className="site-card-muted mb-6 text-[15px] leading-7 dark:text-[#D7E3EF]">Whether you need a custom website, stronger landing pages, SEO support, or AI automation, we can help you define the right next step.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={localePath(locale, "/book-consultation")} className="px-8 py-4 bg-[var(--site-primary)] text-white font-bold rounded-lg shadow-[0_26px_60px_-36px_rgba(0,0,0,0.6)] transition-colors hover:bg-[var(--site-primary-hover)] dark:shadow-[0_26px_60px_-36px_rgba(255,255,255,0.12)]">Book Consultation</Link>
                  <Link href={localePath(locale, "/quote")} className="rounded-lg border border-slate-300 bg-white/90 px-8 py-4 font-bold text-slate-950 dark:border-[color:rgba(var(--site-primary-rgb),0.28)] dark:bg-[rgba(var(--site-primary-rgb),0.06)] dark:text-[#F8F8FF]">Get Custom Project Scope</Link>
                </div>
              </AnimatedSection>
            </div>
          </Container>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
