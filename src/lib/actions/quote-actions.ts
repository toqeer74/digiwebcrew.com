"use server";

import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/lib/models/lead";
import { QuoteSchema, QuoteFormData } from "@/types/quote";
import { sendEmail, templateNewLeadNotification, templateQuoteConfirmation } from "@/lib/email-service";

async function triggerAutomation(lead: any) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "new_lead",
        lead: {
          id: lead._id,
          name: lead.fullName,
          email: lead.email,
          category: lead.serviceCategory,
          tier: lead.leadTier,
          score: lead.leadScore
        }
      })
    });
  } catch (err) {
    console.error("[AUTOMATION] Failed to trigger webhook:", err);
  }
}

export async function submitQuote(data: QuoteFormData) {
  try {
    const validatedData = QuoteSchema.parse(data);

    // 0. Honeypot check
    if (validatedData.honeypot) {
      return { success: false, message: "Security check failed." };
    }

    await connectToDatabase();

    // 1. Calculate Initial lead score
    let score = 0;
    const budget = validatedData.budgetRange;
    if (budget.includes("25k") || budget.includes("50k")) score += 40;
    else if (budget.includes("10k")) score += 20;

    if (validatedData.timeline === "urgent") score += 30;
    else if (validatedData.timeline === "1-3-months") score += 15;

    if (validatedData.message.length > 500) score += 20;
    else if (validatedData.message.length > 200) score += 10;

    const tier = score >= 60 ? "HOT" : score >= 30 ? "WARM" : "COLD";

    // 2. Create Lead
    const newLead = await Lead.create({
      ...validatedData,
      leadScore: score,
      leadTier: tier,
      events: [
        { type: "LeadCreated", meta: { source: "Quote Wizard", referral: validatedData.referral } }
      ],
      tasks: [
        {
          title: "Qualify Lead & Send Proposal",
          dueAt: new Date(Date.now() + 12 * 60 * 60 * 1000) // +12 hours for premium feel
        }
      ]
    });

    // 3. Trigger Automation (n8n Bridge)
    await triggerAutomation(newLead);

    // 4. Send Emails
    const adminEmail = process.env.ADMIN_EMAIL || "admin@digiwebcrew.com";
    const locale = validatedData.locale || "en";

    // Send admin notification
    await sendEmail({
      to: adminEmail,
      subject: `🎯 New ${tier} Lead: ${validatedData.fullName}`,
      html: templateNewLeadNotification(newLead.toObject()),
    });

    // Send client confirmation
    await sendEmail({
      to: validatedData.email,
      subject: "Thank You for Your Quote Request",
      html: templateQuoteConfirmation(newLead.toObject(), locale),
    });


    return {
      success: true,
      leadId: newLead._id.toString(),
      message: "Quote submitted successfully!"
    };
  } catch (error: any) {
    console.error("Quote submission error:", error);
    return {
      success: false,
      message: error.message || "Failed to submit quote"
    };
  }
}

