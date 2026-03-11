import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Code2, Zap, Globe, Smartphone } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { localePath } from "@/lib/locale-path";
import { QuoteWizard } from "@/components/sections/quote-wizard";

const supportingPoints = [
  "Custom-tailored solutions",
  "Scalable architecture",
  "Modern tech stack",
  "Responsive design",
  "SEO optimized",
];

export default async function CustomWebAppsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === 'ar' || locale === 'ur';

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
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">App Lab</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-slate-950 dark:text-[#F8F8FF] leading-[1.1] text-balance">
              Custom <span className="text-[var(--site-primary)]">Web</span> Applications <br className="hidden md:block" /> for Complex Needs.
            </h1>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-12 max-w-3xl leading-relaxed mx-auto">
              Bespoke web applications tailored to your unique business requirements. We build scalable, secure, and performant web solutions that drive growth.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <AnimatedSection className="md:col-span-8 site-card p-10 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
              <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Built for Scale</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {supportingPoints.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-[#94A3B8]">
                    <CheckCircle2 size={16} className="text-[var(--site-primary)]" />
                    {s}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="md:col-span-4 site-card p-10 relative overflow-hidden bg-slate-900 text-white flex flex-col justify-center">
               <div className="flex items-center gap-3 mb-4 text-[var(--site-primary)]">
                <Shield size={24} />
                <span className="font-display font-black">Secure & Reliable</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-bold">
                Built with security best practices and reliable deployment strategies for peace of mind.
              </p>
            </AnimatedSection>

            <AnimatedSection className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { icon: <Code2 />, title: "Clean Code", desc: "Maintainable and well-documented" },
                 { icon: <Zap />, title: "High Performance", desc: "Optimized for speed" },
                 { icon: <Globe />, title: "Global Ready", desc: "Multi-language support" },
                 { icon: <Smartphone />, title: "Mobile First", desc: "Responsive design" }
               ].map((item, i) => (
                 <div key={i} className="site-card p-8 flex flex-col gap-4">
                    <div className="text-[var(--site-primary)]">{item.icon}</div>
                    <h3 className="font-display font-black text-slate-950 dark:text-[#F8F8FF]">{item.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">{item.desc}</p>
                 </div>
               ))}
            </AnimatedSection>
          </div>

          <AnimatedSection className="site-card p-12 overflow-hidden relative">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--site-primary)] to-transparent" />
             <div className="max-w-4xl mx-auto">
               <h2 className="text-3xl font-display font-black text-center mb-12">Move Forward With A Quote</h2>
               <QuoteWizard dict={dict} isRtl={isRtl} locale={locale} preselectedService="custom-web-apps" />
             </div>
          </AnimatedSection>
        </div>
      </Container>
    </main>
  );
}

