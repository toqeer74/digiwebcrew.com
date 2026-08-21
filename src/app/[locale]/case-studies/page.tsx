import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/layout-primitives";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProjectsGrid, type WorkProject } from "@/components/sections/projects-grid";
import { getCaseStudies } from "@/lib/content-engine";
import { getWorkVisual } from "@/lib/work-visuals";
import { itemListSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { getDictionary } from "@/lib/get-dictionary";
import { localePath } from "@/lib/locale-path";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    path: "/case-studies",
    title: "Client Work & Case Studies",
    description: "Real projects with measurable outcomes: faster sites, higher conversion, and automated operations for clients across six industries.",
    keywords: ["software development case studies", "web design portfolio", "development agency work"],
  });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [studies] = await Promise.all([getCaseStudies(), getDictionary(locale)]);

  const projects: WorkProject[] = studies.map((s) => {
    const visual = getWorkVisual(s.slug);
    return {
      slug: s.slug,
      name: s.client || s.title,
      categories: (s.categories?.length ? s.categories : [s.industry]).filter(Boolean),
      clientWork: true,
      ...visual,
      image: s.coverImage || visual.image,
    };
  });

  // Published-project count is derived so it stays true as case studies are added.
  const trackRecord = [
    { value: `${projects.length}`, label: "Published case studies" },
    { value: "10+ yrs", label: "Building digital systems" },
    { value: "6", label: "Industries served" },
    { value: "100%", label: "Projects delivered in-house" },
  ];

  return (
    <main className="relative flex-1 overflow-hidden pt-28 pb-24">
      <JsonLd
        schema={itemListSchema(
          locale,
          projects.map((p) => ({ name: p.name, path: `/case-studies/${p.slug}` }))
        )}
      />
      {/* Ambient brand wash, consistent with the other top-level pages */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px]">
        <div className="absolute left-1/2 top-0 h-[720px] w-[130%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--site-primary)]/[0.10] via-[var(--site-primary)]/[0.03] to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_45%_at_50%_0%,#000_60%,transparent_100%)]" />
      </div>

      <Container>
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <AnimatedSection className="relative pb-14 pt-6">
            {/* Decorative flourish, mirrors the reference layout's right-side squiggle. */}
            <div
              className="pointer-events-none absolute -top-2 right-0 hidden w-[400px] lg:block"
              aria-hidden="true"
            >
              <svg viewBox="0 0 420 200" fill="none" className="h-auto w-full">
                <defs>
                  <linearGradient id="workFlourish" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--site-primary)" stopOpacity="0.12" />
                    <stop offset="60%" stopColor="var(--site-primary)" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="var(--site-primary)" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 148 C 78 48, 208 26, 284 74 C 340 110, 320 174, 268 162 C 222 151, 228 100, 288 90 C 340 81, 366 92, 390 68"
                  stroke="url(#workFlourish)"
                  strokeWidth="13"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            <h1 className="relative z-10 max-w-2xl font-display text-[3.25rem] font-black leading-[1.05] tracking-tight text-midnight dark:text-white md:text-[4.25rem]">
              Our best <span className="text-[var(--site-primary)]">work</span>
            </h1>
            <p className="relative z-10 mt-5 max-w-md text-[17px] leading-relaxed text-slate-500 dark:text-slate-400">
              Showcases our commitment to excellence, delivering standout digital solutions that exceed expectations.
            </p>
          </AnimatedSection>

          {/* Filter + grid */}
          <ProjectsGrid projects={projects} basePath={localePath(locale, "/case-studies")} pageSize={6} />

          {/* Track record */}
          <AnimatedSection className="mt-24 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-slate-200 pt-14 lg:grid-cols-4 dark:border-white/10">
            {trackRecord.map((s) => (
              <div key={s.label}>
                <p className="font-display text-[2.5rem] font-black leading-none tracking-tight text-[var(--site-primary)] md:text-[3rem] dark:text-[var(--site-primary-soft)]">
                  {s.value}
                </p>
                <p className="mt-3 text-[15px] leading-snug text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            ))}
          </AnimatedSection>

          {/* Closing CTA */}
          <AnimatedSection className="mt-24 overflow-hidden rounded-3xl bg-slate-900 px-8 py-16 text-center md:px-16 dark:bg-white/5">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
              Want results like these?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-slate-300">
              Tell us what you&apos;re trying to build and we&apos;ll map out the right scope and next step.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={localePath(locale, "/book-consultation")}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-bold text-slate-900 transition-all hover:-translate-y-0.5"
              >
                Book Consultation
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={localePath(locale, "/quote")}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                Get a Quote
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </main>
  );
}
