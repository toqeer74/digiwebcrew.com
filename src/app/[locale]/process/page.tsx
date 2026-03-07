import { Container, Section } from "@/components/layout/layout-primitives";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Search, PenTool, Code2, Rocket, HeartHandshake, ArrowRight, Zap, Target } from "lucide-react";
import { getDictionary } from "@/lib/get-dictionary";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProcessVisualization } from "@/components/sections/process-visualization";
import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "step1",
    icon: Search,
    details: ["Requirements gathering", "Feasibility audit", "Competitive analysis"],
    bg: "bg-raly-subtle",
    accent: "text-raly-primary"
  },
  {
    id: "step2",
    icon: PenTool,
    details: ["User journeys", "High-fidelity mockups", "Interactive prototyping"],
    bg: "bg-raly-subtle",
    accent: "text-raly-primary"
  },
  {
    id: "step3",
    icon: Code2,
    details: ["Frontend / Backend dev", "Unit & Integration testing", "Agile sprints"],
    bg: "bg-raly-subtle",
    accent: "text-raly-primary"
  },
  {
    id: "step4",
    icon: Rocket,
    details: ["Infrastructure setup", "Deployment automated", "Performance tuning"],
    bg: "bg-raly-subtle",
    accent: "text-raly-primary"
  },
  {
    id: "step5",
    icon: HeartHandshake,
    details: ["Security patches", "Feature iteration", "24/7 Monitoring"],
    bg: "bg-raly-subtle",
    accent: "text-raly-primary"
  }
];

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRtl = locale === 'ar' || locale === 'ur';

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-midnight-950" dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1 pt-32 pb-20">
        <Container>
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raly-accent/20 text-raly-deep text-xs font-bold uppercase tracking-widest mb-6">
              Agile-Led Framework
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-raly-deep">
              <span className="block">{dict.process.title1}</span>
              <span className="text-raly-primary">{dict.process.title2}</span>
            </h1>
            <p className="text-xl text-raly-text font-medium max-w-2xl mx-auto leading-relaxed">
              {dict.process.description}
            </p>
          </AnimatedSection>

          {/* New Process Visualization integrated here */}
          <div className="mb-32">
            <ProcessVisualization />
          </div>

          <div className="space-y-24 pb-32">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className="group relative grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
              >
                {/* Number Side */}
                <div className="md:col-span-2 flex flex-col items-center">
                  <AnimatedSection delay={i * 0.1} className="relative">
                    <div className="w-20 h-20 rounded-3xl bg-raly-subtle border border-raly-accent/20 flex items-center justify-center text-3xl font-black text-raly-deep group-hover:bg-raly-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-xl">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden md:block w-px h-32 bg-gradient-to-b from-raly-primary/30 to-transparent my-6 opacity-50" />
                    )}
                  </AnimatedSection>
                </div>

                {/* Content Side */}
                <AnimatedSection direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1} className={`md:col-span-10 p-12 rounded-[3.5rem] bg-raly-subtle border border-raly-accent/20 transition-all duration-700 hover:border-raly-primary/50`}>
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="shrink-0">
                      <div className={cn("w-16 h-16 rounded-2xl bg-raly-base border border-raly-accent/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500", step.accent)}>
                        <step.icon size={32} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-black mb-6 tracking-tight text-raly-deep">{(dict.process.steps as any)[step.id].title}</h3>
                      <p className="text-lg text-raly-text font-medium leading-relaxed mb-8 max-w-2xl">
                        {(dict.process.steps as any)[step.id].desc}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {step.details.map(detail => (
                          <span key={detail} className="px-5 py-2 rounded-xl bg-raly-base border border-raly-accent/20 text-[10px] font-black uppercase tracking-widest text-raly-text">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            ))}
          </div>

          <AnimatedSection className="pb-32">
            <div className="p-20 rounded-[4rem] bg-raly-deep text-raly-base shadow-2xl relative overflow-hidden group text-center">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-raly-accent/20 via-transparent to-transparent opacity-30 group-hover:scale-110 transition-transform duration-1000" />

              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 relative z-10 leading-[0.9]">{dict.process.ctaTitle}</h2>
              <p className="opacity-70 mb-12 text-xl font-medium max-w-2xl mx-auto relative z-10 text-raly-accent">
                {dict.process.ctaDesc}
              </p>
              <Link
                href={`/${locale}/quote`}
                className="inline-flex items-center gap-4 px-12 py-5 bg-raly-primary text-raly-base rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-2xl relative z-10"
              >
                {dict.process.ctaButton}
                <ArrowRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
