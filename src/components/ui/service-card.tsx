"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Code2, Globe, ShoppingCart, Zap, Cloud, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  iconName: string;
  href: string;
  index: number;
  isHighlighted?: boolean;
}

const icons: Record<string, any> = {
  Code2, Globe, ShoppingCart, Zap, Cloud, ShieldCheck
};

export function ServiceCard({
  title,
  description,
  href,
  iconName,
  index,
  isHighlighted
}: ServiceCardProps) {
  const Icon = icons[iconName] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "site-card site-card-interactive group relative flex h-full flex-col p-8 text-left duration-500",
        isHighlighted &&
          "z-10 border-[color:rgba(var(--site-primary-rgb),0.34)] ring-4 ring-[rgba(var(--site-primary-rgb),0.08)] dark:border-[color:rgba(var(--site-primary-rgb),0.42)] dark:ring-[rgba(var(--site-primary-rgb),0.14)]"
      )}
    >
      <div className="site-card-icon mb-8 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-[rgba(var(--site-primary-rgb),0.14)]">
        <Icon size={32} strokeWidth={1.5} />
      </div>

      <h3 className="site-card-title mb-4 text-[2rem] font-display font-bold leading-tight tracking-tight">
        {title}
      </h3>

      <p className="site-card-muted mb-10 flex-1 font-body text-[1.05rem] font-medium leading-relaxed">
        {description}
      </p>

      <div className="relative z-20 mt-auto pt-2">
        <span className="site-card-accent inline-flex items-center gap-2 text-sm font-display font-semibold uppercase tracking-[0.2em]">
          <span>Explore</span>
          <ArrowRight size={14} strokeWidth={2.5} />
        </span>
      </div>

      <Link href={href} className="absolute inset-0 z-10" aria-label={`Explore ${title}`} />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-[radial-gradient(circle_at_bottom,rgba(var(--site-primary-rgb),0.3),transparent_68%)] opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </motion.div>
  );
}
