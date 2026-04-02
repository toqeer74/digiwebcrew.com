import { getLeads } from "@/lib/actions/lead-actions";
import { LeadsTable } from "@/components/admin/leads-table";
import { LeadsHeader } from "@/components/admin/leads-header";
import { ArrowRight, AlertCircle, ShieldAlert, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
    tier?: string;
    page?: string
  }>;
}) {
  const { q, status, tier, page } = await searchParams;
  const pageNum = parseInt(page || "1");

  let data: any = { leads: [], total: 0, pages: 0 };
  let errorType: "NONE" | "CONFIG" | "CONNECTION" | "GENERIC" = "NONE";

  try {
    data = await getLeads({
      query: q,
      status: status || "ALL",
      tier: tier || "ALL",
      page: pageNum,
    });
  } catch (err: any) {
    console.error("Leads Fetch Error:", err);
    if (err.message?.includes("MONGODB_URI")) errorType = "CONFIG";
    else if (err.name === "MongooseServerSelectionError" || err.message?.includes("ETIMEDOUT")) errorType = "CONNECTION";
    else errorType = "GENERIC";
  }

  if (errorType !== "NONE") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-12 text-center text-foreground">
        <div className={cn(
          "w-20 h-20 rounded-xl flex items-center justify-center mb-8 border",
          errorType === "CONFIG" ? "bg-amber-50 text-amber-500 border-amber-100" :
            errorType === "CONNECTION" ? "bg-rose-50 text-rose-500 border-rose-100" :
              "bg-slate-50 text-slate-500 border-slate-200"
        )}>
          {errorType === "CONFIG" ? <ShieldAlert size={48} /> :
            errorType === "CONNECTION" ? <WifiOff size={48} /> :
              <AlertCircle size={48} />}
        </div>

        <h1 className="text-4xl font-black tracking-tight uppercase">
          {errorType === "CONFIG" ? "Configuration Gap" :
            errorType === "CONNECTION" ? "Connectivity Shield" :
              "Records Offline"}
        </h1>

        <p className="max-w-lg text-sm text-slate-500 mt-4 leading-relaxed">
          {errorType === "CONFIG" ? (
            <>
              The <span className="text-amber-600 font-semibold">MONGODB_URI</span> environment variable is missing. Please define it in your <span className="font-semibold">Vercel Project Settings</span>.
            </>
          ) : errorType === "CONNECTION" ? (
            <>
              Connection rejected by the database. Ensure the <span className="text-rose-600 font-semibold">Vercel Deployment IP</span> is whitelisted (set to 0.0.0.0/0) in MongoDB Atlas.
            </>
          ) : (
            "The records database is currently unreachable. Please verify connectivity services."
          )}
        </p>

        {errorType === "CONNECTION" && (
          <div className="mt-10 p-4 bg-rose-50/50 rounded-lg border border-rose-100 max-w-md">
            <p className="text-xs text-rose-700 font-medium leading-relaxed">
              Whitelisting "0.0.0.0/0" in MongoDB Atlas Network Access is mandatory for serverless environments.
            </p>
          </div>
        )}
      </div>
    );
  }

  const { leads, pages } = data;

  return (
    <div className="admin-page-stack space-y-6 pb-10 w-full">
      <LeadsHeader />
      <LeadsTable leads={leads} />

      {pages > 0 && (
        <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
          <Link
            href={{
              query: { q, status, tier, page: Math.max(1, pageNum - 1).toString() }
            }}
            className={cn(
              "admin-btn-ghost h-9 w-9 flex items-center justify-center rounded-xl border border-border transition-all hover:bg-secondary",
              pageNum === 1 && "pointer-events-none opacity-30"
            )}
          >
            <ArrowRight size={14} className="rotate-180" />
          </Link>

          {Array.from({ length: pages }).map((_, i) => (
            <Link
              key={i}
              href={{
                query: { q, status, tier, page: (i + 1).toString() }
              }}
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-xl font-black transition-all border border-border text-[10px]",
                pageNum === i + 1
                  ? "admin-btn-primary text-white shadow-lg shadow-primary/20 scale-105 border-primary"
                  : "admin-btn-ghost text-muted-foreground hover:bg-secondary"
              )}
            >
              {i + 1}
            </Link>
          ))}

          <Link
            href={{
              query: { q, status, tier, page: Math.min(pages, pageNum + 1).toString() }
            }}
            className={cn(
              "admin-btn-ghost h-9 w-9 flex items-center justify-center rounded-xl border border-border transition-all hover:bg-secondary",
              pageNum === pages && "pointer-events-none opacity-30"
            )}
          >
            <ArrowRight size={14} />
          </Link>

          <p className="ml-3 text-sm text-slate-500">
            Page {pageNum} of {Math.max(1, pages)}
          </p>
        </div>
      )}
    </div>
  );
}

