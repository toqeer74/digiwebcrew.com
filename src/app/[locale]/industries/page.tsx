import { ArrowRight, Scale, Stethoscope, Wrench, Lightbulb, Building2, GraduationCap, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionKicker } from "@/components/ui/section-kicker";
import { localePath } from "@/lib/locale-path";
import { FluidBackground } from "@/components/sections/homepage-visuals";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

const industrySections = [
  {
    heading: "Law Firms",
    accent: "from-blue-500 to-cyan-400",
    badge: "Legal",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    icon: Scale,
    body: "Law firms need trust, clarity, and strong service presentation. A legal website has to communicate credibility quickly, explain practice areas clearly, and make it easy for potential clients to take the next step.",
    points: ["Custom websites built for trust", "Service & practice area pages", "Local & on-page SEO improvements"],
    stat: { label: "Client Conversion", value: "+45%" },
    closing: "A strong fit for firms that want better support for qualified consultations.",
  },
  {
    heading: "Medical & Med Spas",
    accent: "from-emerald-500 to-teal-400",
    badge: "Healthcare",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: Stethoscope,
    body: "Healthcare businesses depend heavily on trust, local visibility, and a smooth path to booking. The website needs to present services clearly and help visitors feel confident to take action.",
    points: ["Patient-facing architecture", "Booking-focused landing pages", "Local SEO & reviews support"],
    stat: { label: "Booking Rate", value: "3x" },
    closing: "A strong fit for practices wanting to improve patient acquisition flow.",
  },
  {
    heading: "Home Services",
    accent: "from-amber-500 to-orange-400",
    badge: "Local",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: Wrench,
    body: "Home service businesses depend on strong local visibility, fast lead flow, clear service pages, and a website that works flawlessly on mobile devices out in the field.",
    points: ["Local lead generation funnels", "Stronger mobile experience", "Clear service & location structure"],
    stat: { label: "Lead Quality", value: "High" },
    closing: "A strong fit for businesses wanting more qualified local inquiries.",
  },
  {
    heading: "Consultants & Agencies",
    accent: "from-violet-500 to-purple-400",
    badge: "Service B2B",
    badgeColor: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    icon: Lightbulb,
    body: "Service-based businesses that sell through authority need a site that presents the offer clearly, builds trust, and gives potential clients a reason to move forward.",
    points: ["Authority-focused websites", "Consultation-focused page flow", "Clearer service messaging"],
    stat: { label: "Authority Signal", value: "Max" },
    closing: "A strong fit for businesses wanting a clearer path from visitor to lead.",
  },
  {
    heading: "SaaS & B2B Service",
    accent: "from-indigo-500 to-blue-500",
    badge: "SaaS",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    icon: Building2,
    body: "SaaS and B2B businesses need stronger front-end presentation, clearer messaging, and a site structure that supports both product understanding and lead generation.",
    points: ["Modern front-end builds", "Conversion-focused user flow", "Technical website implementation"],
    stat: { label: "ARR Impact", value: "Direct" },
    closing: "A strong fit for companies needing a capable digital presence to support growth.",
  },
  {
    heading: "Education & eLearning",
    accent: "from-rose-500 to-pink-400",
    badge: "Education",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    icon: GraduationCap,
    body: "Education and training businesses need structured content, clearer user journeys, stronger offer presentation, and a website that can support both information and action.",
    points: ["Structured content frameworks", "Landing pages for programs", "Funnel support for enrollment"],
    stat: { label: "Enrollments", value: "+60%" },
    closing: "A strong fit for businesses that want a more organized, growth-ready setup.",
  },
];

