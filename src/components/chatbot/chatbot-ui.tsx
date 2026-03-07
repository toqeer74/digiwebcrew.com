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
                            className="w-14 h-14 rounded-2xl bg-raly-primary text-white shadow-[0_15px_35px_-5px_rgba(2,77,148,0.35)] flex items-center justify-center hover:bg-raly-primary/95 transition-all border border-white/20 group relative"
                        >
                            <Sparkles className="absolute -top-1 -right-1 text-yellow-400 fill-yellow-400 animate-pulse" size={14} />
                            <MessageSquare size={24} className="drop-shadow-md" />
                        </motion.button>
                    ) : (
                        <motion.div
                            key="dialog"
                            initial={{ opacity: 0, scale: 0.95, y: 40, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.98, y: 20, filter: "blur(5px)" }}
                            transition={{ type: "spring", damping: 20, stiffness: 200 }}
                            className="w-[330px] h-[550px] bg-white/70 backdrop-blur-3xl border border-white/40 rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden relative"
                        >
                            {/* Header */}
                            <div className="p-4 px-5 flex items-center justify-between bg-gradient-to-r from-raly-primary/95 to-[#0a4f8f]/95 backdrop-blur-md relative z-20">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-inner">
                                        <Zap size={18} className="text-white fill-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1.5">
                                            <h3 className="text-white font-black tracking-tighter uppercase text-[12px] leading-tight">
                                                DWC AI
                                            </h3>
                                            <ShieldCheck size={11} className="text-raly-accent" />
                                        </div>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                            <span className="text-[8px] font-black text-white/60 uppercase tracking-widest leading-none">
                                                {mode}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto p-5 pb-2 space-y-2.5 custom-scrollbar relative z-10 bg-gradient-to-b from-white/20 to-transparent"
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
                                        className="flex gap-2 items-center text-raly-primary/30 font-black text-[9px] ml-11 uppercase tracking-widest pt-1"
                                    >
                                        <Loader2 size={10} className="animate-spin" />
                                        Thinking...
                                    </motion.div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 px-5 bg-white/40 border-t border-white/40 relative z-20">
                                <form
                                    onSubmit={handleSendMessage}
                                    className="relative"
                                >
                                    <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full h-11 pl-5 pr-12 bg-white/60 border border-white/80 rounded-2xl outline-none shadow-sm focus:ring-4 focus:ring-raly-primary/10 focus:bg-white transition-all text-[12px] font-bold placeholder:text-muted-foreground/40"
                                    />
                                    <button
                                        disabled={loading || !input.trim()}
                                        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-raly-primary text-white flex items-center justify-center shadow-md shadow-raly-primary/20 hover:scale-110 active:scale-95 disabled:opacity-30 transition-all"
                                    >
                                        <Send size={14} />
                                    </button>
                                </form>
                                <div className="mt-3 flex items-center justify-center gap-3">
                                    <div className="h-[1px] flex-1 bg-black/[0.03]" />
                                    <span className="text-[7px] font-black text-black/10 uppercase tracking-[0.4em] leading-none">
                                        Enterprise Strategy
                                    </span>
                                    <div className="h-[1px] flex-1 bg-black/[0.03]" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
