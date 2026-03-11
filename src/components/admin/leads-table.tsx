import Link from "next/link";

interface LeadsTableProps {
  leads: any[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Lead</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Tier</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Service</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
              <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold">
                      {lead.fullName?.charAt(0) || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{lead.fullName}</p>
                      <p className="text-xs text-slate-500">{lead.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      lead.leadTier === "HOT"
                        ? "bg-red-100 text-red-700"
                        : lead.leadTier === "WARM"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {lead.leadTier || "COLD"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">{lead.serviceCategory || "General"}</td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "-"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/leads/${lead._id}`}
                    className="inline-flex items-center rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {leads.length === 0 && (
        <div className="p-10 text-center bg-slate-50">
          <p className="text-sm text-slate-500">No leads found for the current filters.</p>
        </div>
      )}
    </div>
  );
}

