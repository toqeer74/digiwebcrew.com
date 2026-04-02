"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import React from "react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}

