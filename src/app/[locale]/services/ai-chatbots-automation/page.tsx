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
  Bot,
  Zap,
  Network,
  Activity,
  Layers,
  Database,
  Workflow
} from "lucide-react";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema } from "@/lib/seo";
import { RelatedGuides } from "@/components/sections/related-guides";
import { SERVICE_CLUSTERS } from "@/lib/content-clusters";

// AI Specific Data
const coreFeatures = [
  "Context-Aware NLP",
  "Multi-Channel Workflows",
  "Seamless CRM Sync",
  "Intelligent Escalation",
];

const supportingPoints = [
  "Built for faster response times",
  "Designed around real business tasks",
  "Connected to forms and CRM",
  "Scales without adding chaos",
];

const legacyFeatures = [
  "Website Chatbots",
  "Lead Qualification",
  "CRM Automation",
  "Email Follow-up",
];

const legacyTechStack = ["OpenAI", "LangChain", "Make", "Zapier"];

const legacyOutcomes = [
  "24/7 Lead Engagement",
  "Instant Response Times",
  "Reduced Admin Hours",
  "Higher Conversion Rates",
];

const webDevRelatedServices = [
  { label: "Conversion Funnels", href: "/services/conversion-funnels", icon: Activity },
  { label: "Custom Software", href: "/services/custom-software", icon: Layers },
  { label: "Maintenance & Support", href: "/services/maintenance-support", icon: Database },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/services/ai-chatbots-automation",
    title: "AI Chatbot & Workflow Automation Development",
    description: "Custom AI chatbots, RAG assistants, and workflow automation that cut manual work. Built on your own data with measurable time and cost savings.",
    keywords: ["AI chatbot development", "workflow automation agency", "RAG chatbot", "business process automation"],
  });
}

