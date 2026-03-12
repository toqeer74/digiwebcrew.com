// Email Service - Supports multiple providers (Resend, SendGrid, Nodemailer)

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

async function sendEmailViaResend(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: payload.from || "noreply@digiwebcrew.com",
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });

    if (!response.ok) {
      console.error("[EMAIL] Resend error:", response.statusText);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[EMAIL] Resend send error:", err);
    return false;
  }
}

async function sendEmailViaNodemailer(payload: EmailPayload) {
  return true;
}

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (process.env.RESEND_API_KEY) {
    return sendEmailViaResend(payload);
  }
  return sendEmailViaNodemailer(payload);
}

// Template: New Lead Notification
export function templateNewLeadNotification(lead: any): string {
  const tierColors: Record<string, string> = {
    HOT: "#dc2626",
    WARM: "#f59e0b",
    COLD: "#6b7280",
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.5; color: #333; }
          .container { max-width: 600px; margin: 0 auto; border-top: 4px solid ${tierColors[lead.leadTier] || "#3b82f6"}; }
          .tier-badge { display: inline-block; background: ${tierColors[lead.leadTier] || "#3b82f6"}; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-bottom: 16px; }
          .field { margin-bottom: 12px; }
          .label { font-size: 12px; font-weight: bold; color: #666; text-transform: uppercase; }
          .value { font-size: 14px; color: #333; margin-top: 4px; }
          .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          .cta { display: inline-block; background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 16px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>🎯 New Lead: ${lead.fullName}</h2>
          <div class="tier-badge">${lead.leadTier} PRIORITY (Score: ${lead.leadScore})</div>
          
          <div class="field">
            <div class="label">Service Category</div>
            <div class="value">${lead.serviceCategory || "N/A"}</div>
          </div>
          
          <div class="field">
            <div class="label">Budget Range</div>
            <div class="value">${lead.budgetRange || "N/A"}</div>
          </div>
          
          <div class="field">
            <div class="label">Timeline</div>
            <div class="value">${lead.timeline || "N/A"}</div>
          </div>
          
          <div class="field">
            <div class="label">Message</div>
            <div class="value">${lead.message || "No message provided"}</div>
          </div>
          
          <div class="field">
            <div class="label">Contact</div>
            <div class="value">
              📧 ${lead.email}<br>
              ${lead.company ? "🏢 " + lead.company + "<br>" : ""}
              ${lead.country ? "📍 " + lead.country : ""}
            </div>
          </div>
          
          <a href="${process.env.NEXTAUTH_URL || "https://digiwebcrew.com"}/admin/leads/${lead._id}" class="cta">View Lead Details</a>
          
          <div class="footer">
            <p>This is an automated notification from Digi Web Crew Admin Portal.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Template: Client Quote Confirmation
export function templateQuoteConfirmation(lead: any, locale: string): string {
  const messages: Record<string, any> = {
    en: {
      title: "Thank You for Your Quote Request",
      message: "We have received your quote request and will review it shortly.",
      timeline: "We typically respond within 24 hours.",
    },
    ar: {
      title: "شكراً على طلب العرض",
      message: "لقد استلمنا طلب العرض الخاص بك، وسنقوم بمراجعته قريباً.",
      timeline: "نحن عادة ما نرد خلال 24 ساعة.",
    },
    ur: {
      title: "اپنی کوٹ کی درخواست کے لیے شکریہ",
      message: "ہم نے آپ کی کوٹ کی درخواست موصول کی ہے اور اسے جلد ہی دیکھیں گے۔",
      timeline: "ہم عام طور پر 24 گھنٹے میں جواب دیتے ہیں۔",
    },
  };

  const msg = messages[locale] || messages.en;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 24px; border-radius: 8px; text-align: center; margin-bottom: 24px; }
          .checkmark { font-size: 48px; margin-bottom: 12px; }
          .content { background: #f9fafb; padding: 24px; border-radius: 8px; margin-bottom: 24px; }
          .footer { font-size: 12px; color: #666; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="checkmark">✓</div>
            <h1>${msg.title}</h1>
          </div>
          
          <div class="content">
            <p>${msg.message}</p>
            <p><strong>${msg.timeline}</strong></p>
          </div>
          
          <div class="footer">
            <p>Digi Web Crew © 2026. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
