import Link from "next/link";

export type ArticleItem = {
  title: string;
  date: string;
  excerpt: string;
  href: string;
};

function formatDate(date: string) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function ArticlesFeed({ items }: { items: ArticleItem[] }) {
  return (
    <div className="space-y-10">
      {items.map((item) => (
        <article key={item.href} className="group">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500">
            <span className="h-3.5 w-px bg-slate-300 dark:bg-white/20" />
            {formatDate(item.date)}
          </div>
          <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {item.excerpt}
          </p>
          <Link
            href={item.href}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400"
          >
            Read article
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">›</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
