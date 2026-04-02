import mongoose, { Schema, Document } from "mongoose";

export type AuditAction = 
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "LOGOUT"
  | "VIEW_DASHBOARD"
  | "VIEW_LEADS"
  | "VIEW_LEAD_DETAIL"
  | "VIEW_CHATS"
  | "VIEW_DRAFTS"
  | "VIEW_WORKFLOW_RUNS"
  | "RUN_AI_PROMPT"
  | "RUN_AI_WORKFLOW"
  | "CREATE_DRAFT"
  | "UPDATE_BRANDING"
  | "UPDATE_SETTINGS"
  | "EXPORT_DATA";

export interface IAuditLog extends Document {
  userId?: string;
  userEmail?: string;
  action: AuditAction;
  resource?: string;
  resourceId?: string;
  ip?: string;
  userAgent?: string;
  success: boolean;
  error?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

const AuditLogSchema: Schema = new Schema(
  {
    userId: { type: String },
    userEmail: { type: String },
    action: {
      type: String,
      enum: [
        "LOGIN_SUCCESS",
        "LOGIN_FAILED",
        "LOGOUT",
        "VIEW_DASHBOARD",
        "VIEW_LEADS",
        "VIEW_LEAD_DETAIL",
        "VIEW_CHATS",
        "VIEW_DRAFTS",
        "VIEW_WORKFLOW_RUNS",
        "RUN_AI_PROMPT",
        "RUN_AI_WORKFLOW",
        "CREATE_DRAFT",
        "UPDATE_BRANDING",
        "UPDATE_SETTINGS",
        "EXPORT_DATA",
      ],
      required: true,
    },
    resource: { type: String },
    resourceId: { type: String },
    ip: { type: String },
    userAgent: { type: String },
    success: { type: Boolean, default: true },
    error: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Indexes for performance
AuditLogSchema.index({ createdAt: -1 });
AuditLogSchema.index({ userId: 1, createdAt: -1 });
AuditLogSchema.index({ action: 1, createdAt: -1 });

export default mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
export const AuditLog = mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);

