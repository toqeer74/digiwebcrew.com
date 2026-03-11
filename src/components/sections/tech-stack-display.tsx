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
  { name: "Next.js", icon: SiNextdotjs, color: "text-[#F8F8FF]" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
  { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
  { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
  { name: "Django", icon: SiDjango, color: "text-[#3DDC84]" },
  { name: "Laravel", icon: SiLaravel, color: "text-[#FF2D20]" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "Docker", icon: SiDocker, color: "text-[#2496ED]" },
  { name: "AWS", icon: SiAmazonwebservices, color: "text-[#FF9900]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
  { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
];

export function TechStackDisplay() {
  const stackCardClass =
    "rounded-[2rem] border border-slate-200/70 bg-white/96 shadow-[0_18px_38px_-24px_rgba(15,23,42,0.2)] transition-all duration-300 dark:border-[color:rgba(var(--site-primary-rgb),0.28)] dark:bg-[linear-gradient(180deg,rgba(26,39,56,0.995),rgba(12,20,32,0.995))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(var(--site-primary-rgb),0.12),0_26px_54px_-28px_rgba(0,0,0,0.82),0_20px_42px_-22px_rgba(var(--site-primary-rgb),0.22),0_0_34px_-22px_rgba(var(--site-primary-rgb),0.18)] dark:hover:border-[color:rgba(var(--site-primary-rgb),0.46)] dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_0_1px_rgba(var(--site-primary-rgb),0.26),0_30px_60px_-28px_rgba(0,0,0,0.86),0_24px_48px_-20px_rgba(var(--site-primary-rgb),0.28),0_0_42px_-18px_rgba(var(--site-primary-rgb),0.24)]";

  return (
    <section className="border-y border-slate-200/70 bg-white py-24 dark:border-[color:rgba(var(--site-primary-rgb),0.16)] dark:bg-[radial-gradient(circle_at_top_left,rgba(var(--site-primary-rgb),0.14),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.985),rgba(4,6,10,0.995))]">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="lg:w-1/3 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/85 px-3 py-1.5 shadow-[0_12px_26px_-20px_rgba(15,23,42,0.28)] dark:border-[color:rgba(var(--site-primary-rgb),0.34)] dark:bg-[rgba(12,20,32,0.82)] dark:shadow-[0_12px_28px_-18px_rgba(var(--site-primary-rgb),0.24)]"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--site-primary)]" />
              <span className="text-xs font-body font-semibold uppercase tracking-widest text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
                The Stack
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            className="font-display text-4xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white md:text-5xl"
          >
              Engineered for<br />
              <span className="text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
                Extreme Scale
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg font-body leading-relaxed text-slate-600 dark:text-[#b7cadb]"
            >
              We deploy industrial-grade technologies that ensure your system remains bulletproof under load. Pure performance, zero legacy bloat.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className={`${stackCardClass} p-6`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(var(--site-primary-rgb),0.12)] ring-1 ring-[rgba(var(--site-primary-rgb),0.16)] dark:bg-[rgba(var(--site-primary-rgb),0.14)] dark:ring-[rgba(var(--site-primary-rgb),0.24)]">
                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--site-primary)]" />
                </div>
                <div>
                  <p className="text-xs font-body font-semibold uppercase tracking-widest text-slate-500 dark:text-[#b7cadb]">1 in All Solutions</p>
                  <p className="text-sm font-display font-bold text-slate-950 dark:text-white">DigiWebCrew</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Tech Grid */}
          <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {techStack.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className={`${stackCardClass} flex flex-col items-center justify-center gap-4 p-6 text-center`}
              >
                <tech.icon className={tech.color} size={40} />
                <span className="text-xs font-body font-semibold uppercase tracking-wider text-slate-600 dark:text-[#d7e3ef]">
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
