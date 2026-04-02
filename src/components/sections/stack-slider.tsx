"use client";

import { useMemo, useState, useEffect, useRef, type ComponentType } from "react";
import { Container } from "../layout/layout-primitives";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiGoogleanalytics,
  SiSemrush,
  SiGooglesearchconsole,
  SiOpenai,
  SiZapier,
  SiHubspot,
  SiStripe,
  SiDocker,
  SiAmazonwebservices,
  SiPostgresql,
} from "react-icons/si";
import { Monitor, Search, Cpu, Cloud, type LucideIcon } from "lucide-react";

type StackItem = {
  name: string;
  icon: ComponentType<{ className?: string; size?: number; color?: string; style?: any }>;
  color: string;
};

type StackGroup = {
  id: string;
  label: string;
  shortLabel: string;
  useCase: string;
  benefit: string;
  color: string;
  glowColor: string;
  icon: LucideIcon;
  items: StackItem[];
};

const stackGroups: StackGroup[] = [
  {
    id: "web",
    label: "Web Development Stack",
    shortLabel: "WEB DEV",
    useCase: "Fast, scalable, modern websites and web platforms.",
    benefit: "Performance, flexibility, and cleaner UX delivery.",
    color: "#61DAFB",
    glowColor: "rgba(97,218,251,0.4)",
    icon: Monitor,
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#E5E7EB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    id: "seo",
    label: "SEO Stack",
    shortLabel: "SEO",
    useCase: "Technical optimization and search visibility improvement.",
    benefit: "Better rankings, stronger discoverability, cleaner site health.",
    color: "#34D399",
    glowColor: "rgba(52,211,153,0.4)",
    icon: Search,
    items: [
      { name: "Analytics", icon: SiGoogleanalytics, color: "#E37400" },
      { name: "Search Console", icon: SiGooglesearchconsole, color: "#34A853" },
      { name: "SEMrush", icon: SiSemrush, color: "#FF642D" },
      { name: "HubSpot", icon: SiHubspot, color: "#FF7A59" },
    ],
  },
  {
    id: "ai",
    label: "AI Automation Stack",
    shortLabel: "AI AUTO",
    useCase: "Lead capture, qualification, and follow-up automation.",
    benefit: "Faster response times and less manual operations work.",
    color: "#A78BFA",
    glowColor: "rgba(167,139,250,0.4)",
    icon: Cpu,
    items: [
      { name: "OpenAI", icon: SiOpenai, color: "#E5E7EB" },
      { name: "Zapier", icon: SiZapier, color: "#FF4A00" },
      { name: "HubSpot", icon: SiHubspot, color: "#FF7A59" },
      { name: "Stripe", icon: SiStripe, color: "#6772E5" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud / DevOps Stack",
    shortLabel: "CLOUD",
    useCase: "Infrastructure, deployments, and production reliability.",
    benefit: "Smoother releases with scalable and stable systems.",
    color: "#FBBF24",
    glowColor: "rgba(251,191,36,0.4)",
    icon: Cloud,
    items: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Next.js", icon: SiNextdotjs, color: "#E5E7EB" },
    ],
  },
];

const allItems: (StackItem & { groupColor: string })[] = stackGroups.flatMap((g) =>
  g.items.map((item) => ({ ...item, groupColor: g.color }))
);

const uniqueAllItems = allItems.filter(
  (item, idx, arr) => arr.findIndex((i) => i.name === item.name) === idx
);

const ORBIT_RINGS = [
  { radius: 110, speed: 22, count: 4, direction: 1, phase: -12 },
  { radius: 160, speed: 32, count: 4, direction: -1, phase: 10 },
  { radius: 210, speed: 42, count: 5, direction: 1, phase: -6 },
];

function distributeIcons(items: StackItem[]) {
  const distributed: { item: StackItem; ring: number; startAngle: number }[] = [];
  let itemIdx = 0;
  for (let r = 0; r < ORBIT_RINGS.length; r++) {
    const ring = ORBIT_RINGS[r];
    for (let i = 0; i < ring.count && itemIdx < items.length; i++) {
      const startAngle = (i / ring.count) * 360 + ring.phase;
      distributed.push({ item: items[itemIdx], ring: r, startAngle });
      itemIdx++;
    }
    if (itemIdx >= items.length) break;
  }
  return distributed;
}

interface OrbitingIconProps {
  icon: ComponentType<{ className?: string; size?: number; color?: string; style?: any }>;
  name: string;
  color: string;
  ringRadius: number;
  startAngle: number;
  speed: number;
  direction: number;
  size?: number;
}

function OrbitingIcon({
  icon: Icon,
  name,
  color,
  ringRadius,
  startAngle,
  speed,
  direction,
  size = 20,
}: OrbitingIconProps) {
  const [angle, setAngle] = useState(startAngle);
  const rafRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current === undefined) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      setAngle((prev) => prev + (direction * delta * 360) / (speed * 1000));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, direction]);

  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * ringRadius;
  const y = Math.sin(rad) * ringRadius * 0.58;
  const zFactor = Math.sin(rad);
  const scale = 0.82 + 0.26 * ((zFactor + 1) / 2);
  const opacity = 0.78 + 0.22 * ((zFactor + 1) / 2);
  const zIndex = Math.round(zFactor * 10 + 10);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x: x - 30,
        y: y - 30,
        scale,
        opacity,
        zIndex,
      }}
      title={name}
    >
      <div
        className="group flex flex-col items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <div className="flex items-center justify-center h-10 w-10">
           <Icon size={24} style={{ color }} className="mb-0.5 filter dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
        </div>
        <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-white/80 transition-colors leading-none group-hover:text-white mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          {name.length > 7 ? name.slice(0, 7) : name}
        </span>
      </div>
    </motion.div>
  );
}

