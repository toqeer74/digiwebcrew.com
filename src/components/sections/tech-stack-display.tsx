"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPython,
  SiDjango,
  SiLaravel,
  SiDocker,
  SiAmazonwebservices,
  SiPostgresql,
  SiMongodb,
  SiJavascript
} from "react-icons/si";
import { Container } from "../layout/layout-primitives";

const techStack = [
  { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-foreground" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
  { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
  { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
  { name: "Django", icon: SiDjango, color: "text-[#092E20] bg-white rounded p-1" },
  { name: "Laravel", icon: SiLaravel, color: "text-[#FF2D20]" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "Docker", icon: SiDocker, color: "text-[#2496ED]" },
  { name: "AWS", icon: SiAmazonwebservices, color: "text-[#FF9900]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
  { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
];

export function TechStackDisplay() {
  return (
    <section className="py-24 bg-background border-y border-border">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20"
            >
              The Stack
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-black text-foreground tracking-tight leading-tight"
            >
              Engineered for <br />
              <span className="text-primary">Extreme Scale</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              We deploy industrial-grade technologies that ensure your system remains bulletproof under load. No legacy bloat, just pure performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-card rounded-2xl border border-border shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Git Monitoring</p>
                  <p className="text-sm font-bold text-foreground">Toqeer Shafique (toqeer74)</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {techStack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col items-center justify-center gap-4 transition-all hover:shadow-lg hover:border-primary/40"
              >
                <tech.icon className={tech.color} size={40} />
                <span className="text-sm font-black text-foreground uppercase tracking-wider">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
