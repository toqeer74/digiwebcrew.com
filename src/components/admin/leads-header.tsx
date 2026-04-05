"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Filter, Zap, ChevronDown, Download } from "lucide-react";
import { AddLeadModal } from "./add-lead-modal";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { PageHeader } from "@/components/admin/page-header";

export function LeadsHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(searchParams.get("openAdd") === "1");
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setIsModalOpen(searchParams.get("openAdd") === "1");
  }, [searchParams]);

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (!v || v === "ALL") params.delete(k);
      else params.set(k, v);
    });
    params.delete("openAdd");
    if (!updates.page) params.set("page", "1");
    const next = params.toString();
    router.push(next ? `${pathname}?${next}` : pathname);
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: query || null, page: "1" });
  };

  const exportHref = `/api/admin/leads/export?${new URLSearchParams({
    ...(searchParams.get("q") ? { q: searchParams.get("q") as string } : {}),
    ...(searchParams.get("status") ? { status: searchParams.get("status") as string } : {}),
    ...(searchParams.get("tier") ? { tier: searchParams.get("tier") as string } : {}),
  }).toString()}`;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Leads"
        subtitle="Manage, filter, and convert inbound leads."
        breadcrumb={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Leads" }]}
        actions={
          <div className="flex items-center gap-2">
            <a href={exportHref}>
              <button className="adm-btn adm-btn-secondary adm-btn-sm inline-flex items-center gap-2">
                <Download size={14} /> Export CSV
              </button>
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="adm-btn adm-btn-primary adm-btn-sm inline-flex items-center gap-2"
            >
              <Plus size={14} /> Add Lead
            </button>
          </div>
        }
      />

      {/* Filter bar */}
      <div
        className="grid grid-cols-1 gap-3 rounded-xl p-4 md:grid-cols-[1fr_auto_auto]"
        style={{ background: "white", border: "1.5px solid var(--adm-border)" }}
      >
        <form onSubmit={onSearchSubmit} className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--adm-text-muted)" }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, company…"
            className="adm-input h-10 pl-9"
          />
        </form>

        <div className="relative">
          <Filter
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--adm-text-muted)" }}
          />
          <ChevronDown
            size={13}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--adm-text-muted)" }}
          />
          <select
            onChange={(e) => updateParams({ status: e.target.value, page: "1" })}
            defaultValue={searchParams.get("status") || "ALL"}
            className="adm-input h-10 pl-9 pr-9 appearance-none min-w-[160px]"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="PROPOSAL">Proposal</option>
            <option value="WON">Won</option>
            <option value="LOST">Lost</option>
          </select>
        </div>

        <div className="relative">
          <Zap
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--adm-text-muted)" }}
          />
          <ChevronDown
            size={13}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--adm-text-muted)" }}
          />
          <select
            onChange={(e) => updateParams({ tier: e.target.value, page: "1" })}
            defaultValue={searchParams.get("tier") || "ALL"}
            className="adm-input h-10 pl-9 pr-9 appearance-none min-w-[140px]"
          >
            <option value="ALL">All Tiers</option>
            <option value="HOT">🔥 Hot</option>
            <option value="WARM">🌡 Warm</option>
            <option value="COLD">❄️ Cold</option>
          </select>
        </div>
      </div>

      <AddLeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
