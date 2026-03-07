// n8n Workflow Integration - Automation templates and triggers

export interface WorkflowTrigger {
  event: "new_lead" | "lead_updated" | "status_changed" | "high_score" | "follow_up_due";
  webhook: string;
  conditions?: Record<string, any>;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  triggers: WorkflowTrigger[];
  actions: Array<{
    type: "send_email" | "create_task" | "update_sheet" | "send_slack" | "create_calendar";
    config: any;
  }>;
}

// Workflow Templates
export const workflowTemplates: Record<string, WorkflowTemplate> = {
  hot_lead_notification: {
    id: "hot_lead_notification",
    name: "Hot Lead Instant Notification",
    description: "Immediately notify team when HOT lead is received",
    triggers: [
      {
        event: "new_lead",
        webhook: "{N8N_WEBHOOK_URL}",
        conditions: { leadTier: "HOT" },
      },
    ],
    actions: [
      {
        type: "send_email",
        config: {
          to: "{ADMIN_EMAIL}",
          subject: "🔥 HOT Lead Alert: {leadName}",
          template: "hot_lead_notification",
        },
      },
      {
        type: "send_slack",
        config: {
          channel: "#sales",
          message: "🔥 New HOT lead: {leadName} - Budget: {budgetRange}",
        },
      },
      {
        type: "create_task",
        config: {
          title: "Call {leadName} immediately",
          dueDate: "today",
          assigned: "Senior Sales",
        },
      },
    ],
  },

  lead_nurture_sequence: {
    id: "lead_nurture_sequence",
    name: "Lead Nurture Sequence",
    description: "Auto-send nurture emails to COLD/WARM leads",
    triggers: [
      {
        event: "new_lead",
        webhook: "{N8N_WEBHOOK_URL}",
        conditions: { leadTier: { $in: ["COLD", "WARM"] } },
      },
    ],
    actions: [
      {
        type: "send_email",
        config: {
          delay: "1 day",
          template: "welcome_email",
        },
      },
      {
        type: "send_email",
        config: {
          delay: "3 days",
          template: "case_study_featured",
        },
      },
      {
        type: "send_email",
        config: {
          delay: "7 days",
          template: "service_overview",
        },
      },
    ],
  },

  follow_up_reminder: {
    id: "follow_up_reminder",
    name: "Follow-up Reminders",
    description: "Daily reminders for pending follow-ups",
    triggers: [
      {
        event: "follow_up_due",
        webhook: "{N8N_WEBHOOK_URL}",
        conditions: {},
      },
    ],
    actions: [
      {
        type: "send_email",
        config: {
          to: "{ASSIGNED_TO}",
          subject: "Follow-up reminder: {leadName}",
        },
      },
      {
        type: "send_slack",
        config: {
          channel: "@{assignedUser}",
          message: "Reminder: Follow up with {leadName}",
        },
      },
    ],
  },

  status_changed_notification: {
    id: "status_changed_notification",
    name: "Status Change Notification",
    description: "Log status changes to Google Sheets for tracking",
    triggers: [
      {
        event: "status_changed",
        webhook: "{N8N_WEBHOOK_URL}",
        conditions: {},
      },
    ],
    actions: [
      {
        type: "update_sheet",
        config: {
          spreadsheet: "{TRACKING_SHEET}",
          sheet: "Lead Timeline",
          action: "append",
          data: {
            timestamp: "now",
            leadName: "{leadName}",
            oldStatus: "{oldStatus}",
            newStatus: "{newStatus}",
          },
        },
      },
    ],
  },

  high_score_escalation: {
    id: "high_score_escalation",
    name: "High Score Lead Escalation",
    description: "Escalate high-scoring leads to management",
    triggers: [
      {
        event: "new_lead",
        webhook: "{N8N_WEBHOOK_URL}",
        conditions: { leadScore: { $gte: 80 } },
      },
    ],
    actions: [
      {
        type: "create_calendar",
        config: {
          title: "Discuss lead: {leadName}",
          attendees: ["{MANAGER_EMAIL}", "{SALES_LEAD_EMAIL}"],
          duration: 30,
          time: "09:00 AM",
        },
      },
      {
        type: "send_email",
        config: {
          to: "{MANAGEMENT}",
          subject: "⭐ Premium Lead for Review: {leadName}",
          template: "premium_lead_briefing",
        },
      },
    ],
  },

  won_deal_celebration: {
    id: "won_deal_celebration",
    name: "Won Deal Celebration",
    description: "Celebrate closed deals and track revenue",
    triggers: [
      {
        event: "status_changed",
        webhook: "{N8N_WEBHOOK_URL}",
        conditions: { newStatus: "WON" },
      },
    ],
    actions: [
      {
        type: "send_slack",
        config: {
          channel: "#wins",
          message: "🎉 Deal Won! {leadName} - {budgetRange}",
        },
      },
      {
        type: "update_sheet",
        config: {
          spreadsheet: "{REVENUE_SHEET}",
          sheet: "Closed Deals",
          action: "append",
          data: {
            date: "now",
            client: "{leadName}",
            revenue: "{actualRevenue}",
            salesRep: "{assignedTo}",
          },
        },
      },
    ],
  },
};

// Helper to trigger workflow
export async function triggerWorkflow(event: WorkflowTrigger["event"], leadData: any) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log("[WORKFLOW] No N8N_WEBHOOK_URL configured");
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        timestamp: new Date().toISOString(),
        lead: leadData,
      }),
    });

    if (response.ok) {
      console.log(`[WORKFLOW] ${event} triggered successfully`);
    } else {
      console.error(`[WORKFLOW] ${event} failed:`, response.statusText);
    }
  } catch (error) {
    console.error(`[WORKFLOW] ${event} error:`, error);
  }
}

// Export workflow setup guide
export function generateN8nSetupGuide(): string {
  return `
# n8n Workflow Setup Guide

## Prerequisites
1. n8n instance running (cloud or self-hosted)
2. Admin access to n8n
3. Webhook URL from your workflow
4. Environment variables configured in .env

## Setup Steps

### 1. Enable Webhook
- In n8n, create a new workflow
- Add "Webhook" node
- Choose "Listen" method
- Copy the webhook URL to N8N_WEBHOOK_URL in .env

### 2. Import Automation Templates
Copy and paste one of the workflow templates into n8n JSON editor:
- hot_lead_notification
- lead_nurture_sequence
- follow_up_reminder
- status_changed_notification
- high_score_escalation
- won_deal_celebration

### 3. Configure Integrations
- Gmail/Outlook for email sending
- Slack for notifications
- Google Sheets for tracking
- Google Calendar for scheduling

### 4. Test Workflow
- Add a test lead in the admin dashboard
- Check if notifications are sent
- Verify webhook is receiving events

### 5. Going Live
- Enable all workflows
- Monitor execution history
- Adjust as needed based on results
`;
}
