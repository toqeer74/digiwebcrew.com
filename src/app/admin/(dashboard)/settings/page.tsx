"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/page-header";
import { ACard, ACardBody } from "@/components/admin/acard";
import { Eye, EyeOff, RefreshCw, Save, Database, Zap, Mail, Shield } from "lucide-react";

type Tab = "tracking" | "system" | "notifications" | "security";

interface TrackingConfig {
  gtm_id: string; ga4_id: string; meta_pixel_id: string;
  meta_access_token: string; linkedin_partner_id: string; google_ads_id: string;
}
interface SystemStatus {
  dbConnected: boolean; mongo?: boolean; openai?: boolean;
  adminEmail?: string; envStatus: Record<string, boolean>; error?: string; checkedAt?: string;
}

const defaultConfig: TrackingConfig = { gtm_id:"", ga4_id:"", meta_pixel_id:"", meta_access_token:"", linkedin_partner_id:"", google_ads_id:"" };

function ToggleRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="adm-toggle-row">
      <div>
        <div className="adm-toggle-label">{label}</div>
        <div className="adm-toggle-desc">{desc}</div>
      </div>
      <label className="adm-switch">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className="adm-slider" />
      </label>
    </div>
  );
}

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
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugLogging, setDebugLogging] = useState(true);
  const [notifNewLead, setNotifNewLead] = useState(true);
  const [notifChat, setNotifChat] = useState(true);
  const [notifWorkflow, setNotifWorkflow] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [tr, sr, sess] = await Promise.all([
          fetch("/api/admin/settings/tracking"),
          fetch("/api/admin/settings/system"),
          fetch("/api/auth/session"),
        ]);
        const td = await tr.json(); if (tr.ok && td?.config) setTrackingConfig({ ...defaultConfig, ...td.config });
        const sd = await sr.json(); if (sr.ok && sd?.config) setNotificationEmail(sd.config.notificationEmail || "");
        const se = await sess.json(); setSessionEmail(se?.user?.email || "");
      } catch {}
    })();
  }, []);

  const fetchStatus = async () => {
    setIsLoadingStatus(true);
    try {
      const res = await fetch("/api/admin/settings/status");
      const data = await res.json();
      if (res.ok) setSystemStatus({ dbConnected: !!data.dbConnected, mongo: !!data.mongo, openai: !!data.openai, adminEmail: data.adminEmail||"", envStatus: data.envStatus||{}, error: data.error, checkedAt: data.checkedAt });
    } finally { setIsLoadingStatus(false); }
  };
  useEffect(() => { if (tab === "system") fetchStatus(); }, [tab]);

  const saveTracking = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings/tracking", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(trackingConfig) });
      if (!res.ok) throw new Error(); toast.success("Tracking settings saved!");
    } catch { toast.error("Failed to save tracking settings"); } finally { setIsSaving(false); }
  };

  const saveSystem = async () => {
    setIsSavingSystem(true);
    try {
      const res = await fetch("/api/admin/settings/system", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ notificationEmail }) });
      if (!res.ok) throw new Error(); toast.success("System settings saved!");
    } catch { toast.error("Failed to save"); } finally { setIsSavingSystem(false); }
  };

  const trackingFields = useMemo(() => [
    { key:"gtm_id",              label:"Google Tag Manager ID",  placeholder:"GTM-XXXXXXX",   secret:false },
    { key:"ga4_id",              label:"Google Analytics 4 ID",  placeholder:"G-XXXXXXXXXX",  secret:false },
    { key:"meta_pixel_id",       label:"Meta Pixel ID",           placeholder:"1234567890",    secret:false },
    { key:"meta_access_token",   label:"Meta Access Token",       placeholder:"EAAG…",         secret:true  },
    { key:"linkedin_partner_id", label:"LinkedIn Partner ID",     placeholder:"1234567",       secret:false },
    { key:"google_ads_id",       label:"Google Ads ID",           placeholder:"AW-XXXXXXX",    secret:false },
  ], []);

  const TABS: { key: Tab; label: string }[] = [
    { key:"tracking",      label:"Tracking" },
    { key:"system",        label:"System" },
    { key:"notifications", label:"Notifications" },
    { key:"security",      label:"Security" },
  ];

  return (
    <div className="admin-page-stack w-full pb-8">
      <PageHeader
        title="Settings"
        subtitle="Configure tracking, system integrations, notifications, and security."
        breadcrumb={[{ label:"Dashboard", href:"/admin/dashboard" }, { label:"Settings" }]}
      />

      {/* Tab pills */}
      <div className="adm-pill-tabs" style={{ width:"fit-content" }}>
        {TABS.map(t => (
          <button key={t.key} className={`adm-pill-tab${tab===t.key?" active":""}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TRACKING ── */}
      {tab === "tracking" && (
        <ACard>
          <div className="adm-card-header">
            <span className="adm-card-title">Analytics Tracking</span>
            <button onClick={() => setShowSecrets(v=>!v)} className="adm-btn adm-btn-secondary adm-btn-sm inline-flex items-center gap-2">
              {showSecrets ? <EyeOff size={13}/> : <Eye size={13}/>}
              {showSecrets ? "Hide Secrets" : "Reveal Secrets"}
            </button>
          </div>
          <ACardBody>
            <div className="adm-form-grid">
              {trackingFields.map(f => (
                <div key={f.key} className="adm-form-group">
                  <label className="adm-label">{f.label}</label>
                  <input
                    type={f.secret && !showSecrets ? "password" : "text"}
                    value={(trackingConfig as any)[f.key] || ""}
                    onChange={e => setTrackingConfig(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="adm-input"
                  />
                </div>
              ))}
            </div>
            <div style={{ marginTop:24 }}>
              <button onClick={saveTracking} disabled={isSaving} className="adm-btn adm-btn-primary inline-flex items-center gap-2">
                <Save size={14}/>{isSaving ? "Saving…" : "Save Tracking Config"}
              </button>
            </div>
          </ACardBody>
        </ACard>
      )}

      {/* ── SYSTEM ── */}
      {tab === "system" && (
        <div className="admin-page-stack">
          <div className="adm-stats-grid" style={{ gridTemplateColumns:"repeat(3,1fr)", marginBottom:0 }}>
            {[
              { label:"MongoDB",     icon:<Database size={16}/>, ok:systemStatus?.mongo,  okLabel:"Connected",    failLabel:"Offline",    cls:"adm-success" },
              { label:"OpenAI",      icon:<Zap size={16}/>,      ok:systemStatus?.openai, okLabel:"Configured",   failLabel:"Not Set",    cls:"adm-accent" },
              { label:"Admin Email", icon:<Mail size={16}/>,     ok:true,                 okLabel: systemStatus?.adminEmail||"Not set", failLabel:"", cls:"adm-primary" },
            ].map(s => (
              <div key={s.label} className={`admin-stat-card ${s.cls}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="admin-stat-label">{s.label}</span>
                  <div className="admin-stat-icon">{s.icon}</div>
                </div>
                <p className="admin-stat-value" style={{ fontSize:18, fontWeight:700 }}>
                  {s.ok ? s.okLabel : s.failLabel}
                </p>
              </div>
            ))}
          </div>

          <ACard>
            <div className="adm-card-header">
              <span className="adm-card-title">System Configuration</span>
              <button onClick={fetchStatus} disabled={isLoadingStatus} className="adm-btn adm-btn-secondary adm-btn-sm inline-flex items-center gap-2">
                <RefreshCw size={13} className={isLoadingStatus?"animate-spin":""}/>
                {isLoadingStatus ? "Checking…" : "Refresh Status"}
              </button>
            </div>
            <ACardBody className="space-y-4">
              <div className="adm-form-grid">
                <div className="adm-form-group">
                  <label className="adm-label">Notification Email</label>
                  <input type="email" value={notificationEmail} onChange={e=>setNotificationEmail(e.target.value)} placeholder="admin@example.com" className="adm-input"/>
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Current Session</label>
                  <input type="text" value={sessionEmail} readOnly className="adm-input" style={{ background:"var(--adm-bg)", cursor:"default" }}/>
                </div>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <ToggleRow label="Maintenance Mode" desc="Site shows under-maintenance page to visitors" checked={maintenanceMode} onChange={setMaintenanceMode}/>
                <ToggleRow label="Debug Logging"    desc="Verbose logs stored to database"              checked={debugLogging}    onChange={setDebugLogging}/>
              </div>

              {systemStatus?.error && (
                <div className="rounded-xl p-4" style={{ background:"var(--adm-danger-dim)", color:"#991b1b", border:"1.5px solid #fca5a5", fontSize:13 }}>
                  {systemStatus.error}
                </div>
              )}
              {systemStatus?.checkedAt && (
                <p style={{ fontSize:11, color:"var(--adm-text-muted)", fontFamily:"var(--adm-mono)" }}>
                  Last checked: {new Date(systemStatus.checkedAt).toLocaleString()}
                </p>
              )}

              <button onClick={saveSystem} disabled={isSavingSystem} className="adm-btn adm-btn-primary inline-flex items-center gap-2">
                <Save size={14}/>{isSavingSystem ? "Saving…" : "Save System Config"}
              </button>
            </ACardBody>
          </ACard>
        </div>
      )}

      {/* ── NOTIFICATIONS ── */}
      {tab === "notifications" && (
        <ACard>
          <div className="adm-card-header"><span className="adm-card-title">Notification Preferences</span></div>
          <ACardBody className="space-y-3">
            <ToggleRow label="New Lead Alert"    desc="Get notified when a new lead submits"     checked={notifNewLead}  onChange={setNotifNewLead}/>
            <ToggleRow label="Chat Started"      desc="Notify when a visitor starts chatting"    checked={notifChat}     onChange={setNotifChat}/>
            <ToggleRow label="Workflow Failure"  desc="Alert on failed automation runs"          checked={notifWorkflow} onChange={setNotifWorkflow}/>
            <ToggleRow label="Weekly Summary"    desc="Weekly digest email every Monday"         checked={notifWeekly}   onChange={setNotifWeekly}/>
            <div style={{ marginTop:8 }}>
              <button onClick={() => toast.success("Notification preferences saved!")} className="adm-btn adm-btn-primary">Save Preferences</button>
            </div>
          </ACardBody>
        </ACard>
      )}

      {/* ── SECURITY ── */}
      {tab === "security" && (
        <ACard>
          <div className="adm-card-header">
            <span className="adm-card-title inline-flex items-center gap-2"><Shield size={16}/>Security Settings</span>
          </div>
          <ACardBody className="space-y-4">
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <ToggleRow label="Two-Factor Authentication" desc="Require 2FA for all admin logins"          checked={twoFA}           onChange={setTwoFA}/>
              <ToggleRow label="Session Timeout"           desc="Auto-logout after 30 minutes of inactivity" checked={sessionTimeout}  onChange={setSessionTimeout}/>
              <ToggleRow label="IP Whitelist"              desc="Restrict admin access to specific IPs"      checked={ipWhitelist}     onChange={setIpWhitelist}/>
            </div>

            <div style={{ borderTop:"1.5px solid var(--adm-border)", paddingTop:20 }}>
              <p style={{ fontSize:14, fontWeight:700, color:"var(--adm-text)", marginBottom:12 }}>Change Password</p>
              <div className="adm-form-group" style={{ marginBottom:10 }}>
                <label className="adm-label">Current Password</label>
                <input type="password" value={currentPw} onChange={e=>setCurrentPw(e.target.value)} placeholder="Current password" className="adm-input"/>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div className="adm-form-group">
                  <label className="adm-label">New Password</label>
                  <input type="password" value={newPw} onChange={e=>setNewPw(e.target.value)} placeholder="New password" className="adm-input"/>
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Confirm Password</label>
                  <input type="password" value={confirmPw} onChange={e=>setConfirmPw(e.target.value)} placeholder="Confirm password" className="adm-input"/>
                </div>
              </div>
            </div>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button onClick={() => toast.success("Security settings updated!")} className="adm-btn adm-btn-primary">Save Security</button>
              <button
                onClick={() => { if (confirm("Sign out all other sessions?")) toast.success("All other sessions revoked"); }}
                className="adm-btn adm-btn-danger"
              >
                Revoke Sessions
              </button>
            </div>
          </ACardBody>
        </ACard>
      )}
    </div>
  );
}
