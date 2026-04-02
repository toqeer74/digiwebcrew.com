"use client";

import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import { motion } from "framer-motion";

interface ChatBubbleProps {
    role: "user" | "assistant";
    content: string;
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
    const isAssistant = role === "assistant";

    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 400 }}
            className={cn(
                "flex w-full gap-3",
                isAssistant ? "justify-start" : "justify-end flex-row-reverse"
            )}
        >
            {/* Avatar */}
            <div className="shrink-0 pt-0.5">
                <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 dark:border-white/10",
                    isAssistant
                        ? "bg-slate-50 dark:bg-white/5"
                        : "bg-slate-800 dark:bg-white/20"
                )}>
                    {isAssistant ? (
                        <Bot size={12} className="text-slate-600 dark:text-white/70" />
                    ) : (
                        <User size={12} className="text-white/90" />
                    )}
                </div>
            </div>

            {/* Bubble */}
            <div className={cn(
                "max-w-[85%] flex flex-col group",
                isAssistant ? "items-start" : "items-end"
            )}>
                <div className={cn(
                    "rounded-2xl px-3 py-2 text-[13px] font-medium leading-relaxed transition-all",
                    isAssistant
                        ? "bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-800 dark:text-slate-200"
                        : "bg-[var(--site-primary)] text-white"
                )}>
                    {content}
                </div>
            </div>
        </motion.div>
    );
}

