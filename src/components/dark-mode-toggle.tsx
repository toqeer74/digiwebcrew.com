"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);
    const applyTheme = (isDark: boolean) => {
        const html = document.documentElement;
        html.classList.toggle("dark", isDark);
        html.classList.toggle("light", !isDark);
        html.setAttribute("data-theme", isDark ? "dark" : "light");
        html.style.colorScheme = isDark ? "dark" : "light";
    };

    // Initial setup: check system preference and localStorage
    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("theme");
        const isDark = savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;

        setDarkMode(isDark);
        applyTheme(isDark);
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("theme", newDarkMode ? "dark" : "light");
        applyTheme(newDarkMode);
    };

    // Prevent hydration mismatch
    if (!mounted) return <div className="p-2 w-10 h-10" />;

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="relative p-2 w-10 h-10 rounded-xl bg-gray-100 dark:bg-midnight-800 border border-gray-200 dark:border-midnight-700 flex items-center justify-center transition-colors group"
            aria-label="Toggle Dark Mode"
        >
            <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
                <motion.div
                    animate={{
                        y: darkMode ? -40 : 0,
                        opacity: darkMode ? 0 : 1
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute"
                >
                    <Sun size={20} className="text-amber-500" />
                </motion.div>

                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{
                        y: darkMode ? 0 : 40,
                        opacity: darkMode ? 1 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute"
                >
                    <Moon size={20} className="text-electric" />
                </motion.div>
            </div>

            {/* Tooltip hint */}
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold uppercase tracking-wider">
                {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
        </motion.button>
    );
}
