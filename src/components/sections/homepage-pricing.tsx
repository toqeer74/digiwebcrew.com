import Link from "next/link";
import { ArrowRight, Code2, Zap, Bot, Search, CheckCircle2, ScrollText, ShieldCheck, Layers, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/AnimatedSection";
import { FluidBackground } from "@/components/sections/homepage-visuals";
import { localePath } from "@/lib/locale-path";
import { splitPrice, type AccentKey, type IconKey, type PricingConfig } from "@/lib/pricing-shared";

interface HomepagePricingProps {
  data: PricingConfig;
  locale: string;
}

const ICONS: Record<IconKey, LucideIcon> = {
  code: Code2,
  zap: Zap,
  bot: Bot,
  search: Search,
};

type AccentStyles = {
  tint: string;
  hoverBorder: string;
  chip: string;
  badge: string;
  hoverText: string;
  itemBorder: string;
  mark: string;
};

const ACCENTS: Record<AccentKey, AccentStyles> = {
  blue: {
    tint: "bg-blue-50/40 dark:bg-blue-950/10",
    hoverBorder: "hover:border-blue-500/30",
    chip: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    hoverText: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
    itemBorder: "border-blue-100 dark:border-blue-900/30",
    mark: "text-blue-500",
  },
  violet: {
    tint: "bg-violet-50/30 dark:bg-violet-950/10",
    hoverBorder: "hover:border-violet-500/30",
    chip: "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
    hoverText: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
    itemBorder: "border-violet-100 dark:border-violet-900/30",
    mark: "text-violet-500",
  },
  amber: {
    tint: "bg-amber-50/30 dark:bg-amber-950/10",
    hoverBorder: "hover:border-amber-500/30",
    chip: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    hoverText: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    itemBorder: "border-amber-100 dark:border-amber-900/30",
    mark: "text-amber-500",
  },
  teal: {
    tint: "bg-emerald-50/40 dark:bg-emerald-950/10",
    hoverBorder: "hover:border-emerald-500/30",
    chip: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    hoverText: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    itemBorder: "border-emerald-100 dark:border-emerald-900/30",
    mark: "text-emerald-500",
  },
};

const assurances = [
  { icon: ScrollText, title: "Fixed-price proposal", desc: "Agreed before any work starts" },
  { icon: ShieldCheck, title: "No hidden fees", desc: "Scope changes are quoted upfront" },
  { icon: Layers, title: "Single or multi-service", desc: "Combine what your project needs" },
];

const sectionCardClass =
  "site-card overflow-hidden relative p-8 lg:p-10 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 dark:border-white/5 dark:bg-white/5";
const interactiveCardClass =
  "site-card site-card-interactive group overflow-hidden relative p-6 lg:p-7 border border-slate-200 bg-white/85 backdrop-blur-xl transition-all duration-700 dark:border-white/5 dark:bg-white/5";

const gradientTop = (
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--site-primary)] via-[#34D399] to-[#60A5FA]" />
);

