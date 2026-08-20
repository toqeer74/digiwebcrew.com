"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, ChevronDown, LayoutGrid, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type WorkProject = {
  slug: string;
  name: string;
  categories: string[];
  image: string;
  /** Soft tint behind the screenshot, mirrors the per-project accent in the reference layout. */
  tint: string;
  logoBg: string;
  logoMark: string;
  clientWork?: boolean;
};

interface ProjectsGridProps {
  projects: WorkProject[];
  basePath: string;
  /** How many projects to show before "Explore more" reveals the next batch. */
  pageSize?: number;
}

function ProjectCard({ project, basePath }: { project: WorkProject; basePath: string }) {
  return (
    <Link href={`${basePath}/${project.slug}`} className="group block">
      {/* Screenshot plate */}
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl p-5 transition-transform duration-500 group-hover:-translate-y-1 sm:p-6"
        style={{ backgroundColor: project.tint }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-white shadow-[0_12px_30px_-12px_rgba(15,23,42,0.35)] ring-1 ring-black/5">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
      </div>

      {/* Meta row */}
      <div className="mt-5 flex items-start gap-3">
        <span
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13px] font-black text-white shadow-sm"
          style={{ backgroundColor: project.logoBg }}
          aria-hidden="true"
        >
          {project.logoMark}
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[17px] font-bold leading-tight text-slate-900 transition-colors group-hover:text-[var(--site-primary)] dark:text-white">
              {project.name}
            </h3>
            {project.clientWork && (
              <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                client work
              </span>
            )}
          </div>
          <p className="mt-1 text-[15px] leading-snug text-slate-500 dark:text-slate-400">
            {project.categories.join(", ")}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function ProjectsGrid({ projects, basePath, pageSize = 6 }: ProjectsGridProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All work");
  const [shown, setShown] = useState(pageSize);

  const categories = useMemo(
    () => ["All work", ...Array.from(new Set(projects.flatMap((p) => p.categories))).sort()],
    [projects]
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCategory = category === "All work" || p.categories.includes(category);
      const matchesQuery =
        !q || p.name.toLowerCase().includes(q) || p.categories.some((c) => c.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [projects, query, category]);

  const visible = matches.slice(0, shown);
  const remaining = matches.length - visible.length;

  // A new search or category starts the list over from the first page.
  const resetPaging = () => setShown(pageSize);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative w-full sm:max-w-[300px]">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              resetPaging();
            }}
            placeholder="Search"
            aria-label="Search projects"
            className="h-12 w-full rounded-full border border-transparent bg-slate-100 pl-11 pr-4 text-[15px] text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-[var(--site-primary)]/40 focus:bg-white dark:bg-white/5 dark:text-white dark:focus:bg-white/10"
          />
        </label>

        <div className="flex items-center gap-3">
          <span className="hidden text-[15px] text-slate-500 dark:text-slate-400 sm:inline">Category</span>
          <div className="relative">
            <LayoutGrid
              size={15}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                resetPaging();
              }}
              aria-label="Filter by category"
              className="h-12 cursor-pointer appearance-none rounded-full border border-slate-200 bg-white pl-11 pr-10 text-[15px] font-medium text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-[var(--site-primary)]/40 dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: Math.min(i, 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} basePath={basePath} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 py-20 text-center dark:border-white/10">
          <p className="text-[15px] text-slate-500 dark:text-slate-400">
            No projects match “{query || category}”. Try a different search or category.
          </p>
        </div>
      )}

      {/* Explore more — reveals the next batch of projects */}
      {remaining > 0 && (
        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + pageSize)}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full border border-slate-300 px-7 py-3.5",
              "text-[15px] font-semibold text-slate-800 transition-all hover:border-[var(--site-primary)]",
              "hover:text-[var(--site-primary)] dark:border-white/15 dark:text-white dark:hover:border-[var(--site-primary-soft)]"
            )}
          >
            Explore more
            <span className="text-slate-400 dark:text-slate-500">({remaining})</span>
            <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}
