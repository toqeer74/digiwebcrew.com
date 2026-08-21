import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { localePath } from "@/lib/locale-path";

/**
 * In-article conversion block.
 *
 * Blog traffic is top-of-funnel, so this asks for a low-commitment next step
 * (a scoping call) rather than pushing straight to a quote.
 */
export function BlogCta({
  locale,
  heading = "Thinking about a project like this?",
  body = "Book a free 30-minute call with a senior engineer. We will pressure-test your approach and tell you what it would realistically take — no pitch, no obligation.",
}: {
  locale: string;
  heading?: string;
  body?: string;
}) {
  return (
    <aside className="not-prose my-14 overflow-hidden rounded-2xl border border-[var(--site-primary-border)]/30 bg-[rgba(var(--site-primary-rgb),0.05)] p-8 md:p-10">
      <div className="flex items-center gap-2 text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
        <CalendarCheck size={18} />
        <span className="text-xs font-bold uppercase tracking-[0.18em]">Free consultation</span>
      </div>

      <h2 className="mt-4 font-display text-2xl font-black tracking-tight text-midnight md:text-3xl dark:text-white">
        {heading}
      </h2>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-600 dark:text-slate-300">{body}</p>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          href={localePath(locale, "/book-consultation")}
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--site-primary)] px-6 py-3 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--site-primary-hover)]"
        >
          Book a free call
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href={localePath(locale, "/case-studies")}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-[15px] font-bold text-slate-800 transition-all hover:-translate-y-0.5 hover:border-[var(--site-primary)] hover:text-[var(--site-primary)] dark:border-white/15 dark:text-white"
        >
          See client results
        </Link>
      </div>
    </aside>
  );
}
