import Link from "next/link";
import { ArrowRight, Target, Zap, Shield, Sparkles, Building2, Code2, LineChart, MessageSquare, CheckCircle2, Rocket } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { getDictionary } from "@/lib/get-dictionary";
import { getTeamData, getTrustedPlatformsData, getBlogPosts } from "@/lib/content-engine";
import { TeamSection } from "@/components/sections/team-section";
import { TrustedPlatforms } from "@/components/sections/trusted-platforms";
import { BlogInsightsPreview } from "@/components/sections/blog-insights-preview";
import { ServicesGrid } from "@/components/sections/services-grid";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionKicker } from "@/components/ui/section-kicker";
import { localePath } from "@/lib/locale-path";
import { FluidBackground } from "@/components/sections/homepage-visuals";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

const supportingPoints = [
  "Built for businesses that need more than a basic website",
  "Focused on clarity, performance, and growth",
  "Structured for real business use, not just visual presentation",
  "Designed to support both launch and long-term improvement",
];

const values = [
  { title: "Clarity over confusion", desc: "A website or digital system should make the business easier to understand, not harder.", icon: Target, color: "text-blue-500", bg: "bg-blue-50", darkBg: "dark:bg-blue-500/10", ring: "ring-blue-500/20" },
  { title: "Quality over shortcuts", desc: "Good work needs structure, thought, and proper execution. Quick fixes usually create bigger problems later.", icon: Shield, color: "text-emerald-500", bg: "bg-emerald-50", darkBg: "dark:bg-emerald-500/10", ring: "ring-emerald-500/20" },
  { title: "Strategy over guesswork", desc: "The build should reflect real goals, real priorities, and the actual needs of the business.", icon: LineChart, color: "text-orange-500", bg: "bg-orange-50", darkBg: "dark:bg-orange-500/10", ring: "ring-orange-500/20" },
  { title: "Custom work over generic", desc: "Different businesses need different solutions. One-size-fits-all work rarely supports growth well.", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-50", darkBg: "dark:bg-purple-500/10", ring: "ring-purple-500/20" },
  { title: "Modern systems over outdated", desc: "Businesses need digital tools and structures that match how people search, browse, decide, and contact today.", icon: Zap, color: "text-amber-500", bg: "bg-amber-50", darkBg: "dark:bg-amber-500/10", ring: "ring-amber-500/20" },
];

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "150+", label: "Projects Launched" },
  { value: "99%", label: "Client Retention" },
  { value: "24/7", label: "Automation Support" },
];

const builds = [
  { name: "Custom websites", icon: Code2 },
  { name: "Landing pages and funnels", icon: LineChart },
  { name: "SEO improvements and growth", icon: Target },
  { name: "Chatbot and automation systems", icon: MessageSquare },
  { name: "Connected digital infrastructure", icon: Building2 },
];

const fit = [
  "Law firms",
  "Clinics, dental practices, and med spas",
  "Home service businesses",
  "Consultants, coaches, and agencies",
  "SaaS and B2B service companies",
  "Education and training businesses",
];

