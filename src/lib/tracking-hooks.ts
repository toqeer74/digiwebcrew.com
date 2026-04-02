"use client";

import { useCallback } from "react";
import { useTracking } from "./analytics";

/**
 * Custom hook for tracking form submissions with standardized event taxonomy
 * Follows the Tracking & Pixel Blueprint event naming conventions
 */
export function useFormTracking() {
    const tracking = useTracking();

    /**
     * Track a lead form submission
     * Platforms: Meta (Lead), Google (generate_lead), LinkedIn (Lead)
     */
    const trackLeadForm = useCallback(async (data: {
        formId: string;
        formName?: string;
        email?: string;
        phone?: string;
        value?: number;
        source?: string;
    }) => {
        if (!tracking) return;

        // Track lead event
        await tracking.trackLead({
            email: data.email,
            phone: data.phone,
            value: data.value || 100, // Default lead value
        });

        // Track form submission
        tracking.trackFormSubmit(data.formId, {
            form_name: data.formName,
            source: data.source,
        });
    }, [tracking]);

    /**
     * Track contact form submission
     */
    const trackContactForm = useCallback((data: {
        email?: string;
        phone?: string;
        subject?: string;
        source?: string;
    }) => {
        if (!tracking) return;

        tracking.trackEvent({
            event_name: 'Contact',
            custom_data: {
                subject: data.subject,
                source: data.source,
            },
        });

        if (data.email || data.phone) {
            tracking.trackLead({
                email: data.email,
                phone: data.phone,
                value: 50,
            });
        }
    }, [tracking]);

    /**
     * Track quote request form
     */
    const trackQuoteRequest = useCallback(async (data: {
        email?: string;
        phone?: string;
        projectType?: string;
        budget?: number;
        timeline?: string;
    }) => {
        if (!tracking) return;

        await tracking.trackLead({
            email: data.email,
            phone: data.phone,
            value: data.budget || 500,
        });

        tracking.trackEvent({
            event_name: 'InitiateCheckout',
            value: data.budget || 500,
            currency: 'USD',
            custom_data: {
                project_type: data.projectType,
                timeline: data.timeline,
            },
        });
    }, [tracking]);

    /**
     * Track Calendly booking (Primary conversion)
     */
    const trackCalendlyBooking = useCallback((data: {
        eventType?: string;
        email?: string;
    }) => {
        if (!tracking) return;

        tracking.trackEvent({
            event_name: 'Schedule',
            value: 1000, // High-value conversion
            currency: 'USD',
            custom_data: {
                event_type: data.eventType,
                booking_source: 'calendly',
            },
        });

        if (data.email) {
            tracking.trackLead({
                email: data.email,
                value: 1000,
            });
        }
    }, [tracking]);

    /**
     * Track PDF download (Scope PDF from configurator/calculator)
     */
    const trackPdfDownload = useCallback((data: {
        documentName: string;
        documentType: 'scope_pdf' | 'tech_breakdown' | 'case_study';
    }) => {
        if (!tracking) return;

        tracking.trackEvent({
            event_name: 'ViewContent',
            custom_data: {
                content_name: data.documentName,
                content_type: data.documentType,
            },
        });
    }, [tracking]);

    /**
     * Track service page view
     */
    const trackServiceView = useCallback((data: {
        serviceId: string;
        serviceName: string;
        category?: string;
    }) => {
        if (!tracking) return;

        tracking.trackEvent({
            event_name: 'ViewContent',
            content_name: data.serviceName,
            content_category: data.category,
            content_ids: [data.serviceId],
        });
    }, [tracking]);

    /**
     * Track click-to-call action
     */
    const trackClickToCall = useCallback((phoneNumber: string) => {
        if (!tracking) return;
        tracking.trackCall(phoneNumber);
    }, [tracking]);

    /**
     * Initial signal when a user starts interacting with a lead form
     */
    const trackLeadFormStart = useCallback((formId: string, leadType: string) => {
        if (!tracking) return;
        tracking.trackLeadFormStart(formId, leadType);
    }, [tracking]);

    return {
        trackLeadForm,
        trackContactForm,
        trackQuoteRequest,
        trackCalendlyBooking,
        trackPdfDownload,
        trackServiceView,
        trackClickToCall,
        trackLeadFormStart,
    };
}

/**
 * Hook for tracking calculator/configurator tool usage
 */
export function useToolTracking() {
    const tracking = useTracking();

    const trackCalculatorStart = useCallback(() => {
        tracking?.trackEvent({
            event_name: 'InitiateCheckout',
            custom_data: { tool: 'ai_project_calculator', step: 'start' },
        });
    }, [tracking]);

    const trackCalculatorComplete = useCallback((data: {
        estimatedHours: number;
        platform: string;
        complexity: number;
    }) => {
        tracking?.trackEvent({
            event_name: 'AddToCart',
            value: data.estimatedHours * 75, // Estimate value
            currency: 'USD',
            custom_data: {
                tool: 'ai_project_calculator',
                step: 'complete',
                ...data,
            },
        });
    }, [tracking]);

    const trackConfiguratorStart = useCallback(() => {
        tracking?.trackEvent({
            event_name: 'InitiateCheckout',
            custom_data: { tool: 'service_configurator', step: 'start' },
        });
    }, [tracking]);

    const trackConfiguratorComplete = useCallback((data: {
        tier: string;
        stack: string[];
        maintenance: string;
    }) => {
        tracking?.trackEvent({
            event_name: 'AddToCart',
            custom_data: {
                tool: 'service_configurator',
                step: 'complete',
                ...data,
            },
        });
    }, [tracking]);

    /**
     * Track interaction with portfolio items (semantic signal)
     */
    const trackPortfolioProjectInteraction = useCallback((projectId: string, action: string, techStack?: string) => {
        if (!tracking) return;
        tracking.trackPortfolioInteraction(projectId, action, techStack);
    }, [tracking]);

    return {
        trackCalculatorStart,
        trackCalculatorComplete,
        trackConfiguratorStart,
        trackConfiguratorComplete,
        trackPortfolioProjectInteraction,
    };
}

