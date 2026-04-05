import Link from "next/link";

interface LeadsTableProps { leads: any[]; }

const TIER_BADGE: Record<string, string> = {
  HOT:  "adm-badge-danger",
  WARM: "adm-badge-warning",
  COLD: "adm-badge-muted",
};

export function LeadsTable({ leads }: LeadsTableProps) {
  if (leads.length === 0) {
    return (
      <div
        className="grid min-h-[200px] place-items-center rounded-xl text-center"
        style={{ border: "1.5px solid var(--adm-border)", background: "var(--adm-bg)" }}
      >
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--adm-text-dim)" }}>No leads found</p>
          <p style={{ fontSize: 12.5, color: "var(--adm-text-muted)", marginTop: 4 }}>Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ border: "1.5px solid var(--adm-border)", borderRadius: "var(--adm-radius-lg)", overflow: "hidden", background: "white" }}>
      <div className="overflow-x-auto">
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th>Lead</th>
              <th>Tier</th>
              <th>Service</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div
                      className="grid place-items-center shrink-0 rounded-full text-sm font-bold"
                      style={{
                        width: 36, height: 36,
                        background: "var(--adm-primary-dim)",
                        color: "var(--adm-primary)",
                      }}
                    >
                      {lead.fullName?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <p style={{ fontSize: 13.5, fontWeight: 600, color: "var(--adm-text)" }}>{lead.fullName}</p>
                      <p style={{ fontSize: 11.5, color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)" }}>{lead.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`adm-badge ${TIER_BADGE[lead.leadTier] || "adm-badge-muted"}`}>
                    {lead.leadTier || "COLD"}
                  </span>
                </td>
                <td style={{ color: "var(--adm-text-dim)", fontSize: 13.5 }}>{lead.serviceCategory || "General"}</td>
                <td>
                  {lead.status && (
                    <span className="adm-badge adm-badge-muted">{lead.status}</span>
                  )}
                </td>
                <td style={{ fontSize: 12, color: "var(--adm-text-muted)", fontFamily: "var(--adm-mono)" }}>
                  {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "—"}
                </td>
                <td style={{ textAlign: "right" }}>
                  <Link href={`/admin/leads/${lead._id}`} className="adm-btn adm-btn-secondary adm-btn-sm">
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
