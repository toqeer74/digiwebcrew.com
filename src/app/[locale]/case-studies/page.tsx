import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { CaseStudiesLibrary } from "@/components/sections/case-studies-library";
import { getCaseStudies } from "@/lib/content-engine";
import { getDictionary } from "@/lib/get-dictionary";
import { localePath } from "@/lib/locale-path";

const categories = [
  "Websites",
  "Funnels",
  "SEO",
  "Automation",
  "Development Systems",
  "Technical and Infrastructure Support",
];

const caseStudyTemplates = [
  {
    title: "Nexus Legal Solutions",
    industry: "Legal Services",
    services: ["Custom Website Development", "Conversion Funnels", "SEO", "Automation", "Technical Support"],
    challenge:
      "The firm needed a stronger digital presence, clearer service structure, and a better path for turning visitors into inquiries or leads.",
    solution:
      "We created a more focused website or digital system with improved structure, stronger presentation, clearer user flow, and the right supporting service layers based on the project goals.",
    outcome:
      "The result was a stronger digital foundation with better clarity, improved usability, and a setup that better supported the business goal.",
  },
  {
    title: "Vanguard Property Group",
    industry: "Real Estate",
    services: ["Landing Pages", "SEO", "Automation"],
    challenge:
      "The existing page or lead flow was too weak, too broad, or not structured well enough to support conversions.",
    solution:
      "We built a more focused page system with clearer offer presentation, stronger calls to action, and better alignment between the traffic source and the next step.",
    outcome:
      "The business gained a cleaner path to inquiries, bookings, or lead capture with a page system that was more useful and better aligned with the offer.",
  },
  {
    title: "Peak Performance Physiotherapy",
    industry: "Health & Wellness",
    services: ["SEO Support", "Website Improvements", "Technical SEO"],
    challenge:
      "The website existed but was not well structured for visibility, page clarity, or continued growth.",
    solution:
      "We improved the structure, updated key areas of the site, and supported visibility and usability through targeted search and website improvements.",
    outcome:
      "The result was a cleaner, more growth-ready website with better foundations for ongoing visibility and performance.",
  },
  {
    title: "Apex SaaS Systems",
    industry: "Technology",
    services: ["Automation", "CRM Integration", "Follow-up Systems"],
    challenge:
      "Lead handling or support flow involved too much manual work, inconsistent follow-up, or unclear routing.",
    solution:
      "We built a more structured automation setup to improve response flow, reduce repeated manual tasks, and support better handling of incoming inquiries.",
    outcome:
      "The business gained a more efficient process with better support for speed, consistency, and internal clarity.",
  },
];

