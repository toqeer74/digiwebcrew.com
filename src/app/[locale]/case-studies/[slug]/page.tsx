import { Container } from "@/components/layout/layout-primitives";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ProjectSectionNav } from "@/components/sections/project-section-nav";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { locales } from "@/types/i18n";
import { getCaseStudies, getCaseStudy } from "@/lib/content-engine";
import { getWorkVisual, splitMarkdownSections } from "@/lib/work-visuals";
import { Metadata } from "next";
import { localePath } from "@/lib/locale-path";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};

  return {
    title: `${study.client} | ${study.title}`,
    description: study.excerpt,
    openGraph: { title: `${study.client} | ${study.title}`, description: study.excerpt, type: "website" },
  };
}

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return locales.flatMap((locale) => studies.map((study) => ({ locale, slug: study.slug })));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const [study, allStudies] = await Promise.all([getCaseStudy(slug), getCaseStudies()]);

  if (!study) notFound();

  const visual = getWorkVisual(study.slug);
  const heroImage = study.coverImage || visual.image;
  const categories = study.categories?.length ? study.categories : [study.industry].filter(Boolean);
  const { intro, sections } = splitMarkdownSections(study.content || "");

  const hasOutcomes = study.outcomes.length > 0;
  // If the markdown already has an outcome section, the metric cards render
  // inside it rather than as a duplicate block further down the page.
  const outcomeSectionId = sections.find((s) => /outcome|result/i.test(s.heading))?.id ?? null;

  const navSections = [
    { id: "overview", label: "Overview" },
    ...sections.map((s) => ({ id: s.id, label: s.heading })),
    ...(hasOutcomes && !outcomeSectionId ? [{ id: "outcomes", label: "The Outcome" }] : []),
  ];

  const related = allStudies.filter((s) => s.slug !== study.slug).slice(0, 3);
  const workHref = localePath(locale, "/case-studies");

  // Previous / next in the same order the Work index lists them.
  const index = allStudies.findIndex((s) => s.slug === study.slug);
  const prev = index > 0 ? allStudies[index - 1] : null;
  const next = index >= 0 && index < allStudies.length - 1 ? allStudies[index + 1] : null;

  const metrics = study.metrics ?? [];
  const gallery = study.gallery ?? [];
  // Drop the gallery in after the first narrative section so it breaks up the prose.
  const galleryAfterId = sections[0]?.id ?? null;

  return (
    <main className="relative flex-1 overflow-hidden pb-24 pt-28">
      {/* Ambient brand wash, consistent with the Work index */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px]">
        <div className="absolute left-1/2 top-0 h-[720px] w-[130%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--site-primary)]/[0.10] via-[var(--site-primary)]/[0.03] to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_75%_45%_at_50%_0%,#000_60%,transparent_100%)]" />
      </div>

      <Container>
        {/* Back link */}
        <Link
          href={workHref}
          className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ChevronLeft size={17} className="transition-transform group-hover:-translate-x-0.5" />
          back to all work
        </Link>

        {/* Title block */}
        <AnimatedSection className="mx-auto mt-12 max-w-4xl text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
            {study.client}
          </p>
          <h1 className="mt-4 font-display text-[2.5rem] font-black leading-[1.1] tracking-tight text-midnight dark:text-white md:text-[3.5rem]">
            {study.title}
          </h1>
        </AnimatedSection>

        {/* Hero plate */}
        <AnimatedSection
          delay={0.1}
          className="mt-14 overflow-hidden rounded-3xl p-6 md:p-12"
          style={{ backgroundColor: visual.tint }}
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] ring-1 ring-black/5">
            <Image
              src={heroImage}
              alt={study.title}
              fill
              priority
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="object-cover"
            />
          </div>
        </AnimatedSection>

        {/* Headline metrics */}
        {metrics.length > 0 && (
          <AnimatedSection
            delay={0.15}
            className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-10 border-y border-slate-200 py-10 lg:grid-cols-4 dark:border-white/10"
          >
            {metrics.map((m) => (
              <div key={m.label}>
                <p className="font-display text-[2.25rem] font-black leading-none tracking-tight text-[var(--site-primary)] md:text-[2.75rem] dark:text-[var(--site-primary-soft)]">
                  {m.value}
                </p>
                <p className="mt-2.5 text-[14px] leading-snug text-slate-500 dark:text-slate-400">{m.label}</p>
              </div>
            ))}
          </AnimatedSection>
        )}

        {/* Identity + meta */}
        <section id="overview" className="mx-auto mt-16 max-w-5xl scroll-mt-28">
          <div className="flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black text-white shadow-sm"
              style={{ backgroundColor: visual.logoBg }}
              aria-hidden="true"
            >
              {visual.logoMark}
            </span>
            <div>
              <p className="font-display text-2xl font-black tracking-tight text-midnight dark:text-white">
                {study.client}
              </p>
              <Link
                href={workHref}
                className="text-[15px] text-slate-500 underline underline-offset-4 transition-colors hover:text-[var(--site-primary)] dark:text-slate-400"
              >
                {categories[0]}
              </Link>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-slate-200 pt-8 sm:grid-cols-3 dark:border-white/10">
            <div>
              <p className="mb-3 text-[15px] text-slate-400 dark:text-slate-500">Deliverables</p>
              <ul className="space-y-1.5">
                {categories.map((c) => (
                  <li key={c} className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[15px] text-slate-400 dark:text-slate-500">Project timeline</p>
              <p className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">{study.year}</p>
              {study.role && (
                <>
                  <p className="mb-3 mt-6 text-[15px] text-slate-400 dark:text-slate-500">Our role</p>
                  <p className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">{study.role}</p>
                </>
              )}
            </div>
            <div>
              <p className="mb-3 text-[15px] text-slate-400 dark:text-slate-500">What we used</p>
              <ul className="space-y-1.5">
                {study.techStack.map((t) => (
                  <li key={t} className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Oversized intro */}
          {(intro || study.excerpt) && (
            <div className="mt-16 max-w-4xl text-[22px] font-medium leading-[1.5] text-slate-500 md:text-[26px] dark:text-slate-400">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{intro || study.excerpt}</ReactMarkdown>
            </div>
          )}
        </section>

        {/* Body sections — label left, prose right */}
        {sections.length > 0 && (
          <div className="mx-auto mt-24 max-w-5xl space-y-20">
            {sections.map((s) => (
              <div key={s.id} className="space-y-20">
              <AnimatedSection
                id={s.id}
                className="grid scroll-mt-28 grid-cols-1 gap-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12"
              >
                <h2 className="font-display text-2xl font-bold tracking-tight text-midnight dark:text-white">
                  {s.heading}
                </h2>
                <div
                  className="prose prose-slate max-w-none text-[17px] leading-relaxed text-slate-500 dark:prose-invert dark:text-slate-400
                             prose-headings:font-display prose-headings:text-slate-900 prose-headings:dark:text-white
                             prose-h3:text-[17px] prose-h3:font-bold prose-h3:mb-1 prose-strong:text-slate-800 dark:prose-strong:text-slate-200"
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{s.body}</ReactMarkdown>

                  {hasOutcomes && s.id === outcomeSectionId && (
                    <div className="not-prose mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {study.outcomes.map((o) => (
                        <div
                          key={o}
                          className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5"
                        >
                          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                          <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">{o}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </AnimatedSection>

              {/* Supporting imagery, dropped in after the first narrative section */}
              {gallery.length > 0 && s.id === galleryAfterId && (
                <AnimatedSection className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {gallery.map((src) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </AnimatedSection>
              )}
              </div>
            ))}
          </div>
        )}

        {/* Client quote */}
        {study.testimonial && (
          <AnimatedSection className="mx-auto mt-24 max-w-5xl">
            <figure
              className="rounded-3xl px-8 py-12 md:px-14 md:py-16"
              style={{ backgroundColor: visual.tint }}
            >
              <Quote size={32} className="mb-6 text-slate-400" aria-hidden="true" />
              <blockquote className="font-display text-[22px] font-bold leading-[1.45] tracking-tight text-slate-900 md:text-[28px]">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-[13px] font-black text-white"
                  style={{ backgroundColor: visual.logoBg }}
                  aria-hidden="true"
                >
                  {visual.logoMark}
                </span>
                <span className="text-[15px] text-slate-600">
                  <span className="font-bold text-slate-900">{study.testimonial.author}</span>
                  {study.testimonial.role && <>, {study.testimonial.role}</>}
                </span>
              </figcaption>
            </figure>
          </AnimatedSection>
        )}

        {/* Outcomes — standalone, only when the markdown has no outcome section */}
        {hasOutcomes && !outcomeSectionId && (
          <AnimatedSection id="outcomes" className="mx-auto mt-24 max-w-5xl scroll-mt-28">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12">
              <h2 className="font-display text-2xl font-bold tracking-tight text-midnight dark:text-white">
                The Outcome
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {study.outcomes.map((o) => (
                  <div
                    key={o}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-500" />
                    <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">{o}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Previous / next project */}
        {(prev || next) && (
          <nav
            aria-label="Project navigation"
            className="mx-auto mt-24 grid max-w-5xl grid-cols-1 gap-4 border-t border-slate-200 pt-10 sm:grid-cols-2 dark:border-white/10"
          >
            {prev ? (
              <Link href={`${workHref}/${prev.slug}`} className="group flex flex-col gap-1">
                <span className="flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  <ChevronLeft size={14} /> Previous
                </span>
                <span className="font-display text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[var(--site-primary)] dark:text-white">
                  {prev.client}
                </span>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}

            {next && (
              <Link href={`${workHref}/${next.slug}`} className="group flex flex-col gap-1 sm:items-end sm:text-right">
                <span className="flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Next <ChevronRight size={14} />
                </span>
                <span className="font-display text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[var(--site-primary)] dark:text-white">
                  {next.client}
                </span>
              </Link>
            )}
          </nav>
        )}

        {/* More projects */}
        {related.length > 0 && (
          <section className="mx-auto mt-28 max-w-7xl">
            <h2 className="mb-10 font-display text-3xl font-black tracking-tight text-midnight dark:text-white">
              More projects
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const rv = getWorkVisual(r.slug);
                const rCats = r.categories?.length ? r.categories : [r.industry].filter(Boolean);
                return (
                  <Link key={r.slug} href={`${workHref}/${r.slug}`} className="group block">
                    <div
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl p-5 transition-transform duration-500 group-hover:-translate-y-1 sm:p-6"
                      style={{ backgroundColor: rv.tint }}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-lg bg-white shadow-[0_12px_30px_-12px_rgba(15,23,42,0.35)] ring-1 ring-black/5">
                        <Image
                          src={r.coverImage || rv.image}
                          alt={r.client}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>
                    <div className="mt-5 flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13px] font-black text-white shadow-sm"
                        style={{ backgroundColor: rv.logoBg }}
                        aria-hidden="true"
                      >
                        {rv.logoMark}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[17px] font-bold leading-tight text-slate-900 transition-colors group-hover:text-[var(--site-primary)] dark:text-white">
                          {r.client}
                        </h3>
                        <p className="mt-1 text-[15px] leading-snug text-slate-500 dark:text-slate-400">
                          {rCats.join(", ")}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA */}
        <AnimatedSection className="mx-auto mt-28 max-w-5xl overflow-hidden rounded-3xl bg-slate-900 px-8 py-16 text-center md:px-16 dark:bg-white/5">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
            Have a project like this in mind?
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
      </Container>

      <ProjectSectionNav sections={navSections} />
    </main>
  );
}
