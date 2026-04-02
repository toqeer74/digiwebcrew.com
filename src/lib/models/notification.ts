"use server";

import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  type: "SYSTEM" | "ALERT" | "INFO" | "WARNING";
  title: string;
  body: string;
  read: boolean;
  userId?: string; // For user-specific notifications
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    type: {
      type: String,
      enum: ["SYSTEM", "ALERT", "INFO", "WARNING"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate model registration
const Notification =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", NotificationSchema);

export { Notification };

