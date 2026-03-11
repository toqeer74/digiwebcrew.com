import Link from "next/link";
import { getDashboardStats } from "@/lib/actions/dashboard-actions";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { DashboardQuickActions } from "@/components/admin/dashboard-quick-actions";

const PIPELINE_KEYS = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON"] as const;

export default async function DashboardPage() {
  const data = await getDashboardStats();

  const stats = [
    { label: "Leads", value: data.leadCount },
    { label: "Chats", value: data.chatCount },
    { label: "Drafts", value: data.draftCount },
    { label: "Site Name", value: data.brandingConfig?.siteName || "Digi Web Crew" },
  ];

  return (
    <div className="admin-page-stack w-full pb-8 space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of leads, activity, and pipeline status."
        breadcrumb={[{ label: "Dashboard" }]}
      />
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="admin-card admin-card-hover rounded-xl">
            <CardContent className="p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="admin-card rounded-xl">
        <div className="px-5 pt-5 pb-3">
          <h2 className="text-base font-semibold text-slate-900">Lead Status Pipeline</h2>
        </div>
        <CardContent className="grid grid-cols-2 gap-3 px-5 pb-5 pt-0 md:grid-cols-5">
          {PIPELINE_KEYS.map((key) => (
            <div key={key} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-medium text-slate-500">{key}</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{data.statusPipeline?.[key] || 0}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <Card className="admin-card rounded-xl xl:col-span-8">
          <div className="flex flex-row items-center justify-between px-5 pt-5 pb-3">
            <h2 className="text-base font-semibold text-slate-900">Recent Leads</h2>
            <Link href="/admin/leads" className="text-sm text-slate-600 hover:text-slate-900 inline-flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <CardContent className="space-y-3 px-5 pb-5 pt-0">
            {(data.recentLeads || []).length === 0 && (
              <p className="text-sm text-slate-500">No recent leads.</p>
            )}
            {(data.recentLeads || []).map((lead: any) => (
              <div key={lead.id || lead.name} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                <div>
                  <Link href={`/admin/leads/${lead.id}`} className="text-sm font-semibold text-slate-900 hover:text-indigo-700">
                    {lead.name}
                  </Link>
                  <p className="text-xs text-slate-500">{lead.industry || "General"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">{lead.budget || "TBD"}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                      lead.intent === "HOT"
                        ? "bg-red-100 text-red-700"
                        : lead.intent === "WARM"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {lead.intent || "COLD"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="admin-card rounded-xl xl:col-span-4">
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-base font-semibold text-slate-900">Activity Feed</h2>
          </div>
          <CardContent className="space-y-3 px-5 pb-5 pt-0">
            {(data.recentEvents || []).length === 0 && <p className="text-sm text-slate-500">No recent activity.</p>}
            {(data.recentEvents || []).map((event: any, i: number) => (
              <div key={`${event.title}-${i}`} className="rounded-xl border border-slate-200 p-3">
                <p className="text-sm font-medium text-slate-900">{event.title}</p>
                <p className="mt-1 text-xs text-slate-500">{event.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="admin-card rounded-xl">
        <div className="px-5 pt-5 pb-3">
          <h2 className="text-base font-semibold text-slate-900">Quick Actions</h2>
        </div>
        <DashboardQuickActions />
      </Card>
    </div>
  );
}

