"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun, ChevronDown, Sparkles, BarChart3, LineChart, Cog } from "lucide-react";
import { FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";
import { localePath } from "@/lib/locale-path";
import { AnimatePresence, motion } from "framer-motion";

interface NavbarProps {
  dict: any;
  locale: string;
  siteName?: string;
  logoDataUrl?: string;
}

export function Navbar({ locale, siteName, logoDataUrl }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: localePath(locale, "/") },
    { label: "Services", href: localePath(locale, "/services"), dropdown: true },
    { label: "Pricing", href: localePath(locale, "/pricing") },
    { label: "Process", href: localePath(locale, "/process") },
    { label: "Work", href: localePath(locale, "/case-studies") },
    { label: "About", href: localePath(locale, "/about") },
    { label: "Contact", href: localePath(locale, "/contact") },
  ];

  const megaGroups = [
    {
      title: "AI GUEST EXPERIENCE",
      icon: Sparkles,
      items: [
        { label: "Custom Website Dev", href: localePath(locale, "/services/custom-software") },
        { label: "Full-Stack Websites", href: localePath(locale, "/services/full-stack-websites") },
        { label: "Custom Web Apps", href: localePath(locale, "/services/custom-web-apps") },
      ],
    },
    {
      title: "REVENUE OPTIMIZATION",
      icon: BarChart3,
      items: [
        { label: "Conversion Funnels", href: localePath(locale, "/services/conversion-funnels") },
        { label: "E-commerce", href: localePath(locale, "/services/ecommerce") },
      ],
    },
    {
      title: "INSIGHTS & ANALYTICS",
      icon: LineChart,
      items: [
        { label: "SEO & Growth", href: localePath(locale, "/services/seo-growth-retainers") },
        { label: "Case Studies", href: localePath(locale, "/case-studies") },
      ],
    },
    {
      title: "AUTOMATION & OPERATIONS",
      icon: Cog,
      items: [
        { label: "AI Chatbots", href: localePath(locale, "/services/ai-chatbots-automation") },
        { label: "Internal Tools", href: localePath(locale, "/services/automation-internal-tools") },
        { label: "DevOps & Cloud", href: localePath(locale, "/services/devops-cloud") },
      ],
    },
  ];

  const mobileServiceItems = megaGroups.flatMap((g) => g.items);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-[#1E1E2E]">
      <div className="container mx-auto h-full px-6 md:px-8 flex items-center justify-between">
        <Link href={localePath(locale, "/")} className="flex items-center gap-2">
          {logoDataUrl ? (
            <img src={logoDataUrl} alt={siteName || "Logo"} className="h-8 w-auto object-contain" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--site-primary)] to-[var(--site-primary-soft)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">{siteName ? siteName.charAt(0) : "D"}</span>
            </div>
          )}
          <span className="text-[#F8F8FF] font-display font-bold hidden sm:inline">{siteName || "Digital Web Crew"}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  className={cn(
                    "inline-flex items-center gap-1.5 text-sm text-[#94A3B8] hover:text-[#F8F8FF] transition-colors",
                    pathname.startsWith(link.href) && "text-[#F8F8FF]"
                  )}
                >
                  <span>{link.label}</span>
                  <ChevronDown
                    size={14}
                    className={cn("transition-transform", servicesOpen && "rotate-180")}
                    aria-hidden="true"
                  />
                </button>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm text-[#94A3B8] hover:text-[#F8F8FF] transition-colors",
                  pathname === link.href && "text-[#F8F8FF]"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md border border-[#1E1E2E] text-[#94A3B8] hover:text-[#F8F8FF] hover:bg-[#13131E] transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <a href="#" className="text-[#94A3B8] hover:text-[#F8F8FF]"><FaLinkedin size={14} /></a>
          <a href="#" className="text-[#94A3B8] hover:text-[#F8F8FF]"><FaXTwitter size={14} /></a>
          <a href="#" className="text-[#94A3B8] hover:text-[#F8F8FF]"><FaGithub size={14} /></a>
          <Link href={localePath(locale, "/book-consultation")} className="px-4 py-2 rounded-full bg-[#6366F1] text-white text-sm font-semibold hover:bg-[#6366F1]/90 shadow-[0_10px_20px_-10px_rgba(99,102,241,0.4)] transition-all">
            Book Consultation
          </Link>
        </div>

        <button onClick={() => setMobileOpen((v) => !v)} className="lg:hidden text-[#F8F8FF] p-2">
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {servicesOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="hidden lg:block fixed inset-0 top-16 bg-black/35 backdrop-blur-[2px]"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              className="hidden lg:block absolute left-0 right-0 top-16 border-b border-[#1E1E2E] bg-[#0A0A0F]/96 backdrop-blur-xl shadow-[0_30px_90px_-55px_rgba(0,0,0,0.9)]"
            >
              <div className="px-6 md:px-12 pt-10 pb-6">
                <div className="grid grid-cols-4 gap-10">
                  {megaGroups.map((group) => {
                    const Icon = group.icon;
                    return (
                      <div key={group.title}>
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#94A3B8]">
                          {group.title}
                        </p>
                        <div className="space-y-1.5">
                          {group.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setServicesOpen(false)}
                              className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm font-semibold text-[#D7E3EF] transition-colors hover:bg-white/5 hover:text-[#F8F8FF]"
                            >
                              <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-[#94A3B8]">
                                <Icon size={16} />
                              </span>
                              <span className="text-[15px]">{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="border-t border-white/10 bg-white/5">
                <Link
                  href={localePath(locale, "/services")}
                  onClick={() => setServicesOpen(false)}
                  className="block py-3 text-center text-sm font-extrabold text-[#F8F8FF] tracking-wide hover:bg-white/5"
                >
                  Discover all services
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {
        mobileOpen && (
          <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 border-t border-[#1E1E2E] bg-[#0F0F18] px-6 py-6 overflow-y-auto">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="block py-3 text-base text-[#94A3B8] hover:text-[#F8F8FF]" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-6 mt-6 border-t border-[#1E1E2E]">
              <p className="text-xs text-[#94A3B8] uppercase tracking-widest mb-2">Services</p>
              <div className="space-y-1">
                {mobileServiceItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block py-2 text-sm text-[#94A3B8] hover:text-[#F8F8FF]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-6 space-y-2 border-t border-[#1E1E2E] mt-6">
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileOpen(false);
                }}
                className="w-full px-4 py-2 rounded-md border border-[#1E1E2E] text-[#94A3B8] hover:text-[#F8F8FF] hover:bg-[#13131E] text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
              <Link href={localePath(locale, "/book-consultation")} className="block w-full px-4 py-2 rounded-full bg-[#6366F1] text-white text-sm text-center font-semibold" onClick={() => setMobileOpen(false)}>
                Book Consultation
              </Link>
            </div>
          </div>
        )
      }
    </header >
  );
}
