"use client";

import { useState, useEffect } from "react";
import { Bell, Check, Clock, ShieldAlert, Zap, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { getNotifications, markNotificationAsRead } from "@/lib/actions/notification-actions";

interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  time: Date;
  read: boolean;
}

export function NotificationPopover() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        getNotifications().then(setNotifications);
    }, []);

    const handleMarkAsRead = async (id: string) => {
        await markNotificationAsRead(id);
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-primary transition-all relative group shadow-sm z-50"
            >
                <Bell size={22} className={cn("transition-transform", isOpen && "rotate-12")} />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-rose-500 text-white text-[10px] font-black rounded-full border-2 border-white shadow-sm flex items-center justify-center animate-in zoom-in duration-300">
                        {unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-4 w-96 bg-white border border-border rounded-[2.5rem] shadow-2xl z-50 overflow-hidden"
                        >
                            <div className="p-8 border-b border-border bg-gray-50/50">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Intelligence Feed</h3>
                                    <span className="bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">{unreadCount} NEW</span>
                                </div>
                            </div>

                            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                {notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        onClick={() => !notif.read && handleMarkAsRead(notif.id)}
                                        className={cn(
                                            "p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group",
                                            !notif.read && "bg-blue-50/30"
                                        )}
                                    >
                                        <div className="flex gap-4">
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                                                notif.type === "SYSTEM" ? "bg-emerald-50 text-emerald-500 border-emerald-100" :
                                                    notif.type === "ALERT" ? "bg-rose-50 text-rose-500 border-rose-100" :
                                                        "bg-blue-50 text-blue-500 border-blue-100"
                                            )}>
                                                {notif.type === "SYSTEM" ? <Check size={18} /> : notif.type === "ALERT" ? <Zap size={18} /> : <Info size={18} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className="text-sm font-black text-gray-900">{notif.title}</p>
                                                    <span className="text-[10px] font-bold text-gray-300">{format(notif.time, "HH:mm")}</span>
                                                </div>
                                                <p className="text-xs text-gray-400 font-medium leading-relaxed truncate">{notif.body}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-gray-50/50 text-center">
                                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                                    View All Activity
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
