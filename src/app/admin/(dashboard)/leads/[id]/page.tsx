import { getLeadById } from "@/lib/actions/lead-actions";
import { notFound } from "next/navigation";
import { LeadDetailsClient } from "@/components/admin/lead-details-client";
import { PageHeader } from "@/components/admin/page-header";
import Link from "next/link";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLeadById(id);
  if (!lead) notFound();

  const score = Math.max(0, Math.min(100, Number(lead.leadScore || 0)));
  const TIER_COLOR: Record<string, string> = {
    HOT: "adm-badge-danger", WARM: "adm-badge-warning", COLD: "adm-badge-muted",
  };

  return (
    <div className="admin-page-stack w-full pb-8">
      <PageHeader
        title={lead.fullName || "Unknown Lead"}
        subtitle={`${lead.email}${lead.company ? ` · ${lead.company}` : ""}`}
        breadcrumb={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Leads", href: "/admin/leads" },
          { label: "Detail" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href={`mailto:${lead.email}`}
              className="adm-btn adm-btn-secondary adm-btn-sm"
            >
              Email Lead
            </Link>
            <span
              className="adm-btn adm-btn-sm"
              style={{ background: "var(--adm-bg)", color: "var(--adm-text-muted)", border: "1.5px solid var(--adm-border)", fontFamily: "var(--adm-mono)", fontSize: 11 }}
            >
              ID: {String(lead._id).slice(-8)}
            </span>
          </div>
        }
      />

      {/* Score + Tier card */}
      <div className="rounded-xl bg-white p-5" style={{ border: "1.5px solid var(--adm-border)" }}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)" }}>
              Lead Score
            </p>
            <p style={{ fontSize: 28, fontWeight: 800, color: "var(--adm-text)", letterSpacing: -1, marginTop: 2 }}>
              {score}<span style={{ fontSize: 16, color: "var(--adm-text-muted)", fontWeight: 600 }}>/100</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`adm-badge ${TIER_COLOR[lead.leadTier || "COLD"] || "adm-badge-muted"}`}>
              {lead.leadTier || "COLD"}
            </span>
            {lead.status && (
              <span className="adm-badge adm-badge-muted">{lead.status}</span>
            )}
            {lead.serviceCategory && (
              <span className="adm-badge adm-badge-accent">{lead.serviceCategory}</span>
            )}
          </div>
        </div>
        <div className="adm-progress-wrap" style={{ height: 10 }}>
          <div
            className="adm-progress-bar"
            style={{
              width: `${score}%`,
              background: score >= 70 ? "linear-gradient(90deg,var(--adm-success),#34d399)" :
                          score >= 40 ? "linear-gradient(90deg,var(--adm-warning),#fbbf24)" :
                          "linear-gradient(90deg,var(--adm-danger),#f87171)",
            }}
          />
        </div>
      </div>

      <LeadDetailsClient
        leadId={id}
        initialStatus={lead.status || "NEW"}
        initialNotes={lead.notes || []}
        initialTasks={lead.tasks || []}
        initialEvents={lead.events || []}
      />
    </div>
  );
}
