import Link from "next/link";
import { getDashboardStats, getLeadTrends, getCategoryDistribution } from "@/lib/actions/analytics-actions";
import { Card, CardContent } from "@/components/ui/card";
import { AnalyticsChart } from "@/components/admin/analytics-chart";
import { LeadStatusDonut } from "@/components/admin/lead-status-donut";
import { PageHeader } from "@/components/admin/page-header";

type SearchParams = Promise<{ range?: string }>;

const RANGE_OPTIONS = [7, 30, 90] as const;

export default async function AnalyticsPage({ searchParams }: { searchParams: SearchParams }) {
  const { range } = await searchParams;
  const selectedRange = RANGE_OPTIONS.includes(Number(range) as 7 | 30 | 90) ? (Number(range) as 7 | 30 | 90) : 30;

  const [statsData, trends, distribution] = await Promise.all([
    getDashboardStats(),
    getLeadTrends(selectedRange),
    getCategoryDistribution(),
  ]);

  const statCards = [
    { label: "Total Leads", value: statsData.totalLeads },
    { label: "New Leads", value: statsData.newLeads },
    { label: "Hot Leads", value: statsData.hotLeads },
    { label: "Conversion Rate", value: `${Math.round(Number(statsData.conversionRate || 0))}%` },
  ];

  const statusEntries = Object.entries(statsData.leadStatusBreakdown || {});
  const statusChartData = statusEntries.map(([name, value]) => ({ name, value: Number(value) || 0 }));

  return (
    <div className="admin-page-stack space-y-6 pb-8 w-full">
      <PageHeader
        title="Analytics"
        subtitle="Live lead performance and quality trends."
        breadcrumb={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Analytics" }]}
      />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="admin-card admin-card-hover rounded-xl">
            <CardContent className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="flex items-center gap-2">
        {RANGE_OPTIONS.map((option) => (
          <Link
            key={option}
            href={`?range=${option}`}
            className={`inline-flex h-9 items-center rounded-lg border px-3 text-sm ${
              selectedRange === option ? "border-indigo-200 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            Last {option} Days
          </Link>
        ))}
      </div>

      <AnalyticsChart trends={trends} />

      <section className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">
        <Card className="admin-card self-start rounded-xl">
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-base font-semibold text-slate-900">Service Category Distribution</h2>
          </div>
          <CardContent className="space-y-2 px-5 pb-5 pt-0">
            {distribution.length === 0 ? (
              <div className="grid min-h-[160px] place-items-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center">
                <div>
                  <p className="text-sm font-medium text-slate-700">No category data yet</p>
                  <p className="mt-1 text-xs text-slate-500">This card will populate after leads are categorized.</p>
                </div>
              </div>
            ) : null}
            {distribution.map((item: any) => (
              <div key={item.name} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <p className="text-sm font-medium text-slate-800">{item.name}</p>
                <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="admin-card self-start rounded-xl">
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-base font-semibold text-slate-900">Lead Status Breakdown</h2>
          </div>
          <CardContent className="space-y-3 px-5 pb-5 pt-0">
            <LeadStatusDonut data={statusChartData} />
            {statusEntries.length === 0 && <p className="text-sm text-slate-500">No status data available.</p>}
            {statusEntries.map(([status, count]) => (
              <div key={status} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-medium text-slate-800">{status}</p>
                  <p className="font-semibold text-slate-900">{Number(count).toLocaleString()}</p>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-indigo-600"
                    style={{ width: `${statsData.totalLeads ? Math.max(6, (Number(count) / statsData.totalLeads) * 100) : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="admin-card rounded-xl">
        <div className="px-5 pt-5 pb-3">
          <h2 className="text-base font-semibold text-slate-900">Average Lead Score</h2>
        </div>
        <CardContent className="px-5 pb-5 pt-0">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Average quality of high-intent leads</span>
            <span className="font-semibold text-slate-900">{statsData.avgHotScore}%</span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-slate-100">
            <div className="h-3 rounded-full bg-indigo-600" style={{ width: `${Math.min(100, Number(statsData.avgHotScore || 0))}%` }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

