import mongoose, { Schema, Document } from "mongoose";

export type DraftType = "blog" | "landing" | "seo" | "internal_links" | "email" | "social" | "other";

export interface IContentDraft extends Document {
  type: DraftType;
  promptKey: string;
  title?: string;
  content: string;
  variables: Record<string, unknown>;
  modelName?: string;
  workflowRunId?: string;
  workflowKey?: string;
  workflowStepId?: string;
  workflowStepIndex?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ContentDraftSchema: Schema = new Schema(
  {
    type: { type: String, required: true, default: "other" },
    promptKey: { type: String, required: true, index: true },
    title: { type: String },
    content: { type: String, required: true },
    variables: { type: Schema.Types.Mixed, default: {} },
    modelName: { type: String },
    workflowRunId: { type: String, index: true },
    workflowKey: { type: String, index: true },
    workflowStepId: { type: String },
    workflowStepIndex: { type: Number },
  },
  { timestamps: true }
);

export const ContentDraft =
  mongoose.models.ContentDraft || mongoose.model<IContentDraft>("ContentDraft", ContentDraftSchema);

