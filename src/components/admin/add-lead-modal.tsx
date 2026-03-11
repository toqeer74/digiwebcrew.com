"use client";

import { useState } from "react";
import { X, User, Mail, Briefcase, DollarSign, Send, Loader2 } from "lucide-react";
import { createLead } from "@/lib/actions/lead-actions";
import { toast } from "sonner";

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddLeadModal({ isOpen, onClose }: AddLeadModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    serviceCategory: "Software Dev",
    serviceInterest: "Custom ERP",
    budgetRange: "$10k - $25k",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createLead(formData);
      toast.success("Lead created");
      onClose();
      setFormData({
        fullName: "",
        email: "",
        company: "",
        serviceCategory: "Software Dev",
        serviceInterest: "Custom ERP",
        budgetRange: "$10k - $25k",
        message: "",
      });
    } catch {
      toast.error("Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/30 px-4">
      <div className="w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Add New Lead</h2>
            <p className="text-sm text-slate-500">Create a lead from the admin dashboard.</p>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-600">Full Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-600">Service Category</label>
              <div className="relative mt-1">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <select value={formData.serviceCategory} onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })} className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm appearance-none bg-white">
                  <option>Software Dev</option>
                  <option>AI Solutions</option>
                  <option>Cloud Infrastructure</option>
                  <option>Cybersecurity</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600">Budget Range</label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <select value={formData.budgetRange} onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })} className="h-10 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm appearance-none bg-white">
                  <option>$5k - $10k</option>
                  <option>$10k - $25k</option>
                  <option>$25k - $50k</option>
                  <option>$50k+</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Company (optional)</label>
            <input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm" />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">Project Brief</label>
            <textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 p-3 text-sm h-24 resize-none" />
          </div>

          <button disabled={loading} className="w-full h-10 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 inline-flex items-center justify-center gap-2">
            {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
            {loading ? "Creating..." : "Create Lead"}
          </button>
        </form>
      </div>
    </div>
  );
}


