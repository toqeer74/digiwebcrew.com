import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/layout-primitives";
import { QuoteWizard } from "@/components/sections/quote-wizard";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { localePath } from "@/lib/locale-path";
import { 
  ArrowRight,
  CheckCircle2,
  Cpu,
  GitMerge,
  Database,
  LayoutDashboard,
  Activity,
  Layers,
  Bot,
  Workflow
} from "lucide-react";

// Automation & Internal Tools Specific Data
const coreFeatures = [
  "GPT-4 Integrations",
  "Workflow Automation",
  "Custom Dashboards",
  "Data Mining Pipelines",
];

const supportingPoints = [
  "Eliminate repetitive manual data entry",
  "Connect fragmented API services",
  "Centralize operations into unified views",
  "Leverage LLMs for complex reasoning",
];

const legacyFeatures = [
  "API Development & Webhooks",
  "CRM & ERP Data Syncing",
  "Background Task Processing",
  "Automated Reporting",
];

const legacyTechStack = ["Python", "OpenAI", "Django", "Docker"];

const legacyOutcomes = [
  "70% Manual Task Reduction",
  "AI-Driven Logic Mapping",
  "24/7 Automated Processing",
  "Unified Control Panels",
];

const webDevRelatedServices = [
  { label: "AI Chatbots", href: "/services/ai-chatbots-automation", icon: Bot },
  { label: "Custom Software", href: "/services/custom-software", icon: Layers },
  { label: "E-Commerce", href: "/services/ecommerce", icon: Activity },
];

