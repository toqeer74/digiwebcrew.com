import Link from "next/link";
import { ArrowRight, Code, Database, Cpu, Layers, Search, Zap, Target, Wrench, Rocket, Monitor, Smartphone, Globe, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { localePath } from "@/lib/locale-path";
import { StatCube, Hexagon, MethodologyNode, ProjectPreview, ProcessFlowLine } from "./homepage-visuals";

interface HomePageCardsProps {
  locale: string;
  homepageData: any;
  homePricingData: any;
}

const mockProjects = [
  { title: "Landio AI", category: "Web App", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60" },
  { title: "CryptoDash", category: "Fintech", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60" },
  { title: "Solaris", category: "E-Commerce", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=60" },
];

const techIcons = [
  { icon: <Code size={22} className="text-sky-400" />, label: "Next.js" },
  { icon: <Database size={22} className="text-emerald-400" />, label: "Backend" },
  { icon: <Cpu size={22} className="text-violet-400" />, label: "AI/ML" },
  { icon: <Layers size={22} className="text-amber-400" />, label: "Arch" },
  { icon: <Search size={22} className="text-rose-400" />, label: "SEO" },
  { icon: <Zap size={22} className="text-yellow-400" />, label: "Speed" },
];

export function HomePageCards({ locale, homepageData, homePricingData }: HomePageCardsProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Row 1 - Work + Process */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedSection className="site-card site-card-interactive group overflow-hidden relative flex flex-col justify-between p-8 transition-all duration-700 dark:hover:shadow-[0_40px_80px_-20px_rgba(var(--site-primary-rgb),0.3)] dark:border-white/10 hover:border-[var(--site-primary)]/30">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#60A5FA] via-[var(--site-primary)] to-[#60A5FA] z-20 opacity-50" />
          <div className="hidden dark:block absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[rgba(var(--site-primary-rgb),0.08)] blur-[80px] group-hover:bg-[rgba(var(--site-primary-rgb),0.15)] transition-all duration-1000" />
          
          <div className="relative z-10 mb-8">
            <span className="mb-4 inline-block rounded-full bg-[rgba(var(--site-primary-rgb),0.1)] border border-[var(--site-primary)]/20 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--site-primary)]">{homepageData.selectedWork.eyebrow}</span>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {mockProjects.slice(0, 2).map((p, i) => (
                <ProjectPreview key={p.title} {...p} index={i} />
              ))}
            </div>
          </div>
          
          <div className="relative z-10 mt-auto">
            <h2 className="mb-2 text-2xl font-display font-black tracking-tight text-slate-950 dark:text-white">{homepageData.selectedWork.title}</h2>
            <Link href={localePath(locale, "/case-studies")} className="inline-flex items-center gap-2 font-bold text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] text-sm group/link">
              View Work <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection className="site-card site-card-interactive group overflow-hidden relative flex flex-col justify-between p-8 transition-all duration-700 dark:hover:shadow-[0_40px_80px_-20px_rgba(167,139,250,0.25)] dark:border-white/10 hover:border-violet-500/30">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#A78BFA] via-violet-500 to-[#A78BFA] z-20 opacity-50" />
          
          <div className="relative z-10 mb-8">
            <span className="mb-4 inline-block rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-violet-400">Our Process</span>
            <h2 className="mb-8 text-2xl font-display font-black tracking-tight leading-tight text-slate-950 dark:text-white">{homepageData.methodology.title}</h2>
            
            <div className="relative flex justify-between items-start px-2 py-8 mt-4">
              <ProcessFlowLine />
              <MethodologyNode label="Discover" icon={<Search size={20} />} isActive />
              <MethodologyNode label="Scope" icon={<Target size={20} />} isActive />
              <MethodologyNode label="Build" icon={<Wrench size={20} />} isActive />
              <MethodologyNode label="Launch" icon={<Rocket size={20} />} isActive />
            </div>
          </div>
          
          <Link href={localePath(locale, "/process")} className="relative z-10 inline-flex items-center gap-2 font-bold text-violet-400 text-sm group/link mt-auto">
            Explore Workflow <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </AnimatedSection>
      </div>

      {/* Row 2 - Capabilities + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedSection className="site-card site-card-interactive group overflow-hidden relative flex flex-col justify-between p-8 lg:p-10 transition-all duration-700 dark:hover:shadow-[0_40px_80px_-20px_rgba(var(--site-primary-rgb),0.2)] dark:border-white/10 hover:border-[var(--site-primary)]/30">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA] z-20 opacity-50" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
            <div className="space-y-5">
              <span className="inline-block rounded-full bg-[rgba(var(--site-primary-rgb),0.1)] border border-[var(--site-primary)]/20 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--site-primary)]">Our Stack</span>
              <h2 className="text-3xl font-display font-black leading-tight tracking-tight text-slate-950 dark:text-white">{homepageData.capabilitiesSection.title}</h2>
              <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">{homepageData.capabilitiesSection.description}</p>
            </div>
            
            <div className="relative h-56 flex items-center justify-center translate-x-4">
              <div className="grid grid-cols-3 gap-2 rotate-[12deg]">
                {techIcons.map((t, i) => (
                  <Hexagon key={t.label} index={i} className={i % 2 === 0 ? "translate-y-4" : "-translate-y-4"}>
                    {t.icon}
                  </Hexagon>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="site-card group overflow-hidden relative flex flex-col justify-between p-8 lg:p-10 bg-[linear-gradient(135deg,rgba(var(--site-primary-rgb),0.15),rgba(52,211,153,0.08))] border-white/5">
          <div className="hidden dark:block absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[rgba(var(--site-primary-rgb),0.12)] blur-[100px] group-hover:scale-125 transition-transform duration-1000" />
          
          <div className="grid grid-cols-2 gap-5 relative z-10">
            {homepageData.proofStats.map((stat: any, i: number) => (
              <StatCube 
                key={stat.label} 
                label={stat.label} 
                value={stat.num} 
                delay={i * 0.1} 
              />
            ))}
          </div>
          
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mt-8 flex items-center gap-2 relative z-10">
            <span className="h-2 w-2 rounded-full bg-[var(--site-primary)] dark:shadow-[0_0_10px_rgba(var(--site-primary-rgb),0.5)] animate-pulse" />
            {homepageData.proofCaption}
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}
