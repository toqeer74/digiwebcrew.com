"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "glass";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonAsButtonProps = ButtonOwnProps &
  Omit<HTMLMotionProps<"button">, "href"> & { href?: undefined };

type ButtonAsLinkProps = ButtonOwnProps &
  Omit<HTMLMotionProps<"a">, "href"> & { href: string };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-[var(--site-primary-border)] bg-[var(--site-primary)] text-white hover:bg-[var(--site-primary-hover)] shadow-lg shadow-[var(--site-primary)]/20 dark:shadow-[var(--site-primary)]/10",
  secondary:
    "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 shadow-sm",
  outline:
    "border-2 border-[var(--site-primary)] bg-transparent text-[var(--site-primary)] hover:bg-[var(--site-primary)]/5 dark:text-[var(--site-primary-soft)] dark:border-[var(--site-primary-soft)]/50 dark:hover:bg-[var(--site-primary-soft)]/5",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white",
  glass:
    "border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 shadow-xl",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-xs",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-base",
  xl: "h-16 px-11 text-lg",
};

const baseClassName =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-[0.01em] transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus:ring-2 focus:ring-[color:rgba(var(--site-primary-rgb),0.25)]";

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const sharedClassName = cn(baseClassName, variantStyles[variant], sizeStyles[size], className);

    if (props.href !== undefined) {
      const { href, ...linkProps } = props as ButtonAsLinkProps;
      return (
        <MotionLink
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className={sharedClassName}
          {...linkProps}
        />
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className={sharedClassName}
        {...(props as ButtonAsButtonProps)}
      />
    );
  }
);

Button.displayName = "Button";