export function HomepagePricing({ data, locale }: HomepagePricingProps) {
  const titleParts = data.headline.split(" ");
  const titleFirst = titleParts[0];
  const titleRest = titleParts.slice(1).join(" ");

  return (
    <section className="relative my-8 overflow-hidden py-16 lg:py-20">
      {/* Ambient background: radial glow + masked grid */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[130%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--site-primary)]/10 via-emerald-500/[0.04] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[600px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ── Bento row 1: narrative panel + quick comparison ── */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:gap-6">
          <AnimatedSection
            className={cn(sectionCardClass, "flex flex-col justify-center md:col-span-12 lg:col-span-8")}
          >
            <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-60">
              <FluidBackground />
            </div>

            <div className="relative z-10">
              <span className="mb-5 inline-block rounded-full bg-slate-900 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md dark:bg-white dark:text-slate-900">
                Pricing
              </span>

              <h2 className="mb-5 font-display text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
                {titleFirst}{" "}
                <span className="bg-gradient-to-r from-[var(--site-primary)] to-[#34D399] bg-clip-text text-transparent">
                  {titleRest}
                </span>
              </h2>

              <p className="mb-8 max-w-2xl text-base font-medium leading-relaxed text-muted-foreground lg:text-lg">
                Every project is scoped around what your business actually needs. These are honest starting points —
                where you land depends on the depth of the build, never on how many hours we happen to log.
              </p>

              <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {assurances.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white/60 p-3.5 shadow-sm dark:border-white/5 dark:bg-white/5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--site-primary)]/10 text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
                      <item.icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold leading-tight text-slate-900 dark:text-white">{item.title}</p>
                      <p className="mt-0.5 text-[11px] font-medium leading-snug text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={localePath(locale, "/quote")}
                  className="group/cta inline-flex items-center justify-center gap-2 rounded-full bg-[var(--site-primary)] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[var(--site-primary)]/20 transition-all hover:brightness-110"
                >
                  Get Custom Quote
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Link>
                <Link
                  href={localePath(locale, "/pricing")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  See Full Pricing
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Quick comparison — previously unused content, now surfaced */}
          {data.quickComparisonRows.length > 0 && (
            <AnimatedSection
              delay={0.1}
              className={cn(
                interactiveCardClass,
                "flex flex-col md:col-span-12 lg:col-span-4",
                "hover:border-emerald-500/30"
              )}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-px rounded-[21px] bg-emerald-50/60 dark:bg-emerald-950/20"
              />
              {gradientTop}

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                <CheckCircle2 size={24} />
              </div>

              <h3 className="mb-6 font-display text-2xl font-black text-slate-900 dark:text-white transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                {data.quickComparisonTitle}
              </h3>

              <ul className="space-y-3">
                {data.quickComparisonRows.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white/60 p-3.5 shadow-sm dark:border-white/5 dark:bg-white/5"
                  >
                    <span className="text-[13px] font-semibold text-slate-900 dark:text-white">{row.label}</span>
                    <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          )}
        </div>

        {/* ── Bento row 2: package cards ── */}
        {data.tiers.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {data.tiers.map((pkg, idx) => {
              const accent = ACCENTS[pkg.accent] ?? ACCENTS.blue;
              const Icon = ICONS[pkg.icon] ?? Code2;
              const [amount, period] = splitPrice(pkg.price);

              return (
                <AnimatedSection
                  key={pkg.id}
                  delay={0.06 * idx}
                  className={cn(interactiveCardClass, "flex flex-col", accent.hoverBorder)}
                >
                  <div aria-hidden="true" className={cn("pointer-events-none absolute inset-px rounded-[21px]", accent.tint)} />
                  {gradientTop}

                  <div className="mb-6 flex items-start justify-between gap-3">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", accent.chip)}>
                      <Icon size={22} />
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                        accent.badge
                      )}
                    >
                      {pkg.timeline}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      From
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-black leading-none tracking-tighter text-slate-900 dark:text-white">
                        {amount}
                      </span>
                      {(period || pkg.unit) && (
                        <span className="text-sm font-bold text-muted-foreground">
                          {period ? `/${period}` : pkg.unit}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3
                    className={cn(
                      "mb-3 min-h-[3.5rem] font-display text-lg font-black leading-snug text-slate-900 dark:text-white transition-colors",
                      accent.hoverText
                    )}
                  >
                    {pkg.name}
                  </h3>

                  <div
                    className={cn(
                      "mb-6 flex min-h-[4rem] items-start gap-2.5 rounded-xl border bg-white/60 p-3 shadow-sm dark:bg-white/5",
                      accent.itemBorder
                    )}
                  >
                    <CheckCircle2 size={15} className={cn("mt-0.5 shrink-0", accent.mark)} />
                    <span className="text-[13px] font-semibold leading-snug text-slate-900 dark:text-white">{pkg.fit}</span>
                  </div>

                  <Link
                    href={localePath(locale, "/quote")}
                    className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                  >
                    Get Started
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
