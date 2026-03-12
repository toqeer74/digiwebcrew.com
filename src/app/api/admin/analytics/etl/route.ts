import { NextRequest, NextResponse } from "next/server";

/**
 * SECURE ETL BRIDGE: Digi Web Crew Command Center
 * Purpose: Receives aggregated telemetry from Gumloop (ETL Orchestrator).
 * Data includes: LLM Visibility, Lead Conversion Velocity, System Performance.
 */

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        const webhookSecret = process.env.GUMLOOP_WEBHOOK_SECRET;

        // Basic token validation (for initial dev)
        if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
            return NextResponse.json({ error: "Unauthorized access to Command Center ETL" }, { status: 401 });
        }

        const data = await req.json();


        // METADATA: Automated Variance Analysis (Triggered in Gumloop, reported here)
        if (data.variance_alert) {
            console.warn(`[COMMAND CENTER ALERT] High Variance detected: ${data.variance_metric}`);
        }

        return NextResponse.json({
            status: "success",
            timestamp: new Date().toISOString(),
            received_metrics: Object.keys(data.metrics || {})
        });
    } catch (error) {
        console.error("[ETL ERROR] Processing failure:", error);
        return NextResponse.json({ error: "Internal ETL processing error" }, { status: 500 });
    }
}
