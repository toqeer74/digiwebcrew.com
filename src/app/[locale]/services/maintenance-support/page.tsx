import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionKicker } from "@/components/ui/section-kicker";
import { localePath } from "@/lib/locale-path";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceSchema } from "@/lib/seo";
import { RelatedGuides } from "@/components/sections/related-guides";
import { SERVICE_CLUSTERS } from "@/lib/content-clusters";

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/services/maintenance-support",
    title: "Website Maintenance & Support Plans",
    description: "Proactive maintenance, security patching, uptime monitoring, and a named engineer on call. Keep your site fast, secure, and online.",
    keywords: ["website maintenance services", "web support retainer", "website security monitoring"],
  });
}

export default async function MaintenanceSupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main className="flex-1 pt-32 pb-24">
      <JsonLd
        schema={serviceSchema({
          locale,
          path: "/services/maintenance-support",
          name: "Website Maintenance & Support",
          description: "Proactive maintenance, security patching, uptime monitoring, and a named engineer on call.",
          serviceType: "MaintenanceService",
        })}
      />
      <Container>
        <div className="max-w-6xl mx-auto space-y-24">
          
          {/* Hero Section */}
          <AnimatedSection className="text-center flex flex-col items-center">
            <SectionKicker label="Maintenance & Support" />

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-foreground leading-[1.1] text-balance">
              SLA-Backed <br className="hidden md:block" /> <span className="text-[var(--site-primary)]">Engineering</span> Support.
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl leading-relaxed mx-auto">
              Performance monitoring, security patching, and proactive care plans designed to keep your mission-critical systems running 24/7/365.
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
      <RelatedGuides
        locale={locale}
        slugs={SERVICE_CLUSTERS["maintenance-support"]}
      />
    </main>
  );
}

