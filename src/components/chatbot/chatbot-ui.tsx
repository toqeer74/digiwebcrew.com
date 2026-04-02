"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2, Minus, Zap, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatBubble } from "./chat-bubble";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export function ChatbotUI() {
    const [isOpen, setIsOpen] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState("INTRO");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    // Handle initialization
    const initializeChat = async () => {
        if (sessionId) return;
        try {
            const res = await fetch("/api/ai-chat/start", { method: "POST" });
            const data = await res.json();
            if (data.success) {
                setSessionId(data.sessionId);
                setMode(data.mode);
                setMessages([
                    { role: "assistant", content: "Hello! I'm your Digi Web Crew consultant. How can I help you today?" }
                ]);
            }
        } catch (err) {
            console.error("Failed to init chat", err);
        }
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || loading || !sessionId) return;

        const userText = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userText }]);
        setLoading(true);

        try {
            const res = await fetch("/api/ai-chat/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId, message: userText })
            });
            const data = await res.json();

            if (data.success) {
                setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
                setMode(data.mode);
            }
        } catch (err) {
            console.error("Message error", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans pointer-events-none">
            <div className="pointer-events-auto">
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        <motion.button
                            key="trigger"
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 10 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                setIsOpen(true);
                                initializeChat();
                            }}
                            className="w-14 h-14 rounded-2xl bg-[var(--site-primary)] text-white shadow-[0_15px_35px_-5px_rgba(var(--site-primary-rgb),0.35)] flex items-center justify-center hover:bg-[var(--site-primary-hover)] transition-all border border-white/20 group relative"
                        >
                            <Sparkles className="absolute -top-1 -right-1 text-yellow-400 fill-yellow-400 animate-pulse" size={14} />
                            <MessageSquare size={24} />
                        </motion.button>
                    ) : (
                        <motion.div
                            key="dialog"
                            initial={{ opacity: 0, scale: 0.95, y: 40, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.98, y: 20, filter: "blur(5px)" }}
                            transition={{ type: "spring", damping: 20, stiffness: 200 }}
                            className="w-[360px] h-[480px] bg-white dark:bg-[#1a1f38] border border-slate-200 dark:border-white/10 rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--site-primary)]/30 z-[30]" />
                            {/* Header */}
                            <div className="p-4 px-6 flex items-center justify-between border-b border-slate-100 dark:border-white/5 relative z-20">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[var(--site-primary)] flex items-center justify-center shadow-sm">
                                        <Zap size={16} className="text-white fill-white" />
                                    </div>
                                    <h3 className="text-slate-900 dark:text-white font-display font-black tracking-tight text-sm">
                                        Assistant
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 dark:text-white/30 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Chat Messages */}
                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative z-10 bg-slate-50/30 dark:bg-transparent"
                            >
                                <AnimatePresence initial={false}>
                                    {messages.map((msg, i) => (
                                        <ChatBubble key={i} role={msg.role} content={msg.content} />
                                    ))}
                                </AnimatePresence>
                                {loading && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex gap-2 items-center text-slate-400 dark:text-white/20 font-bold text-[10px] ml-1 uppercase tracking-widest pt-1"
                                    >
                                        <Loader2 size={10} className="animate-spin" />
                                        Thinking...
                                    </motion.div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-white dark:bg-transparent border-t border-slate-100 dark:border-white/5 relative z-20">
                                <form
                                    onSubmit={handleSendMessage}
                                    className="relative group"
                                >
                                    <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Send a message..."
                                        className="w-full h-10 pl-4 pr-10 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none transition-all text-[13px] font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20"
                                    />
                                    <button
                                        disabled={loading || !input.trim()}
                                        className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[var(--site-primary)] text-white flex items-center justify-center shadow-sm hover:opacity-90 disabled:opacity-30 transition-all"
                                    >
                                        <Send size={14} />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

