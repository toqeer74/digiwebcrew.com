"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Container } from "../layout/layout-primitives";
import type { TestimonialsData } from "@/lib/content-engine";
import { SiTrustpilot, SiG2 } from "react-icons/si";
import { FaUpwork } from "react-icons/fa6";
import type { IconType } from "react-icons";
import Image from "next/image";

type BadgeEntry =
  | { type: "image"; src: string; bg: string; label: string }
  | { type: "icon"; icon: IconType; color: string; bg: string };

// Lookup for the scrolling trust-signal ticker
type TrustLogoEntry =
  | { type: "image"; src: string; bg: string; label: string }
  | { type: "icon"; icon: IconType; color: string; bg: string };

const TRUST_LOGOS: Record<string, TrustLogoEntry> = {
  // Exact or partial key matches for common credential strings
  "Google Review Profile":  { type: "image", src: "/images/logos/google.svg",   bg: "bg-white border border-slate-200", label: "Google" },
  "Google Reviews":         { type: "image", src: "/images/logos/google.svg",   bg: "bg-white border border-slate-200", label: "Google" },
  "Clutch Agency Listing":  { type: "image", src: "/images/logos/clutch.svg",   bg: "bg-[#EF4335]",                     label: "Clutch" },
  "Clutch Profile":         { type: "image", src: "/images/logos/clutch.svg",   bg: "bg-[#EF4335]",                     label: "Clutch" },
  "LinkedIn Presence":      { type: "image", src: "/images/logos/linkedin.svg", bg: "bg-[#0A66C2]",                     label: "LinkedIn" },
  "LinkedIn Recommendation":{ type: "image", src: "/images/logos/linkedin.svg", bg: "bg-[#0A66C2]",                     label: "LinkedIn" },
  "Trustpilot":             { type: "icon",  icon: SiTrustpilot, color: "text-white", bg: "bg-[#00B67A]" },
  "G2":                     { type: "icon",  icon: SiG2,         color: "text-white", bg: "bg-[#FF492C]" },
  "Upwork":                 { type: "icon",  icon: FaUpwork,     color: "text-white", bg: "bg-[#6FDA44]" },
};

/** Find best matching logo for a credential string (exact or substring match) */
function findTrustLogo(credential: string): TrustLogoEntry | undefined {
  if (TRUST_LOGOS[credential]) return TRUST_LOGOS[credential];
  const key = Object.keys(TRUST_LOGOS).find((k) =>
    credential.toLowerCase().includes(k.toLowerCase()) ||
    k.toLowerCase().includes(credential.toLowerCase())
  );
  return key ? TRUST_LOGOS[key] : undefined;
}

const BADGE_MAP: Record<string, BadgeEntry> = {
  "Google Reviews":    { type: "image", src: "/images/logos/google.svg",   bg: "bg-white border border-slate-100",  label: "Google" },
  "Google":            { type: "image", src: "/images/logos/google.svg",   bg: "bg-white border border-slate-100",  label: "Google" },
  "Clutch":            { type: "image", src: "/images/logos/clutch.svg",   bg: "bg-[#EF4335]",                      label: "Clutch" },
  "Clutch Profile":    { type: "image", src: "/images/logos/clutch.svg",   bg: "bg-[#EF4335]",                      label: "Clutch" },
  "LinkedIn":          { type: "image", src: "/images/logos/linkedin.svg", bg: "bg-[#0A66C2]",                      label: "LinkedIn" },
  "LinkedIn Presence": { type: "image", src: "/images/logos/linkedin.svg", bg: "bg-[#0A66C2]",                      label: "LinkedIn" },
  "Trustpilot":        { type: "icon",  icon: SiTrustpilot, color: "text-white", bg: "bg-[#00B67A]" },
  "G2":                { type: "icon",  icon: SiG2,         color: "text-white", bg: "bg-[#FF492C]" },
  "Upwork":            { type: "icon",  icon: FaUpwork,     color: "text-white", bg: "bg-[#6FDA44]" },
};

function BadgeIconBox({ entry }: { entry: BadgeEntry }) {
  if (entry.type === "image") {
    return (
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${entry.bg} shadow-sm overflow-hidden`}>
        <Image src={entry.src} alt={entry.label} width={28} height={28} className="object-contain" />
      </div>
    );
  }
  const Icon = entry.icon;
  return (
    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${entry.bg} shadow-sm`}>
      <Icon size={22} className={entry.color} />
    </div>
  );
}



const fallbackTestimonialsData: TestimonialsData = {
  reviewBadges: [],
  testimonials: [],
  trustSignals: [],
};

