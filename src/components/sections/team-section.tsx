import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TeamData } from "@/lib/content-engine";
import { localePath } from "@/lib/locale-path";

export function TeamSection({ locale, data }: { locale: string; data: TeamData }) {
  const teamData = data || { heading: "Meet the Team Behind DigiWebCrew", members: [] };
  return (
    <section className="border-y border-slate-200 bg-slate-50 dark:bg-midnight py-20 transition-colors">
      <div className="container px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <span className="mb-3 inline-block rounded-full bg-[rgba(var(--site-primary-rgb),0.1)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
              Team
            </span>
            <h2 className="text-3xl font-display font-black text-foreground md:text-4xl">
              {teamData.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {teamData.members.map((member) => (
              <article key={member.name} className="site-card p-6">
                <h3 className="text-lg font-display font-bold text-foreground">{member.name}</h3>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
                  {member.role}
                </p>
                <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:border-white/15 dark:bg-white/5 dark:text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={localePath(locale, "/about")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-primary)] hover:underline dark:text-[var(--site-primary-soft)]"
            >
              Learn More About the Team <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

