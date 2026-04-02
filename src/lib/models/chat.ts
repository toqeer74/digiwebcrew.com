import mongoose, { Schema, Document } from "mongoose";

export type ChatMode = "INTRO" | "DISCOVER" | "QA" | "QUALIFY" | "CONVERT" | "CAPTURE" | "EXIT";

export interface IChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: Date;
}

export interface IChatSession extends Document {
    sessionId: string;
    mode: ChatMode;
    messages: IChatMessage[];
    summary?: string;
    leadScore: number;
    metadata: {
        intent?: string;
        service?: string;
        budget?: string;
        urgency?: string;
        contactInfo?: {
            name?: string;
            email?: string;
            phone?: string;
        };
    };
    isConverted: boolean;
    isClosed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ChatSessionSchema: Schema = new Schema(
    {
        sessionId: { type: String, required: true, unique: true },
        mode: {
            type: String,
            enum: ["INTRO", "DISCOVER", "QA", "QUALIFY", "CONVERT", "CAPTURE", "EXIT"],
            default: "INTRO"
        },
        messages: [
            {
                role: { type: String, enum: ["user", "assistant", "system"], required: true },
                content: { type: String, required: true },
                timestamp: { type: Date, default: Date.now },
            },
        ],
        summary: { type: String },
        leadScore: { type: Number, default: 0 },
        metadata: {
            intent: { type: String },
            service: { type: String },
            budget: { type: String },
            urgency: { type: String },
            contactInfo: {
                name: { type: String },
                email: { type: String },
                phone: { type: String },
            },
        },
        isConverted: { type: Boolean, default: false },
        isClosed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.models.ChatSession || mongoose.model<IChatSession>("ChatSession", ChatSessionSchema);
export const ChatSession = mongoose.models.ChatSession || mongoose.model<IChatSession>("ChatSession", ChatSessionSchema);

