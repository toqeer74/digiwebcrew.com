"use client";

import { useEffect, useRef, useState } from "react";
import { ACard, ACardHeader, ACardTitle, ACardBody } from "@/components/admin/acard";
import { Upload, Trash2, Check, Loader2, Palette, Globe } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { toast } from "sonner";
import { DEFAULT_BRANDING_CONFIG } from "@/lib/branding-shared";
import type { BrandingConfig } from "@/lib/branding-shared";

const COLOR_SWATCHES = [
  "#4f46e5", "#0ea5e9", "#10b981", "#8b5cf6",
  "#ef4444", "#f59e0b", "#0f172a", "#ec4899",
  "#06b6d4", "#84cc16", "#f97316", "#6366f1",
];

export default function BrandingPage() {
  const [logo, setLogo] = useState<string | null>(null);
  const [siteName, setSiteName] = useState(DEFAULT_BRANDING_CONFIG.siteName);
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_BRANDING_CONFIG.primaryColor);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/branding", { cache: "no-store" });
        if (!res.ok) { setLoadError("Failed to load branding settings"); return; }
        const data = await res.json();
        if (data?.config) {
          const c = data.config as BrandingConfig;
          setSiteName(c.siteName || DEFAULT_BRANDING_CONFIG.siteName);
          setPrimaryColor(c.primaryColor || DEFAULT_BRANDING_CONFIG.primaryColor);
          setLogo(c.logoDataUrl || null);
        }
      } catch { setLoadError("Failed to load branding settings"); }
    })();
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => { setLogo(reader.result as string); setIsUploading(false); };
    reader.onerror = () => setIsUploading(false);
    reader.readAsDataURL(file);
  };

  const handleSave = async (logoOverride?: string | null) => {
    const trimmed = siteName.trim();
    if (!trimmed) { toast.error("Site name is required"); return; }
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/branding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteName: trimmed, primaryColor,
          logoDataUrl: logoOverride !== undefined ? logoOverride || "" : logo || "",
        } satisfies BrandingConfig),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      toast.success("Branding saved successfully!");
      setTimeout(() => setSaved(false), 2500);
    } catch { toast.error("Failed to save branding"); }
    finally { setIsSaving(false); }
  };

  return (
    <div className="admin-page-stack w-full pb-8">
      <PageHeader
        title="Branding"
        subtitle="Manage your site identity and visual appearance."
        breadcrumb={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Branding" }]}
        actions={
          <button
            onClick={() => void handleSave()}
            disabled={isSaving}
            className="adm-btn adm-btn-primary inline-flex items-center gap-2"
          >
            {isSaving ? <Loader2 size={15} className="animate-spin" /> : saved ? <Check size={15} /> : null}
            {isSaving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
          </button>
        }
      />

      {loadError && (
        <div className="rounded-xl p-4 text-sm" style={{ background: "var(--adm-danger-dim)", color: "#991b1b", border: "1.5px solid var(--adm-danger-dim)" }}>
          {loadError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Logo upload */}
        <ACard>
          <div className="flex items-center gap-2 px-6 pt-5 pb-3">
            <div className="admin-stat-icon adm-primary" style={{ width: 30, height: 30 }}><Globe size={15} /></div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--adm-text)" }}>Site Logo</h2>
          </div>
          <ACardBody className="px-6 pb-6 pt-0">
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              {/* Preview */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="grid place-items-center overflow-hidden rounded-xl"
                  style={{
                    width: 120, height: 120,
                    border: "2px dashed var(--adm-border)",
                    background: logo ? "white" : "var(--adm-bg)",
                  }}
                >
                  {isUploading ? (
                    <Loader2 size={28} className="animate-spin" style={{ color: "var(--adm-text-muted)" }} />
                  ) : logo ? (
                    <img src={logo} alt="Logo" className="h-full w-full object-contain p-2" />
                  ) : (
                    <div className="text-center" style={{ color: "var(--adm-text-muted)" }}>
                      <Upload size={24} className="mx-auto mb-1" />
                      <span style={{ fontSize: 11 }}>No logo</span>
                    </div>
                  )}
                </div>
                <p style={{ fontSize: 10.5, color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)", textTransform: "uppercase", letterSpacing: 1 }}>Preview</p>
              </div>

              <div className="flex-1 space-y-3">
                <p style={{ fontSize: 13.5, fontWeight: 600, color: "var(--adm-text)" }}>Upload a logo</p>
                <p style={{ fontSize: 12.5, color: "var(--adm-text-muted)" }}>Recommended: 512×512px. PNG, JPG, or SVG.</p>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="adm-btn adm-btn-secondary adm-btn-sm inline-flex items-center gap-2"
                  >
                    <Upload size={14} />
                    {isUploading ? "Uploading…" : "Upload Logo"}
                  </button>
                  {logo && (
                    <>
                      <button
                        onClick={() => { setLogo(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        className="adm-btn adm-btn-sm inline-flex items-center gap-2"
                        style={{ color: "var(--adm-danger)", borderColor: "var(--adm-danger-dim)", background: "var(--adm-danger-dim)" }}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                      <button
                        onClick={async () => { setLogo(null); await handleSave(""); }}
                        className="adm-btn adm-btn-sm inline-flex items-center gap-2"
                        style={{ color: "var(--adm-danger)", borderColor: "#fca5a5", background: "#fff" }}
                      >
                        <Trash2 size={14} /> Delete & Save
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </ACardBody>
        </ACard>

        {/* Color & name */}
        <ACard>
          <div className="flex items-center gap-2 px-6 pt-5 pb-3">
            <div className="admin-stat-icon adm-purple" style={{ width: 30, height: 30 }}><Palette size={15} /></div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--adm-text)" }}>Site Identity</h2>
          </div>
          <ACardBody className="px-6 pb-6 pt-0 space-y-5">
            <div>
              <label className="adm-label block mb-2">Site Name</label>
              <input
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="Your site name"
                className="adm-input"
              />
            </div>

            <div>
              <label className="adm-label block mb-2">Primary Color</label>
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded-lg border"
                  style={{ borderColor: "var(--adm-border)" }}
                />
                <input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  placeholder="#4f46e5"
                  className="adm-input flex-1"
                />
              </div>
              {/* Color swatches */}
              <div className="flex flex-wrap gap-2">
                {COLOR_SWATCHES.map((color) => (
                  <button
                    key={color}
                    onClick={() => setPrimaryColor(color)}
                    title={color}
                    className="adm-swatch transition-all"
                    style={{
                      background: color,
                      outline: primaryColor === color ? `3px solid ${color}` : "none",
                      outlineOffset: 2,
                      transform: primaryColor === color ? "scale(1.15)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Live preview */}
            <div>
              <label className="adm-label block mb-2">Preview</label>
              <div
                className="rounded-xl p-4 space-y-2"
                style={{ background: "var(--adm-bg)", border: "1.5px solid var(--adm-border)" }}
              >
                <div className="flex flex-wrap gap-2 items-center">
                  <button
                    className="adm-btn adm-btn-sm text-white"
                    style={{ background: primaryColor, boxShadow: `0 4px 12px ${primaryColor}40` }}
                  >
                    Primary Button
                  </button>
                  <button className="adm-btn adm-btn-secondary adm-btn-sm">Secondary</button>
                  <span
                    className="adm-badge"
                    style={{ background: `${primaryColor}20`, color: primaryColor }}
                  >
                    Badge
                  </span>
                </div>
                <div
                  className="rounded-full"
                  style={{ height: 6, background: primaryColor, width: "60%", opacity: 0.8 }}
                />
              </div>
            </div>
          </ACardBody>
        </ACard>
      </div>

      {/* Save bar */}
      <div
        className="sticky bottom-4 flex justify-end"
        style={{ pointerEvents: "none" }}
      >
        <button
          onClick={() => void handleSave()}
          disabled={isSaving}
          className="adm-btn adm-btn-primary adm-btn-lg shadow-xl"
          style={{ pointerEvents: "all" }}
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : null}
          {isSaving ? "Saving…" : saved ? "Saved!" : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
