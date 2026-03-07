"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { DarkModeToggle } from "../dark-mode-toggle";

interface NavbarProps {
  dict: any;
  locale: string;
}

export function Navbar({ dict, locale }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: dict.nav.services, href: `/${locale}/services` },
    { name: dict.nav.process, href: `/${locale}/process` },
    { name: dict.nav.pricing, href: `/${locale}/pricing` },
    { name: dict.nav.caseStudies, href: `/${locale}/case-studies` },
    { name: dict.nav.blog, href: `/${locale}/blog` },
    { name: dict.nav.about, href: `/${locale}/about` },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-50">
      <div className="container flex justify-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "flex items-center gap-6 px-6 py-3 bg-white dark:bg-midnight-800 transition-all duration-300 rounded-full border border-gray-200/50 dark:border-midnight-700 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] w-fit",
            isScrolled ? "shadow-2xl dark:shadow-[0_30px_60px_rgba(0,0,0,0.6)]" : "shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
          )}
        >
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-5 h-5 rounded-full border-[2px] border-raly-accent/90 flex items-center justify-center shadow-[0_0_12px_rgba(248,209,113,0.35)]">
                  <div className="w-2 h-2 rounded-full bg-raly-accent shadow-[0_0_8px_rgba(248,209,113,0.55)]" />
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-[13px] font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap flex items-center gap-1",
                  index === 0 && "relative group"
                )}
              >
                {link.name}
                {index === 0 && (
                  <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section: Dark Mode + Quick Search + Social Icons */}
          <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-gray-100 dark:border-midnight-700">
            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Quick Search */}
            <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-midnight-800 hover:bg-gray-100 dark:hover:bg-midnight-700 rounded-lg transition-colors border border-gray-200/50 dark:border-midnight-700">
              <Search size={14} className="text-gray-400 dark:text-gray-500" />
              <span className="text-[12px] text-gray-400 dark:text-gray-500">Quick search...</span>
              <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 bg-white dark:bg-midnight-900 px-1.5 py-0.5 rounded border border-gray-200 dark:border-midnight-700 ml-4">⌘K</span>
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                <FaGithub size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                <FaDiscord size={16} />
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              className="p-2 mr-[-8px] text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-24 inset-x-4 p-4 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 md:hidden origin-top"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 rounded-xl hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-gray-100 my-2" />
              <div className="flex items-center gap-4 px-4 py-2">
                <FaTwitter size={16} className="text-gray-400" />
                <FaGithub size={16} className="text-gray-400" />
                <FaDiscord size={16} className="text-gray-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
