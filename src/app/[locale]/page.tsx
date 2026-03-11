import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    <main className="flex-1">
      <section className="relative">
        <Hero dict={dict} locale={locale} />
      </section>

      <FeaturesRow />

      <ProcessVisualization />

      <section className="py-12 bg-white border-y border-slate-200 dark:bg-[#0A0A0F] dark:border-[#1E1E2E]">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-2 mb-6">
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

      <section className="border-b border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] pt-10 pb-12 md:pt-12 md:pb-14 dark:border-[#1E1E2E] dark:bg-gradient-to-b dark:from-[#0A0A0F] dark:to-[#0F0F18]">
        <Container>
          <div className="max-w-5xl mx-auto text-center space-y-6">
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
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-8 py-4 text-center font-bold text-white shadow-[0_26px_60px_-36px_rgba(0,0,0,0.6)] transition-all duration-300 hover:bg-[var(--site-primary-hover)] dark:shadow-[0_26px_60px_-36px_rgba(255,255,255,0.12)]">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 px-8 py-4 text-center font-bold text-slate-950 shadow-[0_26px_60px_-36px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-white dark:border-[#1E1E2E] dark:text-white dark:shadow-[0_26px_60px_-36px_rgba(255,255,255,0.06)]">
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 transition-transform duration-300 group-hover:translate-x-1 dark:bg-white/5 dark:ring-white/10">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-6xl mx-auto space-y-6">

            {/* Row 1 — Capabilities (text left, visual right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedSection className="site-card site-card-interactive overflow-hidden relative flex flex-col justify-between p-8 lg:p-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
                <div>
                  <span className="mb-3 inline-block rounded-full bg-[rgba(var(--site-primary-rgb),0.1)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">Our Stack</span>
                  <h2 className="mb-4 text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] leading-snug">Built for More Than<br />Basic Websites</h2>
                  <p className="mb-6 text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">Whether you need a focused website project or a broader digital growth system, we shape the right service mix around your goals.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {capabilities.map((c) => (
                    <span key={c} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-[color:rgba(var(--site-primary-rgb),0.22)] dark:bg-[rgba(var(--site-primary-rgb),0.07)] dark:text-[#C2D2E1]">{c}</span>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection className="site-card overflow-hidden relative flex flex-col justify-between p-8 lg:p-10 bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.12),rgba(52,211,153,0.08))] dark:bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.18),rgba(52,211,153,0.05))]">
                <div className="absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-[rgba(var(--site-primary-rgb),0.1)] blur-2xl" />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[
                    { num: "100+", label: "Projects Shipped" },
                    { num: "9", label: "Services Offered" },
                    { num: "99.9%", label: "Uptime SLA" },
                    { num: "24h", label: "Avg Response Time" },
                  ].map(({ num, label }) => (
                    <div key={label} className="rounded-xl border border-slate-200 bg-white/70 dark:border-white/10 dark:bg-white/5 p-4 text-center">
                      <p className="font-display text-2xl font-black text-[var(--site-primary)]">{num}</p>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8]">{label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 dark:text-[#6B7E8E]">Delivered across web, SEO, automation, and AI systems.</p>
              </AnimatedSection>
            </div>

            {/* Row 2 — Industries (visual left, text right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedSection className="site-card overflow-hidden relative p-8 lg:p-10 bg-[linear-gradient(135deg,rgba(52,211,153,0.09),rgba(var(--site-primary-rgb),0.08))] dark:bg-[linear-gradient(135deg,rgba(52,211,153,0.06),rgba(var(--site-primary-rgb),0.10))]">
                <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-[rgba(52,211,153,0.15)] blur-2xl" />
                <div className="grid grid-cols-1 gap-2.5">
                  {industries.map((i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/60 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-[#D7E3EF]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)] dark:bg-[var(--site-primary-soft)] shrink-0" />
                      {i}
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection className="site-card site-card-interactive overflow-hidden relative flex flex-col justify-between p-8 lg:p-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#34D399] via-[var(--site-primary)] to-[#60A5FA]" />
                <div>
                  <span className="mb-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">Industries</span>
                  <h2 className="mb-4 text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] leading-snug">Built for High-Value,<br />Growth-Focused Industries</h2>
                  <p className="mb-6 text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">We work with businesses that value precision—legal, medical, consulting, SaaS, and beyond. Every project is shaped around real growth outcomes.</p>
                </div>
                <Link href={localePath(locale, "/industries")} className="inline-flex items-center gap-2 font-semibold text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] text-sm hover:underline">
                  View Industries We Serve <ArrowRight size={14} />
                </Link>
              </AnimatedSection>
            </div>

            {/* Row 3 — Work + Process (two equal cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedSection className="site-card site-card-interactive overflow-hidden relative flex flex-col justify-between p-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#60A5FA] to-[var(--site-primary)]" />
                <div>
                  <span className="mb-3 inline-block rounded-full bg-[rgba(var(--site-primary-rgb),0.08)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">Portfolio</span>
                  <h2 className="mb-3 text-xl font-display font-black text-slate-950 dark:text-[#F8F8FF]">Selected Work</h2>
                  <p className="mb-6 text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">From custom websites to automation workflows, our work is built to support real business objectives with stronger design and better performance.</p>
                </div>
                <Link href={localePath(locale, "/case-studies")} className="inline-flex items-center gap-2 font-semibold text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] text-sm hover:underline">
                  View Work <ArrowRight size={14} />
                </Link>
              </AnimatedSection>

              <AnimatedSection className="site-card site-card-interactive overflow-hidden relative flex flex-col justify-between p-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A78BFA] to-[#60A5FA]" />
                <div>
                  <span className="mb-3 inline-block rounded-full bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">Methodology</span>
                  <h2 className="mb-3 text-xl font-display font-black text-slate-950 dark:text-[#F8F8FF]">A Clear Process from Strategy to Launch</h2>
                  <div className="mb-6 flex gap-2 flex-wrap">
                    {["Discover", "Scope", "Build", "Launch & Grow"].map((step, i) => (
                      <span key={step} className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-white/5 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-[#94A3B8]">
                        <span className="text-[10px] font-black text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">{i + 1}</span>
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
                <Link href={localePath(locale, "/process")} className="inline-flex items-center gap-2 font-semibold text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] text-sm hover:underline">
                  View Full Process <ArrowRight size={14} />
                </Link>
              </AnimatedSection>
            </div>

            {/* Row 4 — AI + Pricing (text left, visual right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedSection className="site-card site-card-interactive overflow-hidden relative flex flex-col justify-between p-8 lg:p-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F59E0B] to-[#34D399]" />
                <div>
                  <span className="mb-3 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">AI Automation</span>
                  <h2 className="mb-4 text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] leading-snug">AI Where It Actually<br />Improves Growth</h2>
                  <ul className="space-y-3 text-sm text-slate-500 dark:text-[#94A3B8]">
                    {[
                      "AI chat for first-response support",
                      "Automation for lead capture and routing",
                      "Workflow systems that reduce manual tasks",
                      "Smarter support structures for growing businesses",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection className="site-card site-card-interactive overflow-hidden relative flex flex-col justify-between p-8 lg:p-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] to-[#F59E0B]" />
                <div>
                  <span className="mb-3 inline-block rounded-full bg-[rgba(var(--site-primary-rgb),0.08)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">Pricing</span>
                  <h2 className="mb-4 text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] leading-snug">Transparent Starting Prices</h2>
                  <div className="space-y-2.5 mb-6">
                    {[
                      ["Custom Website Dev", "$3,500"],
                      ["Conversion Funnels", "$2,000"],
                      ["AI Chatbots & Automation", "$2,500"],
                      ["SEO & Growth Retainers", "$1,000/mo"],
                    ].map(([label, price]) => (
                      <div key={label} className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-white/10 px-4 py-2.5 bg-slate-50 dark:bg-white/5">
                        <span className="text-sm font-medium text-slate-600 dark:text-[#C2D2E1]">{label}</span>
                        <span className="text-sm font-black text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">{price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={localePath(locale, "/pricing")} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--site-primary)] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_40px_-20px_rgba(var(--site-primary-rgb),0.5)] hover:bg-[var(--site-primary-hover)] transition-all">
                    View Pricing <ArrowRight size={14} />
                  </Link>
                  <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 dark:border-white/15 px-6 py-3 text-sm font-bold text-slate-700 dark:text-[#D7E3EF] hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                    Get Quote <ArrowRight size={14} />
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* FAQ */}
            <AnimatedSection>
              <h2 className="mb-4 text-2xl font-bold text-slate-950 dark:text-[#F8F8FF]">Frequently Asked Questions</h2>
              <Accordion items={faq} />
              <div className="mt-4">
                <Link href={localePath(locale, "/faqs")} className="text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] font-semibold">View All FAQs</Link>
              </div>
            </AnimatedSection>

            {/* Final CTA */}
            <AnimatedSection className="site-card overflow-hidden relative text-center p-10 bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.08),rgba(52,211,153,0.06))] dark:bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.14),rgba(52,211,153,0.04))]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#60A5FA] via-[var(--site-primary)] to-[#34D399]" />
              <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-[rgba(var(--site-primary-rgb),0.10)] blur-3xl pointer-events-none" />
              <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
              <h2 className="mb-3 text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF]">Ready to Build a Smarter Growth System?</h2>
              <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-[#94A3B8]">Whether you need a custom website, stronger landing pages, SEO support, or AI automation, we can help you define the right next step.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-8 py-4 font-bold text-white shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.6)] transition-all hover:bg-[var(--site-primary-hover)]">
                  <span>Book Consultation</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
                <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/80 px-8 py-4 font-bold text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] transition-all hover:bg-white dark:hover:bg-white/10">
                  <span>Get Quote</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </AnimatedSection>

          </div>
        </Container>
      </section>
    </main>
  );
}

