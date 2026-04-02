"use client";

import { Container } from "../layout/layout-primitives";
import type { ClientLogosData } from "@/lib/content-engine";

export function ClientLogos({ data }: { data: ClientLogosData }) {
  const logosData = data || { heading: "Trusted by growing brands and ambitious businesses", logos: [] };
  return (
    <section className="border-y border-slate-200/80 bg-white py-10 dark:border-white/10 dark:bg-midnight">
      <Container>
        <div className="mx-auto max-w-6xl">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-300">
            {logosData.heading}
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {logosData.logos.map((logo) => (
              <div
                key={logo}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs font-semibold text-slate-500 transition-colors hover:border-[rgba(var(--site-primary-rgb),0.45)] hover:text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