export default async function AIChatbotsAutomationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = (await getDictionary(locale)) as any;
  const isRtl = locale === "ar" || locale === "ur";

  return (
    <main className="flex-1 -mt-28 overflow-x-hidden pt-28 relative">
      <JsonLd
        schema={serviceSchema({
          locale,
          path: "/services/ai-chatbots-automation",
          name: "AI Chatbot & Workflow Automation",
          description: "Custom AI chatbots, RAG assistants, and workflow automation built on your own data.",
          serviceType: "AutomationService",
        })}
      />
      {/* Background Visuals */}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/15 via-[var(--site-primary)]/5 to-background" />
        <div className="absolute top-0 left-0 right-0 h-[1000px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-7xl mx-auto space-y-6 pt-12 pb-24">
          
          {/* 1. HERO SECTION */}
          <AnimatedSection immediate className="pt-0 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4 items-center relative">
              
              {/* LEFT: Typography & Graphic */}
              <div className="relative z-10 text-center lg:text-left">
                {/* Background Scribble Graphic */}
                <div className="absolute top-1/2 left-1/2 lg:-left-20 -translate-x-1/2 lg:translate-x-0 -translate-y-[45%] w-[110%] lg:w-[130%] h-[300px] opacity-15 dark:opacity-20 pointer-events-none -rotate-3 z-0 mix-blend-multiply dark:mix-blend-screen max-w-[800px]">
                  <svg viewBox="-50 -50 500 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="heroStripeGradientAI" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#d946ef" />
                      </linearGradient>
                    </defs>
                    <path d="M-40 120 C 20 -60, 140 -40, 160 100 C 180 260, 260 260, 300 140 C 340 20, 420 20, 460 120" stroke="url(#heroStripeGradientAI)" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 mb-5 shadow-sm backdrop-blur-md mx-auto lg:mx-0">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-600 dark:bg-purple-400" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-700 dark:text-purple-300">
                      Intelligent Automation
                    </span>
                  </div>
                  
                  <h1 className="text-[3rem] md:text-[4rem] font-black font-display text-slate-900 dark:text-white tracking-tight mb-4 leading-[1.05] text-balance drop-shadow-sm">
                    Workflows Built for <br className="hidden md:block" /> 
                    <span className="bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">Instant Scale.</span>
                  </h1>
                  
                  <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 drop-shadow-sm">
                    We build practical chatbot and automation systems that help businesses capture leads, qualify inquiries, and accelerate communication.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
                    <Button href="#ai-scope" className="bg-purple-600 hover:bg-purple-700 text-white shadow-xl shadow-purple-500/20 rounded-full px-6 h-10 flex items-center gap-2 group transition-all text-[13px] font-bold border-0">
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
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-48 h-48 bg-purple-400/20 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-3 w-56 ml-auto transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Bot size={20} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-foreground leading-tight">Smart Agents</p>
                    <p className="text-[11px] text-muted-foreground font-medium">Always-on responses</p>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-3 w-64 transform translate-x-10 rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="h-10 w-10 rounded-full bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400 flex items-center justify-center shrink-0">
                    <Zap size={20} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-foreground leading-tight">Instant Handoff</p>
                    <p className="text-[11px] text-muted-foreground font-medium">Zero friction routing</p>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-3 w-56 ml-auto transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Network size={20} />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-foreground leading-tight">Deep Integrations</p>
                    <p className="text-[11px] text-muted-foreground font-medium">Syncs with CRM</p>
                  </div>
                </div>
              </div>
              
            </div>
          </AnimatedSection>


          {/* 2. CORE CAPABILITIES (Bento 1/3 - 2/3) */}
          <AnimatedSection className="site-card overflow-hidden relative flex flex-col lg:flex-row gap-8 justify-between p-8 lg:p-12 border border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/5 dark:bg-white/5 transition-all duration-700 hover:border-purple-500/30">
            <div className="lg:w-1/3">
              <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">Core Capabilities</span>
              <h2 className="mb-4 text-3xl font-display font-black text-foreground leading-tight tracking-tight">
                Automated <br /> Intelligence.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground font-medium mb-6">
                We build scalable workflows designed to solve communication delays without losing the human touch.
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
                  <li key={item} className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-white/5 dark:bg-white/5 transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-50 dark:hover:bg-purple-500/10">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 mt-0.5">
                      <Workflow size={12} />
                    </div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>


          {/* 3. RELIABILITY PROTOCOL (Bento 1/3 - 2/3) */}
          <AnimatedSection className="site-card overflow-hidden relative flex flex-col lg:flex-row gap-8 justify-between p-8 lg:p-12 border border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/5 dark:bg-white/5 transition-all duration-700 hover:border-emerald-500/30">
            <div className="lg:w-1/3">
              <span className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Reliability Protocol</span>
              <h2 className="mb-4 text-3xl font-display font-black text-foreground leading-tight tracking-tight">
                Designed for <br /> Stability.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground font-medium mb-6">
                Fail-safes and human-handoff strategies designed for absolute peace of mind.
              </p>
              <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-400 leading-relaxed italic border-l-2 border-emerald-500/50 pl-4">
                Systems that perform under pressure, keeping leads warm while you work.
              </p>
            </div>
            
            <div className="lg:w-2/3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">Foundation Pillars</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-500 dark:text-slate-400">
                {supportingPoints.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-white/5 dark:bg-white/5 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-500/10">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mt-0.5">
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
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent pointer-events-none" />
              <h2 className="text-2xl lg:text-3xl font-display font-black text-slate-950 dark:text-foreground mb-5 tracking-tight">AI & Automation Protocol</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                {coreFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 dark:border-white/5 dark:bg-white/5 transition-colors hover:bg-purple-50/50 hover:border-purple-500/30 dark:hover:bg-white/10">
                    <div className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)] shrink-0" />
                    <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="md:col-span-4 site-card p-6 lg:p-8 relative overflow-hidden border border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/5 dark:bg-white/5">
               <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">Outcomes</span>
               <h3 className="text-xl font-display font-black text-slate-950 dark:text-foreground mb-4">What to Expect</h3>
               <div className="space-y-3">
                 {legacyOutcomes.map((item) => (
                   <div key={item} className="flex items-start gap-2.5">
                     <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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
                   <svg viewBox="0 0 24 24" width="24" height="24" className="text-purple-600 dark:text-purple-400">
                     <path fill="currentColor" fillOpacity="0.2" d="M12 4l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" />
                     <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 4l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1 3-6z" />
                   </svg>
                 ), 
                 title: "Natural Language", 
                 desc: "Human-like interaction" 
               },
               { 
                 icon: (
                   <svg viewBox="0 0 24 24" width="24" height="24" className="text-purple-600 dark:text-purple-400">
                     <path fill="currentColor" fillOpacity="0.2" d="M13 3L4 14h7l-2 7 9-11h-7z" />
                     <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                   </svg>
                 ), 
                 title: "Instant Routing", 
                 desc: "Zero delay handoffs" 
               },
               { 
                 icon: (
                   <svg viewBox="0 0 24 24" width="24" height="24" className="text-purple-600 dark:text-purple-400">
                     <path fill="currentColor" fillOpacity="0.2" d="M4 4h16v16H4z" />
                     <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4zm0 8h16M8 4v16" />
                   </svg>
                 ), 
                 title: "Deep Sync", 
                 desc: "Native CRM updates" 
               },
               { 
                 icon: (
                   <svg viewBox="0 0 24 24" width="24" height="24" className="text-purple-600 dark:text-purple-400">
                     <path fill="currentColor" fillOpacity="0.2" d="M4 6h16v12H4z" />
                     <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4zm8 0v12M4 12h16" />
                   </svg>
                 ), 
                 title: "Omnichannel", 
                 desc: "Web, SMS, Social" 
               }
             ].map((item, i) => (
               <AnimatedSection key={i} className="site-card p-4 lg:p-5 flex flex-col gap-2.5 items-center text-center border border-slate-200 bg-white/85 dark:border-white/5 dark:bg-white/5 hover:border-purple-500/30 transition-all group">
                  <div className="h-10 w-10 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
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
              Explore specialized solutions that integrate seamlessly with your automation infrastructure.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {webDevRelatedServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.href}
                    href={localePath(locale, service.href)}
                    className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-purple-500/40 hover:bg-white hover:shadow-md dark:border-white/5 dark:bg-white/[0.02] dark:hover:bg-white/[0.05]"
                  >
                    <div className="mt-0.5 text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <span className="block text-sm font-bold text-slate-950 transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400 dark:text-white">
                        {service.label}
                      </span>
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
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
                className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
              >
                Explore Full Catalog <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>


          {/* 7. FINAL CTA / WIZARD */}
          <div id="ai-scope" className="pt-8">
            <AnimatedSection className="relative overflow-hidden rounded-[20px] border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 p-8 text-center md:p-10 shadow-sm dark:border-white/10 dark:from-white/5 dark:to-transparent mb-8">
              <div className="relative z-10">
                <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                  Project Scope
                </span>
                <h2 className="mb-3 text-2xl md:text-4xl font-display font-black text-foreground leading-tight">
                  Automate Your Workflows
                </h2>
                <p className="mx-auto max-w-2xl text-sm md:text-base leading-relaxed text-muted-foreground font-medium">
                  Use the form below to share your lead flow, current tools, and operational bottlenecks so we can map out a targeted automation strategy.
                </p>
              </div>
            </AnimatedSection>
            
            <QuoteWizard 
              dict={dict} 
              isRtl={isRtl} 
              locale={locale} 
              preselectedService="Development" 
              allowedHelpOptions={["AI Chatbot", "Automation or Workflows", "Not Sure Yet"]}
            />
          </div>

        </div>
      </Container>
      <RelatedGuides
        locale={locale}
        slugs={SERVICE_CLUSTERS["ai-chatbots-automation"]}
      />
    </main>
  );
}
