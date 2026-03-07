"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function Card({ children, className, animate = true }: CardProps) {
  const cardClasses = cn(
    "relative w-full h-full transition-all duration-500",
    "rounded-3xl overflow-hidden",
    // Only apply default bg/border if not provided in className
    !className?.includes("bg-") && "bg-white dark:bg-midnight-900 border border-[rgba(229,231,235,0.5)] shadow-[0_10px_25px_-5px_rgba(2,77,148,0.05),0_8px_10px_-6px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_35px_-10px_rgba(2,77,148,0.10),0_10px_15px_-6px_rgba(0,0,0,0.05)]",
    "hover:-translate-y-1",
    className
  );

  if (!animate) {
    return (
      <div className={cardClasses}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cardClasses}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mb-6", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("font-heading text-xl font-extrabold tracking-tight text-raly-primary", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-xs font-medium tracking-tight text-muted-foreground/80 mt-1", className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("", className)}>{children}</div>;
}
