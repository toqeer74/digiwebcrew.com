"use client";

import { useState } from "react";
import { X, User, Mail, Briefcase, DollarSign, Send, Loader2 } from "lucide-react";
import { createLead } from "@/lib/actions/lead-actions";
import { toast } from "sonner";

interface AddLeadModalProps { isOpen: boolean; onClose: () => void; }

const defaultForm = {
  fullName: "", email: "", company: "",
  serviceCategory: "Software Dev", serviceInterest: "Custom ERP",
  budgetRange: "$10k - $25k", message: "",
};

export function AddLeadModal({ isOpen, onClose }: AddLeadModalProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createLead(form);
      toast.success("Lead created successfully!");
      onClose();
      setForm(defaultForm);
    } catch {
      toast.error("Failed to create lead");
    } finally { setLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/40 px-4">
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        style={{ border: "1.5px solid var(--adm-border)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1.5px solid var(--adm-border)" }}
        >
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "var(--adm-text)" }}>Add New Lead</h2>
            <p style={{ fontSize: 13, color: "var(--adm-text-muted)", marginTop: 2 }}>Create a lead from the admin dashboard.</p>
          </div>
          <button
            onClick={onClose}
            className="grid place-items-center rounded-lg transition-colors"
            style={{ width: 32, height: 32, border: "1.5px solid var(--adm-border)", color: "var(--adm-text-muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--adm-bg)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "")}
          >
            <X size={15} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="adm-label block mb-1.5">Full Name</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--adm-text-muted)" }} />
                <input required value={form.fullName} onChange={(e) => set("fullName", e.target.value)} className="adm-input h-10 pl-9" placeholder="Jane Doe" />
              </div>
            </div>
            <div>
              <label className="adm-label block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--adm-text-muted)" }} />
                <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="adm-input h-10 pl-9" placeholder="jane@example.com" />
              </div>
            </div>
            <div>
              <label className="adm-label block mb-1.5">Company</label>
              <div className="relative">
                <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--adm-text-muted)" }} />
                <input value={form.company} onChange={(e) => set("company", e.target.value)} className="adm-input h-10 pl-9" placeholder="Acme Inc." />
              </div>
            </div>
            <div>
              <label className="adm-label block mb-1.5">Budget Range</label>
              <div className="relative">
                <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--adm-text-muted)" }} />
                <select value={form.budgetRange} onChange={(e) => set("budgetRange", e.target.value)} className="adm-input h-10 pl-9">
                  <option>{"< $5k"}</option>
                  <option>$5k - $10k</option>
                  <option>$10k - $25k</option>
                  <option>$25k - $50k</option>
                  <option>{"> $50k"}</option>
                </select>
              </div>
            </div>
            <div>
              <label className="adm-label block mb-1.5">Service Category</label>
              <select value={form.serviceCategory} onChange={(e) => set("serviceCategory", e.target.value)} className="adm-input h-10">
                {["Software Dev","UI/UX Design","E-commerce","SEO","Mobile App","DevOps","AI Automation","Other"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="adm-label block mb-1.5">Service Interest</label>
              <input value={form.serviceInterest} onChange={(e) => set("serviceInterest", e.target.value)} className="adm-input h-10" placeholder="e.g. Custom ERP" />
            </div>
          </div>

          <div>
            <label className="adm-label block mb-1.5">Message / Notes</label>
            <textarea
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              rows={3}
              className="adm-input"
              placeholder="Any additional context about this lead…"
              style={{ resize: "vertical" }}
            />
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <button type="button" onClick={onClose} className="adm-btn adm-btn-secondary adm-btn-sm">Cancel</button>
            <button type="submit" disabled={loading} className="adm-btn adm-btn-primary adm-btn-sm inline-flex items-center gap-2">
              {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              {loading ? "Creating…" : "Create Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
