import Link from "next/link";
import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
  label?: string;
  highlight?: string;
  description?: string;
  descriptionHighlight?: string;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
  label,
  highlight,
  description,
  descriptionHighlight,
}: PageHeaderProps) {
  const computedTitle = highlight ? `${title} ${highlight}` : title;
  const computedSubtitle = subtitle || [description, descriptionHighlight].filter(Boolean).join(" ");

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="space-y-1">
        {label ? <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p> : null}
        {breadcrumb && breadcrumb.length > 0 ? (
          <div className="text-sm text-slate-400">
            {breadcrumb.map((item, idx) => (
              <span key={`${item.label}-${idx}`}>
                {item.href ? <Link href={item.href} className="hover:text-slate-600">{item.label}</Link> : item.label}
                {idx < breadcrumb.length - 1 ? " › " : ""}
              </span>
            ))}
          </div>
        ) : null}
        <h1 className="text-2xl font-semibold text-slate-900">{computedTitle}</h1>
        {computedSubtitle ? <p className="text-sm text-slate-500">{computedSubtitle}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
