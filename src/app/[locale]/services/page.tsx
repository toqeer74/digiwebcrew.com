import Link from "next/link";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionKicker } from "@/components/ui/section-kicker";
import { localePath } from "@/lib/locale-path";
import { ArrowRight, MonitorSmartphone, MousePointerClick, Bot, TrendingUp, LayoutTemplate, Layers, Zap, Search, Cog, Shield, ArrowUpRight } from "lucide-react";
import { FluidBackground } from "@/components/sections/homepage-visuals";
import { cn } from "@/lib/utils";

const coreServices = [
  { 
    name: "Custom Website Development", 
    desc: "Premium websites built for credibility, performance, and long-term business growth.", 
    cta: "Explore Website Development", 
    href: "/services/custom-software", 
    price: "Starting at $3,500",
    icon: MonitorSmartphone,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    stats: [
      { label: "Performance Score", value: "99+" },
      { label: "Uptime Guarantee", value: "99.9%" }
    ]
  },
  { 
    name: "Conversion Funnels", 
    desc: "Focused page systems built to turn traffic into inquiries, bookings, and qualified leads.", 
    cta: "Explore Funnels", 
    href: "/services/conversion-funnels", 
    price: "Starting at $2,000",
    icon: MousePointerClick,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    stats: [
      { label: "Avg. Conversion Boost", value: "+125%" },
      { label: "A/B Testing", value: "Included" }
    ]
  },
  { 
    name: "AI & Automation", 
    desc: "AI-powered systems that improve lead capture, response speed, and operational efficiency.", 
    cta: "Explore AI Automation", 
    href: "/services/ai-chatbots-automation", 
    price: "Starting at $3,500",
    icon: Bot,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    stats: [
      { label: "Response Time", value: "< 2s" },
      { label: "Tasks Automated", value: "24/7" }
    ]
  },
  { 
    name: "SEO & Growth", 
    desc: "Ongoing SEO, optimization, and support designed to improve visibility and digital performance over time.", 
    cta: "Explore SEO", 
    href: "/services/seo-growth-retainers", 
    price: "Starting at $1,000/mo",
    icon: TrendingUp,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    stats: [
      { label: "Traffic Growth", value: "3x Avg" },
      { label: "Ranking Reports", value: "Monthly" }
    ]
  },
];

