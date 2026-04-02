"use client";

import { createContext, useContext, useEffect, useState, Suspense, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

// =============================================================================
// CONFIGURATION - Environment Variables
// =============================================================================
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || '';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || '';
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '';

// =============================================================================
// TYPES - Event Taxonomy
// =============================================================================
export interface TrackingEvent {
    event_name: string;
    event_id?: string;
    value?: number;
    currency?: string;
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    user_data?: UserData;
    custom_data?: Record<string, any> & {
        lead_type?: string;
        portfolio_item_id?: string;
        tech_stack_interact?: string;
        semantic_intent?: string;
    };
}

export interface UserData {
    em?: string;  // Hashed email
    ph?: string;  // Hashed phone
    fn?: string;  // Hashed first name
    ln?: string;  // Hashed last name
    ct?: string;  // Hashed city
    st?: string;  // Hashed state
    zp?: string;  // Hashed zip
    country?: string;
    external_id?: string;
    fbp?: string; // Facebook browser ID
    fbc?: string; // Facebook click ID
}

export type ConsentState = {
    ad_storage: 'granted' | 'denied';
    analytics_storage: 'granted' | 'denied';
    ad_user_data: 'granted' | 'denied';
    ad_personalization: 'granted' | 'denied';
};

// =============================================================================
// CONTEXT
// =============================================================================
interface TrackingContextType {
    trackEvent: (event: TrackingEvent) => void;
    trackPageView: (url: string) => void;
    trackLead: (data: { value?: number; email?: string; phone?: string }) => void;
    trackCall: (phone: string) => void;
    trackFormSubmit: (formId: string, formData?: Record<string, any>) => void;
    trackPortfolioInteraction: (itemId: string, action: string, techStack?: string) => void;
    trackLeadFormStart: (formId: string, leadType: string) => void;
    updateConsent: (consent: Partial<ConsentState>) => void;
    consent: ConsentState;
    isInitialized: boolean;
}

const TrackingContext = createContext<TrackingContextType | null>(null);

// =============================================================================
// UTILITIES
// =============================================================================

// Generate unique event ID for deduplication
const generateEventId = (): string => {
    return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

// SHA-256 hash for user data (CAPI requirements)
const hashValue = async (value: string): Promise<string> => {
    if (!value) return '';
    const encoder = new TextEncoder();
    const data = encoder.encode(value.toLowerCase().trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Get Facebook browser ID from cookie
const getFbp = (): string => {
    if (typeof document === 'undefined') return '';
    const match = document.cookie.match(/_fbp=([^;]+)/);
    return match ? match[1] : '';
};

// Get Facebook click ID from URL or cookie
const getFbc = (): string => {
    if (typeof window === 'undefined') return '';
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (fbclid) return `fb.1.${Date.now()}.${fbclid}`;

    const match = document.cookie.match(/_fbc=([^;]+)/);
    return match ? match[1] : '';
};

// =============================================================================
// TRACKING PROVIDER
// =============================================================================
export function TrackingProvider({ children }: { children: React.ReactNode }) {
    const [consent, setConsent] = useState<ConsentState>({
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
    });
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize consent from localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const savedConsent = localStorage.getItem('tracking_consent');
        if (savedConsent) {
            try {
                const parsed = JSON.parse(savedConsent);
                setConsent(parsed);
            } catch (e) {
                // Use defaults if parsing fails
            }
        }
        setIsInitialized(true);
    }, []);

    // Update consent
    const updateConsent = useCallback((newConsent: Partial<ConsentState>) => {
        const updated = { ...consent, ...newConsent };
        setConsent(updated);
        localStorage.setItem('tracking_consent', JSON.stringify(updated));

        // Push to GTM dataLayer
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
                event: 'consent_update',
                ...updated,
            });
        }

        // Update Google Consent Mode
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', updated);
        }
    }, [consent]);

    // Track generic event
    const trackEvent = useCallback((event: TrackingEvent) => {
        if (!isInitialized) return;

        const eventId = event.event_id || generateEventId();
        const eventWithId = { ...event, event_id: eventId };

        // Push to GTM dataLayer
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
                event: event.event_name,
                ...eventWithId,
            });
        }

        // Meta Pixel (browser-side)
        if (typeof window !== 'undefined' && (window as any).fbq && consent.ad_storage === 'granted') {
            (window as any).fbq('track', event.event_name, {
                value: event.value,
                currency: event.currency || 'USD',
                content_name: event.content_name,
                content_category: event.content_category,
                event_id: eventId,
                ...event.custom_data,
            });
        }

        // LinkedIn Insight Tag
        if (typeof window !== 'undefined' && (window as any).lintrk && consent.ad_storage === 'granted') {
            (window as any).lintrk('track', { conversion_id: event.event_name });
        }

        // Google Analytics 4
        if (typeof window !== 'undefined' && (window as any).gtag && consent.analytics_storage === 'granted') {
            (window as any).gtag('event', event.event_name, {
                value: event.value,
                currency: event.currency || 'USD',
                transaction_id: eventId,
                ...event.custom_data,
            });
        }

        // Server-side CAPI call (for Meta)
        if (consent.ad_storage === 'granted') {
            sendServerEvent(eventWithId).catch(console.error);
        }
    }, [isInitialized, consent]);

    // Track page view
    const trackPageView = useCallback((url: string) => {
        trackEvent({
            event_name: 'PageView',
            custom_data: { page_location: url },
        });
    }, [trackEvent]);

    // Track lead conversion
    const trackLead = useCallback(async (data: { value?: number; email?: string; phone?: string }) => {
        const userData: UserData = {
            fbp: getFbp(),
            fbc: getFbc(),
        };

        if (data.email) {
            userData.em = await hashValue(data.email);
        }
        if (data.phone) {
            userData.ph = await hashValue(data.phone);
        }

        trackEvent({
            event_name: 'Lead',
            value: data.value || 0,
            currency: 'USD',
            user_data: userData,
        });
    }, [trackEvent]);

    // Track click-to-call
    const trackCall = useCallback((phone: string) => {
        trackEvent({
            event_name: 'Contact',
            custom_data: {
                action: 'click_to_call',
                phone_number: phone,
            },
        });
    }, [trackEvent]);

    // Track form submission
    const trackFormSubmit = useCallback((formId: string, formData?: Record<string, any>) => {
        trackEvent({
            event_name: 'FormSubmit',
            custom_data: {
                form_id: formId,
                ...formData,
            },
        });
    }, [trackEvent]);

    // Track portfolio interaction (semantic signal)
    const trackPortfolioInteraction = useCallback((itemId: string, action: string, techStack?: string) => {
        trackEvent({
            event_name: 'portfolio_interaction',
            custom_data: {
                portfolio_item_id: itemId,
                interaction_type: action,
                tech_stack_interact: techStack,
                semantic_intent: `exploring_${techStack?.toLowerCase() || 'general'}_capabilities`,
            },
        });
    }, [trackEvent]);

    // Track lead form start (intent measurement)
    const trackLeadFormStart = useCallback((formId: string, leadType: string) => {
        trackEvent({
            event_name: 'lead_form_start',
            custom_data: {
                form_id: formId,
                lead_type: leadType,
                semantic_intent: `initiating_${leadType.toLowerCase().replace(/\s+/g, '_')}_inquiry`,
            },
        });
    }, [trackEvent]);

    const contextValue: TrackingContextType = {
        trackEvent,
        trackPageView,
        trackLead,
        trackCall,
        trackFormSubmit,
        trackPortfolioInteraction,
        trackLeadFormStart,
        updateConsent,
        consent,
        isInitialized,
    };

    return (
        <TrackingContext.Provider value={contextValue}>
            {/* Google Tag Manager */}
            {GTM_ID && (
                <Script
                    id="gtm-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','${GTM_ID}');
                        `,
                    }}
                />
            )}

            {/* Google Consent Mode v2 Default */}
            <Script
                id="consent-default"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('consent', 'default', {
                            'ad_storage': 'denied',
                            'analytics_storage': 'denied',
                            'ad_user_data': 'denied',
                            'ad_personalization': 'denied',
                            'wait_for_update': 500
                        });
                    `,
                }}
            />

            {/* GA4 */}
            {GA4_ID && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script
                        id="ga4-config"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${GA4_ID}', {
                                    send_page_view: false
                                });
                            `,
                        }}
                    />
                </>
            )}

            {/* Meta Pixel */}
            {META_PIXEL_ID && (
                <Script
                    id="meta-pixel"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            !function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                            fbq('init', '${META_PIXEL_ID}');
                        `,
                    }}
                />
            )}

            {/* LinkedIn Insight Tag */}
            {LINKEDIN_PARTNER_ID && (
                <Script
                    id="linkedin-insight"
                    strategy="lazyOnload"
                    dangerouslySetInnerHTML={{
                        __html: `
                            _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
                            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
                            (function(l) {
                                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                                window.lintrk.q=[]}
                                var s = document.getElementsByTagName("script")[0];
                                var b = document.createElement("script");
                                b.type = "text/javascript";b.async = true;
                                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                                s.parentNode.insertBefore(b, s);
                            })(window.lintrk);
                        `,
                    }}
                />
            )}

            {/* Google Ads */}
            {GOOGLE_ADS_ID && (
                <Script
                    id="google-ads"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            gtag('config', '${GOOGLE_ADS_ID}');
                        `,
                    }}
                />
            )}

            <Suspense fallback={null}>
                <PageViewTracker />
            </Suspense>
            {children}
        </TrackingContext.Provider>
    );
}

// =============================================================================
// PAGE VIEW TRACKER
// =============================================================================
function PageViewTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const tracking = useTracking();

    useEffect(() => {
        if (!tracking || !pathname) return;

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
        tracking.trackPageView(url);
    }, [pathname, searchParams, tracking]);

    return null;
}

// =============================================================================
// SERVER-SIDE CAPI
// =============================================================================
async function sendServerEvent(event: TrackingEvent): Promise<void> {
    try {
        await fetch('/api/tracking/capi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event_name: event.event_name,
                event_id: event.event_id,
                event_time: Math.floor(Date.now() / 1000),
                event_source_url: typeof window !== 'undefined' ? window.location.href : '',
                user_data: {
                    ...event.user_data,
                    client_ip_address: '', // Filled server-side
                    client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
                },
                custom_data: event.custom_data,
            }),
        });
    } catch (error) {
        console.error('[Tracking] CAPI error:', error);
    }
}

// =============================================================================
// HOOK
// =============================================================================
export function useTracking(): TrackingContextType | null {
    return useContext(TrackingContext);
}

// =============================================================================
// LEGACY EXPORT (backwards compatibility)
// =============================================================================
export const AnalyticsProvider = TrackingProvider;
export const useAnalytics = () => {
    const tracking = useTracking();
    return {
        trackEvent: (eventName: string, properties?: any) => {
            tracking?.trackEvent({
                event_name: eventName,
                custom_data: properties,
            });
        },
    };
};

