import { z } from "zod";

export const QuoteSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  serviceCategory: z.string().min(1, "Please select a category"),
  serviceInterest: z.string().min(1, "Please select a service"),
  projectType: z.enum(["new build", "redesign", "improvement"]),
  budgetRange: z.string().min(1, "Budget range is required"),
  timeline: z.string().min(1, "Timeline is required"),
  message: z.string().min(10, "Please provide some project details (min 10 chars)"),
  techPreference: z.string().optional(),
  country: z.string().optional(),
  utm: z.any().optional(),
  referral: z.string().optional(),
  locale: z.string().optional().default("en"),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type QuoteFormData = z.infer<typeof QuoteSchema>;