const faqItems = [
  { value: "faq-1", title: "Do you only work with these industries?", content: "No. These are the strongest-fit industries, but we can also work with other businesses where the project and business need are a strong match." },
  { value: "faq-2", title: "Which industries are the best fit for your services?", content: "Law firms, clinics, home services, consultants, SaaS, and education-related businesses are the most natural fit because they depend heavily on trust, visibility, and lead flow." },
  { value: "faq-3", title: "Can one service work across different industries?", content: "Yes. The same service category can apply across industries, but the structure, messaging, and priorities should still be tailored to the business model." },
  { value: "faq-4", title: "Do you tailor the website or funnel structure by industry?", content: "Yes. The way a site or funnel is built should reflect how that type of business earns trust, explains services, and moves people toward action." },
  { value: "faq-5", title: "What if my business is not listed here?", content: "You can still reach out. If the project is a strong fit and the business need matches what we do well, we can still define the right direction." },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/industries",
    title: "Industries We Serve",
    description: "Software, ecommerce, and automation built for legal, healthcare, property, fitness, SaaS, and retail teams with domain-specific requirements.",
    keywords: ["industry software solutions", "vertical software development"],
  });
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const sectionCardClass = "site-card overflow-hidden relative p-8 lg:p-10 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 dark:border-white/5 dark:bg-white/5";
  const interactiveCardClass = "site-card site-card-interactive overflow-hidden relative p-6 lg:p-8 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 hover:border-[var(--site-primary)]/30 dark:border-white/5 dark:bg-white/5";
  const gradientTop = <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />;

  return (
    <main className="flex-1 pt-28 pb-16 overflow-hidden relative">
      {/* Background Visuals */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-background to-background pointer-events-none -z-10" />

      <Container>
        <div className="max-w-6xl mx-auto space-y-24">

          {/* Hero */}
          <AnimatedSection immediate className="text-center flex flex-col items-center pt-8">
            <SectionKicker label="Industries We Serve" />

            <h1 className="text-[3.25rem] md:text-[4.5rem] font-display font-black tracking-tight mb-6 text-foreground leading-[1.05] drop-shadow-sm text-balance">
              Built for Sectors Where <br className="hidden md:block" /> <span className="text-[var(--site-primary)]">Performance</span> Matters.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 font-medium mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              We help growth-focused businesses build stronger websites, better conversion systems, improved search visibility, and cleaner lead handling tailored to their industrial requirements.
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

          {/* Intro - Visual Bento */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
            <AnimatedSection className={cn(sectionCardClass, "md:col-span-8 flex flex-col justify-center min-h-[350px]")}>
              <FluidBackground />
              <div className="relative z-10">
                <span className="mb-4 inline-block rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 shadow-sm">Adaptability</span>
                <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4 tracking-tight">Why Industry Fit Changes the Solution</h2>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-xl">
                  A law firm does not need the same structure as a med spa. A home service business does not need the same page flow as a SaaS company. The right digital setup depends entirely on how your specific customer searches, evaluates, and buys.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className={cn(sectionCardClass, "md:col-span-4 flex flex-col justify-center bg-slate-50/50 dark:bg-white/[0.02]")}>
              {gradientTop}
              <h3 className="text-xl font-display font-black text-foreground mb-6">What We Adapt</h3>
              <ul className="space-y-4">
                {[
                  "Sales & Trust Logic",
                  "Local vs Global SEO",
                  "Lead Intake Velocity",
                  "Compliance & Security"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground font-semibold">
                    <CheckCircle2 size={16} className="text-[var(--site-primary)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          {/* Industry Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {industrySections.map((section, idx) => (
              <AnimatedSection key={section.heading} delay={idx * 0.1} className={cn(interactiveCardClass, "group flex flex-col")}>
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${section.accent}`} />
                
                <div className="flex items-start justify-between mb-6">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", section.badgeColor)}>
                    <section.icon size={24} />
                  </div>
                  <span className={cn("inline-block rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-widest", section.badgeColor)}>
                    {section.badge}
                  </span>
                </div>

                <h2 className="text-2xl font-display font-black text-foreground mb-3 group-hover:text-[var(--site-primary)] transition-colors">{section.heading}</h2>
                <p className="text-sm text-muted-foreground font-medium mb-6 leading-relaxed flex-grow">{section.body}</p>
                
                <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 mb-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{section.stat.label}</div>
                  <div className="text-xl font-black text-foreground">{section.stat.value}</div>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground font-medium">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--site-primary)]" />
                      <span className="leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto text-xs font-semibold text-slate-400 dark:text-[#6B7E8E] italic bg-slate-50 dark:bg-white/5 px-3 py-2 rounded-lg">{section.closing}</p>
              </AnimatedSection>
            ))}
          </div>

          {/* Other Fit */}
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className={sectionCardClass}>
              {gradientTop}
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-display font-black text-foreground mb-4">Other Strong-Fit Businesses</h2>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    While the industries above are our strongest fit, we can also work with other businesses where the project and business need are a strong match. The best fit usually comes down to shared values in quality and growth.
                  </p>
                </div>
                <div className="md:w-1/2 w-full">
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "The business values quality and clarity",
                      "The digital setup plays a real role in growth",
                      "There is a serious business need behind the project",
                      "The scope and budget support custom work"
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                        <CheckCircle2 size={18} className="text-[var(--site-primary)] shrink-0" />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* FAQ */}
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-black text-foreground tracking-tight text-center">Questions About Industry Fit</h2>
            <div className="max-w-4xl mx-auto">
              <Accordion items={faqItems} />
            </div>
          </div>

          {/* CTA */}
          <AnimatedSection className="site-card overflow-hidden relative text-center p-8 md:p-16 rounded-[20px] border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 shadow-sm dark:border-white/10 dark:from-white/5 dark:to-transparent">
            {gradientTop}
            <div className="relative z-10">
              <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Ready to define the project scope?
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mb-6 tracking-tight">
                Need a Digital System Built Around Your Industry?
              </h2>
              <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                If your business depends on trust, leads, consultations, bookings, or stronger digital performance, the next step is to define the right scope.
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
