"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { FaFacebook, FaTwitter, FaLinkedin, FaDribbble } from "react-icons/fa";
import { ChevronDown, Globe } from "lucide-react";

interface FooterProps {
  dict: any;
  locale: string;
}

export function Footer({ dict, locale }: FooterProps) {
  return (
    <footer className="bg-raly-subtle border-t border-raly-accent/20 mt-auto">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left: Logo + Copyright + Social Icons */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-raly-deep to-raly-primary rounded-full flex items-center justify-center border border-raly-accent/20 shadow-[0_4px_12px_rgba(2,77,148,0.3)] group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-raly-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-5 h-5 rounded-full border-[2px] border-raly-accent/90 flex items-center justify-center shadow-[0_0_12px_rgba(248,209,113,0.35)]">
                  <div className="w-2 h-2 rounded-full bg-raly-accent shadow-[0_0_8px_rgba(248,209,113,0.55)]" />
                </div>
              </div>
              <span className="font-black text-raly-deep uppercase tracking-tighter text-xl">Digi <span className="text-raly-primary">Web Crew</span></span>
            </Link>

            {/* Copyright */}
            <span className="text-xs font-bold text-raly-text uppercase tracking-widest">
              {new Date().getFullYear()} Precision Engineering
            </span>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-raly-text hover:text-raly-primary transition-colors">
                <FaLinkedin size={18} />
              </a>
              <a href="https://github.com/toqeer74" target="_blank" className="text-raly-text hover:text-raly-deep transition-colors">
                <FaTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Right: Links + Language + CTA */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {/* Links */}
            <div className="flex items-center gap-8">
              <Link href={`/${locale}/privacy`} className="text-[10px] font-black uppercase tracking-[0.2em] text-raly-text hover:text-raly-deep transition-colors">
                Privacy Protocol
              </Link>
              <Link href={`/${locale}/terms`} className="text-[10px] font-black uppercase tracking-[0.2em] text-raly-text hover:text-raly-deep transition-colors">
                Terms of Use
              </Link>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-raly-text">
              <Globe size={14} className="text-raly-primary" />
              <span>{locale === 'en' ? 'EN-US' : locale === 'ur' ? 'UR-PK' : 'AR-SA'}</span>
            </div>

            {/* CTA Button */}
            <Link
              href={`/${locale}/quote`}
              className="px-6 py-2.5 bg-raly-primary text-raly-base text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              Initiate Project
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
