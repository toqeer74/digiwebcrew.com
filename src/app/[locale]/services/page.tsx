import Link from "next/link";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";
import { ArrowRight } from "lucide-react";

const coreServices = [
  { name: "Custom Website Development", desc: "Premium websites built for credibility, performance, and long-term business growth.", cta: "Explore Website Development", href: "/services/custom-software", price: "Starting at $3,500" },
  { name: "Conversion Funnels & Landing Pages", desc: "Focused page systems built to turn traffic into inquiries, bookings, and qualified leads.", cta: "Explore Funnels & Landing Pages", href: "/services/conversion-funnels", price: "Starting at $2,000" },
  { name: "AI Chatbots & Automation", desc: "AI-powered systems that improve lead capture, response speed, and operational efficiency.", cta: "Explore AI Automation", href: "/services/ai-chatbots-automation", price: "Starting at $2,500" },
  { name: "SEO & Growth Retainers", desc: "Ongoing SEO, optimization, and support designed to improve visibility and digital performance over time.", cta: "Explore SEO & Growth", href: "/services/seo-growth-retainers", price: "Starting at $1,000/month" },
];

const related = [
  "WordPress Development",
  "Next.js Development",
  "E-commerce Development",
  "Web Application Development",
  "Mobile Application Development",
  "DevOps & Cloud",
  "AI Workflows & Agents",
  "Local SEO",
  "Technical SEO",
  "Website Maintenance & Support",
];

const faq = [
  { value: "1", title: "Can I hire you for one service only?", content: "Yes. Some clients come to us for a single website, a landing page system, SEO support, or automation setup. Others need a broader multi-service engagement." },
  { value: "2", title: "Do you only work with service businesses?", content: "Service businesses are our strongest fit, but we also work with selected SaaS, B2B, and education-related businesses." },
  { value: "3", title: "Can you combine website, funnel, SEO, and automation work in one project?", content: "Yes. In many cases, that creates the strongest outcome because the system is planned together rather than built in disconnected parts." },
  { value: "4", title: "Do you offer ongoing support?", content: "Yes. We can provide maintenance, SEO, optimization, and ongoing improvement support after launch." },
];

