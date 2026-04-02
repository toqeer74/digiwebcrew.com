import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { localePath } from "@/lib/locale-path";

const specs = [
  "Scalable Shopify integration",
  "Headless commerce architecture",
  "Stripe & payment orchestration",
  "Inventory & fulfillment automation",
];

const techStack = ["Next.js", "Shopify", "Stripe", "Postgres"];

const features = [
  "Custom Loyalty Systems",
  "Multi-currency support",
  "High-performance checkout",
  "Automated email marketing",
];

export default async function EcommercePage({ params }: { params: Promise<{ locale: string }> }) {
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
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Ecommerce Lab</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-foreground leading-[1.1] text-balance">
              Enterprise <span className="text-[var(--site-primary)]">Ecommerce</span> <br className="hidden md:block" /> Systems for Scaling.
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl leading-relaxed mx-auto">
              Scalable Shopify, Headless Commerce, and custom commerce solutions built to maximize conversion, loyalty, and average order value.
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

            <AnimatedSection className="md:col-span-12 site-card p-10 lg:p-12 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
              <h2 className="text-3xl font-display font-black text-foreground mb-6 tracking-tight">Enterprise Commerce Ops</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-4xl">
                We design and build high-performance storefronts that bridge the gap between premium design and technical infrastructure.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {specs.map((s, i) => (
                  <div key={i} className="site-card-interactive p-6 flex flex-col gap-3 group border-2 border-transparent hover:border-[var(--site-primary)]/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)] shadow-[0_0_8px_rgba(var(--site-primary-rgb),0.5)]" />
                    <span className="text-sm font-black text-foreground uppercase tracking-tight">{s}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="md:col-span-12 site-card p-10 lg:p-12 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--site-primary)] to-transparent" />
               <h3 className="text-2xl font-display font-black text-foreground mb-8">Modern High-Conversion Stack</h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                 {techStack.map(t => (
                   <div key={t} className="p-4 rounded-xl border border-slate-200 dark:border-white/10 text-center font-bold text-muted-foreground bg-slate-50 dark:bg-white/5 uppercase tracking-widest text-[10px]">
                     {t}
                   </div>
                 ))}
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                 {features.map(f => (
                   <div key={f} className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center gap-3">
                     <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                     <p className="font-bold text-sm text-foreground uppercase tracking-tight">{f}</p>
                   </div>
                 ))}
               </div>
            </AnimatedSection>
        </div>
      </Container>
    </main>
  );
}

