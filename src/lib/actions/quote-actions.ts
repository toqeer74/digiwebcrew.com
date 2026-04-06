"use server";

import { prisma, connectToDatabase } from "@/lib/db";
import { QuoteSchema, QuoteFormData } from "@/types/quote";
import { sendEmail, templateNewLeadNotification, templateQuoteConfirmation } from "@/lib/email-service";
import { calculateLeadScore } from "@/lib/lead-scoring";

async function triggerAutomation(lead: any) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) return;
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "new_lead",
        lead: { id: lead.id, name: lead.fullName, email: lead.email, category: lead.serviceCategory, tier: lead.leadTier, score: lead.leadScore },
      }),
    });
  } catch (err) {
    console.error("[AUTOMATION] Failed to trigger webhook:", err);
  }
}

export async function submitQuote(data: QuoteFormData) {
  try {
    const validatedData = QuoteSchema.parse(data);
    if (validatedData.honeypot) return { success: false, error: "Invalid submission" };

    await connectToDatabase();
    const scored = calculateLeadScore(validatedData);

    const lead = await prisma.lead.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        company: validatedData.company,
        country: validatedData.country,
        serviceCategory: validatedData.serviceCategory,
        serviceInterest: validatedData.serviceInterest || "",
        projectType: validatedData.projectType,
        budgetRange: validatedData.budgetRange,
        timeline: validatedData.timeline,
        techPreference: validatedData.techPreference,
        message: validatedData.message,
        source: "contact-form",
        utm: validatedData.utm,
        leadScore: scored.score,
        leadTier: scored.tier as any,
        status: "NEW",
        events: {
          create: [{ type: "LeadCreated", meta: { source: "Contact Form", creator: "public" } }],
        },
      },
    });

    await Promise.allSettled([
      triggerAutomation(lead),
      sendEmail({
        to: process.env.ADMIN_EMAIL || "admin@digiwebcrew.com",
        subject: `New Quote Request from ${lead.fullName}`,
        html: templateNewLeadNotification(lead),
      }),
      sendEmail({
        to: lead.email,
        subject: "We received your request",
        html: templateQuoteConfirmation(lead, data.locale || "en"),
      }),
    ]);

    return { success: true, leadId: lead.id };
  } catch (error) {
    console.error("[submitQuote] Error:", error);
    return { success: false, error: "Failed to submit quote" };
  }
}
