"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Filter, Zap, ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
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
          <>
            <a href={exportHref} className="inline-flex">
              <Button variant="outline" className="h-10"><Download size={15} /> Export CSV</Button>
            </a>
            <Button onClick={() => setIsModalOpen(true)} className="h-10">
              <Plus size={15} /> Add Lead
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2">
        <form onSubmit={onSearchSubmit} className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, company"
            className="w-full h-10 pl-10 pr-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </form>

        <div className="relative min-w-[170px]">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            onChange={(e) => updateParams({ status: e.target.value, page: "1" })}
            defaultValue={searchParams.get("status") || "ALL"}
            className="h-10 w-full pl-9 pr-8 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 appearance-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="PROPOSAL">Proposal</option>
            <option value="WON">Won</option>
            <option value="LOST">Lost</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative min-w-[170px]">
          <Zap size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            onChange={(e) => updateParams({ tier: e.target.value, page: "1" })}
            defaultValue={searchParams.get("tier") || "ALL"}
            className="h-10 w-full pl-9 pr-8 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 appearance-none"
          >
            <option value="ALL">All Tiers</option>
            <option value="HOT">Hot</option>
            <option value="WARM">Warm</option>
            <option value="COLD">Cold</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <AddLeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