const faqItems = [
  { value: "faq-1", title: "What kind of agency is Digi Web Crew?", content: "Digi Web Crew is a web, funnels, SEO, and automation agency focused on helping businesses build stronger digital systems for growth." },
  { value: "faq-2", title: "Do you only work on websites?", content: "No. We also work on landing pages, SEO support, chatbot systems, automation, and broader digital infrastructure depending on the project." },
  { value: "faq-3", title: "Do you work with businesses in the US and Canada?", content: "Yes. Those are the primary target markets, with room to work with other strong-fit clients as well." },
  { value: "faq-4", title: "Are you focused on certain industries?", content: "Yes. We are especially well aligned with law firms, clinics, home services, consultants, SaaS, and education-related businesses." },
  { value: "faq-5", title: "Can I start with one service and expand later?", content: "Yes. Many projects begin with one focused service and grow into a broader digital system over time." },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/about",
    title: "About Our Engineering Team",
    description: "A senior engineering team building custom software and AI automation for US and UK companies. Who we are, and how we work.",
    keywords: ["about digi web crew", "software development team"],
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [, teamData, trustedPlatformsData, blogPostsRaw] = await Promise.all([
    getDictionary(locale),
    getTeamData(locale),
    getTrustedPlatformsData(locale),
    getBlogPosts(),
  ]);
  const featuredPosts = blogPostsRaw.slice(0, 3);

  const sectionCardClass = "site-card overflow-hidden relative p-6 md:p-8 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 dark:border-white/5 dark:bg-white/5";
  const interactiveCardClass = "site-card site-card-interactive overflow-hidden relative p-6 md:p-8 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 hover:border-[var(--site-primary)]/30 dark:border-white/5 dark:bg-white/5 group";
  const gradientTop = <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />;

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
          <AnimatedSection className="pt-4 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center relative">
              {/* LEFT: Typography */}
              <div className="relative z-10 text-center lg:text-left">
                <div className="mx-auto lg:mx-0 mb-6 flex items-center justify-center lg:justify-start gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                    <Target size={12} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">About Us</span>
                </div>
                <h1 className="text-[3.25rem] md:text-[4.5rem] font-display font-black text-foreground leading-[1.05] tracking-tight text-balance mb-6">
                  A Modern Partner <br className="hidden md:block" /> for <span className="bg-gradient-to-r from-[var(--site-primary)] to-[#3b82f6] bg-clip-text text-transparent">Growth.</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 font-medium mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Digi Web Crew helps businesses build stronger websites, sharper conversion systems, better search visibility, and more efficient lead handling.
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

              {/* RIGHT: Professional Agency UI Mockup */}
              <div className="relative z-10 w-full max-w-[500px] mx-auto lg:ml-auto h-[400px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
                
                {/* Main Dashboard Window */}
                <div className="absolute right-0 top-0 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                    <div className="flex gap-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                       <div className="w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-amber-500" />
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Agency Hub</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                        <LineChart size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Impact</div>
                        <div className="text-lg font-black text-slate-900 dark:text-white">150+ Projects</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-8 w-full rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-400 flex items-center px-3 justify-between shadow-sm">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Client Retention</span>
                        <span className="text-[10px] font-black text-white">99%</span>
                      </div>
                      <div className="h-8 w-[85%] rounded-lg bg-blue-500 flex items-center px-3 justify-between shadow-sm">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Automation Setup</span>
                        <span className="text-[10px] font-black text-white">24/7</span>
                      </div>
                      <div className="h-8 w-[70%] rounded-lg bg-indigo-500 flex items-center px-3 justify-between shadow-sm">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Exp. Level</span>
                        <span className="text-[10px] font-black text-white">10+ Yrs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute left-0 bottom-8 w-56 bg-white/95 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl backdrop-blur-md p-4 transform -translate-x-4 translate-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-xs leading-tight">Proven Results</h4>
                      <p className="text-[10px] font-medium text-muted-foreground mt-0.5">We build for long-term growth.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Stats Row */}
          <AnimatedSection className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className={cn(sectionCardClass, "text-center p-6")}>
                <div className="text-4xl font-display font-black text-foreground mb-1 tracking-tight">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </AnimatedSection>

          {/* Story & Approach - Bento */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
            <AnimatedSection className={cn(sectionCardClass, "md:col-span-8 flex flex-col justify-center min-h-[400px]")}>
              <FluidBackground />
              <div className="relative z-10">
                <span className="mb-4 inline-block rounded-full bg-[rgba(var(--site-primary-rgb),0.08)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--site-primary)] dark:text-[var(--site-primary-soft)] shadow-sm">Our Story</span>
                <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mb-6 tracking-tight leading-tight">
                  Built for Businesses That Need Stronger Digital Infrastructure
                </h2>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-2xl mb-4">
                  Digi Web Crew was created for businesses that want more than a website that simply looks modern. Many businesses need a stronger system behind their online presence — better presentation, clearer service structure, stronger lead paths, improved visibility, and more practical support.
                </p>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-2xl">
                  We combine custom website development, landing pages, SEO support, and automation into digital systems designed to help businesses present themselves better and operate more effectively.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className={cn(sectionCardClass, "md:col-span-4 flex flex-col bg-slate-50/50 dark:bg-white/[0.02]")}>
              {gradientTop}
              <span className="mb-4 inline-block rounded-full bg-amber-50 dark:bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Approach</span>
              <h2 className="text-2xl font-display font-black text-foreground mb-6">More Than Design. More Than Traffic.</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground font-medium leading-relaxed">Some providers focus only on building websites. Others only on traffic. Others talk about automation without connecting it to how the business actually works.</p>
                <p className="text-muted-foreground font-medium leading-relaxed">Digi Web Crew takes a more connected approach. We look at how the website presents the business, how pages guide action, how visibility improves, and how lead handling can become more efficient.</p>
              </div>
            </AnimatedSection>
          </div>

          {/* Values Bento */}
          <div className="space-y-8">
            <div className="text-center mb-10">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 shadow-sm ring-1 ring-emerald-500/20">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Core Principles
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight">What We Believe In</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4">
              {values.map((v, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className={cn(interactiveCardClass, "group overflow-hidden !p-5 md:!p-6", i === 0 || i === 3 ? "lg:col-span-2" : "lg:col-span-1")}>
                  {gradientTop}
                  
                  {/* Faint Background Icon */}
                  <v.icon className={cn("absolute -bottom-4 -right-4 w-32 h-32 opacity-[0.03] dark:opacity-5 transform group-hover:scale-110 transition-transform duration-700 pointer-events-none", v.color)} />
                  
                  <div className="flex flex-col h-full relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 transition-transform duration-500 group-hover:scale-110", v.bg, v.darkBg, v.color, v.ring)}>
                        <v.icon size={22} strokeWidth={2} />
                      </div>
                      <h3 className="text-lg md:text-xl font-display font-extrabold text-slate-900 dark:text-white group-hover:text-[var(--site-primary)] transition-colors leading-tight">{v.title}</h3>
                      <span className="ml-auto font-display font-black text-3xl text-slate-100 dark:text-white/5 tracking-tighter">0{i+1}</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{v.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Two col — What We Build + Who We Work Best With */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-4">
            <AnimatedSection className={cn(sectionCardClass, "!p-6 md:!p-8")}>
              {gradientTop}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--site-primary)]/10 text-[var(--site-primary)] ring-1 ring-[var(--site-primary)]/20 shadow-sm">
                  <Code2 size={20} />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-black text-foreground tracking-tight">What We Build</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {builds.map((item, i) => (
                  <div key={i} className="group flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-colors hover:border-[var(--site-primary)]/30 hover:bg-white dark:hover:bg-white/10 shadow-sm">
                    <item.icon size={16} className="text-[var(--site-primary)] shrink-0 transition-transform group-hover:scale-110" />
                    <span className="text-xs font-bold text-slate-700 dark:text-[#C2D2E1] leading-tight">{item.name}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className={cn(sectionCardClass, "!p-6 md:!p-8")}>
              {gradientTop}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 ring-1 ring-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400 shadow-sm">
                  <Building2 size={20} />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-black text-foreground tracking-tight">Who We Work Best With</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {fit.map((item) => (
                  <div key={item} className="rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm transition-colors hover:border-amber-500/30 hover:text-amber-700 dark:hover:text-amber-400">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 flex items-start gap-3 shadow-sm">
                <CheckCircle2 size={18} className="text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-violet-900 dark:text-violet-300 text-xs mb-1 uppercase tracking-widest">The Common Thread</div>
                  <p className="text-xs text-violet-800/80 dark:text-violet-200/80 font-medium leading-relaxed">Businesses that have outgrown a basic website and need cleaner systems for leads, content, and growth.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Moved Services Grid */}
          <ServicesGrid />

          <TeamSection locale={locale} data={teamData} showLink={false} />

          <TrustedPlatforms data={trustedPlatformsData} />

          <BlogInsightsPreview locale={locale} posts={featuredPosts} />

          {/* FAQ */}
          <div className="space-y-8">
            <h2 className="text-3xl font-display font-black text-foreground tracking-tight text-center">Questions About Digi Web Crew</h2>
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
                Ready to Define Your Scope?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 max-w-sm mx-auto leading-relaxed">
                If you want a clearer view of what your project needs before moving forward, let's connect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button href={localePath(locale, "/quote")} className="bg-[#1746A2] hover:bg-[#123680] text-white shadow-md rounded-full px-5 h-11 flex items-center gap-2 group transition-all">
                  <span className="font-semibold text-sm">Start Project Scope</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </Button>
                <Button href={localePath(locale, "/book-consultation")} className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-sm rounded-full px-5 h-11 flex items-center gap-2 group transition-all dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:bg-white/10">
                  <span className="font-semibold text-sm">Book Consultation</span>
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
