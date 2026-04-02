import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { localePath } from "@/lib/locale-path";

const industrySections = [
  {
    heading: "Law Firms",
    accent: "from-[var(--site-primary)] to-[#60A5FA]",
    badge: "Legal",
    badgeColor: "bg-[rgba(var(--site-primary-rgb),0.08)] text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]",
    body: "Law firms need trust, clarity, and strong service presentation. A legal website has to communicate credibility quickly, explain practice areas clearly, and make it easy for potential clients to take the next step.",
    points: ["Custom websites built for trust and structure", "Service and practice area pages", "Landing pages for focused campaigns", "Local and on-page SEO improvements", "Consultation-focused conversion paths", "Cleaner lead handling and intake support"],
    closing: "A strong fit for firms that want a more professional online presence and better support for qualified consultations.",
  },
  {
    heading: "Dental, Medical & Med Spas",
    accent: "from-[#34D399] to-[var(--site-primary)]",
    badge: "Healthcare",
    badgeColor: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    body: "Healthcare and treatment-based businesses depend heavily on trust, local visibility, and a smooth path to booking or inquiry. The website needs to present services clearly and help visitors feel confident enough to take action.",
    points: ["Professional websites with stronger patient-facing structure", "Treatment and service pages", "Booking-focused landing pages", "Local SEO support", "Conversion improvements", "Lead handling and response support"],
    closing: "A strong fit for practices that want to improve presentation, visibility, and patient acquisition flow.",
  },
  {
    heading: "Home Services",
    accent: "from-[#F59E0B] to-[#34D399]",
    badge: "Local",
    badgeColor: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
    body: "Home service businesses often depend on strong local visibility, fast lead flow, clear service pages, and a website that works well on mobile. Service-area structure, page clarity, and better inquiry flow can make a major difference.",
    points: ["Custom service-focused websites", "Landing pages for local lead generation", "Stronger mobile experience", "Local SEO support", "Clearer service and location page structure", "Lead capture and follow-up systems"],
    closing: "A strong fit for businesses that want more qualified local inquiries and a stronger digital foundation.",
  },
  {
    heading: "Consultants, Coaches & Agencies",
    accent: "from-[#A78BFA] to-[#60A5FA]",
    badge: "Service B2B",
    badgeColor: "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
    body: "Service-based businesses that sell through authority and consultations need a site that presents the offer clearly, builds trust, and gives potential clients a reason to move forward.",
    points: ["Authority-focused websites", "Landing pages for services or offers", "Consultation-focused page flow", "Clearer service messaging structure", "Stronger conversion paths", "Support for ongoing growth and optimization"],
    closing: "A strong fit for businesses that want better positioning and a clearer path from visitor to lead.",
  },
  {
    heading: "SaaS & B2B Service Companies",
    accent: "from-[#60A5FA] to-[var(--site-primary)]",
    badge: "SaaS",
    badgeColor: "bg-[rgba(var(--site-primary-rgb),0.08)] text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]",
    body: "SaaS and B2B businesses often need stronger front-end presentation, clearer messaging, and a site structure that supports both product understanding and lead generation.",
    points: ["Modern front-end website builds", "Clearer website structure and messaging support", "Landing pages for campaigns or offers", "Conversion-focused user flow", "Technical website implementation", "Support for future growth and expansion"],
    closing: "A strong fit for companies that need a cleaner and more capable digital presence to support growth.",
  },
  {
    heading: "Education, Training & eLearning",
    accent: "from-[#34D399] to-[#A78BFA]",
    badge: "Education",
    badgeColor: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    body: "Education and training businesses often need structured content, clearer user journeys, stronger offer presentation, and a website that can support both information and action.",
    points: ["Structured websites for education-focused content", "Landing pages for programs, offers, or campaigns", "Clearer page flow and navigation", "Support for growth and visibility", "Funnel support for lead generation", "Connected systems for better user experience"],
    closing: "A strong fit for businesses that want a more organized and growth-ready digital setup.",
  },
];

