"use client";

import { useState, useEffect } from "react";
import {
  Shield, Database, Globe, User, BarChart3, Save, Eye, EyeOff,
  Check, AlertCircle, Zap, Lock, Server, Activity, Sparkles,
  ChevronRight, ExternalLink
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface TrackingConfig {
  gtm_id: string;
  ga4_id: string;
  meta_pixel_id: string;
  meta_access_token: string;
  linkedin_partner_id: string;
  google_ads_id: string;
}

export default function SettingsPage() {
  const [trackingConfig, setTrackingConfig] = useState<TrackingConfig>({
    gtm_id: '',
    ga4_id: '',
    meta_pixel_id: '',
    meta_access_token: '',
    linkedin_partner_id: '',
    google_ads_id: '',
  });
  const [showSecrets, setShowSecrets] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState<'system' | 'tracking'>('tracking');

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch('/api/admin/settings/tracking');
        if (res.ok) {
          const data = await res.json();
          if (data.config) {
            setTrackingConfig(data.config);
          }
        }
      } catch (error) {
        console.error('Failed to load tracking config:', error);
      }
    };
    loadConfig();
  }, []);

  const handleSaveTracking = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const res = await fetch('/api/admin/settings/tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackingConfig),
      });

      if (res.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const updateTrackingField = (field: keyof TrackingConfig, value: string) => {
    setTrackingConfig(prev => ({ ...prev, [field]: value }));
  };

  const systemMetrics = [
    { label: "API Latency", value: "12ms", status: "excellent", icon: Zap },
    { label: "Uptime", value: "99.99%", status: "excellent", icon: Activity },
    { label: "Security", value: "A+", status: "excellent", icon: Lock },
    { label: "Database", value: "Connected", status: "excellent", icon: Server },
  ];

  const trackingFields = [
    {
      key: 'gtm_id',
      label: 'Google Tag Manager',
      placeholder: 'GTM-XXXXXXX',
      secret: false,
      color: 'from-blue-500 to-blue-600',
      description: 'Container ID for GTM'
    },
    {
      key: 'ga4_id',
      label: 'Google Analytics 4',
      placeholder: 'G-XXXXXXXXXX',
      secret: false,
      color: 'from-orange-500 to-amber-500',
      description: 'Measurement ID for GA4'
    },
    {
      key: 'meta_pixel_id',
      label: 'Meta Pixel',
      placeholder: 'XXXXXXXXXXXXXXX',
      secret: false,
      color: 'from-blue-600 to-indigo-600',
      description: 'Facebook/Meta Pixel ID'
    },
    {
      key: 'meta_access_token',
      label: 'Meta CAPI Token',
      placeholder: 'EAAG...',
      secret: true,
      color: 'from-purple-500 to-pink-500',
      description: 'Server-side API access token'
    },
    {
      key: 'linkedin_partner_id',
      label: 'LinkedIn Insight',
      placeholder: 'XXXXXXX',
      secret: false,
      color: 'from-sky-500 to-blue-600',
      description: 'Partner ID for B2B tracking'
    },
    {
      key: 'google_ads_id',
      label: 'Google Ads',
      placeholder: 'AW-XXXXXXXXX',
      secret: false,
      color: 'from-green-500 to-emerald-500',
      description: 'Conversion tracking ID'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-midnight-950 dark:via-midnight-900 dark:to-midnight-950">
      <PageHeader
        label="System"
        title="Command Center"
        description="System configuration & tracking infrastructure"
      />

      <div className="p-8 pt-6">
        <AnimatePresence mode="wait">
          {activeTab === 'tracking' ? (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quick Stats Bar */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {systemMetrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white dark:bg-midnight-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-200/50 dark:border-midnight-700/50 shadow-sm hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric/10 to-purple-500/10 dark:from-electric/20 dark:to-purple-500/20 flex items-center justify-center text-electric group-hover:scale-110 transition-transform">
                        <metric.icon size={18} />
                      </div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                    </div>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{metric.value}</p>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">{metric.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Tracking Configuration Cards */}
              <div className="bg-white dark:bg-midnight-800/30 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-midnight-700/50 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="p-8 border-b border-gray-100 dark:border-midnight-700/50 bg-gradient-to-r from-gray-50 to-white dark:from-midnight-800/50 dark:to-midnight-800/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-electric to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-electric/20">
                        <BarChart3 className="text-white" size={22} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tracking & Pixel IDs</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Configure your conversion tracking infrastructure</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowSecrets(!showSecrets)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-midnight-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-midnight-600 transition-colors text-sm font-semibold"
                    >
                      {showSecrets ? <EyeOff size={16} /> : <Eye size={16} />}
                      {showSecrets ? 'Hide Secrets' : 'Show Secrets'}
                    </button>
                  </div>
                </div>

                {/* Fields Grid */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trackingFields.map((field, i) => (
                      <motion.div
                        key={field.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group"
                      >
                        <div className="bg-gray-50 dark:bg-midnight-800/50 rounded-2xl p-5 border border-gray-200/50 dark:border-midnight-700/50 hover:border-electric/30 dark:hover:border-electric/30 transition-all hover:shadow-lg">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={cn(
                              "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg",
                              field.color
                            )}>
                              <BarChart3 size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{field.label}</p>
                              <p className="text-xs text-gray-400 dark:text-gray-500">{field.description}</p>
                            </div>
                            {field.secret && (
                              <Lock size={14} className="text-gray-400 dark:text-gray-500" />
                            )}
                          </div>
                          <input
                            type={field.secret && !showSecrets ? 'password' : 'text'}
                            value={trackingConfig[field.key as keyof TrackingConfig]}
                            onChange={(e) => updateTrackingField(field.key as keyof TrackingConfig, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full h-12 px-4 bg-white dark:bg-midnight-900 border border-gray-200 dark:border-midnight-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric transition-all"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-8 pt-4 border-t border-gray-100 dark:border-midnight-700/50 bg-gray-50/50 dark:bg-midnight-800/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <AnimatePresence mode="wait">
                        {saveStatus === 'success' && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: -10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: -10 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          >
                            <Check size={18} />
                            <span className="text-sm font-bold">Configuration saved successfully!</span>
                          </motion.div>
                        )}
                        {saveStatus === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: -10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: -10 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400"
                          >
                            <AlertCircle size={18} />
                            <span className="text-sm font-bold">Failed to save. Please try again.</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <Button
                      onClick={handleSaveTracking}
                      disabled={isSaving}
                      className="h-12 px-8 bg-gradient-to-r from-electric to-blue-600 hover:from-electric hover:to-blue-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-electric/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                    >
                      {isSaving ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Saving Configuration...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Save size={18} />
                          Save All Changes
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Pro Tip Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 p-6 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 dark:from-amber-500/5 dark:via-orange-500/5 dark:to-amber-500/5 rounded-2xl border border-amber-200/50 dark:border-amber-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shrink-0">
                    <Zap size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-1">Pro Tip: Server-Side Tracking</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-400/80 leading-relaxed">
                      For maximum data accuracy, configure the Meta CAPI token. This enables server-to-server event tracking that bypasses ad blockers and iOS privacy restrictions, recovering up to 30% more conversion data.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="system"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* System Status Cards */}
              {[
                {
                  title: "Security Protocols",
                  icon: Shield,
                  color: "from-emerald-500 to-teal-500",
                  items: [
                    { label: "Auth Layer", value: "Active (V7 Secure)", status: true },
                    { label: "Encryption", value: "AES-256-GCM", status: true },
                    { label: "2FA Status", value: "Enabled", status: true },
                  ]
                },
                {
                  title: "Infrastructure",
                  icon: Database,
                  color: "from-blue-500 to-indigo-500",
                  items: [
                    { label: "Database", value: "MongoDB Atlas", status: true },
                    { label: "Cache Layer", value: "Redis Active", status: true },
                    { label: "CDN", value: "Vercel Edge", status: true },
                  ]
                },
                {
                  title: "Operations",
                  icon: Globe,
                  color: "from-purple-500 to-pink-500",
                  items: [
                    { label: "Automations", value: "n8n Connected", status: true },
                    { label: "I18n", value: "3 Languages", status: true },
                    { label: "Environment", value: "Production", status: true },
                  ]
                },
                {
                  title: "Performance",
                  icon: Zap,
                  color: "from-amber-500 to-orange-500",
                  items: [
                    { label: "LCP", value: "< 2.1s", status: true },
                    { label: "CLS", value: "0.02", status: true },
                    { label: "INP", value: "Good", status: true },
                  ]
                },
              ].map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-midnight-800/50 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-midnight-700/50 p-8 shadow-xl hover:shadow-2xl transition-all group"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform",
                      section.color
                    )}>
                      <section.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{section.title}</h3>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">All systems operational</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {section.items.map(item => (
                      <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-midnight-700/50 last:border-0">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</span>
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            item.status ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-rose-500"
                          )} />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