export function Testimonials({ data }: { data: TestimonialsData }) {
  const testimonialsData = data || fallbackTestimonialsData;
  const reviewBadges = testimonialsData.reviewBadges || [];
  const testimonials = testimonialsData.testimonials || [];
  const trustSignals = testimonialsData.trustSignals || [];

  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-white py-20 text-slate-900 dark:border-white/10 dark:bg-midnight dark:text-white">
      <Container className="relative z-10">
        <div className="relative text-center max-w-3xl mx-auto mb-14">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Client Success Stories
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-5 text-3xl font-display font-black tracking-tight text-slate-900 dark:text-white md:text-5xl"
          >
            Real Results, Real Feedback
          </motion.h2>
          <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400">
            Discover how businesses are scaling to new heights with Digi Web Crew's industrial-grade websites and automation systems.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {reviewBadges.map((badge) => {
            const entry = BADGE_MAP[badge.label];
            return (
              <a
                key={badge.label}
                href={badge.href}
                target="_blank"
                rel="noreferrer"
                className="site-card site-card-interactive group flex items-center gap-4 p-5 text-left"
              >
                {entry && <BadgeIconBox entry={entry} />}
                <div>
                  <p className="text-sm font-bold text-slate-900 transition-colors group-hover:text-[var(--site-primary)] dark:text-white">{badge.label}</p>
                  <p className="text-xs text-slate-500 dark:text-white/60 mt-0.5 font-medium">{badge.meta}</p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="relative mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              className="site-card site-card-interactive group relative flex flex-col p-8"
            >
              {/* Card Quote Icon Overlay */}
              <div className="absolute right-6 top-6 opacity-[0.04] dark:opacity-[0.06] scale-150">
                <Quote className="h-16 w-16" />
              </div>

              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-white/10"}`}
                  />
                ))}
              </div>

              <p className="relative mb-8 flex-1 text-lg font-medium leading-relaxed text-slate-700 dark:text-white/90">
                "{t.content}"
              </p>

              <div className="site-card-divider pt-6 border-t">
                <p className="mb-1 text-base font-display font-black tracking-tight text-slate-900 dark:text-white">
                  {t.name}
                </p>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  {t.role}
                </p>
                <a
                  href={t.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 transition-all hover:border-emerald-300 hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20"
                >
                  {/* Green verified checkmark */}
                  <svg className="h-3 w-3 shrink-0 text-emerald-500" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm11.03-2.47a.75.75 0 0 1 0 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-1.5-1.5a.75.75 0 1 1 1.06-1.06l.97.97 2.97-2.97a.75.75 0 0 1 1.06 0Z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Verified · {t.source}
                  </span>
                </a>

              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Trusted Accreditation Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative mt-4"
        >
          {/* Section label */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-slate-200 dark:bg-white/10" />
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-slate-400 dark:text-white/40">
              Trusted Accreditation
            </p>
            <div className="h-px w-12 bg-slate-200 dark:bg-white/10" />
          </div>

          {/* Scrolling strip with frosted pill background */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 py-4 dark:border-white/[0.07] dark:bg-white/[0.03] backdrop-blur-sm overflow-hidden">
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="flex w-max gap-3 whitespace-nowrap px-4"
              >
                {[0, 1].map((batch) => (
                  <div
                    key={batch}
                    aria-hidden={batch === 1}
                    className="flex shrink-0 items-center gap-3 pr-3"
                  >
                    {trustSignals.map((credential, i) => {
                      const logo = findTrustLogo(credential);
                      return (
                        <div key={`${batch}-${credential}`} className="flex items-center gap-2">
                          {/* Pill */}
                          <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-slate-200/80 bg-white px-3 py-2 shadow-[0_1px_4px_rgba(15,23,42,0.06)] transition-all hover:shadow-[0_2px_8px_rgba(15,23,42,0.10)] hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/10 cursor-default group">
                            {/* Logo circle */}
                            {logo ? (
                              logo.type === "image" ? (
                                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full overflow-hidden ${logo.bg}`}>
                                  <Image src={logo.src} alt={logo.label} width={14} height={14} className="object-contain" />
                                </span>
                              ) : (
                                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${logo.bg}`}>
                                  <logo.icon size={11} className={logo.color} />
                                </span>
                              )
                            ) : (
                              /* Generic verified dot for non-brand signals */
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                                <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 16 16" fill="currentColor">
                                  <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" clipRule="evenodd"/>
                                </svg>
                              </span>
                            )}
                            {/* Label */}
                            <span className="text-[11px] font-semibold tracking-wide text-slate-600 dark:text-white/70 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                              {credential}
                            </span>
                          </div>
                          {/* Dot separator (not after last) */}
                          {i < trustSignals.length - 1 && (
                            <span className="h-1 w-1 shrink-0 rounded-full bg-slate-300 dark:bg-white/20" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

      </Container>
    </section>

  );
}

