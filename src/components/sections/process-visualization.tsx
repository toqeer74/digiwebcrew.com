"use client";

import { motion } from "framer-motion";
import {
  Search,
  PenTool,
  Code2,
  CheckCircle2,
  Rocket
} from "lucide-react";
import { Container } from "../layout/layout-primitives";
import { cn } from "@/lib/utils";

const stages = [
  {
    icon: Search,
    title: "Discovery & Logic Mapping",
    description: "Deep dive into business logic, user journeys, and technical architecture.",
    color: "bg-primary",
    delay: 0.1
  },
  {
    icon: PenTool,
    title: "High-Fidelity Prototyping",
    description: "Creating interactive blueprints to validate UX before coding starts.",
    color: "bg-primary",
    delay: 0.2
  },
  {
    icon: Code2,
    title: "Agile Development Sprints",
    description: "Clean, scalable code delivered in iterative cycles with regular demos.",
    color: "bg-primary",
    delay: 0.3
  },
  {
    icon: CheckCircle2,
    title: "Automated QA Testing",
    description: "Comprehensive unit, integration, and performance testing protocols.",
    color: "bg-primary",
    delay: 0.4
  },
  {
    icon: Rocket,
    title: "Deployment & Scaling",
    description: "Production launch with active monitoring and performance optimization.",
    color: "bg-primary",
    delay: 0.5
  }
];

export function ProcessVisualization() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4 border border-primary/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Our Methodology
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-6"
          >
            Engineering Excellence, <br />
            <span className="text-primary">By Design</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-medium"
          >
            A proven 5-stage framework that transforms complex challenges into scalable, production-ready digital assets.
          </motion.p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {stages.map((stage, idx) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: stage.delay, type: "spring", stiffness: 100 }}
                className="group relative"
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl font-black text-primary/10 -z-10 transition-colors group-hover:text-primary/20">
                  {idx + 1}
                </div>

                <div className="bg-card rounded-3xl p-8 border border-border shadow-sm hover:border-primary/40 transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col items-center text-center h-full">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center text-primary-foreground mb-6 shadow-sm",
                    stage.color
                  )}>
                    <stage.icon size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-4 line-tight">
                    {stage.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {idx < stages.length - 1 && (
                  <div className="lg:hidden flex justify-center py-4">
                    <div className="w-0.5 h-8 bg-border" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-1 rounded-2xl bg-card border border-border">
            <div className="flex flex-col md:flex-row items-center gap-6 px-8 py-4">
              <p className="text-sm font-bold text-muted-foreground">
                Ready to initiate the first stage?
              </p>
              <button className="px-8 py-3 bg-primary text-primary-foreground font-extrabold text-sm rounded-xl hover:scale-105 active:scale-95 transition-all shadow-sm uppercase tracking-widest">
                Start Discovery Phase
              </button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
