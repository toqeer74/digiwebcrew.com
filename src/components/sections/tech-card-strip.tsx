import type { ComponentType } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiAmazonwebservices,
  SiOpenai,
} from "react-icons/si";

type TechCard = {
  name: string;
  icon: ComponentType<{ size?: number; color?: string }>;
  color: string;
  rotate: string;
};

// Signature tilted "sticker" cards — each card is a layered geometric badge
// (diagonal color split + dark corner) with a white logo circle on top.
const cards: TechCard[] = [
  { name: "React", icon: SiReact, color: "#61DAFB", rotate: "-6deg" },
  { name: "Next.js", icon: SiNextdotjs, color: "#0F172A", rotate: "4deg" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", rotate: "-3deg" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", rotate: "5deg" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", rotate: "-5deg" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", rotate: "3deg" },
  { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900", rotate: "-4deg" },
  { name: "OpenAI", icon: SiOpenai, color: "#10A37F", rotate: "6deg" },
];

function Card({ name, icon: Icon, color, rotate }: TechCard) {
  return (
    <div
      className="group relative h-[150px] w-[120px] shrink-0 overflow-hidden rounded-[20px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2),0_12px_30px_-10px_rgba(15,23,42,0.6)] transition-all duration-500 hover:!rotate-0 hover:-translate-y-2 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3),0_20px_40px_-15px_rgba(15,23,42,0.7)]"
      style={{ background: color, rotate }}
      title={name}
    >
      {/* white diagonal band */}
      <div
        className="absolute inset-0 bg-white"
        style={{ clipPath: "polygon(0 0, 72% 0, 0 56%)" }}
      />
      {/* dark corner triangle */}
      <div
        className="absolute inset-0 bg-slate-900"
        style={{ clipPath: "polygon(0 0, 60% 0, 0 46%)" }}
      />
      {/* bottom-right shade for depth */}
      <div
        className="absolute inset-0 bg-black/20"
        style={{ clipPath: "polygon(100% 64%, 100% 100%, 46% 100%)" }}
      />

      {/* logo circle */}
      <div className="absolute left-1/2 top-1/2 grid h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-xl">
        <Icon size={32} color={color === "#0F172A" ? "#0F172A" : color} />
      </div>

      {/* label */}
      <span className="absolute bottom-2.5 left-0 right-0 text-center text-[9px] font-extrabold uppercase tracking-[0.18em] text-white drop-shadow-md">
        {name}
      </span>
    </div>
  );
}

export function TechCardStrip() {
  return (
    <section className="relative overflow-hidden py-6">
      <div className="flex items-center justify-start gap-3 overflow-x-auto px-2 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:justify-center md:overflow-visible [&::-webkit-scrollbar]:hidden">
        {cards.map((c) => (
          <Card key={c.name} {...c} />
        ))}
      </div>
    </section>
  );
}