function OrbitalRing({ radius }: { radius: number }) {
  const rx = radius;
  const ry = radius * 0.58;
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      width={rx * 2 + 4}
      height={ry * 2 + 4}
      style={{ overflow: "visible" }}
    >
      <ellipse
        cx={rx + 2}
        cy={ry + 2}
        rx={rx}
        ry={ry}
        fill="none"
        className="stroke-slate-300/70 dark:stroke-white/22"
        strokeWidth="1"
        strokeDasharray="5 10"
      />
    </svg>
  );
}

export function StackSlider() {
  const [activeGroupId, setActiveGroupId] = useState<string>("all");

  const activeGroup = useMemo(
    () => stackGroups.find((g) => g.id === activeGroupId) || null,
    [activeGroupId]
  );

  const displayItems: StackItem[] = useMemo(() => {
    if (activeGroupId === "all") return uniqueAllItems;
    return activeGroup?.items || [];
  }, [activeGroupId, activeGroup]);

  const distributed = useMemo(() => distributeIcons(displayItems), [displayItems]);

  return (
    <section className="relative isolate overflow-hidden border-y border-slate-200 bg-white py-16 text-slate-900 shadow-sm dark:border-white/5 dark:bg-midnight dark:text-white/90">
      {/* Decorative Background Curves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large Concentric Circles/Curves */}
        <div className="absolute left-[50%] top-[50%] h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2">
           <svg className="h-full w-full opacity-10" viewBox="0 0 1000 1000" fill="none">
             <circle cx="500" cy="500" r="480" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 12" className="animate-[spin_180s_linear_infinite]" />
             <circle cx="500" cy="500" r="400" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 12" className="animate-[spin_150s_linear_infinite_reverse]" />
             <circle cx="500" cy="500" r="320" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 12" className="animate-[spin_120s_linear_infinite]" />
             <circle cx="500" cy="500" r="240" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 12" className="animate-[spin_90s_linear_infinite_reverse]" />
           </svg>
        </div>
        
        {/* Glow Spots */}
        <div className="absolute left-1/4 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6366F1]/10 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <Container>
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="mb-10 text-center">
            <span className="mb-4 inline-block rounded-full border border-indigo-400/30 bg-indigo-500/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-300">
              Technology Ecosystem
            </span>
            <h2 className="font-display text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
              Service-Aligned{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
                Technology Stack
              </span>
            </h2>
          </div>

          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setActiveGroupId("all")}
              className={`rounded-full border px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                activeGroupId === "all"
                  ? "border-indigo-400/60 bg-indigo-500/20 text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]"
                  : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              All Stacks
            </button>
            {stackGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveGroupId(group.id)}
                className={`rounded-full border px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeGroupId === group.id
                    ? "border-white/20 bg-white/10 text-white shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]"
                    : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:bg-white/10 hover:text-white"
                }`}
                style={
                  activeGroupId === group.id
                    ? {
                        borderColor: `${group.color}60`,
                        backgroundColor: `${group.color}20`,
                        color: "#fff",
                        boxShadow: `0 0 30px -5px ${group.color}40`,
                      }
                    : {}
                }
              >
                {group.shortLabel}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative flex h-[450px] items-center justify-center">
              {ORBIT_RINGS.map((ring, i) => (
                <OrbitalRing key={i} radius={ring.radius} />
              ))}

              <div
                className="absolute left-1/2 top-1/2 z-20 flex h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-white/20 dark:bg-midnight shadow-[0_0_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]"
              >
                <div className="text-center">
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Digital</div>
                  <div className="mt-0.5 text-[8px] font-bold uppercase tracking-widest text-slate-900 dark:text-white/50 leading-tight">Web Crew</div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGroupId}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {distributed.map(({ item, ring: ringIdx, startAngle }, i) => {
                    const ring = ORBIT_RINGS[ringIdx];
                    return (
                      <OrbitingIcon
                        key={`${activeGroupId}-${item.name}-${i}`}
                        icon={item.icon}
                        name={item.name}
                        color={item.name === "Next.js" || item.name === "OpenAI" ? "#fff" : item.color}
                        ringRadius={ring.radius}
                        startAngle={startAngle}
                        speed={ring.speed}
                        direction={ring.direction}
                        size={18}
                      />
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeGroupId}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-8"
              >
                {activeGroup ? (
                  <>
                    <div>
                      <div
                        className="mb-2 text-[12px] font-bold uppercase tracking-[0.4em]"
                        style={{ color: activeGroup.color }}
                      >
                        {activeGroup.shortLabel} Stack
                      </div>
                      <h3 className="font-display text-4xl font-black leading-tight text-white">
                        {activeGroup.label}
                      </h3>
                    </div>

                    <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl">
                      <div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-white/40">Use Case</p>
                        <p className="text-lg font-medium leading-relaxed text-slate-900 dark:text-white/90">
                          {activeGroup.useCase}
                        </p>
                      </div>
                      <div className="h-px bg-white/10" />
                      <div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-white/40">Business Benefit</p>
                        <p className="text-lg font-medium leading-relaxed text-slate-900 dark:text-white/90">
                          {activeGroup.benefit}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {activeGroup.items.map((item) => (
                        <div
                          key={item.name}
                          className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/5 dark:bg-white/5 p-5 transition-all duration-300 hover:border-slate-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/10 hover:-translate-y-1 group"
                        >
                          <item.icon size={32} color={item.name === "Next.js" || item.name === "OpenAI" ? "#fff" : item.color} className="transition-transform group-hover:scale-110" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-white/60 transition-colors group-hover:text-white">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.4em] text-indigo-400">
                        Full Stack
                      </div>
                      <h3 className="font-display text-4xl font-black leading-tight text-slate-900 dark:text-white">
                        All Technology Stacks
                      </h3>
                    </div>

                    <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl">
                      <p className="text-lg font-medium leading-relaxed text-slate-900 dark:text-white/90">
                        We deploy a full-spectrum technology arsenal - from modern web frameworks and SEO tooling to AI engines and cloud infrastructure.
                      </p>
                      <p className="text-lg font-medium leading-relaxed text-slate-900 dark:text-white/90">
                        Click any stack above to explore the specific tools powering each service.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {stackGroups.map((g) => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setActiveGroupId(g.id)}
                          className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-5 text-left transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:-translate-y-1"
                        >
                          <g.icon 
                            size={20} 
                            style={{ 
                              color: g.color,
                              filter: `drop-shadow(0 0 12px ${g.color}60)`
                            }} 
                            className="flex-shrink-0"
                          />
                          <span className="text-[12px] font-bold uppercase tracking-wider text-white/50 transition-colors group-hover:text-white">
                            {g.shortLabel}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}