export default async function AutomationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = (await getDictionary(locale)) as any;
  const isRtl = locale === "ar" || locale === "ur";

  return (
    <main className="flex-1 -mt-28 overflow-x-hidden pt-28 relative">
      {/* Background Visuals */}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-[var(--site-primary)]/5 to-background" />
        <div className="absolute top-0 left-0 right-0 h-[1000px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-7xl mx-auto space-y-6 pt-12 pb-24">
          
          {/* 1. HERO SECTION */}
          <AnimatedSection className="pt-0 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4 items-center relative">
              
              {/* LEFT: Typography & Graphic */}
              <div className="relative z-10 text-center lg:text-left">
                {/* Background Scribble Graphic */}
                <div className="absolute top-1/2 left-1/2 lg:-left-20 -translate-x-1/2 lg:translate-x-0 -translate-y-[45%] w-[110%] lg:w-[130%] h-[300px] opacity-15 dark:opacity-20 pointer-events-none -rotate-3 z-0 mix-blend-multiply dark:mix-blend-screen max-w-[800px]">
                  <svg viewBox="-50 -50 500 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="heroStripeGradientAuto" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <path d="M-40 120 C 20 -60, 140 -40, 160 100 C 180 260, 260 260, 300 140 C 340 20, 420 20, 460 120" stroke="url(#heroStripeGradientAuto)" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 mb-5 shadow-sm backdrop-blur-md mx-auto lg:mx-0">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-600 dark:bg-indigo-400" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-300">
                      Workflow Automation
                    </span>
                  </div>
                  
                  <h1 className="text-[3rem] md:text-[4rem] font-black font-display text-slate-900 dark:text-white tracking-tight mb-4 leading-[1.05] text-balance drop-shadow-sm">
                    AI & Internal <br className="hidden md:block" /> 
                    <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">Tooling Systems.</span>
                  </h1>
                  
                  <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 drop-shadow-sm">
                    Internal dashboards, GPT integrations, and automated workflows that eliminate manual processing and save thousands of engineering hours.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
                    <Button href="#auto-scope" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20 rounded-full px-6 h-10 flex items-center gap-2 group transition-all text-[13px] font-bold border-0">
                      <span>Start Scope</span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </Button>
                    <Button href={localePath(locale, "/book-consultation")} className="bg-slate-900 hover:bg-slate-800 text-white shadow-md rounded-full px-6 h-10 flex items-center gap-2 group transition-all text-[13px] font-bold dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                      <span>Book Consultation</span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1 dark:bg-slate-900/10">
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* RIGHT: Floating Badges / Visuals */}
              <div className="hidden lg:flex flex-col gap-4 pl-12 relative z-10 h-full justify-center">
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-48 h-48 bg-indigo-400/20 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-3 w-56 ml-auto transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-foreground leading-tight">AI Intelligence</p>
                    <p className="text-[11px] text-muted-foreground font-medium">GPT-4 integration</p>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-3 w-64 transform translate-x-10 rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <GitMerge size={20} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-foreground leading-tight">Logic Mapping</p>
                    <p className="text-[11px] text-muted-foreground font-medium">Complex workflows</p>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-3 w-56 ml-auto transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="h-10 w-10 rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400 flex items-center justify-center shrink-0">
                    <LayoutDashboard size={20} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-foreground leading-tight">Unified Control</p>
                    <p className="text-[11px] text-muted-foreground font-medium">Custom dashboards</p>
                  </div>
                </div>
              </div>
              
            </div>
          </AnimatedSection>


          {/* 2. CORE CAPABILITIES (Bento 1/3 - 2/3) */}
          <AnimatedSection className="site-card overflow-hidden relative flex flex-col lg:flex-row gap-8 justify-between p-8 lg:p-12 border border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/5 dark:bg-white/5 transition-all duration-700 hover:border-indigo-500/30">
            <div className="lg:w-1/3">
              <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Core Capabilities</span>
              <h2 className="mb-4 text-3xl font-display font-black text-foreground leading-tight tracking-tight">
                Internal <br /> Productivity.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground font-medium mb-6">
                We build the "glue" between your existing systems—creating custom pipelines that automate repetitive data entry, analysis, and communication tasks.
              </p>
              <div className="flex flex-wrap gap-2 mt-2 border-t border-slate-200 dark:border-white/10 pt-4">
                {legacyTechStack.map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-100/50 dark:bg-white/5">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">Workflow Focus</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-500 dark:text-slate-400">
                {legacyFeatures.map((item) => (
                  <li key={item} className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-white/5 dark:bg-white/5 transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 mt-0.5">
                      <Workflow size={12} />
                    </div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>


          {/* 3. RELIABILITY PROTOCOL (Bento 1/3 - 2/3) */}
          <AnimatedSection className="site-card overflow-hidden relative flex flex-col lg:flex-row gap-8 justify-between p-8 lg:p-12 border border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/5 dark:bg-white/5 transition-all duration-700 hover:border-blue-500/30">
            <div className="lg:w-1/3">
              <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Automation Ops</span>
              <h2 className="mb-4 text-3xl font-display font-black text-foreground leading-tight tracking-tight">
                Engineered for <br /> Scale.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground font-medium mb-6">
                Technical infrastructure optimized for background task processing and 24/7 reliability.
              </p>
              <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 leading-relaxed italic border-l-2 border-blue-500/50 pl-4">
                Systems that perform flawlessly under pressure, processing data so your team doesn't have to.
              </p>
            </div>
            
            <div className="lg:w-2/3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">Foundation Pillars</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-500 dark:text-slate-400">
                {supportingPoints.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-white/5 dark:bg-white/5 transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/10">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 mt-0.5">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 leading-snug">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>


          {/* 4. EXPECTED OUTCOMES & TECH EXCELLENCE (Combined Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 mt-16 mb-6">
            <AnimatedSection className="md:col-span-8 site-card p-6 lg:p-8 relative overflow-hidden border border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/5 dark:bg-white/5 flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
              <h2 className="text-2xl lg:text-3xl font-display font-black text-slate-950 dark:text-foreground mb-5 tracking-tight">System Protocol</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                {coreFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-white/5 dark:bg-white/5 transition-colors hover:bg-indigo-50/50 hover:border-indigo-500/30 dark:hover:bg-white/10">
                    <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)] shrink-0" />
                    <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="md:col-span-4 site-card p-6 lg:p-8 relative overflow-hidden border border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/5 dark:bg-white/5">
               <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Outcomes</span>
               <h3 className="text-xl font-display font-black text-slate-950 dark:text-foreground mb-4">What to Expect</h3>
               <div className="space-y-3">
                 {legacyOutcomes.map((item) => (
                   <div key={item} className="flex items-start gap-2.5">
                     <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                     </div>
                     <span className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-snug">{item}</span>
                   </div>
                 ))}
               </div>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
             {[
               { 
                 icon: (
                   <svg viewBox="0 0 24 24" width="24" height="24" className="text-indigo-600 dark:text-indigo-400">
                     <path fill="currentColor" fillOpacity="0.2" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                     <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                   </svg>
                 ), 
                 title: "Cost Reduction", 
                 desc: "Lower overhead" 
               },
               { 
                 icon: (
                   <svg viewBox="0 0 24 24" width="24" height="24" className="text-indigo-600 dark:text-indigo-400">
                     <path fill="currentColor" fillOpacity="0.2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                     <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                   </svg>
                 ), 
                 title: "24/7 Processing", 
                 desc: "Always online" 
               },
               { 
                 icon: (
                   <svg viewBox="0 0 24 24" width="24" height="24" className="text-indigo-600 dark:text-indigo-400">
                     <path fill="currentColor" fillOpacity="0.2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                     <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                   </svg>
                 ), 
                 title: "Data Security", 
                 desc: "Encrypted pipelines" 
               },
               { 
                 icon: (
                   <svg viewBox="0 0 24 24" width="24" height="24" className="text-indigo-600 dark:text-indigo-400">
                     <path fill="currentColor" fillOpacity="0.2" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                     <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                   </svg>
                 ), 
                 title: "Instant Sync", 
                 desc: "Real-time updates" 
               }
             ].map((item, i) => (
               <AnimatedSection key={i} className="site-card p-4 lg:p-5 flex flex-col gap-2.5 items-center text-center border border-slate-200 bg-white/85 dark:border-white/5 dark:bg-white/5 hover:border-indigo-500/30 transition-all group">
                  <div className="h-10 w-10 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-[15px] font-display font-black text-slate-950 dark:text-foreground leading-tight">{item.title}</h3>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">{item.desc}</p>
               </AnimatedSection>
             ))}
          </div>


          {/* 6. RELATED SERVICES */}
          <AnimatedSection className="site-card p-10 lg:p-12 relative overflow-hidden border border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/5 dark:bg-white/5 mt-16">
            <h3 className="text-2xl font-display font-black text-slate-950 dark:text-foreground mb-2">Related Engineering Ecosystem</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 max-w-2xl font-medium">
              Explore specialized solutions that integrate seamlessly with your internal tooling infrastructure.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {webDevRelatedServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.href}
                    href={localePath(locale, service.href)}
                    className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-indigo-500/40 hover:bg-white hover:shadow-md dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/[0.05]"
                  >
                    <div className="mt-0.5 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <span className="block text-sm font-bold text-slate-950 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400 dark:text-white">
                        {service.label}
                      </span>
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        View <ArrowRight size={10} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center">
              <Link 
                href={localePath(locale, "/services")}
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors"
              >
                Explore Full Catalog <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>


          {/* 7. FINAL CTA / WIZARD */}
          <div id="auto-scope" className="pt-8">
            <AnimatedSection className="relative overflow-hidden rounded-[20px] border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 p-8 text-center md:p-10 shadow-sm dark:border-white/10 dark:from-white/5 dark:to-transparent mb-8">
              <div className="relative z-10">
                <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                  Project Scope
                </span>
                <h2 className="mb-3 text-2xl md:text-4xl font-display font-black text-foreground leading-tight">
                  Automate Your Operations
                </h2>
                <p className="mx-auto max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground font-medium">
                  Use the form below to share your current operational bottlenecks, systems, and logic requirements so we can architect the perfect automation solution.
                </p>
              </div>
            </AnimatedSection>
            
            <QuoteWizard 
              dict={dict} 
              isRtl={isRtl} 
              locale={locale} 
              preselectedService="Automation or Workflows" 
              allowedHelpOptions={["Automation or Workflows", "Web App", "Custom Website Development", "Not Sure Yet"]}
            />
          </div>

        </div>
      </Container>
    </main>
  );
}
