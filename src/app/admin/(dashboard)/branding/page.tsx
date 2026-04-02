"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Image, Trash2, Check, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { toast } from "sonner";
import { DEFAULT_BRANDING_CONFIG } from "@/lib/branding-shared";
import type { BrandingConfig } from "@/lib/branding-shared";

export default function BrandingPage() {
  const [logo, setLogo] = useState<string | null>(null);
  const [siteName, setSiteName] = useState(DEFAULT_BRANDING_CONFIG.siteName);
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_BRANDING_CONFIG.primaryColor);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/branding", { cache: "no-store" });
        if (!res.ok) {
          setLoadError("Failed to load branding settings");
          return;
        }
        const data = await res.json();
        if (data?.config) {
          const config = data.config as BrandingConfig;
          setSiteName(config.siteName || DEFAULT_BRANDING_CONFIG.siteName);
          setPrimaryColor(config.primaryColor || DEFAULT_BRANDING_CONFIG.primaryColor);
          setLogo(config.logoDataUrl || null);
        }
      } catch {
        setLoadError("Failed to load branding settings");
      }
    };

    void load();
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result as string);
      setIsUploading(false);
    };
    reader.onerror = () => setIsUploading(false);
    reader.readAsDataURL(file);
  };

  const handleSave = async (logoOverride?: string | null) => {
    const trimmedName = siteName.trim();
    if (!trimmedName) {
      setSaveError("Site name is required");
      toast.error("Site name is required");
      return;
    }

    setSaveError(null);
    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/branding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteName: trimmedName,
          primaryColor,
          logoDataUrl: logoOverride !== undefined ? logoOverride || "" : logo || "",
        } satisfies BrandingConfig),
      });

      if (!res.ok) throw new Error("Save failed");

      setSaved(true);
      toast.success("Branding saved!");
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setSaved(false);
      setSaveError("Failed to save branding");
      toast.error("Failed to save branding");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveLogoAndSave = async () => {
    setLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    await handleSave("");
  };

  return (
    <div className="admin-page-stack w-full space-y-6 pb-8">
      <PageHeader
        title="Branding"
        subtitle="Manage your site identity and visual branding."
        breadcrumb={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Branding" }]}
      />

      {loadError ? <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{loadError}</div> : null}
      {saveError ? <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{saveError}</div> : null}

      <Card className="admin-card rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
            <div className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600">
              <Image size={16} />
            </div>
            Site Logo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex flex-col items-center gap-3">
              <div
                className={`flex h-32 w-32 items-center justify-center overflow-hidden rounded-xl border border-dashed ${
                  logo ? "border-slate-300 bg-white" : "border-slate-300 bg-slate-50"
                }`}
              >
                {isUploading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                ) : logo ? (
                  <img src={logo} alt="Site Logo" className="h-full w-full object-contain p-2" />
                ) : (
                  <div className="text-center text-slate-400">
                    <Upload className="mx-auto mb-2 h-8 w-8" />
                    <span className="text-xs">No logo</span>
                  </div>
                )}
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Preview</p>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <p className="mb-1 text-sm font-semibold text-slate-900">Upload a new logo</p>
                <p className="text-sm text-slate-500">Recommended size: 512x512. Supported formats: PNG, JPG, SVG.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />

                <Button variant="outline" className="h-10 rounded-lg" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                  <Upload size={16} className="mr-2" />
                  {isUploading ? "Uploading..." : "Upload Logo"}
                </Button>

                {logo ? (
                  <Button variant="ghost" className="h-10 rounded-lg text-red-700 hover:bg-red-50 hover:text-red-800" onClick={handleRemoveLogo}>
                    <Trash2 size={16} className="mr-2" /> Remove
                  </Button>
                ) : null}

                {logo ? (
                  <Button variant="outline" className="h-10 rounded-lg border-red-200 text-red-700 hover:bg-red-50" onClick={() => void handleRemoveLogoAndSave()}>
                    <Trash2 size={16} className="mr-2" /> Delete + Save
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="admin-card rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-slate-900">Site Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="site-name" className="text-xs font-medium text-slate-600">Site Name</Label>
              <Input id="site-name" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="h-10 rounded-lg border-slate-200" placeholder="Enter site name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="primary-color" className="text-xs font-medium text-slate-600">Primary Color</Label>
              <div className="flex items-center gap-3">
                <input type="color" id="primary-color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-10 w-12 cursor-pointer rounded-lg border border-slate-200 bg-white" />
                <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-10 flex-1 rounded-lg border-slate-200" placeholder={DEFAULT_BRANDING_CONFIG.primaryColor} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="admin-card rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-slate-900">Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex h-12 items-center gap-3 border-b border-slate-200 px-4" style={{ backgroundColor: `${primaryColor}14` }}>
              <div className="grid h-7 w-7 place-items-center rounded-lg text-xs font-bold text-white" style={{ backgroundColor: primaryColor }}>
                {logo ? <img src={logo} alt="logo preview" className="h-full w-full rounded-lg object-cover" /> : "DWC"}
              </div>
              <p className="text-sm font-semibold text-slate-800">{siteName || "Site Name"}</p>
            </div>
            <div className="grid min-h-[140px] grid-cols-12 gap-3 bg-slate-50 p-4">
              <div className="col-span-4 space-y-2 rounded-lg border border-slate-200 bg-white p-2">
                <div className="h-2.5 rounded" style={{ backgroundColor: `${primaryColor}33` }} />
                <div className="h-2.5 rounded bg-slate-200" />
                <div className="h-2.5 rounded bg-slate-200" />
              </div>
              <div className="col-span-8 rounded-lg border border-slate-200 bg-white p-3">
                <div className="h-3 w-2/3 rounded" style={{ backgroundColor: `${primaryColor}66` }} />
                <div className="mt-3 h-2.5 rounded bg-slate-200" />
                <div className="mt-2 h-2.5 w-4/5 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => void handleSave()} disabled={isSaving} className={`h-11 rounded-lg px-8 text-sm font-semibold ${saved ? "bg-emerald-600 text-white hover:bg-emerald-700" : ""}`}>
          {isSaving ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <Check size={16} className="mr-2" />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}

