"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React from "react";

interface BreadcrumbItem { label: string; href?: string; }
interface PageHeaderProps { title: string; subtitle?: string; breadcrumb?: BreadcrumbItem[]; actions?: React.ReactNode; }

export function PageHeader({ title, subtitle, breadcrumb, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="space-y-1">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--adm-text-muted)" }}>
            {breadcrumb.map((item, index) => (
              <React.Fragment key={item.label}>
                {item.href ? (
                  <Link href={item.href} className="transition-colors hover:text-slate-900">
                    {item.label}
                  </Link>
                ) : (
                  <span style={{ color: "var(--adm-text)", fontWeight: 700 }}>{item.label}</span>
                )}
                {index < breadcrumb.length - 1 && <ChevronRight size={11} />}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1
          className="tracking-tight"
          style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.8px", color: "var(--adm-text)", fontFamily: "var(--adm-font)", lineHeight: 1.1 }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 13.5, color: "var(--adm-text-muted)", marginTop: 4, fontWeight: 500 }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
