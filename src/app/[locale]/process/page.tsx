import { ArrowRight, Search, Layers, Code2, Rocket, Target, CheckCircle2, FileText, Code, Gauge, Zap } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionKicker } from "@/components/ui/section-kicker";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { localePath } from "@/lib/locale-path";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

const steps = [
  {
    num: "01",
    title: "Discover",
    color: "from-blue-500 to-cyan-400",
    badge: "Phase 1",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    icon: Search,
    body: "Every project starts by understanding the business behind it.",
    subheading: "Key Deliverables:",
    items: [
      { text: "Business goals alignment", icon: Target },
      { text: "Audience needs mapping", icon: Search },
      { text: "Current system gaps analysis", icon: Gauge }
    ],
  },
  {
    num: "02",
    title: "Scope",
    color: "from-emerald-500 to-teal-400",
    badge: "Phase 2",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: Layers,
    body: "Once the direction is clear, we shape the project around what is actually needed.",
    subheading: "Key Deliverables:",
    items: [
      { text: "Recommended service mix", icon: Layers },
      { text: "Feature & logic requirements", icon: FileText },
      { text: "Technical architecture plan", icon: Code }
    ],
  },
  {
    num: "03",
    title: "Build",
    color: "from-violet-500 to-purple-400",
    badge: "Phase 3",
    badgeColor: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    icon: Code2,
    body: "With the scope in place, we move into design, development, and implementation.",
    subheading: "Key Deliverables:",
    items: [
      { text: "Custom UI/UX development", icon: Code2 },
      { text: "Backend & CRM integration", icon: Zap },
      { text: "QA & performance optimization", icon: Gauge }
    ],
  },
  {
    num: "04",
    title: "Launch & Grow",
    color: "from-amber-500 to-orange-400",
    badge: "Phase 4",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: Rocket,
    body: "Once the project is ready, we move into launch, review, and continued support.",
    subheading: "Key Deliverables:",
    items: [
      { text: "Seamless deployment", icon: Rocket },
      { text: "SEO & conversion monitoring", icon: Target },
      { text: "Ongoing scaling & updates", icon: Zap }
    ],
  },
];

const fitProjects = [
  "Custom website projects",
  "Website redesigns",
  "Landing page and funnel builds",
  "SEO support engagements",
  "Chatbot and automation setups",
  "Multi-service digital systems",
  "Businesses that need help defining the right direction before building",
];

