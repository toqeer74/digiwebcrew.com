"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1.5">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-slate-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-slate-900 font-semibold">{item.label}</span>
                )}
                {index < breadcrumb.length - 1 && (
                  <ChevronRight size={12} className="text-slate-400" />
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
