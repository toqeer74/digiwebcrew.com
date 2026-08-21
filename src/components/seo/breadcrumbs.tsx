import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema } from "@/lib/seo";
import { localePath } from "@/lib/locale-path";
import { JsonLd } from "@/components/seo/json-ld";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Visible breadcrumb trail plus matching BreadcrumbList schema.
 *
 * Google wants the markup to correspond to something a user can actually see,
 * so the two are emitted together rather than as schema alone.
 */
export function Breadcrumbs({
  locale,
  crumbs,
  className = "",
}: {
  locale: string;
  crumbs: Crumb[];
  className?: string;
}) {
  return (
    <>
      <JsonLd schema={breadcrumbSchema(locale, crumbs)} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-slate-500 dark:text-slate-400">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="font-semibold text-slate-700 dark:text-slate-200">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={localePath(locale, crumb.path)}
                      className="transition-colors hover:text-[var(--site-primary)]"
                    >
                      {crumb.name}
                    </Link>
                    <ChevronRight size={13} className="text-slate-300 dark:text-slate-600" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
