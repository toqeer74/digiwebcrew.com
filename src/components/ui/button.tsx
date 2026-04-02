"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg" | "xl";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variantStyles = {
      primary:
        "border border-[color:var(--site-primary-border)] bg-[var(--site-primary)] text-[var(--site-primary-contrast)] shadow-none hover:bg-[var(--site-primary-hover)] dark:shadow-[0_26px_60px_-36px_rgba(255,255,255,0.12)] [&_svg]:ml-2 [&_svg]:h-8 [&_svg]:w-8 [&_svg]:rounded-full [&_svg]:bg-white [&_svg]:p-1.5 [&_svg]:text-[var(--site-primary)]",
      secondary:
        "border border-[color:var(--site-primary-border)] bg-[var(--site-primary)] text-[var(--site-primary-dark-text)] shadow-none hover:bg-[var(--site-primary-hover)] dark:text-[var(--site-primary-contrast)] dark:shadow-[0_26px_60px_-36px_rgba(255,255,255,0.12)] [&_svg]:ml-2 [&_svg]:h-8 [&_svg]:w-8 [&_svg]:rounded-full [&_svg]:bg-white [&_svg]:p-1.5 [&_svg]:text-[var(--site-primary)]",
      outline:
        "border border-[color:var(--site-primary-border)] bg-[var(--site-primary)] text-[var(--site-primary-dark-text)] shadow-none hover:bg-[var(--site-primary-hover)] dark:text-[var(--site-primary-contrast)] dark:shadow-[0_26px_60px_-36px_rgba(255,255,255,0.12)] [&_svg]:ml-2 [&_svg]:h-8 [&_svg]:w-8 [&_svg]:rounded-full [&_svg]:bg-white [&_svg]:p-1.5 [&_svg]:text-[var(--site-primary)]",
      ghost: "bg-transparent text-[#B7CADB] hover:bg-[#0C1822]/70 hover:text-[#F8FBFF]",
      glass:
        "border border-[color:var(--site-primary-border)] bg-[var(--site-primary)] text-[var(--site-primary-dark-text)] shadow-none hover:bg-[var(--site-primary-hover)] dark:text-[var(--site-primary-contrast)] dark:shadow-[0_26px_60px_-36px_rgba(255,255,255,0.12)] [&_svg]:ml-2 [&_svg]:h-8 [&_svg]:w-8 [&_svg]:rounded-full [&_svg]:bg-white [&_svg]:p-1.5 [&_svg]:text-[var(--site-primary)]",
    };

    const sizeStyles = {
      sm: "h-10 px-5 text-xs",
      md: "h-12 px-7 text-sm",
      lg: "h-14 px-9 text-base",
      xl: "h-16 px-11 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-display font-semibold tracking-[0.01em] transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus:ring-2 focus:ring-[color:rgba(var(--site-primary-rgb),0.25)]",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