const faqItems = [
  { value: "faq-1", title: "Do you only work with these industries?", content: "No. These are the strongest-fit industries, but we can also work with other businesses where the project and business need are a strong match." },
  { value: "faq-2", title: "Which industries are the best fit for your services?", content: "Law firms, clinics, home services, consultants, SaaS, and education-related businesses are the most natural fit because they depend heavily on trust, visibility, and lead flow." },
  { value: "faq-3", title: "Can one service work across different industries?", content: "Yes. The same service category can apply across industries, but the structure, messaging, and priorities should still be tailored to the business model." },
  { value: "faq-4", title: "Do you tailor the website or funnel structure by industry?", content: "Yes. The way a site or funnel is built should reflect how that type of business earns trust, explains services, and moves people toward action." },
  { value: "faq-5", title: "What if my business is not listed here?", content: "You can still reach out. If the project is a strong fit and the business need matches what we do well, we can still define the right direction." },
];

const ctaPrimary = "inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-8 py-4 font-bold text-white shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] transition-all hover:bg-[var(--site-primary-hover)]";
const ctaSecondary = "inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 px-8 py-4 font-bold text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-white transition-all hover:bg-white dark:hover:bg-white/10";

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Hero */}
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
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Industry Clusters</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-foreground leading-[1.1]">
              Built for Sectors Where <br className="hidden md:block" /> <span className="text-[var(--site-primary)]">Performance</span> Matters.
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl leading-relaxed">
              We help growth-focused businesses build stronger websites, better conversion systems, improved search visibility, and cleaner lead handling tailored to their industrial requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white/50 dark:border-white/10 dark:bg-white/5 px-10 py-5 text-slate-700 dark:text-white font-bold transition-all hover:bg-slate-100 dark:hover:bg-white/10 group">
                <span>Get Quote</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>

          {/* Intro */}
          <AnimatedSection className="site-card site-card-interactive overflow-hidden relative p-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
            <h2 className="text-2xl font-display font-black text-foreground mb-4">Why Industry Fit Changes the Right Solution</h2>
            <p className="text-muted-foreground mb-3">A law firm does not need the same structure as a med spa. A home service business does not need the same page flow as a SaaS company.</p>
            <p className="text-muted-foreground">The right website, landing page, SEO, or automation setup depends on how the business sells, how customers search, what creates trust, and what action matters most. That is why the work should be shaped around the business model and the decision-making path behind it.</p>
          </AnimatedSection>

          {/* Industry Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industrySections.map((section, idx) => (
              <AnimatedSection key={section.heading} delay={idx * 0.04} className="site-card site-card-interactive overflow-hidden relative flex flex-col p-8">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${section.accent}`} />
                <span className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${section.badgeColor}`}>{section.badge}</span>
                <h2 className="text-xl font-display font-black text-foreground mb-3">{section.heading}</h2>
                <p className="text-sm text-muted-foreground mb-4">{section.body}</p>
                <ul className="space-y-2 mb-4">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--site-primary)]" />{point}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto text-xs text-slate-400 dark:text-[#6B7E8E] italic">{section.closing}</p>
              </AnimatedSection>
            ))}
          </div>

          {/* Other Fit */}
          <AnimatedSection className="site-card site-card-interactive overflow-hidden relative p-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#60A5FA] to-[#A78BFA]" />
            <h2 className="text-2xl font-display font-black text-foreground mb-4">Other Strong-Fit Businesses</h2>
            <p className="text-muted-foreground mb-3">While the industries above are our strongest fit, we can also work with other businesses where the project and business need are a strong match.</p>
            <p className="text-muted-foreground mb-3">The best fit usually comes down to this:</p>
            <ul className="space-y-2 mb-4">
              {["The business values quality and clarity", "The website or digital setup plays a real role in growth", "There is a serious business need behind the project", "The scope and budget support custom work"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--site-primary)]" />{item}
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* FAQ */}
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-foreground mb-4">Questions About Industry Fit</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection className="site-card overflow-hidden relative text-center p-10 bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.08),rgba(52,211,153,0.06))] dark:bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.14),rgba(52,211,153,0.04))]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#60A5FA] via-[var(--site-primary)] to-[#34D399]" />
            <h2 className="text-2xl font-display font-black text-foreground mb-3">Need a Digital System Built Around Your Industry?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">If your business depends on trust, leads, consultations, bookings, or stronger digital performance, the next step is to define the right scope.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className={ctaPrimary}>
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15"><ArrowRight className="h-4 w-4" /></span>
              </Link>
              <Link href={localePath(locale, "/quote")} className={ctaSecondary}>
                <span>Get Quote</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10"><ArrowRight className="h-4 w-4" /></span>
              </Link>
            </div>
          </AnimatedSection>

        </div>
      </Container>
    </main>
  );
}