const related = [
  { name: "WordPress Development", href: "/services/custom-software", icon: LayoutTemplate },
  { name: "Next.js Architecture", href: "/services/custom-software", icon: Layers },
  { name: "E-commerce Systems", href: "/services/ecommerce", icon: Zap },
  { name: "Web Applications", href: "/services/custom-software", icon: MonitorSmartphone },
  { name: "DevOps & Cloud", href: "/services/devops-cloud", icon: Cog },
  { name: "Technical SEO", href: "/services/seo-growth-retainers", icon: Search },
  { name: "Maintenance", href: "/services/maintenance-support", icon: Shield },
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
  const sectionCardClass = "site-card overflow-hidden relative p-8 lg:p-10 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 dark:border-white/5 dark:bg-white/5";
  const interactiveCardClass = "site-card site-card-interactive overflow-hidden relative p-6 lg:p-8 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 hover:border-[var(--site-primary)]/30 dark:border-white/5 dark:bg-white/5";
  const gradientTop = <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />;

  return (
    <main className="flex-1 pt-28 pb-16 overflow-hidden relative">
      {/* Background Visuals */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--site-primary)]/10 via-background to-background pointer-events-none -z-10" />

      <Container>
        <div className="max-w-6xl mx-auto space-y-24">
          
          {/* Centered Hero */}
          <AnimatedSection className="text-center flex flex-col items-center pt-8">
            <SectionKicker label="Our Services" />

            <h1 className="text-[3.25rem] md:text-[4.5rem] font-display font-black tracking-tight mb-6 text-foreground leading-[1.05] drop-shadow-sm text-balance">
              Performance-Driven <br className="hidden md:block" /> <span className="text-[var(--site-primary)]">Digital Systems</span> for Growth.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 font-medium mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              Digi Web Crew helps growth-focused businesses build custom websites, funnels, SEO systems, and AI automation designed to improve credibility, generate qualified leads, and support smarter customer acquisition.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button href={localePath(locale, "/book-consultation")} variant="primary" size="xl" className="group">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Button>
              <Button href={localePath(locale, "/quote")} variant="secondary" size="xl" className="group">
                <span>Get Quote</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </AnimatedSection>

          {/* Strategy Section - Rich Bento */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
            <AnimatedSection className={cn(sectionCardClass, "md:col-span-7 flex flex-col justify-center min-h-[400px]")}>
              <FluidBackground />
              <div className="relative z-10">
                <span className="mb-4 inline-block rounded-full bg-slate-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white dark:bg-white dark:text-slate-900 shadow-lg">Architecture</span>
                <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mb-6 tracking-tight leading-tight">
                  More Than a Website. <br /> A Smarter <span className="opacity-50 underline decoration-[var(--site-primary)] decoration-4 underline-offset-8">Digital System.</span>
                </h2>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-xl">
                  Most businesses do not just need a nicer design. They need a stronger digital system that helps them attract attention, convert traffic, improve visibility, and handle leads more efficiently.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className={cn(sectionCardClass, "md:col-span-5 flex flex-col justify-center")}>
              {gradientTop}
              <h3 className="text-2xl font-display font-black text-foreground mb-6">Core Principles</h3>
              <ul className="space-y-5">
                {[
                  { text: "Strategy-first implementation", icon: Search },
                  { text: "Conversion-optimized architecture", icon: MousePointerClick },
                  { text: "Lightweight & high-performance code", icon: Zap },
                  { text: "Scalable infrastructure for growth", icon: TrendingUp }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-muted-foreground font-medium group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 transition-colors group-hover:bg-[var(--site-primary)]/10 group-hover:text-[var(--site-primary)]">
                      <item.icon size={18} />
                    </div>
                    <span>{item.text}</span>
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
                <h2 className="text-3xl md:text-4xl font-display font-black text-foreground tracking-tight">Core Service Components</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {coreServices.map((s, idx) => (
                <AnimatedSection key={s.name} delay={idx * 0.1} className={cn(interactiveCardClass, "group")}>
                  {gradientTop}
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", s.bgColor, s.color)}>
                      <s.icon size={24} />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded">
                      {s.price}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-display font-black text-foreground tracking-tight mb-3 group-hover:text-[var(--site-primary)] transition-colors">{s.name}</h3>
                  <p className="text-muted-foreground font-medium mb-8 leading-relaxed line-clamp-2">
                    {s.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-100 dark:border-white/5">
                    {s.stats.map((stat, i) => (
                      <div key={i}>
                        <div className="text-xl font-black text-foreground">{stat.value}</div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href={localePath(locale, s.href)} 
                    className="inline-flex items-center gap-2 font-bold text-foreground group-hover:text-[var(--site-primary)] transition-colors"
                  >
                    <span>{s.cta}</span>
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Related Capabilities - Rich Bento */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
            <AnimatedSection className={cn(sectionCardClass, "md:col-span-4 flex flex-col justify-center")}>
              {gradientTop}
              <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-wider text-slate-400">Extension</span>
              <h2 className="text-2xl md:text-3xl font-display font-black text-foreground mb-4">Related Capabilities</h2>
              <p className="text-base text-muted-foreground font-medium">
                Beyond our core protocols, we maintain deep expertise across the entire digital engineering spectrum.
              </p>
            </AnimatedSection>
            
            <AnimatedSection className={cn(sectionCardClass, "md:col-span-8 p-6 lg:p-8")}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((r) => (
                  <Link 
                    key={r.name} 
                    href={localePath(locale, r.href)}
                    className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white/50 dark:bg-white/5 dark:border-white/10 p-4 transition-all hover:border-[var(--site-primary)] hover:shadow-[0_0_15px_rgba(var(--site-primary-rgb),0.15)] hover:bg-white dark:hover:bg-white/10"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 group-hover:text-[var(--site-primary)] transition-colors">
                      <r.icon size={18} />
                    </div>
                    <span className="font-semibold text-slate-700 dark:text-[#C2D2E1] group-hover:text-foreground transition-colors">
                      {r.name}
                    </span>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* How We Work Timeline */}
          <AnimatedSection className={sectionCardClass}>
            {gradientTop}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-display font-black text-foreground mb-4">The Execution Pipeline</h2>
              <p className="text-muted-foreground font-medium">A structured methodology ensures every project moves smoothly from concept to scalable deployment.</p>
            </div>
            
            <div className="relative">
              <div className="hidden md:block absolute top-[45px] left-10 right-10 h-0.5 bg-slate-100 dark:bg-white/5" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative z-10">
                {[
                  { t: "Discover", d: "Understanding your technical gaps and business goals.", icon: Search },
                  { t: "Scope", d: "Designing the logic, architecture, and data flow.", icon: Layers },
                  { t: "Build", d: "Premium engineering, coding, and iterative refinement.", icon: Cog },
                  { t: "Launch", d: "System deployment, QA, and active monitoring.", icon: Zap }
                ].map((p, i) => (
                  <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left group">
                    <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-white dark:bg-midnight shadow-[0_0_0_8px_rgba(241,245,249,1)] dark:shadow-[0_0_0_8px_rgba(255,255,255,0.05)] border-2 border-slate-200 dark:border-white/10 mb-6 text-slate-400 group-hover:text-[var(--site-primary)] group-hover:border-[var(--site-primary)]/30 transition-colors">
                      <p.icon size={32} />
                    </div>
                    <h4 className="font-black text-xl text-foreground mb-2">
                      <span className="text-[var(--site-primary)] mr-2">0{i+1}.</span> {p.t}
                    </h4>
                    <p className="text-sm text-muted-foreground font-medium">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 text-center">
              <Button href={localePath(locale, "/process")} variant="secondary" size="lg">
                Explore Full Process
              </Button>
            </div>
          </AnimatedSection>

          {/* FAQ */}
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-black text-foreground tracking-tight text-center">Common Questions</h2>
            <div className="max-w-4xl mx-auto">
              <Accordion items={faq} />
            </div>
          </div>

          {/* Final CTA */}
          <AnimatedSection className="site-card overflow-hidden relative text-center p-8 md:p-10 rounded-[20px] border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 shadow-sm dark:border-white/10 dark:from-white/5 dark:to-transparent">
            {gradientTop}
            <div className="relative z-10">
              <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Ready to turn traffic into leads?
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mb-6 tracking-tight">
                Need Help Choosing the <span className="text-[var(--site-primary)]">Right Service Mix?</span>
              </h2>
              <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                Whether you already know what you need or want help defining the right direction, we can help you map out the next step for your digital infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button href={localePath(locale, "/book-consultation")} variant="primary" size="xl" className="group">
                  <span>Book Consultation</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
                <Button href={localePath(locale, "/quote")} variant="secondary" size="xl" className="group">
                  <span>Get Quote</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </Container>
    </main>
  );
}
