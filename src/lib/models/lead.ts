import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  fullName: string;
  email: string;
  company?: string;
  country?: string;
  timezone?: string;
  serviceCategory: string;
  serviceInterest: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  techPreference?: string;
  message?: string;
  source?: string;
  utm?: Record<string, string>;
  leadScore: number;
  leadTier: "HOT" | "WARM" | "COLD";
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "PROPOSAL" | "WON" | "LOST" | "SPAM";
  notes: Array<{
    content: string;
    author: string;
    type: "note" | "internal" | "follow-up";
    createdAt: Date;
  }>;
  events: Array<{
    type: string;
    at: Date;
    meta?: any;
  }>;
  tasks: Array<{
    title: string;
    dueAt: Date;
    done: boolean;
    priority?: "low" | "medium" | "high";
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    company: { type: String },
    country: { type: String },
    timezone: { type: String },
    serviceCategory: { type: String, required: true },
    serviceInterest: { type: String, required: true },
    projectType: { type: String },
    budgetRange: { type: String },
    timeline: { type: String },
    techPreference: { type: String },
    message: { type: String },
    source: { type: String },
    utm: { type: Map, of: String },
    leadScore: { type: Number, default: 0 },
    leadTier: { type: String, enum: ["HOT", "WARM", "COLD"], default: "COLD" },
    status: { 
      type: String, 
      enum: ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST", "SPAM"], 
      default: "NEW" 
    },
    notes: [
      {
        content: { type: String, required: true },
        author: { type: String, default: "Admin" },
        type: { type: String, enum: ["note", "internal", "follow-up"], default: "note" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    events: [
      {
        type: { type: String },
        at: { type: Date, default: Date.now },
        meta: { type: Schema.Types.Mixed },
      },
    ],
    tasks: [
      {
        title: { type: String },
        dueAt: { type: Date },
        done: { type: Boolean, default: false },
        priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Lead = mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

