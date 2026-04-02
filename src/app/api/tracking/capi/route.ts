import { NextRequest, NextResponse } from 'next/server';

// Meta Conversions API endpoint
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || '';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || ''; // For testing

interface CAPIEvent {
    event_name: string;
    event_id: string;
    event_time: number;
    event_source_url: string;
    user_data: {
        em?: string;
        ph?: string;
        fn?: string;
        ln?: string;
        ct?: string;
        st?: string;
        zp?: string;
        country?: string;
        external_id?: string;
        fbp?: string;
        fbc?: string;
        client_ip_address?: string;
        client_user_agent?: string;
    };
    custom_data?: Record<string, any>;
    action_source?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: CAPIEvent = await request.json();

        // Get client IP from headers
        const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || request.headers.get('x-real-ip')
            || '';

        // Build the event payload for Meta CAPI
        const eventData = {
            event_name: body.event_name,
            event_id: body.event_id,
            event_time: body.event_time,
            event_source_url: body.event_source_url,
            action_source: 'website',
            user_data: {
                ...body.user_data,
                client_ip_address: clientIp,
            },
            custom_data: body.custom_data,
        };

        // Only send if we have Meta credentials
        if (META_ACCESS_TOKEN && META_PIXEL_ID) {
            const payload: any = {
                data: [eventData],
            };

            // Add test event code if in testing mode
            if (META_TEST_EVENT_CODE) {
                payload.test_event_code = META_TEST_EVENT_CODE;
            }

            const response = await fetch(
                `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...payload,
                        access_token: META_ACCESS_TOKEN,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                console.error('[CAPI] Meta API error:', result);
                return NextResponse.json(
                    { success: false, error: result.error?.message || 'Meta API error' },
                    { status: response.status }
                );
            }

            return NextResponse.json({
                success: true,
                events_received: result.events_received,
                fbtrace_id: result.fbtrace_id,
            });
        }

        // No credentials - skip silently in development
        return NextResponse.json({ success: true, skipped: true });

    } catch (error) {
        console.error('[CAPI] Server error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

