"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Check,
  Loader2,
  Plus,
  Trash2,
  RotateCcw,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Tag,
  ListChecks,
} from "lucide-react";
import { ACard, ACardBody } from "@/components/admin/acard";
import { PageHeader } from "@/components/admin/page-header";
import {
  ACCENT_KEYS,
  ICON_KEYS,
  DEFAULT_PRICING_CONFIG,
  type AccentKey,
  type IconKey,
  type PricingConfig,
  type PricingTier,
} from "@/lib/pricing-shared";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="adm-form-group">
      <label className="adm-label">
        {label}
        {hint && (
          <span style={{ fontWeight: 500, color: "var(--adm-text-muted)" }}> · {hint}</span>
        )}
      </label>
      {children}
    </div>
  );
}

function newTier(): PricingTier {
  return {
    id: `tier-${Date.now()}`,
    name: "New package",
    shortName: "New",
    price: "$0",
    unit: "starting",
    timeline: "TBD",
    description: "",
    fit: "",
    drivers: [],
    ctaLabel: "Learn more",
    href: "/services",
    popular: false,
    accent: "blue",
    icon: "code",
  };
}

export default function AdminPricingPage() {
  const [config, setConfig] = useState<PricingConfig | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/pricing", { cache: "no-store" });
        if (!res.ok) {
          setLoadError("Failed to load pricing. Showing defaults.");
          setConfig(DEFAULT_PRICING_CONFIG);
          return;
        }
        const data = await res.json();
        setConfig(data?.config ?? DEFAULT_PRICING_CONFIG);
      } catch {
        setLoadError("Failed to load pricing. Showing defaults.");
        setConfig(DEFAULT_PRICING_CONFIG);
      }
    })();
  }, []);

  const patch = (updater: (draft: PricingConfig) => PricingConfig) => {
    setConfig((prev) => (prev ? updater(structuredClone(prev)) : prev));
  };

  const patchTier = (index: number, changes: Partial<PricingTier>) => {
    patch((draft) => {
      draft.tiers[index] = { ...draft.tiers[index], ...changes };
      return draft;
    });
  };

  const moveTier = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    patch((draft) => {
      if (target < 0 || target >= draft.tiers.length) return draft;
      const [item] = draft.tiers.splice(index, 1);
      draft.tiers.splice(target, 0, item);
      return draft;
    });
  };

  /** Only one tier may carry the ribbon, matching what the pages render. */
  const setPopular = (index: number, value: boolean) => {
    patch((draft) => {
      draft.tiers = draft.tiers.map((t, i) => ({ ...t, popular: value && i === index }));
      return draft;
    });
  };

  const handleSave = async () => {
    if (!config) return;
    if (config.tiers.length === 0) {
      toast.error("Add at least one package before saving");
      return;
    }
    const unnamed = config.tiers.find((t) => !t.name.trim() || !t.price.trim());
    if (unnamed) {
      toast.error("Every package needs a name and a price");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      if (data?.config) setConfig(data.config);
      setSaved(true);
      toast.success("Pricing published to the site");
      setTimeout(() => setSaved(false), 2500);
    } catch {
      toast.error("Failed to save pricing");
    } finally {
      setIsSaving(false);
    }
  };

  if (!config) {
    return (
      <div className="admin-page-stack w-full pb-8">
        <PageHeader
          title="Pricing"
          subtitle="Manage the packages shown on the homepage and pricing page."
          breadcrumb={[{ label: "Dashboard", href: "/digiadmin/dashboard" }, { label: "Pricing" }]}
        />
        <div className="flex items-center gap-2 py-16 justify-center" style={{ color: "var(--adm-text-muted)" }}>
          <Loader2 size={18} className="animate-spin" />
          <span style={{ fontSize: 13 }}>Loading pricing…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page-stack w-full pb-8">
      <PageHeader
        title="Pricing"
        subtitle="These packages drive the homepage pricing section and the pricing page tiers."
        breadcrumb={[{ label: "Dashboard", href: "/digiadmin/dashboard" }, { label: "Pricing" }]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setConfig(structuredClone(DEFAULT_PRICING_CONFIG));
                toast.info("Reset to defaults — not saved yet");
              }}
              className="adm-btn adm-btn-secondary inline-flex items-center gap-2"
              type="button"
            >
              <RotateCcw size={14} /> Reset
            </button>
            <button
              onClick={() => void handleSave()}
              disabled={isSaving}
              className="adm-btn adm-btn-primary inline-flex items-center gap-2"
              type="button"
            >
              {isSaving ? <Loader2 size={15} className="animate-spin" /> : saved ? <Check size={15} /> : null}
              {isSaving ? "Publishing…" : saved ? "Published!" : "Publish Changes"}
            </button>
          </div>
        }
      />

      {loadError && (
        <div
          className="rounded-xl p-4 text-sm"
          style={{ background: "var(--adm-danger-dim)", color: "#991b1b", border: "1.5px solid var(--adm-danger-dim)" }}
        >
          {loadError}
        </div>
      )}

      {/* Section heading */}
      <ACard>
        <div className="flex items-center gap-2 px-6 pt-5 pb-3">
          <div className="admin-stat-icon adm-primary" style={{ width: 30, height: 30 }}>
            <Tag size={15} />
          </div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--adm-text)" }}>Homepage Section</h2>
        </div>
        <ACardBody className="px-6 pb-6 pt-0">
          <div className="adm-form-grid">
            <Field label="Section heading" hint="first word stays plain, the rest is gradient">
              <input
                className="adm-input"
                value={config.headline}
                onChange={(e) => patch((d) => ({ ...d, headline: e.target.value }))}
              />
            </Field>
            <Field label="Comparison card title">
              <input
                className="adm-input"
                value={config.quickComparisonTitle}
                onChange={(e) => patch((d) => ({ ...d, quickComparisonTitle: e.target.value }))}
              />
            </Field>
          </div>
        </ACardBody>
      </ACard>

      {/* Packages */}
      {config.tiers.map((tier, index) => (
        <ACard key={tier.id}>
          <div className="flex items-center justify-between gap-3 px-6 pt-5 pb-3">
            <div className="flex items-center gap-2">
              <div className="admin-stat-icon adm-primary" style={{ width: 30, height: 30 }}>
                <GripVertical size={15} />
              </div>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--adm-text)" }}>
                Package {index + 1}
                <span style={{ fontWeight: 500, color: "var(--adm-text-muted)" }}> · {tier.name}</span>
              </h2>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => moveTier(index, -1)}
                disabled={index === 0}
                className="adm-btn adm-btn-secondary"
                style={{ padding: "6px 8px", opacity: index === 0 ? 0.4 : 1 }}
                aria-label="Move package up"
              >
                <ChevronUp size={14} />
              </button>
              <button
                type="button"
                onClick={() => moveTier(index, 1)}
                disabled={index === config.tiers.length - 1}
                className="adm-btn adm-btn-secondary"
                style={{ padding: "6px 8px", opacity: index === config.tiers.length - 1 ? 0.4 : 1 }}
                aria-label="Move package down"
              >
                <ChevronDown size={14} />
              </button>
              <button
                type="button"
                onClick={() => patch((d) => ({ ...d, tiers: d.tiers.filter((_, i) => i !== index) }))}
                className="adm-btn adm-btn-secondary"
                style={{ padding: "6px 8px", color: "#b91c1c" }}
                aria-label="Delete package"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          <ACardBody className="px-6 pb-6 pt-0">
            <div className="adm-form-grid">
              <Field label="Name">
                <input
                  className="adm-input"
                  value={tier.name}
                  onChange={(e) => patchTier(index, { name: e.target.value })}
                />
              </Field>
              <Field label="Short name" hint="comparison table column, e.g. Website">
                <input
                  className="adm-input"
                  value={tier.shortName}
                  onChange={(e) => patchTier(index, { shortName: e.target.value })}
                />
              </Field>
              <Field label="Price" hint="e.g. $3,500">
                <input
                  className="adm-input"
                  value={tier.price}
                  onChange={(e) => patchTier(index, { price: e.target.value })}
                />
              </Field>
              <Field label="Unit" hint="shown next to the price">
                <input
                  className="adm-input"
                  value={tier.unit}
                  onChange={(e) => patchTier(index, { unit: e.target.value })}
                />
              </Field>
              <Field label="Timeline" hint="e.g. 4–8 weeks">
                <input
                  className="adm-input"
                  value={tier.timeline}
                  onChange={(e) => patchTier(index, { timeline: e.target.value })}
                />
              </Field>
              <Field label="Link" hint="site-relative path">
                <input
                  className="adm-input"
                  value={tier.href}
                  onChange={(e) => patchTier(index, { href: e.target.value })}
                />
              </Field>
              <Field label="CTA label">
                <input
                  className="adm-input"
                  value={tier.ctaLabel}
                  onChange={(e) => patchTier(index, { ctaLabel: e.target.value })}
                />
              </Field>
              <Field label="Colour">
                <select
                  className="adm-input"
                  value={tier.accent}
                  onChange={(e) => patchTier(index, { accent: e.target.value as AccentKey })}
                >
                  {ACCENT_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Icon">
                <select
                  className="adm-input"
                  value={tier.icon}
                  onChange={(e) => patchTier(index, { icon: e.target.value as IconKey })}
                >
                  {ICON_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="adm-form-group" style={{ marginTop: 18 }}>
              <label className="adm-label">
                Short fit line
                <span style={{ fontWeight: 500, color: "var(--adm-text-muted)" }}> · homepage card</span>
              </label>
              <input
                className="adm-input"
                value={tier.fit}
                onChange={(e) => patchTier(index, { fit: e.target.value })}
              />
            </div>

            <div className="adm-form-group" style={{ marginTop: 14 }}>
              <label className="adm-label">
                Description
                <span style={{ fontWeight: 500, color: "var(--adm-text-muted)" }}> · pricing page card</span>
              </label>
              <textarea
                className="adm-input"
                rows={3}
                value={tier.description}
                onChange={(e) => patchTier(index, { description: e.target.value })}
              />
            </div>

            <div className="adm-form-group" style={{ marginTop: 14 }}>
              <label className="adm-label">
                Scope drivers
                <span style={{ fontWeight: 500, color: "var(--adm-text-muted)" }}> · one per line</span>
              </label>
              <textarea
                className="adm-input"
                rows={4}
                value={tier.drivers.join("\n")}
                onChange={(e) =>
                  patchTier(index, { drivers: e.target.value.split("\n").map((d) => d.replace(/^\s+/, "")) })
                }
                onBlur={(e) =>
                  patchTier(index, {
                    drivers: e.target.value
                      .split("\n")
                      .map((d) => d.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>

            <label
              className="flex items-center gap-2.5"
              style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: "var(--adm-text)", cursor: "pointer" }}
            >
              <input
                type="checkbox"
                checked={tier.popular}
                onChange={(e) => setPopular(index, e.target.checked)}
                style={{ width: 16, height: 16, accentColor: "var(--site-primary)" }}
              />
              Mark as “Popular” (only one package can hold this)
            </label>
          </ACardBody>
        </ACard>
      ))}

      <button
        type="button"
        onClick={() => patch((d) => ({ ...d, tiers: [...d.tiers, newTier()] }))}
        className="adm-btn adm-btn-secondary inline-flex items-center gap-2"
        style={{ alignSelf: "flex-start" }}
      >
        <Plus size={15} /> Add package
      </button>

      {/* Quick comparison rows */}
      <ACard>
        <div className="flex items-center gap-2 px-6 pt-5 pb-3">
          <div className="admin-stat-icon adm-primary" style={{ width: 30, height: 30 }}>
            <ListChecks size={15} />
          </div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--adm-text)" }}>Quick Comparison Rows</h2>
        </div>
        <ACardBody className="px-6 pb-6 pt-0">
          <div className="flex flex-col gap-3">
            {config.quickComparisonRows.map((row, index) => (
              <div key={index} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  className="adm-input"
                  placeholder="Label"
                  value={row.label}
                  onChange={(e) =>
                    patch((d) => {
                      d.quickComparisonRows[index].label = e.target.value;
                      return d;
                    })
                  }
                />
                <input
                  className="adm-input"
                  placeholder="Value"
                  value={row.value}
                  onChange={(e) =>
                    patch((d) => {
                      d.quickComparisonRows[index].value = e.target.value;
                      return d;
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    patch((d) => ({
                      ...d,
                      quickComparisonRows: d.quickComparisonRows.filter((_, i) => i !== index),
                    }))
                  }
                  className="adm-btn adm-btn-secondary"
                  style={{ padding: "8px 10px", color: "#b91c1c" }}
                  aria-label="Delete row"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              patch((d) => ({
                ...d,
                quickComparisonRows: [...d.quickComparisonRows, { label: "", value: "" }],
              }))
            }
            className="adm-btn adm-btn-secondary inline-flex items-center gap-2"
            style={{ marginTop: 14 }}
          >
            <Plus size={15} /> Add row
          </button>

          <p style={{ fontSize: 12, color: "var(--adm-text-muted)", marginTop: 12 }}>
            Rows with an empty label or value are dropped on save.
          </p>
        </ACardBody>
      </ACard>
    </div>
  );
}
