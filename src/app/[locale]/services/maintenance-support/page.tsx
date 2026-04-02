import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { localePath } from "@/lib/locale-path";

const coreFeatures = [
  "24/7 System Monitoring",
  "Security Audit Cycles",
  "Performance Tuning",
  "Emergency Hotfix SLA",
];

const techStack = ["Sentry", "Grafana", "Datadog", "New Relic"];

const outcomes = [
  "99.99% Uptime Guarantee",
  "Sub-15m Incident Response",
  "Continuous Security Compliance",
  "Predictive Resource Scaling",
];

export default async function MaintenanceSupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-6xl mx-auto space-y-24">
          
          {/* Hero Section */}
          <AnimatedSection className="text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 mb-8 animate-in fade-in zoom-in duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Engineering Lab</span>
              <span className="w-px h-3 bg-emerald-500/30 mx-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Support Lab</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-foreground leading-[1.1] text-balance">
              SLA-Backed <br className="hidden md:block" /> <span className="text-emerald-500">Engineering</span> Support.
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl leading-relaxed mx-auto">
              Performance monitoring, security patching, and proactive care plans designed to keep your mission-critical systems running 24/7/365.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-slate-900 shadow-xl group">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
              <Link href={localePath(locale, "/quote")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-white font-bold px-10 py-5 transition-all hover:bg-white dark:hover:bg-white/10 group">
                <span>Get Quote</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <AnimatedSection className="md:col-span-5 site-card p-10 relative overflow-hidden bg-slate-50 dark:bg-white/5 border-slate-200">
               <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
              <h2 className="text-2xl font-display font-black text-foreground mb-6 tracking-tight uppercase tracking-widest text-xs opacity-50">Support Tiers</h2>
              <div className="space-y-6">
                {coreFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                       <CheckCircle2 size={20} />
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-400">{f}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="md:col-span-7 site-card p-10 relative overflow-hidden bg-slate-50 dark:bg-midnight text-slate-900 dark:text-white flex flex-col border border-slate-200 dark:border-white/10">
               <h3 className="text-3xl font-display font-black mb-8 text-foreground">Performance & Security Outcomes</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {outcomes.map(o => (
                   <div key={o}>
                     <p className="text-emerald-600 dark:text-emerald-400 font-black text-lg mb-2">{o.split(' ')[0]}</p>
                     <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">{o.split(' ').slice(1).join(' ')}</p>
                   </div>
                 ))}
               </div>
               <div className="mt-auto pt-10 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-4">
                  {techStack.map(t => (
                    <span key={t} className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{t}</span>
                  ))}
               </div>
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </main>
  );
}

