"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  label: string;
  title: string;
  highlight?: string;
  description?: string;
  descriptionHighlight?: string;
  icon?: React.ReactNode;
  showQuoteButton?: boolean;
  quoteHref?: string;
}

export function PageHeader({
  label,
  title,
  highlight,
  description,
  descriptionHighlight,
  icon,
  showQuoteButton = true,
  quoteHref = "/quote",
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-[10px] font-black text-muted-foreground/40 mb-1 uppercase tracking-[0.2em]">
          {label}
        </p>
        <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
          {icon && <span className="text-raly-accent">{icon}</span>}
          {title}: <span className="text-raly-accent">{highlight}</span>
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground/60 italic mt-1 font-medium">
            {description}
            {descriptionHighlight && (
              <span className="text-raly-accent font-black">{descriptionHighlight}</span>
            )}
          </p>
        )}
      </div>
      {showQuoteButton && (
        <Link href={quoteHref} className="self-start">
          <Button
            size="sm"
            className={cn(
              "h-9 rounded-xl px-4 text-[10px] font-black uppercase tracking-[0.16em]",
              "bg-raly-accent text-white hover:bg-raly-accent/90"
            )}
          >
            Get a Quote
          </Button>
        </Link>
      )}
    </div>
  );
}