const faqItems = [
  {
    value: "faq-1",
    title: "Will all projects be shown as full case studies?",
    content:
      "Not necessarily. Some projects work best as shorter portfolio entries, while others can be expanded into full case studies over time.",
  },
  {
    value: "faq-2",
    title: "Can one project include more than one service?",
    content:
      "Yes. Many of the strongest projects include a mix of website work, landing pages, SEO, automation, or technical support.",
  },
  {
    value: "faq-3",
    title: "Do you only show visual design work here?",
    content:
      "No. Some projects are more visual, while others reflect structural, technical, or operational improvements that matter just as much.",
  },
  {
    value: "faq-4",
    title: "Can you build a similar project for my industry?",
    content:
      "Yes, if the business need is a strong fit. The approach is always shaped around the specific business, not copied from another client.",
  },
  {
    value: "faq-5",
    title: "What if I do not see a project exactly like mine?",
    content:
      "That is normal. The portfolio is meant to show how we think and build, not list every possible project type.",
  },
];

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const studies = await getCaseStudies();
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === "ar" || locale === "ur";
  const gradientTop = <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />;

  return (
    <main className="flex-1 pt-8 pb-8">
      <Container>
        <div className="max-w-6xl mx-auto space-y-8">


          {/* Intro Bento Section 1 */}
          <div className="space-y-24">
            <AnimatedSection className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-6 space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Philosophy & Detail
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-foreground leading-tight">
                  Work That Shows How the System Comes Together
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    A portfolio should do more than display screenshots. It should show how the work solved a problem, supported a business goal, or improved the way the digital system functions.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed italic border-l-2 border-[var(--site-primary)] pl-4">
                    This page brings together selected work across websites, landing pages, SEO improvements, and automation systems.
                  </p>
                </div>
              </div>
              <div className="md:col-span-6">
                <div className="site-card p-1 relative overflow-hidden group border-2 border-[var(--site-primary)]/10">
                  {gradientTop}
                  <CaseStudiesLibrary studies={studies} />
                </div>
              </div>
            </AnimatedSection>

            {/* Intro Bento Section 2 - Project Categories */}
            <AnimatedSection className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-6 md:order-2 space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Specialized Focus
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-foreground leading-tight">
                  A Hybrid Approach to Portfolio Presentation
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Not every project needs a long case study, but every project should still communicate value clearly. That is why our work section is built as a hybrid.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed italic border-l-2 border-emerald-500 pl-4">
                    The goal is to show how different services work together to support real business outcomes.
                  </p>
                </div>
              </div>
              <div className="md:col-span-6 md:order-1">
                <div className="site-card p-5 lg:p-6 relative overflow-hidden group border-2 border-emerald-500/10">
                  {gradientTop}
                  <h3 className="text-xl font-bold mb-6 text-foreground">Project Categories</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-sm text-muted-foreground leading-tight">{category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Selected Projects Grid */}
          <AnimatedSection className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-black text-foreground">Selected Infrastructure Projects</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From custom websites to automation workflows, our work is built to support real business objectives.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudyTemplates.map((item, idx) => (
                <div key={idx} className="site-card site-card-interactive p-5 lg:p-6 flex flex-col relative overflow-hidden group border-2 border-transparent hover:border-[var(--site-primary)]/10">
                  {gradientTop}
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-[var(--site-primary)]/10 text-[10px] font-bold uppercase tracking-wider text-[var(--site-primary)]">
                       {item.industry}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-end max-w-[200px]">
                      {item.services.slice(0, 2).map(s => (
                        <span key={s} className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-white/5 px-2 py-0.5 rounded-md">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-display font-black mb-6 text-foreground leading-tight group-hover:text-[var(--site-primary)] transition-colors">{item.title}</h3>
                  
                  <div className="space-y-6 mb-10">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">Challenge</p>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.challenge}</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 dark:text-emerald-400">Final Outcome</p>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium italic border-l-2 border-emerald-500/30 pl-4">{item.outcome}</p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Link href="#" className="flex items-center justify-between w-full group/btn relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-white/5 p-4 transition-all hover:bg-[var(--site-primary)] dark:hover:bg-[var(--site-primary)] hover:text-white group">
                      <span className="font-bold relative z-10">View Project Details</span>
                      <ArrowRight size={20} className="relative z-10 transition-transform group-hover/btn:translate-x-1" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--site-primary)] to-[var(--site-primary-soft)] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Bottom FAQ Section */}
          <AnimatedSection className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-display font-black text-foreground text-center mb-12">Questions About Our Work</h2>
            <Accordion items={faqItems} />
          </AnimatedSection>

          {/* Final CTA */}
          <AnimatedSection className="site-card p-6 lg:p-8 text-center space-y-4 relative overflow-hidden border-2 border-[var(--site-primary)]/20 shadow-[0_40px_80px_-40px_rgba(var(--site-primary-rgb),0.3)] group/cta">
            {/* Smarter Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--site-primary)]/5 via-transparent to-emerald-500/5 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700" />
            {gradientTop}
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">Live Status: Accepting Projects for Q2 2026</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-display font-black text-foreground leading-tight">
                  Want Similar Work Built <br className="hidden md:block" /> for Your Business Goals?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                   From custom websites to automation, let's define the right digital scope to scale your business performance.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 justify-center lg:justify-end">
                <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-8 py-5 text-base text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.6)] group">
                  <span>Book Consultation</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
                <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-white font-bold px-8 py-5 text-base transition-all hover:bg-white dark:hover:bg-white/10 group">
                  <span>Get Quote</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </main>

  );
}
