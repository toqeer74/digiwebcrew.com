"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Cookie, ChevronDown, ChevronUp } from "lucide-react";
import { useTracking, ConsentState } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ConsentBannerProps {
    className?: string;
}

export function ConsentBanner({ className }: ConsentBannerProps) {
    const tracking = useTracking();
    const [isVisible, setIsVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [preferences, setPreferences] = useState<ConsentState>({
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
    });

    // Check if consent has already been given
    useEffect(() => {
        const hasConsent = localStorage.getItem('tracking_consent');
        if (!hasConsent) {
            // Show banner after a short delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        const fullConsent: ConsentState = {
            ad_storage: 'granted',
            analytics_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
        };
        tracking?.updateConsent(fullConsent);
        setIsVisible(false);
    };

    const handleRejectAll = () => {
        const noConsent: ConsentState = {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
        };
        tracking?.updateConsent(noConsent);
        setIsVisible(false);
    };

    const handleSavePreferences = () => {
        tracking?.updateConsent(preferences);
        setIsVisible(false);
    };

    const togglePreference = (key: keyof ConsentState) => {
        setPreferences(prev => ({
            ...prev,
            [key]: prev[key] === 'granted' ? 'denied' : 'granted',
        }));
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={cn(
                    "fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6",
                    className
                )}
            >
                <div className="max-w-4xl mx-auto bg-white dark:bg-midnight-900 rounded-2xl shadow-2xl dark:shadow-[0_-20px_60px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-midnight-700 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 pb-4 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-raly-accent/20 flex items-center justify-center text-raly-primary shrink-0">
                            <Cookie size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                Cookie Preferences
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                We use cookies to enhance your experience, analyze site traffic, and deliver personalized content.
                                You can customize your preferences below.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                        {showDetails && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-4 space-y-3">
                                    {/* Analytics */}
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-midnight-800 rounded-xl">
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white text-sm">Analytics</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Help us understand how visitors use our site</p>
                                        </div>
                                        <button
                                            onClick={() => togglePreference('analytics_storage')}
                                            className={cn(
                                                "w-12 h-6 rounded-full transition-colors relative",
                                                preferences.analytics_storage === 'granted' ? "bg-raly-primary" : "bg-gray-300 dark:bg-midnight-600"
                                            )}
                                        >
                                            <div className={cn(
                                                "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow",
                                                preferences.analytics_storage === 'granted' ? "translate-x-7" : "translate-x-1"
                                            )} />
                                        </button>
                                    </div>

                                    {/* Advertising */}
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-midnight-800 rounded-xl">
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white text-sm">Advertising</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Show you relevant ads on other platforms</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                togglePreference('ad_storage');
                                                togglePreference('ad_user_data');
                                                togglePreference('ad_personalization');
                                            }}
                                            className={cn(
                                                "w-12 h-6 rounded-full transition-colors relative",
                                                preferences.ad_storage === 'granted' ? "bg-raly-primary" : "bg-gray-300 dark:bg-midnight-600"
                                            )}
                                        >
                                            <div className={cn(
                                                "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow",
                                                preferences.ad_storage === 'granted' ? "translate-x-7" : "translate-x-1"
                                            )} />
                                        </button>
                                    </div>

                                    {/* Privacy Link */}
                                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                        <Shield size={12} />
                                        Read our <a href="/en/privacy" className="text-raly-primary hover:underline">Privacy Policy</a>
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Actions */}
                    <div className="p-4 pt-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            {showDetails ? (
                                <>Hide Details <ChevronUp size={16} /></>
                            ) : (
                                <>Customize <ChevronDown size={16} /></>
                            )}
                        </button>

                        <div className="flex-1" />

                        <button
                            onClick={handleRejectAll}
                            className="px-6 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-midnight-700 rounded-xl hover:bg-gray-50 dark:hover:bg-midnight-800 transition-colors"
                        >
                            Reject All
                        </button>

                        {showDetails ? (
                            <button
                                onClick={handleSavePreferences}
                                className="px-6 py-2.5 text-sm font-bold text-raly-primary bg-raly-accent rounded-xl hover:bg-raly-accent/95 transition-colors shadow-md shadow-raly-primary/20"
                            >
                                Save Preferences
                            </button>
                        ) : (
                            <button
                                onClick={handleAcceptAll}
                                className="px-6 py-2.5 text-sm font-bold text-raly-primary bg-raly-accent rounded-xl hover:bg-raly-accent/95 transition-colors shadow-md shadow-raly-primary/20"
                            >
                                Accept All
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
