"use client";

import { Code2, Zap, Rocket, Palette } from "lucide-react";
import { Container } from "../layout/layout-primitives";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Code2,
    title: "Base Architecture",
    description: "Solid foundation for scalable apps",
    tier: "FREE",
    tierColor: "text-muted-foreground bg-secondary border-border",
    iconBg: "bg-secondary text-primary",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Optimized for core web vitals",
    tier: "PRO",
    tierColor: "text-primary bg-primary/10 border-primary/20",
    iconBg: "bg-primary text-primary-foreground",
  },
  {
    icon: Rocket,
    title: "Rapid Deployment",
    description: "CI/CD pipelines ready to go",
    tier: "PRO",
    tierColor: "text-primary bg-primary/10 border-primary/20",
    iconBg: "bg-primary text-primary-foreground",
  },
  {
    icon: Palette,
    title: "Premium Design",
    description: "Pixel-perfect UI components",
    tier: "PRO",
    tierColor: "text-primary bg-primary/10 border-primary/20",
    iconBg: "bg-primary text-primary-foreground",
  },
];

export function FeaturesRow() {
  return (
    <section className="py-24 bg-secondary/20 border-b border-border">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Core Advantages
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6">
            Built for <span className="text-primary">Scale & Speed</span>
          </h2>
          <p className="text-lg text-muted-foreground font-medium leading-relaxed">
            Engineered for performance, designed for growth. We build systems that scale effortlessly with your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="group relative p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex flex-col items-center text-center h-full">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-sm",
                  feature.iconBg
                )}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">{feature.title}</h3>
                  {feature.tier && (
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                      feature.tierColor
                    )}>
                      {feature.tier}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
