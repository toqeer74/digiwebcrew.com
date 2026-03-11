"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/page-header";

type Tab = "tracking" | "system";

interface TrackingConfig {
  gtm_id: string;
  ga4_id: string;
  meta_pixel_id: string;
  meta_access_token: string;
  linkedin_partner_id: string;
  google_ads_id: string;
}

interface SystemStatus {
  dbConnected: boolean;
  mongo?: boolean;
  openai?: boolean;
  adminEmail?: string;
  envStatus: Record<string, boolean>;
  error?: string;
  checkedAt?: string;
}

const defaultConfig: TrackingConfig = {
  gtm_id: "",
  ga4_id: "",
  meta_pixel_id: "",
  meta_access_token: "",
  linkedin_partner_id: "",
  google_ads_id: "",
};

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("tracking");
  const [trackingConfig, setTrackingConfig] = useState<TrackingConfig>(defaultConfig);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [notificationEmail, setNotificationEmail] = useState("");
  const [sessionEmail, setSessionEmail] = useState("");
  const [showSecrets, setShowSecrets] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [isSavingSystem, setIsSavingSystem] = useState(false);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [trackingRes, systemRes, sessionRes] = await Promise.all([
          fetch("/api/admin/settings/tracking"),
          fetch("/api/admin/settings/system"),
          fetch("/api/auth/session"),
        ]);

        const trackingData = await trackingRes.json();
        if (trackingRes.ok && trackingData?.config) {
          setTrackingConfig({ ...defaultConfig, ...trackingData.config });
        }

        const systemData = await systemRes.json();
        if (systemRes.ok && systemData?.config) {
          setNotificationEmail(systemData.config.notificationEmail || "");
        }

        const sessionData = await sessionRes.json();
        setSessionEmail(sessionData?.user?.email || "");
      } catch {
        // no-op
      }
    };

    load();
  }, []);

  const fetchSystemStatus = async () => {
    setIsLoadingStatus(true);
    try {
      const res = await fetch("/api/admin/settings/status");
      const data = await res.json();
      if (res.ok) {
        setSystemStatus({
          dbConnected: !!data.dbConnected,
          mongo: !!data.mongo,
          openai: !!data.openai,
          adminEmail: data.adminEmail || "",
          envStatus: data.envStatus || {},
          error: data.error,
          checkedAt: data.checkedAt,
        });
      }
    } finally {
      setIsLoadingStatus(false);
    }
  };

  useEffect(() => {
    if (tab === "system") {
      fetchSystemStatus();
    }
  }, [tab]);

  const saveTracking = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trackingConfig),
      });
      if (!res.ok) throw new Error();
      toast.success("Tracking settings saved");
    } catch {
      toast.error("Failed to save tracking settings");
    } finally {
      setIsSaving(false);
    }
  };

  const saveSystem = async () => {
    setIsSavingSystem(true);
    try {
      const res = await fetch("/api/admin/settings/system", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationEmail }),
      });
      if (!res.ok) throw new Error();
      toast.success("System settings saved");
    } catch {
      toast.error("Failed to save system settings");
    } finally {
      setIsSavingSystem(false);
    }
  };

  const fields = useMemo(
    () => [
      { key: "gtm_id", label: "Google Tag Manager", placeholder: "GTM-XXXXXXX", secret: false },
      { key: "ga4_id", label: "GA4", placeholder: "G-XXXXXXXXXX", secret: false },
      { key: "meta_pixel_id", label: "Meta Pixel", placeholder: "XXXXXXXX", secret: false },
      { key: "meta_access_token", label: "Meta Access Token", placeholder: "EAAG...", secret: true },
      { key: "linkedin_partner_id", label: "LinkedIn Partner ID", placeholder: "XXXXXXX", secret: false },
      { key: "google_ads_id", label: "Google Ads", placeholder: "AW-XXXXXXX", secret: false },
    ],
    []
  );

  return (
    <div className="admin-page-stack space-y-6 pb-8 w-full">
      <PageHeader
        title="Settings"
        subtitle="Tracking configuration and system health."
        breadcrumb={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Settings" }]}
      />

      <div className="flex items-center gap-2">
        <Button variant={tab === "tracking" ? "primary" : "outline"} onClick={() => setTab("tracking")}>Tracking</Button>
        <Button variant={tab === "system" ? "primary" : "outline"} onClick={() => setTab("system")}>System</Button>
      </div>

      {tab === "tracking" ? (
        <section className="rounded-xl border border-slate-200 bg-white p-4 space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" className="h-9 px-3 text-sm" onClick={() => setShowSecrets((v) => !v)}>
              {showSecrets ? "Hide Secrets" : "Show Secrets"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="text-xs font-medium text-slate-600">{field.label}</label>
                <input
                  type={field.secret && !showSecrets ? "password" : "text"}
                  value={(trackingConfig as any)[field.key] || ""}
                  onChange={(e) => setTrackingConfig((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={saveTracking} disabled={isSaving}>{isSaving ? "Saving..." : "Save Tracking"}</Button>
          </div>
        </section>
      ) : (
        <section className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">System Status</h2>
            <Button variant="outline" onClick={fetchSystemStatus} disabled={isLoadingStatus}>{isLoadingStatus ? "Checking..." : "Refresh"}</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-200 p-3 flex items-center justify-between">
              <p className="text-sm text-slate-700">MongoDB</p>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${systemStatus?.mongo ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                {systemStatus?.mongo ? "Connected" : "Disconnected"}
              </span>
            </div>
            <div className="rounded-lg border border-slate-200 p-3 flex items-center justify-between">
              <p className="text-sm text-slate-700">OpenAI</p>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${systemStatus?.openai ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                {systemStatus?.openai ? "Configured" : "Not Configured"}
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Admin Email (env)</span>
              <span className="text-slate-900 font-medium">{systemStatus?.adminEmail || "Not set"}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Current Session</span>
              <span className="text-slate-900 font-medium">{sessionEmail || "Unknown"}</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Notification Email</label>
            <input
              type="email"
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
              placeholder="alerts@example.com"
              className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm"
            />
          </div>

          {systemStatus?.error ? (
            <p className="text-sm text-red-700 rounded-lg bg-red-50 border border-red-200 p-3">{systemStatus.error}</p>
          ) : null}

          {systemStatus?.checkedAt ? <p className="text-xs text-slate-500">Last checked: {new Date(systemStatus.checkedAt).toLocaleString()}</p> : null}

          <div className="flex items-center gap-3">
            <Button onClick={saveSystem} disabled={isSavingSystem}>{isSavingSystem ? "Saving..." : "Save System"}</Button>
          </div>
        </section>
      )}
    </div>
  );
}

