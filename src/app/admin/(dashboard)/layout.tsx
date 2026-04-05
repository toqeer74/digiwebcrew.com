import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { Search, HelpCircle } from "lucide-react";
import { PageTransition } from "@/components/ui/page-transition";
import { SidebarNav } from "@/components/admin/sidebar-nav";
import { SidebarLogo } from "@/components/admin/sidebar-logo";
import { NotificationPopover } from "@/components/admin/notification-popover";
import { Toaster } from "sonner";
import { Geist } from "next/font/google";
import { deriveBrandingVars, getPublicBrandingConfig } from "@/lib/branding";
import { CSSProperties } from "react";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const branding = await getPublicBrandingConfig();
  const brandingVars = deriveBrandingVars(branding.primaryColor);

  const userName  = session.user?.name  || "Admin User";
  const userEmail = session.user?.email || "";
  const initials  = (userName || userEmail || "AD")
    .split(/\s+/).filter(Boolean).map((p) => p[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div
      className={`${geist.variable} admin-dashboard-shell flex h-screen overflow-hidden`}
      style={brandingVars as CSSProperties}
    >
      {/* ── LIGHT SIDEBAR ── */}
      <aside
        className="admin-sidebar z-20 flex shrink-0 flex-col"
        style={{
          width: "var(--adm-sidebar-w, 256px)",
          minWidth: "var(--adm-sidebar-w, 256px)",
          position: "fixed",
          top: 0, left: 0, bottom: 0,
          overflowY: "auto",
        }}
      >
        {/* Logo */}
        <div
          className="px-5 py-5"
          style={{ borderBottom: "1.5px solid var(--adm-sidebar-border)" }}
        >
          <SidebarLogo branding={branding} />
        </div>

        {/* Search */}
        <div
          className="px-4 py-3"
          style={{ borderBottom: "1px solid var(--adm-border)" }}
        >
          <div className="relative">
            <Search
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--adm-text-muted)" }}
            />
            <input
              type="text"
              placeholder="Search…"
              className="admin-sidebar-search-input"
              style={{ paddingLeft: 30 }}
            />
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
          <SidebarNav isCompressed={false} userName={userName} userEmail={userEmail} />
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main
        className="flex min-w-0 w-full flex-1 flex-col overflow-hidden bg-transparent"
        style={{ marginLeft: "var(--adm-sidebar-w, 256px)" }}
      >
        {/* Topbar */}
        <header className="admin-topbar sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between px-6">
          <div className="flex flex-1 max-w-xl items-center gap-4">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--adm-text-muted)" }}
              />
              <input
                type="text"
                placeholder="Search leads, chats, drafts…"
                className="admin-topbar-search h-9 w-full rounded-lg border pl-9 pr-4 text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <NotificationPopover />
            <button
              className="admin-icon-btn"
              title="Help"
            >
              <HelpCircle size={16} />
            </button>
            <div
              className="admin-topbar-avatar grid place-items-center text-xs font-black text-white select-none"
              title={userName}
            >
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div
          className="custom-scrollbar w-full flex-1 overflow-y-auto overflow-x-hidden"
          style={{ padding: "28px 32px", background: "var(--adm-bg)" }}
        >
          <PageTransition>
            <div className="admin-page-stack w-full">{children}</div>
          </PageTransition>
        </div>
      </main>

      <Toaster richColors position="top-right" />
    </div>
  );
}
