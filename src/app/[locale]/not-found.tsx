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
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6366F1]/5 blur-3xl rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B5CF6]/5 blur-3xl rounded-full -ml-48 -mb-48" />

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="mb-8 relative inline-block">
             <h1 className="text-[12rem] font-black tracking-tighter text-secondary/10 leading-none select-none">
                404
             </h1>
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold tracking-tight">System Gap</span>
             </div>
          </div>

          <h2 className="text-3xl font-bold mb-6 tracking-tight">The laboratory you're looking for doesn't exist.</h2>
          <p className="text-xl text-[#94A3B8] mb-12 leading-relaxed">
            The path you followed might be broken or moved to a different sector.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href={localePath(locale, "/")}
              className="group flex items-center gap-3 h-14 px-8 rounded-full bg-[#6366F1] text-[#F8F8FF] font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#6366F1]/25"
            >
              <Home size={18} />
              Back to Command Center
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-3 h-14 px-8 rounded-full glass border border-[#1E1E2E]/50 font-bold transition-all hover:bg-[#1E1E2E]/40"
            >
              <ArrowLeft size={18} />
              Return to Previous Sector
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
