import Link from "next/link";
import { Container } from "@/components/layout/layout-primitives";
import { QuoteWizard } from "@/components/sections/quote-wizard";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { localePath } from "@/lib/locale-path";
import { TechStackDisplay } from "@/components/sections/tech-stack-display";
import { 
  Layout, 
  Globe, 
  ShoppingCart, 
  Cloud, 
  Wrench, 
  TrendingUp, 
  Bot, 
  Search,
  ArrowRight,
  CheckCircle2,
  Shield,
  Code2,
  Zap,
  Smartphone
} from "lucide-react";

const coreFeatures = [
  "Server-Side Rendering",
  "Image Optimization",
  "Edge-Side Delivery",
  "High-Conversion UI/UX",
];

const supportingPoints = [
  "Custom-tailored solutions",
  "Scalable architecture",
  "Modern tech stack",
  "Responsive design",
  "SEO optimized",
];

const legacyFeatures = [
  "Enterprise Architecture",
  "Microservices Design",
  "Scalable Cloud APIs",
  "Legacy system migration",
];

const legacyTechStack = ["Next.js", "TypeScript", "PostgreSQL", "Docker"];

const legacyOutcomes = [
  "99.9% System Availability",
  "Scalability for 1M+ Users",
  "zero legacy debt architecture",
  "Reduced Operational Costs",
];

const webDevRelatedServices = [
  { label: "E-commerce Development", href: "/services/ecommerce", icon: ShoppingCart },
  { label: "DevOps & Cloud", href: "/services/devops-cloud", icon: Cloud },
  { label: "Maintenance & Support", href: "/services/maintenance-support", icon: Wrench },
  { label: "Conversion Funnels", href: "/services/conversion-funnels", icon: TrendingUp },
  { label: "AI Chatbots & Automation", href: "/services/ai-chatbots-automation", icon: Bot },
  { label: "SEO & Growth Retainers", href: "/services/seo-growth-retainers", icon: Search },
];

export default async function CustomSoftwarePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = (await getDictionary(locale)) as any;
  const isRtl = locale === "ar" || locale === "ur";

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="max-w-5xl mx-auto space-y-8 mb-10">
          {/* Hero Section */}
          <AnimatedSection className="text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--site-primary)]/10 border border-[var(--site-primary)]/20 text-[var(--site-primary)] mb-8 animate-in fade-in zoom-in duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--site-primary)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--site-primary)]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Engineering Lab</span>
              <span className="w-px h-3 bg-[var(--site-primary)]/30 mx-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Architecture Lab</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight mb-8 text-slate-950 dark:text-[#F8F8FF] leading-[1.1] text-balance">
              Custom Software Scope <br className="hidden md:block" /> Built for <span className="text-[var(--site-primary)]">Business Goals.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] mb-12 max-w-3xl leading-relaxed mx-auto">
              Share your requirements and constraints for custom software, and we will map the right architecture, scope, and next implementation path.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#custom-software-scope" className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-10 py-5 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_26px_60px_-36px_rgba(var(--site-primary-rgb),0.5)] group">
                <span>Start Scope</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/16 ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
              <Link href={localePath(locale, "/book-consultation")} className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/90 text-slate-950 dark:border-white/15 dark:bg-white/5 dark:text-[#F8F8FF] font-bold px-10 py-5 transition-all hover:bg-white dark:hover:bg-white/10 group">
                <span>Book Consultation</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/5 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </AnimatedSection>


        </div>

        <div className="max-w-5xl mx-auto space-y-12 mb-20">
          <AnimatedSection className="site-card p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Custom Software Engineering Solutions</h2>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] leading-relaxed max-w-4xl">
              We build industrial-grade applications designed to solve unique business challenges with scalable architecture and clean code.
            </p>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
            <h3 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-8">Core Engineering Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {legacyFeatures.map((item) => (
                <div key={item} className="site-card p-4 flex items-center gap-3 text-slate-700 dark:text-[#94A3B8] font-bold uppercase tracking-wider text-[11px] bg-slate-50/50 dark:bg-white/5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)] shadow-[0_0_8px_rgba(var(--site-primary-rgb),0.5)]" />
                  {item}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
            <h3 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-8">Industrial Tech Stack</h3>
            <div className="flex flex-wrap gap-3">
              {legacyTechStack.map((item) => (
                <span key={item} className="px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-700 dark:text-[#94A3B8] bg-slate-100/50 dark:bg-white/5">
                  {item}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <AnimatedSection className="md:col-span-8 site-card p-10 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
              <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Built for Scale</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {supportingPoints.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-400">
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

          <AnimatedSection className="site-card p-10 lg:p-12 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6 tracking-tight">Technical Excellence Protocol</h2>
            <p className="text-slate-600 dark:text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-4xl">
              We build industrial-grade websites that prioritize speed, security, and search engine visibility through modern full-stack engineering.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {coreFeatures.map((f, i) => (
                <div key={i} className="site-card-interactive p-6 flex flex-col gap-3 group border-2 border-transparent hover:border-[var(--site-primary)]/20">
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)] shadow-[0_0_8px_rgba(var(--site-primary-rgb),0.5)]" />
                  <span className="text-sm font-black text-slate-950 dark:text-[#F8F8FF] uppercase tracking-tight">{f}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
            <h3 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-8">Expected Outcomes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {legacyOutcomes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-slate-700 dark:text-[#94A3B8] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="site-card p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
            <h3 className="text-2xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-6">Related Engineering Services</h3>
            <p className="text-slate-600 dark:text-[#94A3B8] mb-10 max-w-2xl leading-relaxed">
              Explore other specialized solutions that integrate seamlessly with custom software ecosystems.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {webDevRelatedServices.map((service) => (
                <Link
                  key={service.href}
                  href={localePath(locale, service.href)}
                  className="site-card-interactive p-6 flex flex-col gap-4 group/card border-2 border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/[0.02] hover:border-[var(--site-primary)]/40 hover:bg-white dark:hover:bg-white/5 transition-all duration-300"
                >
                  <div className="h-10 w-10 rounded-xl bg-[var(--site-primary)]/10 flex items-center justify-center text-[var(--site-primary)] group-hover/card:scale-110 transition-transform">
                    <service.icon size={20} />
                  </div>
                  <div>
                    <span className="text-sm font-black text-slate-950 dark:text-[#F8F8FF] tracking-tight block mb-1">{service.label}</span>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--site-primary)] opacity-0 group-hover/card:opacity-100 transition-all -translate-x-2 group-hover/card:translate-x-0">
                      View Scope <ArrowRight size={10} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href={localePath(locale, "/services")}
              className="inline-flex items-center justify-center px-10 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-950 dark:text-white font-bold rounded-full hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm"
            >
              Explore Full Catalog
            </Link>
          </AnimatedSection>
        </div>

        <div className="mb-20 max-w-6xl mx-auto">
          <TechStackDisplay />
        </div>

        <div id="custom-software-scope" className="space-y-8">
          <AnimatedSection className="site-card p-10 lg:p-12 relative overflow-hidden border-2 border-[var(--site-primary)]/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] to-transparent" />
            <h2 className="text-3xl font-display font-black text-slate-950 dark:text-[#F8F8FF] mb-4">Tell Us About Your Project</h2>
            <p className="text-lg text-slate-600 dark:text-[#94A3B8] max-w-2xl leading-relaxed">
              Use the form below to share your objectives, timeline, and technical direction so we can define a clear build scope for your custom software system.
            </p>
          </AnimatedSection>
          <QuoteWizard dict={dict} isRtl={isRtl} locale={locale} preselectedService="Development" />
        </div>

      </Container>
    </main>

  );
}
