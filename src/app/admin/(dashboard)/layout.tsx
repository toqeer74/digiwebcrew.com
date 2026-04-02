import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { Search } from "lucide-react";
import { PageTransition } from "@/components/ui/page-transition";
import { SidebarNav } from "@/components/admin/sidebar-nav";
import { SidebarLogo } from "@/components/admin/sidebar-logo";
import { NotificationPopover } from "@/components/admin/notification-popover";
import { Toaster } from "sonner";
import { Geist } from "next/font/google";
import { deriveBrandingVars, getPublicBrandingConfig } from "@/lib/branding";
import { CSSProperties } from "react";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  const branding = await getPublicBrandingConfig();
  const brandingVars = deriveBrandingVars(branding.primaryColor);

  const userName = session.user?.name || "Admin User";
  const userEmail = session.user?.email || "";
  const initials = (userName || userEmail || "AD")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div 
      className={`${geist.variable} admin-dashboard-shell flex h-screen overflow-hidden bg-slate-50 text-foreground font-[--font-geist]`}
      style={brandingVars as CSSProperties}
    >
      <aside className="z-20 flex w-64 shrink-0 flex-col gap-4 border-r border-slate-200 bg-white px-4 py-4">
        <SidebarLogo branding={branding} />
        <SidebarNav isCompressed={false} userName={userName} userEmail={userEmail} />
      </aside>

      <main className="flex min-w-0 w-full flex-1 flex-col overflow-hidden bg-transparent">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-sm lg:px-6">
          <div className="group flex max-w-2xl flex-1 items-center gap-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[var(--site-primary)]" size={18} />
              <input
                type="text"
                placeholder="Search leads, chats, drafts..."
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[var(--site-primary-soft)] focus:bg-white focus:ring-2 focus:ring-[var(--site-primary)]/10"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NotificationPopover />
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--site-primary)]/10 text-xs font-semibold text-[var(--site-primary)]">
              {initials || "AD"}
            </div>
          </div>
        </header>

        <div className="custom-scrollbar w-full flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8">
          <PageTransition>
            <div className="admin-page-stack w-full">{children}</div>
          </PageTransition>
        </div>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}