export default async function ServicesHub({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar" || locale === "ur";
  const sectionCardClass = "site-card p-8";
  const interactiveCardClass = "site-card site-card-interactive p-6";

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-5xl mx-auto space-y-8">
          <AnimatedSection className="text-center">
            <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-6xl">
              Services Built to Strengthen Growth, Conversion, and Digital Performance
            </h1>
            <p className="site-card-muted mb-6 text-lg">
              Digital Web Crew helps growth-focused businesses build custom websites, funnels, SEO systems, and AI automation designed to improve credibility, generate qualified leads, and support smarter customer acquisition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[#6366F1] px-8 py-4 text-white font-bold transition-all duration-300 hover:bg-[#6366F1]/90 shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)]">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-[#1E1E2E] bg-[#13131E] text-[#F8F8FF] font-bold px-8 py-4 transition-all duration-300 hover:bg-[#1a1a2e] shadow-[0_26px_60px_-36px_rgba(0,0,0,0.5)]">
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection className={sectionCardClass}>
            <h2 className="site-card-title mb-3 text-2xl font-bold">More Than a Website. A Smarter Digital System.</h2>
            <p className="site-card-muted">Most businesses do not just need a nicer design. They need a stronger digital system that helps them attract attention, convert traffic, improve visibility, and handle leads more efficiently.</p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="site-card-title mb-4 text-2xl font-bold">Core Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coreServices.map((s) => (
                <div key={s.name} className={interactiveCardClass}>
                  <h3 className="site-card-title mb-2 text-xl font-semibold">{s.name}</h3>
                  <p className="site-card-muted mb-3">{s.desc}</p>
                  <p className="site-card-muted mb-4 text-sm">{s.price}</p>
                  <Link href={localePath(locale, s.href)} className="site-card-accent font-semibold">{s.cta}</Link>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className={sectionCardClass}>
            <h2 className="site-card-title mb-3 text-2xl font-bold">Related Capabilities</h2>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <span key={r} className="site-card-muted rounded-full border site-card-divider px-3 py-2 text-sm">{r}</span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className={sectionCardClass}>
            <h2 className="site-card-title mb-3 text-2xl font-bold">A Service Structure Built Around Real Business Needs</h2>
            <p className="site-card-muted mb-3">
              Many agencies separate design, development, SEO, and automation into disconnected services. That often creates inconsistency, weak execution, and missed growth opportunities.
            </p>
            <p className="site-card-muted mb-3">
              Digital Web Crew uses a more connected approach. We help businesses build digital systems where website structure, conversion flow, search visibility, and lead handling work together more effectively.
            </p>
            <p className="site-card-muted">
              That means you can start with the service you need now and expand into the right support over time without rebuilding everything from scratch.
            </p>
          </AnimatedSection>

          <AnimatedSection className={sectionCardClass}>
            <h2 className="site-card-title mb-3 text-2xl font-bold">Best Fit Clients</h2>
            <p className="site-card-muted mb-3">
              Our services are best suited for businesses that depend on trust, inquiries, consultations, calls, bookings, or ongoing lead flow.
            </p>
            <p className="site-card-muted mb-3">We are especially well aligned with:</p>
            <ul className="site-card-muted mb-4 list-inside list-disc space-y-2">
              <li>law firms</li>
              <li>clinics, dental practices, and med spas</li>
              <li>home service businesses</li>
              <li>consultants, coaches, and agencies</li>
              <li>SaaS and B2B service companies</li>
              <li>education and training businesses</li>
            </ul>
            <p className="site-card-muted">
              These are the kinds of businesses that benefit most from stronger digital presentation, better conversion systems, clearer SEO foundations, and smarter automation.
            </p>
          </AnimatedSection>

          <AnimatedSection className={sectionCardClass}>
            <h2 className="site-card-title mb-3 text-2xl font-bold">How We Work</h2>
            <p className="site-card-muted mb-4">Discover - Scope - Build - Launch & Grow</p>
            <Link href={localePath(locale, "/process")} className="site-card-accent font-semibold">View Full Process</Link>
          </AnimatedSection>

          <AnimatedSection className={sectionCardClass}>
            <h2 className="site-card-title mb-3 text-2xl font-bold">Starting Investment Levels</h2>
            <ul className="site-card-muted mb-4 space-y-2">
              <li>Custom Website Development - Starting at $3,500</li>
              <li>Conversion Funnels & Landing Pages - Starting at $2,000</li>
              <li>AI Chatbots & Automation - Starting at $2,500</li>
              <li>SEO & Growth Retainers - Starting at $1,000/month</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={localePath(locale, "/pricing")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[#6366F1] px-8 py-4 text-white font-bold transition-all duration-300 hover:bg-[#6366F1]/90 shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)]">
                <span>View Pricing</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-[#1E1E2E] text-[#F8F8FF] font-bold px-8 py-4 transition-all duration-300 hover:bg-white/5 shadow-[0_26px_60px_-36px_rgba(0,0,0,0.5)]">
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="site-card-title mb-4 text-2xl font-bold">Common Questions</h2>
            <Accordion items={faq} />
          </AnimatedSection>

          <AnimatedSection className={`${sectionCardClass} text-center`}>
            <h2 className="site-card-title mb-3 text-2xl font-bold">Need Help Choosing the Right Service Mix?</h2>
            <p className="site-card-muted mb-6">Whether you already know what you need or want help defining the right direction, we can help you map out the next step.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[#6366F1] px-8 py-4 text-white font-bold transition-all duration-300 hover:bg-[#6366F1]/90 shadow-[0_26px_60px_-36px_rgba(99,102,241,0.4)]">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-[#1E1E2E] text-[#F8F8FF] font-bold px-8 py-4 transition-all duration-300 hover:bg-white/5 shadow-[0_26px_60px_-36px_rgba(0,0,0,0.5)]">
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
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
