"use client";

import Image from "next/image";
import { BrandingConfig } from "@/lib/branding-shared";

interface SidebarLogoProps {
  branding: BrandingConfig;
}

export function SidebarLogo({ branding }: SidebarLogoProps) {
  const initials = branding.siteName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase() || "LB";

  return (
    <div className="flex h-12 items-center gap-3 px-2">
      {branding.logoDataUrl ? (
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <Image
            src={branding.logoDataUrl}
            alt={branding.siteName}
            fill
            className="object-contain p-1"
          />
        </div>
      ) : (
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--site-primary)] text-[10px] font-black text-white shadow-lg shadow-[var(--site-primary)]/20">
          {initials}
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-sm font-bold tracking-tight text-slate-900">
          {branding.siteName}
        </p>
        <p className="truncate text-[10px] font-bold uppercase tracking-widest text-slate-500/80">
          Admin Control
        </p>
      </div>
    </div>
  );
}

