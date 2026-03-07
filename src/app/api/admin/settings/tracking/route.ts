import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/db";
import { Setting } from "@/lib/models/setting";

type TrackingConfig = {
    gtm_id: string;
    ga4_id: string;
    meta_pixel_id: string;
    meta_access_token: string;
    linkedin_partner_id: string;
    google_ads_id: string;
};

const DEFAULT_TRACKING_CONFIG: TrackingConfig = {
    gtm_id: process.env.NEXT_PUBLIC_GTM_ID || "",
    ga4_id: process.env.NEXT_PUBLIC_GA4_ID || "",
    meta_pixel_id: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
    meta_access_token: process.env.META_ACCESS_TOKEN || "",
    linkedin_partner_id: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || "",
    google_ads_id: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "",
};

async function getTrackingConfig(): Promise<TrackingConfig> {
    await connectToDatabase();
    const doc = await Setting.findOne({ key: "admin.tracking" }).lean();
    const value = (doc?.value || {}) as Partial<TrackingConfig>;
    return { ...DEFAULT_TRACKING_CONFIG, ...value };
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const trackingConfig = await getTrackingConfig();

    // Return config with masked secrets
    return NextResponse.json({
        config: {
            ...trackingConfig,
            meta_access_token: trackingConfig.meta_access_token
                ? '••••••••' + trackingConfig.meta_access_token.slice(-8)
                : '',
        },
    });
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        const trackingConfig = await getTrackingConfig();
        const body = await request.json();

        // Validate the incoming data
        const allowedFields = [
            'gtm_id',
            'ga4_id',
            'meta_pixel_id',
            'meta_access_token',
            'linkedin_partner_id',
            'google_ads_id',
        ];

        const updatedConfig: Record<string, string> = {};

        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                // Don't update masked values
                if (field === 'meta_access_token' && body[field].includes('••••')) {
                    updatedConfig[field] = trackingConfig.meta_access_token;
                } else {
                    updatedConfig[field] = body[field];
                }
            }
        }

        await connectToDatabase();
        await Setting.findOneAndUpdate(
            { key: "admin.tracking" },
            { $set: { value: { ...trackingConfig, ...updatedConfig } } },
            { upsert: true, new: true }
        );

        return NextResponse.json({
            success: true,
            message: 'Tracking configuration saved successfully',
        });

    } catch (error) {
        console.error('Failed to save tracking config:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save configuration' },
            { status: 500 }
        );
    }
}