const faqItems = [
  { value: "faq-1", title: "Do all projects go through the same process?", content: "The overall structure stays consistent, but the depth of each stage can vary depending on the size and type of project." },
  { value: "faq-2", title: "What if I am not fully sure what I need yet?", content: "That is exactly what the custom project scope path is for. It helps define the direction before anything is built." },
  { value: "faq-3", title: "Can a project include more than one service?", content: "Yes. Many projects include a mix of website work, landing pages, SEO, or automation depending on what the business needs." },
  { value: "faq-4", title: "Do you provide support after launch?", content: "Yes. Post-launch support can include updates, SEO, maintenance, improvements, and future expansion work." },
  { value: "faq-5", title: "How long does the process take?", content: "That depends on the scope, complexity, and timeline of the project. Smaller projects move faster, while larger builds need more planning and implementation time." },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/process",
    title: "Our Development Process",
    description: "How we scope, design, build, and launch: a transparent process with fixed milestones, weekly demos, and no surprise invoices.",
    keywords: ["software development process", "agency development workflow"],
  });
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const gradientTop = <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />;
  const sectionCardClass = "site-card overflow-hidden relative p-8 lg:p-10 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 dark:border-white/5 dark:bg-white/5";

  return (
    <main className="flex-1 pt-6 pb-24 overflow-hidden relative">
      {/* Background Visuals */}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/15 via-[var(--site-primary)]/5 to-background" />
        <div className="absolute top-0 left-0 right-0 h-[1000px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <Container>
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">

          {/* Professional Hero Section */}
          <AnimatedSection immediate className="pt-4 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center relative">
              {/* LEFT: Typography */}
              <div className="relative z-10 text-center lg:text-left">
                <div className="mx-auto lg:mx-0 mb-6 flex items-center justify-center lg:justify-start gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                    <Rocket size={12} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Our Process</span>
                </div>
                <h1 className="text-[3.25rem] md:text-[4.5rem] font-display font-black text-foreground leading-[1.05] tracking-tight text-balance mb-6">
                  A Clear Path From <br className="hidden md:block" /> <span className="bg-gradient-to-r from-[var(--site-primary)] to-[#3b82f6] bg-clip-text text-transparent">Discovery</span> to Launch.
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 font-medium mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  We use a structured engineering process to make sure every website, funnel, SEO, and automation project is aligned with real business goals, clear priorities, and the right level of implementation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button href={localePath(locale, "/book-consultation")} variant="primary" size="xl" className="group shadow-md shadow-[var(--site-primary)]/10">
                    <span>Book Consultation</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Button>
                </div>
              </div>

              {/* RIGHT: Professional Workflow Mockup */}
              <div className="relative z-10 w-full max-w-[500px] mx-auto lg:ml-auto h-[400px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
                
                {/* Main Process Board */}
                <div className="absolute right-0 top-0 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                    <div className="flex gap-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                       <div className="w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-amber-500" />
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Sprint Board</span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 p-3 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <Search size={16} className="text-blue-500" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Phase 1: Discover</span>
                      </div>
                      <CheckCircle2 size={14} className="text-emerald-500" />
                    </div>
                    <div className="rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 p-3 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <Layers size={16} className="text-emerald-500" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Phase 2: Scope</span>
                      </div>
                      <CheckCircle2 size={14} className="text-emerald-500" />
                    </div>
                    <div className="rounded-xl bg-white dark:bg-white/10 border-2 border-[var(--site-primary)] p-3 shadow-md relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[var(--site-primary)]/10 animate-pulse pointer-events-none" />
                      <div className="flex items-center gap-3 relative z-10">
                        <Code2 size={16} className="text-[var(--site-primary)]" />
                        <span className="text-xs font-bold text-[var(--site-primary)] dark:text-white">Phase 3: Build</span>
                      </div>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[var(--site-primary)] border-t-transparent rounded-full animate-spin relative z-10" />
                    </div>
                    <div className="rounded-xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100/50 dark:border-white/5 p-3 flex items-center justify-between opacity-60">
                      <div className="flex items-center gap-3">
                        <Rocket size={16} className="text-slate-400" />
                        <span className="text-xs font-bold text-slate-500">Phase 4: Launch</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Notification */}
                <div className="absolute left-0 bottom-12 w-56 bg-white/95 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl backdrop-blur-md p-4 transform -translate-x-4 translate-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--site-primary)]/10 text-[var(--site-primary)] ring-1 ring-[var(--site-primary)]/20">
                      <Code size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-xs leading-tight">API Integrated</h4>
                      <p className="text-[10px] font-medium text-muted-foreground mt-0.5">Build phase 60% complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>

      {/* Moved from homepage — full-width value section */}
      <div className="my-8 md:my-12">
        <WhyChooseUs />
      </div>

      <Container>
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">

          {/* Steps Timeline (Deep Redesign) */}
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-white/10 before:to-transparent">
            {steps.map((step, idx) => {
              const isEven = idx % 2 !== 0;
              return (
                <div key={step.num} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  {/* Timeline Marker */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-background bg-white dark:bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className={cn("w-3 h-3 rounded-full bg-gradient-to-r", step.color)} />
                  </div>
                  
                  {/* Content Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                    <AnimatedSection delay={idx * 0.1} className={cn("site-card overflow-hidden relative flex flex-col p-6 md:p-8 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 hover:border-[var(--site-primary)]/30 dark:border-white/5 dark:bg-white/5", isEven ? "md:mr-auto" : "md:ml-auto")}>
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.color}`} />
                      
                      <div className="flex justify-between items-start mb-6">
                        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", step.badgeColor)}>
                          <step.icon size={24} />
                        </div>
                        <span className="font-display text-4xl font-black text-slate-100 dark:text-white/5 select-none tracking-tighter">{step.num}</span>
                      </div>

                      <div className="mb-4">
                        <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-3 ${step.badgeColor} ring-1 ring-black/5 dark:ring-white/10`}>{step.badge}</span>
                        <h2 className="text-2xl font-display font-black text-foreground tracking-tight group-hover:text-[var(--site-primary)] transition-colors">{step.title}</h2>
                      </div>

                      <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-6">{step.body}</p>
                      
                      <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-100 dark:border-white/5 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">{step.subheading}</p>
                        <ul className="space-y-2">
                          {step.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-xs text-foreground font-semibold">
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white dark:bg-background border border-slate-200 dark:border-white/10 text-[var(--site-primary)] shadow-sm">
                                <item.icon size={12} strokeWidth={2.5} />
                              </div>
                              {item.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fit + How to Enter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-4">
            <AnimatedSection className={cn(sectionCardClass, "!p-6 md:!p-8")}>
              {gradientTop}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 ring-1 ring-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 shadow-sm">
                  <CheckCircle2 size={20} />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-black text-foreground tracking-tight">A Good Fit For These Projects</h2>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {fitProjects.map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm transition-colors hover:border-blue-500/30">
                    <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className={cn(sectionCardClass, "!p-6 md:!p-8")}>
              {gradientTop}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 ring-1 ring-violet-500/20 dark:bg-violet-500/20 dark:text-violet-400 shadow-sm">
                  <Layers size={20} />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-black text-foreground tracking-tight">How to Enter the Process</h2>
              </div>
              <div className="space-y-3">
                <div className="group rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 shadow-sm transition-colors hover:border-[var(--site-primary)] hover:bg-white dark:hover:bg-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--site-primary)]/10 text-[var(--site-primary)] ring-1 ring-[var(--site-primary)]/20 text-xs font-black">
                      01
                    </div>
                    <p className="text-sm font-black text-foreground group-hover:text-[var(--site-primary)] transition-colors">Book Consultation</p>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium ml-11 leading-relaxed">Best if you already know what you want and want to discuss the project directly.</p>
                </div>
                <div className="group rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 shadow-sm transition-colors hover:border-[var(--site-primary)] hover:bg-white dark:hover:bg-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--site-primary)]/10 text-[var(--site-primary)] ring-1 ring-[var(--site-primary)]/20 text-xs font-black">
                      02
                    </div>
                    <p className="text-sm font-black text-foreground group-hover:text-[var(--site-primary)] transition-colors">Get Quote</p>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium ml-11 leading-relaxed">Best if you want to define the need more clearly before booking a call.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* FAQ */}
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-black text-foreground tracking-tight text-center">Questions About the Process</h2>
            <div className="max-w-4xl mx-auto">
              <Accordion items={faqItems} />
            </div>
          </div>

          {/* Consistent Compressed Final CTA */}
          <AnimatedSection className="site-card overflow-hidden relative text-center p-6 md:p-8 rounded-3xl border border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 mx-auto max-w-2xl shadow-lg shadow-[var(--site-primary)]/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[var(--site-primary)]/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 dark:bg-white/5 text-blue-700 dark:text-blue-400 shadow-sm ring-1 ring-slate-100 dark:ring-white/10">
                <Rocket size={18} />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 dark:text-white mb-3 tracking-tight max-w-lg mx-auto leading-tight">
                Ready to Start Phase 1?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 max-w-sm mx-auto leading-relaxed">
                If you want a project that is shaped around business goals, clear scope, and practical execution, let's talk.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button href={localePath(locale, "/book-consultation")} className="bg-[#1746A2] hover:bg-[#123680] text-white shadow-md rounded-full px-5 h-11 flex items-center gap-2 group transition-all">
                  <span className="font-semibold text-sm">Book Consultation</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </Button>
                <Button href={localePath(locale, "/quote")} className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-sm rounded-full px-5 h-11 flex items-center gap-2 group transition-all dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:bg-white/10">
                  <span className="font-semibold text-sm">Get Custom Quote</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-transform duration-300 group-hover:translate-x-1 dark:bg-white/10 dark:text-slate-300">
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </Button>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </Container>
    </main>
  );
}
