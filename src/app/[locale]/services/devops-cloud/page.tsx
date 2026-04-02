import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { localePath } from "@/lib/locale-path";

const coreFeatures = [
  "AWS/Azure Mastery",
  "CI/CD Orchestration",
  "Kubernetes Scaling",
  "Security Hardening",
];

const techStack = ["AWS", "Docker", "Kubernetes", "Terraform"];

const outcomes = [
  "Zero Downtime Deployment",
  "Infrastructure as Code",
  "SOC2 Ready Security",
  "Automated Scaling",
];

export default async function DevOpsCloudPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-6xl mx-auto space-y-24">
          
          {/* Hero Section */}
          <AnimatedSection className="text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--site-primary)]/10 border border-[var(--site-primary)]/20 text-[var(--site-primary)] mb-8 animate-in fade-in zoom-in duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--site-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--site-primary)]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Engineering Lab</span>
              <span className="w-px h-3 bg-[var(--site-primary)]/30 mx-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Cloud Lab</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-foreground leading-[1.1] text-balance">
              Cloud Infra & <br className="hidden md:block" /> <span className="text-[var(--site-primary)]">DevOps</span> Scaling.
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl leading-relaxed mx-auto">
              Secure, reliable cloud infrastructure and CI/CD pipelines designed for zero-downtime deployments and extreme system resilience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group">
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
            <AnimatedSection className="md:col-span-8 site-card p-10 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-indigo-500 to-purple-500" />
              <h2 className="text-3xl font-display font-black text-foreground mb-6 tracking-tight">System Resilience</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                We automate foundation-level infrastructure to ensure your applications remain available under heavy load and secure against modern threats.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coreFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 group">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)]" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-400">{f}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="md:col-span-4 site-card p-10 relative overflow-hidden bg-slate-50 dark:bg-midnight text-slate-900 dark:text-white flex flex-col justify-center border border-slate-200 dark:border-white/10">
              <h3 className="text-xl font-display font-black mb-6 text-emerald-600 dark:text-emerald-400">Security & Ops</h3>
              <div className="space-y-4">
                {outcomes.map(o => (
                  <div key={o} className="flex items-center gap-3 text-sm font-bold text-muted-foreground">
                    <CheckCircle2 size={16} className="text-[var(--site-primary)]" />
                    {o}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="md:col-span-12 site-card p-10 lg:p-12 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--site-primary)] to-transparent" />
               <h3 className="text-2xl font-display font-black text-foreground mb-8">Infrastructure Stack</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {techStack.map(t => (
                   <div key={t} className="p-4 rounded-xl border border-slate-200 dark:border-white/10 text-center font-bold text-muted-foreground bg-slate-50 dark:bg-white/5 uppercase tracking-widest text-[10px]">
                     {t}
                   </div>
                 ))}
               </div>
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </main>
  );
}

