"use client";
import Image from "next/image";
import { BrandingConfig } from "@/lib/branding-shared";

export function SidebarLogo({ branding }: { branding: BrandingConfig }) {
  const initials = branding.siteName
    .split(/\s+/).filter(Boolean).map((p) => p[0]).join("").slice(0, 2).toUpperCase() || "DW";

  return (
    <div className="flex items-center gap-2.5">
      {branding.logoDataUrl ? (
        <div
          className="relative overflow-hidden rounded-xl shrink-0"
          style={{ width: 38, height: 38, border: "1.5px solid var(--adm-border)", background: "white" }}
        >
          <Image src={branding.logoDataUrl} alt={branding.siteName} fill className="object-contain p-1" />
        </div>
      ) : (
        <div
          className="grid shrink-0 place-items-center rounded-xl font-black text-white text-sm"
          style={{
            width: 38, height: 38,
            background: "linear-gradient(135deg, var(--adm-primary), var(--adm-accent))",
            boxShadow: "0 4px 10px rgba(79,70,229,0.25)",
          }}
        >
          {initials}
        </div>
      )}
      <div className="min-w-0">
        <p className="admin-logo-name truncate">{branding.siteName}</p>
        <p className="admin-logo-tag">Admin Control</p>
      </div>
    </div>
  );
}
