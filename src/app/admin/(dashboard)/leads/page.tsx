import { getLeads } from "@/lib/actions/lead-actions";
import { LeadsTable } from "@/components/admin/leads-table";
import { PageHeader } from "@/components/admin/page-header";
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
          "w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl transition-all duration-700 animate-in fade-in zoom-in slide-in-from-bottom-8",
          errorType === "CONFIG" ? "bg-amber-50 text-amber-500 shadow-amber-500/10" :
            errorType === "CONNECTION" ? "bg-rose-50 text-rose-500 shadow-rose-500/10" :
              "bg-gray-100 text-gray-500 shadow-gray-500/10"
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

        <p className="max-w-lg text-sm font-bold text-muted-foreground/60 mt-6 uppercase tracking-[0.2em] leading-relaxed">
          {errorType === "CONFIG" ? (
            <>
              The <span className="text-amber-600">MONGODB_URI</span> environment variable is missing. Please define it in your <span className="font-black">Vercel Project Settings</span>.
            </>
          ) : errorType === "CONNECTION" ? (
            <>
              Connection rejected by the database. Ensure the <span className="text-rose-600">Vercel Deployment IP</span> is whitelisted (set to 0.0.0.0/0) in MongoDB Atlas.
            </>
          ) : (
            "The records database is currently unreachable. Please verify connectivity services and infrastructure health."
          )}
        </p>

        {errorType === "CONNECTION" && (
          <div className="mt-12 p-6 bg-rose-50/50 rounded-2xl border border-rose-100 max-w-md">
            <p className="text-[10px] font-black text-rose-600/60 uppercase tracking-widest mb-2">Technical Warning</p>
            <p className="text-xs text-rose-700/80 font-bold leading-relaxed">
              Whitelisting "0.0.0.0/0" in MongoDB Atlas Network Access is mandatory for serverless environments.
            </p>
          </div>
        )}
      </div>
    );
  }

  const { leads, pages } = data;

  return (
    <div className="p-6 lg:p-10 space-y-6">
      <PageHeader
        label="Contacts"
        title="Leads"
        description="Contacts and opportunities stored in MongoDB."
      />

      <LeadsTable leads={leads} />

      {pages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-2">
          <Link
            href={{
              query: { q, status, tier, page: Math.max(1, pageNum - 1).toString() }
            }}
            className={cn(
              "h-9 w-9 flex items-center justify-center rounded-xl border border-border transition-all hover:bg-secondary",
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
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105 border-primary"
                  : "text-muted-foreground hover:bg-secondary"
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
              "h-9 w-9 flex items-center justify-center rounded-xl border border-border transition-all hover:bg-secondary",
              pageNum === pages && "pointer-events-none opacity-30"
            )}
          >
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
