"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  style?: React.CSSProperties;
  /**
   * Render visible immediately, with no entrance animation.
   *
   * Set this on above-the-fold sections. The default hidden state is written
   * into the server-rendered HTML as opacity:0, so the content stays invisible
   * until the JS bundle downloads and hydrates — and Largest Contentful Paint
   * ignores elements at zero opacity, which pinned LCP to hydration rather
   * than to paint. Below-the-fold sections are unaffected: the reader cannot
   * see them at first paint anyway.
   */
  immediate?: boolean;
}

export function AnimatedSection({
  children,
  className,
  id,
  delay = 0,
  direction = "up",
  style,
  immediate = false,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={
        immediate
          ? false
          : {
              opacity: 0,
              ...directions[direction],
            }
      }
      animate={
        immediate || isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: immediate ? 0 : 0.8,
        delay: immediate ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
      style={style}
    >
      {children}
    </motion.div>
  );
}

