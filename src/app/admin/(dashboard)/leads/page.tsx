import { getLeads } from "@/lib/actions/lead-actions";
import { LeadsTable } from "@/components/admin/leads-table";
import { LeadsHeader } from "@/components/admin/leads-header";
import { AlertCircle, ShieldAlert, WifiOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; tier?: string; page?: string }>;
}) {
  const { q, status, tier, page } = await searchParams;
  const pageNum = parseInt(page || "1");

  let data: any = { leads: [], total: 0, pages: 0 };
  let errorType: "NONE" | "CONFIG" | "CONNECTION" | "GENERIC" = "NONE";

  try {
    data = await getLeads({ query: q, status: status || "ALL", tier: tier || "ALL", page: pageNum });
  } catch (err: any) {
    if (err.message?.includes("MONGODB_URI")) errorType = "CONFIG";
    else if (err.name === "MongooseServerSelectionError" || err.message?.includes("ETIMEDOUT")) errorType = "CONNECTION";
    else errorType = "GENERIC";
  }

  if (errorType !== "NONE") {
    const ErrorIcon = errorType === "CONFIG" ? ShieldAlert : errorType === "CONNECTION" ? WifiOff : AlertCircle;
    const errorColor = errorType === "CONFIG" ? "var(--adm-warning)" : errorType === "CONNECTION" ? "var(--adm-danger)" : "var(--adm-text-muted)";
    const errorDim = errorType === "CONFIG" ? "var(--adm-warning-dim)" : errorType === "CONNECTION" ? "var(--adm-danger-dim)" : "var(--adm-bg)";

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
        <div
          className="grid place-items-center mb-8 rounded-2xl"
          style={{ width: 80, height: 80, background: errorDim, color: errorColor, border: `1.5px solid ${errorColor}30` }}
        >
          <ErrorIcon size={36} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1, color: "var(--adm-text)" }}>
          {errorType === "CONFIG" ? "Configuration Gap" : errorType === "CONNECTION" ? "Connection Error" : "Records Offline"}
        </h1>
        <p style={{ maxWidth: 480, fontSize: 13.5, color: "var(--adm-text-muted)", marginTop: 12, lineHeight: 1.7 }}>
          {errorType === "CONFIG"
            ? <><span style={{ color: "var(--adm-warning)", fontWeight: 700 }}>MONGODB_URI</span> is missing. Define it in your Vercel Project Settings.</>
            : errorType === "CONNECTION"
              ? <>Connection rejected. Whitelist <span style={{ color: "var(--adm-danger)", fontWeight: 700 }}>0.0.0.0/0</span> in MongoDB Atlas Network Access.</>
              : "The database is currently unreachable."}
        </p>
      </div>
    );
  }

  const { leads, pages } = data;

  return (
    <div className="admin-page-stack w-full pb-10">
      <LeadsHeader />
      <LeadsTable leads={leads} />

      {pages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          <Link
            href={{ query: { q, status, tier, page: Math.max(1, pageNum - 1).toString() } }}
            className={cn("adm-btn adm-btn-secondary adm-btn-sm", pageNum === 1 && "pointer-events-none opacity-30")}
          >
            <ArrowRight size={14} className="rotate-180" />
          </Link>

          {Array.from({ length: pages }).map((_, i) => (
            <Link
              key={i}
              href={{ query: { q, status, tier, page: (i + 1).toString() } }}
              className={cn(
                "adm-btn adm-btn-sm",
                pageNum === i + 1 ? "adm-btn-primary" : "adm-btn-secondary"
              )}
              style={{ minWidth: 36, padding: "7px 10px" }}
            >
              {i + 1}
            </Link>
          ))}

          <Link
            href={{ query: { q, status, tier, page: Math.min(pages, pageNum + 1).toString() } }}
            className={cn("adm-btn adm-btn-secondary adm-btn-sm", pageNum === pages && "pointer-events-none opacity-30")}
          >
            <ArrowRight size={14} />
          </Link>

          <p style={{ fontSize: 12.5, color: "var(--adm-text-muted)", marginLeft: 8 }}>
            Page {pageNum} of {Math.max(1, pages)}
          </p>
        </div>
      )}
    </div>
  );
}
