"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type NavSection = { id: string; label: string };

/**
 * Floating pill nav that tracks which project section is in view and lets the
 * reader jump between them — mirrors the reference layout's sticky section bar.
 */
export function ProjectSectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sections.length) return;

    const onScroll = () => {
      // Reveal once the reader is past the hero.
      setVisible(window.scrollY > 520);

      // Active = last section whose top has passed the middle of the viewport.
      const marker = window.innerHeight * 0.45;
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= marker) current = s.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  if (!sections.length) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-6 z-40 hidden justify-center px-4 transition-all duration-300 md:flex",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <nav
        aria-label="Project sections"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/90 p-1.5 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.25)] backdrop-blur-md dark:border-white/10 dark:bg-[#12141a]/90"
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active === s.id ? "true" : undefined}
            className={cn(
              "rounded-full px-4 py-2 text-[13px] font-semibold transition-colors",
              active === s.id
                ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            )}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
