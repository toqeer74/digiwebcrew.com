"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/layout-primitives";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { defaultLocale, locales } from "@/types/i18n";
import { localePath } from "@/lib/locale-path";


export default function NotFound() {
  const pathname = usePathname();
  const firstSegment = pathname?.split("/")[1];
  const locale = locales.includes(firstSegment as any) ? firstSegment : defaultLocale;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--site-primary)]/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--site-primary-soft)]/5 blur-[120px] rounded-full -ml-64 -mb-64" />

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="mb-12 relative inline-block">
             <h1 className="text-[10rem] md:text-[15rem] font-display font-black tracking-tighter text-slate-200 dark:text-white/5 leading-none select-none">
                404
             </h1>
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl md:text-5xl font-display font-black tracking-tight text-foreground">System Gap</span>
             </div>
          </div>

          <h2 className="text-2xl md:text-4xl font-display font-black mb-6 tracking-tight text-foreground">The laboratory you're looking for doesn't exist.</h2>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            The path you followed might be broken, decommissioned, or moved to a different sector in our digital system.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href={localePath(locale, "/")}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--site-primary)] px-8 py-4 text-white font-bold transition-all duration-300 hover:bg-[var(--site-primary-hover)] shadow-[0_20px_40px_-20px_rgba(var(--site-primary-rgb),0.5)]"
            >
              <Home size={18} />
              <span>Back to Command Center</span>
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-3 h-14 px-8 rounded-full border border-slate-200 bg-white/50 dark:border-white/10 dark:bg-white/5 text-slate-700 dark:text-white font-bold transition-all hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <ArrowLeft size={18} />
              <span>Return to Previous Sector</span>
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
