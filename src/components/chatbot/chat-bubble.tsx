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
                    "w-8 h-8 rounded-[10px] flex items-center justify-center shadow-lg border border-white/20 transition-transform hover:scale-105",
                    isAssistant
                        ? "bg-gradient-to-br from-raly-primary to-raly-deep shadow-raly-primary/10"
                        : "bg-gradient-to-br from-gray-800 to-gray-900 shadow-black/10"
                )}>
                    {isAssistant ? (
                        <Bot size={14} className="text-white/90" />
                    ) : (
                        <User size={14} className="text-white/90" />
                    )}
                </div>
            </div>

            {/* Bubble */}
            <div className={cn(
                "max-w-[85%] flex flex-col group",
                isAssistant ? "items-start" : "items-end"
            )}>
                <div className={cn(
                    "rounded-[18px] px-4 py-2.5 text-[12px] font-bold leading-normal shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] transition-all",
                    isAssistant
                        ? "bg-white/90 border border-white/80 text-gray-800 rounded-tl-none hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08)]"
                        : "bg-gradient-to-br from-raly-primary to-raly-deep text-white rounded-tr-none shadow-raly-primary/10"
                )}>
                    {content}
                </div>
            </div>
        </motion.div>
    );
}
