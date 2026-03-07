"use client";

import { useState, useRef } from "react";
import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Image, Trash2, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type BrandingConfig = {
    siteName: string;
    primaryColor: string;
    logoDataUrl: string;
};

export default function BrandingPage() {
    const [logo, setLogo] = useState<string | null>(null);
    const [siteName, setSiteName] = useState("Software Lab");
    const [primaryColor, setPrimaryColor] = useState("#7C3AED");
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);
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
                    setSiteName(config.siteName || "Software Lab");
                    setPrimaryColor(config.primaryColor || "#7C3AED");
                    setLogo(config.logoDataUrl || null);
                }
            } catch (e) {
                setLoadError("Failed to load branding settings");
            }
        };
        load();
    }, []);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogo(reader.result as string);
                setIsUploading(false);
            };
            reader.onerror = () => {
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/branding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    siteName,
                    primaryColor,
                    logoDataUrl: logo || "",
                } satisfies BrandingConfig),
            });

            if (!res.ok) {
                throw new Error("Save failed");
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (e) {
            setSaved(false);
        } finally {
            setIsSaving(false);
        }
    };

    const handleRemoveLogo = () => {
        setLogo(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-8 pb-12 p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col gap-4 mb-6">
                <div>
                    <p className="text-[10px] font-black text-muted-foreground/40 mb-1 uppercase tracking-[0.2em]">Customization Suite</p>
                    <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Branding: <span className="text-raly-accent">Configuration</span></h1>
                    <p className="text-sm text-muted-foreground/60 italic mt-1 font-medium">Manage site <span className="text-raly-accent font-black">identity</span> and appearance</p>
                </div>
            </div>

            {loadError && (
                <div className="text-xs font-bold text-rose-500 uppercase tracking-widest">{loadError}</div>
            )}

            {/* Logo Upload Section */}
            <Card className="rounded-2xl border-border bg-white shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-raly-accent/10 text-raly-accent flex items-center justify-center">
                            <Image size={18} />
                        </div>
                        Site Logo
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-start gap-8">
                        {/* Logo Preview */}
                        <div className="flex flex-col items-center gap-4">
                            <div className={cn(
                                "w-32 h-32 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all overflow-hidden",
                                logo ? "border-transparent bg-gray-50" : "border-gray-200 bg-gray-50/50"
                            )}>
                                {isUploading ? (
                                    <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                                ) : logo ? (
                                    <img src={logo} alt="Site Logo" className="w-full h-full object-contain p-2" />
                                ) : (
                                    <div className="text-center">
                                        <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                        <span className="text-xs text-gray-400">No logo</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Preview</p>
                        </div>

                        {/* Upload Controls */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Upload a new logo</p>
                                <p className="text-xs text-gray-400 mb-4">Recommended size: 512x512px. Supported formats: PNG, JPG, SVG</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="hidden"
                                    id="logo-upload"
                                />
                                <Button
                                    variant="outline"
                                    className="rounded-xl"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                >
                                    <Upload size={16} className="mr-2" />
                                    {isUploading ? "Uploading..." : "Upload Logo"}
                                </Button>
                                {logo && (
                                    <Button
                                        variant="ghost"
                                        className="rounded-xl text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                                        onClick={handleRemoveLogo}
                                    >
                                        <Trash2 size={16} className="mr-2" />
                                        Remove
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Site Name Section */}
            <Card className="rounded-2xl border-border bg-white shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold">Site Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="site-name" className="text-sm font-medium">Site Name</Label>
                            <Input
                                id="site-name"
                                value={siteName}
                                onChange={(e) => setSiteName(e.target.value)}
                                className="rounded-xl"
                                placeholder="Enter site name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="primary-color" className="text-sm font-medium">Primary Color</Label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    id="primary-color"
                                    value={primaryColor}
                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                    className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                                />
                                <Input
                                    value={primaryColor}
                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                    className="rounded-xl flex-1"
                                    placeholder="#7C3AED"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={cn(
                        "rounded-xl px-8 transition-all",
                        saved && "bg-emerald-500 hover:bg-emerald-600"
                    )}
                >
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
