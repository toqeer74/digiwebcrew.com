import Link from "next/link";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const coreServices = [
  { name: "Custom Website Development", desc: "Premium websites built for credibility, performance, and long-term business growth.", cta: "Explore Website Development", href: "/services/custom-software", price: "Starting at $3,500" },
  { name: "Conversion Funnels & Landing Pages", desc: "Focused page systems built to turn traffic into inquiries, bookings, and qualified leads.", cta: "Explore Funnels & Landing Pages", href: "/services/conversion-funnels", price: "Starting at $2,000" },
  { name: "AI Chatbots & Automation", desc: "AI-powered systems that improve lead capture, response speed, and operational efficiency.", cta: "Explore AI Automation", href: "/services/ai-chatbots-automation", price: "Starting at $3,500" },
  { name: "SEO & Growth Retainers", desc: "Ongoing SEO, optimization, and support designed to improve visibility and digital performance over time.", cta: "Explore SEO & Growth", href: "/services/seo-growth-retainers", price: "Starting at $1,000/month" },
];

const related = [
  { name: "WordPress Development", href: "/services/full-stack-websites" },
  { name: "Next.js Development", href: "/services/full-stack-websites" },
  { name: "E-commerce Development", href: "/services/ecommerce" },
  { name: "Web Application Development", href: "/services/custom-web-apps" },
  { name: "Mobile Application Development", href: "/services/custom-software" },
  { name: "DevOps & Cloud", href: "/services/devops-cloud" },
  { name: "AI Workflows & Agents", href: "/services/ai-chatbots-automation" },
  { name: "Local SEO", href: "/services/seo-growth-retainers" },
  { name: "Technical SEO", href: "/services/seo-growth-retainers" },
  { name: "Website Maintenance & Support", href: "/services/maintenance-support" },
  { name: "Automation & Internal Tools", href: "/services/automation-internal-tools" },
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
  const sectionCardClass = "site-card overflow-hidden relative p-8 lg:p-10";
  const interactiveCardClass = "site-card site-card-interactive overflow-hidden relative p-6 lg:p-8";
  const gradientTop = <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />;

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-6xl mx-auto space-y-24">
          
          {/* Centered Hero */}
          <AnimatedSection className="text-center flex flex-col items-center">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--site-primary)]/10 border border-[var(--site-primary)]/20 text-[var(--site-primary)] mb-8 animate-in fade-in zoom-in duration-700"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--site-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--site-primary)]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Engineering Lab</span>
              <span className="w-px h-3 bg-[var(--site-primary)]/30 mx-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Service Hub</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-slate-950 dark:text-[#F8F8FF] leading-[1.1]">
              Performance-Driven <br className="hidden md:block" /> <span className="text-[var(--site-primary)]">Digital Systems</span> for Growth.
            </h1>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-12 max-w-3xl leading-relaxed">
              Digital Web Crew helps growth-focused businesses build custom websites, funnels, SEO systems, and AI automation designed to improve credibility, generate qualified leads, and support smarter customer acquisition.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white/50 dark:border-white/10 dark:bg-white/5 px-10 py-5 text-slate-700 dark:text-[#F8F8FF] font-bold transition-all hover:bg-slate-100 dark:hover:bg-white/10 group">
                <span>Get Quote</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>

          {/* Strategy Section - Cards Mix */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <AnimatedSection className="md:col-span-7 site-card p-10 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
              {gradientTop}
              <span className="mb-4 inline-block rounded-full bg-[var(--site-primary)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--site-primary)]">Architecture</span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">
                More Than a Website. <br /> A Smarter <span className="opacity-50 underline decoration-[var(--site-primary)] decoration-4 underline-offset-8">Digital System.</span>
              </h2>
              <p className="text-slate-600 dark:text-[#94A3B8] text-lg leading-relaxed max-w-xl">
                Most businesses do not just need a nicer design. They need a stronger digital system that helps them attract attention, convert traffic, improve visibility, and handle leads more efficiently.
              </p>
            </AnimatedSection>

            <AnimatedSection className="md:col-span-5 site-card p-10 relative overflow-hidden bg-slate-950 text-white flex flex-col justify-center">
              {gradientTop}
              <h3 className="text-xl font-display font-black mb-4">Core Principles</h3>
              <ul className="space-y-4">
                {[
                  "Strategy-first implementation",
                  "Conversion-optimized architecture",
                  "Lightweight & high-performance code",
                  "Scalable infrastructure for growth"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          {/* Core Services Grid */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="mb-2 inline-block rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Our Protocol</span>
                <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] tracking-tight">Core Service Components</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreServices.map((s, idx) => (
                <AnimatedSection key={s.name} delay={idx * 0.1} className={interactiveCardClass}>
                  {gradientTop}
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] tracking-tight">{s.name}</h3>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[var(--site-primary)] bg-[var(--site-primary)]/10 px-2 py-1 rounded">
                      {s.price.split(' ')[2]}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-[#94A3B8] mb-8 leading-relaxed">
                    {s.desc}
                  </p>
                  <Link 
                    href={localePath(locale, s.href)} 
                    className="inline-flex items-center gap-2 font-bold text-[var(--site-primary)] hover:underline group"
                  >
                    <span>{s.cta}</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Related Capabilities - Bento */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <AnimatedSection className="md:col-span-4 site-card p-8 flex flex-col justify-center">
              <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-wider text-slate-400">Extension</span>
              <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-4">Related Capabilities</h2>
              <p className="text-sm text-slate-600 dark:text-[#94A3B8]">
                Beyond our core protocols, we maintain deep expertise across the entire digital engineering spectrum.
              </p>
            </AnimatedSection>
            
            <AnimatedSection className="md:col-span-8 site-card p-8 bg-slate-50/50 dark:bg-white/[0.02]">
              <div className="flex flex-wrap gap-2">
                {related.map((r) => (
                  <Link 
                    key={r.name} 
                    href={localePath(locale, r.href)}
                    className="rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 text-sm font-bold text-slate-700 dark:text-[#C2D2E1] shadow-sm transition-all hover:border-[var(--site-primary)]/40 hover:text-[var(--site-primary)]"
                  >
                    {r.name}
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Pricing & Support - Alternating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection className={sectionCardClass}>
              {gradientTop}
              <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6">Investment & Scale</h2>
              <div className="space-y-4 mb-8">
                {coreServices.map((s, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-white/5">
                    <span className="text-sm font-medium text-slate-600 dark:text-[#94A3B8]">{s.name}</span>
                    <span className="text-sm font-black text-slate-950 dark:text-[#F8F8FF]">{s.name.includes("AI Chatbots") ? "Starting at $3,500" : s.price}</span>
                  </div>
                ))}
              </div>
              <Link href={localePath(locale, "/pricing")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-8 py-4 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] group/btn">
                <span>View Full Pricing</span>
                <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </AnimatedSection>

            <AnimatedSection className={cn(sectionCardClass, "flex flex-col")}>
              {gradientTop}
              <h2 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6">How We Work</h2>
              <div className="flex-1 space-y-4 mb-8">
                 {[
                   { t: "Discover", d: "Understanding your technical gaps" },
                   { t: "Scope", d: "Designing the logic & data flow" },
                   { t: "Build", d: "Premium engineering & refinement" },
                   { t: "Launch", d: "System deployment & monitoring" }
                 ].map((p, i) => (
                   <div key={i} className="flex gap-4">
                     <span className="font-display font-black text-xl text-[var(--site-primary)]/20">{i+1}</span>
                     <div>
                       <h4 className="font-bold text-slate-950 dark:text-[#F8F8FF]">{p.t}</h4>
                       <p className="text-xs text-slate-500 dark:text-[#94A3B8]">{p.d}</p>
                     </div>
                   </div>
                 ))}
              </div>
              <Link href={localePath(locale, "/process")} className="text-[var(--site-primary)] font-bold hover:underline flex items-center gap-2">
                Explore Our Process <ArrowRight size={16} />
              </Link>
            </AnimatedSection>
          </div>

          {/* FAQ */}
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] tracking-tight text-center">Common Questions</h2>
            <div className="max-w-4xl mx-auto">
              <Accordion items={faq} />
            </div>
          </div>

          {/* Final CTA */}
          <AnimatedSection className="site-card overflow-hidden relative text-center p-12 md:p-20 bg-slate-950">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#60A5FA] via-[var(--site-primary)] to-[#34D399]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--site-primary-rgb),0.15),transparent_70%)]" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 tracking-tight">
                Need Help Choosing the <span className="text-[var(--site-primary)]">Right Service Mix?</span>
              </h2>
              <p className="text-[#94A3B8] mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
                Whether you already know what you need or want help defining the right direction, we can help you map out the next step for your digital infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] group shadow-[0_20px_50px_-15px_rgba(var(--site-primary-rgb),0.5)]">
                  <span>Book Consultation</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-10 py-5 text-white font-bold transition-all hover:bg-white/10 group">
                  <span>Get Quote</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </Container>
    </main>
  );
}
