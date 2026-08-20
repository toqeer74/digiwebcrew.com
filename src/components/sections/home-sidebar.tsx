import Link from "next/link";
import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import {
  PiGlobeDuotone,
  PiTrendUpDuotone,
  PiLightningDuotone,
  PiChartLineUpDuotone,
  PiStackDuotone,
} from "react-icons/pi";
import { localePath } from "@/lib/locale-path";

type Pkg = { label: string; price: string; timeline: string; fit: string };

type Thumb = { icon: ComponentType<{ size?: number; color?: string }>; color: string; bg: string };

const thumbs: Thumb[] = [
  { icon: PiGlobeDuotone, color: "var(--site-primary)", bg: "rgba(var(--site-primary-rgb),0.08)" },
  { icon: PiTrendUpDuotone, color: "#7C3AED", bg: "#F5F3FF" },
  { icon: PiLightningDuotone, color: "#D97706", bg: "#FFFBEB" },
  { icon: PiChartLineUpDuotone, color: "#059669", bg: "#ECFDF5" },
];

interface HomeSidebarProps {
  locale: string;
  packages: Pkg[];
}

export function HomeSidebar({ locale, packages }: HomeSidebarProps) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      {/* Newsletter card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.03]">
        <div className="mb-3 flex items-center gap-2">
          <Mail size={16} className="text-slate-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Stay up to date</h3>
        </div>
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Get practical growth, engineering, and automation insights. New articles and
          resources straight to your inbox — unsubscribe anytime.
        </p>
        <Link
          href={localePath(locale, "/contact")}
          className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          Join
        </Link>
      </div>

      {/* Services & pricing card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.03]">
        <div className="mb-4 flex items-center gap-2">
          <PiStackDuotone size={18} className="text-slate-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Services & Pricing</h3>
        </div>

        <div className="space-y-1">
          {packages.map((pkg, i) => {
            const t = thumbs[i % thumbs.length];
            const Icon = t.icon;
            return (
              <Link
                key={pkg.label}
                href={localePath(locale, "/pricing")}
                className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: t.bg }}
                >
                  <Icon size={17} color={t.color} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-slate-800 dark:text-white">
                    {pkg.label}
                  </span>
                  <span className="block text-[11px] text-slate-400 dark:text-slate-500">
                    {pkg.timeline}
                  </span>
                </span>
                <span className="shrink-0 text-[13px] font-bold text-slate-900 dark:text-white">
                  {pkg.price}
                </span>
              </Link>
            );
          })}
        </div>

        <Link
          href={localePath(locale, "/pricing")}
          className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          View Pricing
        </Link>
      </div>
    </aside>
  );
}
