import OpenAI from "openai";
import { IChatSession, IChatMessage, ChatMode } from "./models/chat";
import { generateSystemPrompt } from "./prompts";
import { Lead } from "./models/lead";

function getOpenAIClient() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("OPENAI_API_KEY is not configured");
    }
    return new OpenAI({ apiKey });
}

export async function processChatMessage(session: IChatSession, userMessage: string) {
    // 1. Log user message
    session.messages.push({
        role: "user",
        content: userMessage,
        timestamp: new Date()
    });

    // 2. Simple Rule-based intent/signal extraction (The "Hybrid" part)
    extractSignals(session, userMessage);

    // 3. Mode Transition Logic (Simplified for now)
    updateChatMode(session, userMessage);

    // 4. Generate AI Response
    const systemPrompt = generateSystemPrompt(session.mode, {
        service: session.metadata.service,
        leadScore: session.leadScore,
        intent: session.metadata.intent
    });

    // Get last 10 messages for context
    const history = session.messages.slice(-10).map(m => ({
        role: m.role,
        content: m.content
    }));

    let assistantReply = "I'm sorry, I'm having trouble processing that right now.";
    try {
        const openai = getOpenAIClient();
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Cost-effective & fast
            messages: [
                { role: "system", content: systemPrompt },
                ...history as any
            ],
            max_tokens: 150,
            temperature: 0.7,
        });

        assistantReply = response.choices[0].message.content || assistantReply;
    } catch (err) {
        console.error("OpenAI Chat Completion Error:", err);
        throw err;
    }

    // 5. Log assistant message
    session.messages.push({
        role: "assistant",
        content: assistantReply,
        timestamp: new Date()
    });

    // 6. Final state cleanup & Lead Conversion
    if (session.mode === "CAPTURE" && (userMessage.includes("@") || session.metadata.contactInfo?.email)) {
        if (!session.isConverted) {
            session.isConverted = true;
            await syncToLeads(session);
        }
    }

    session.updatedAt = new Date();
    await session.save();

    return assistantReply;
}

async function syncToLeads(session: IChatSession) {
    try {
        const contact = session.metadata.contactInfo;
        if (!contact?.email) return;

        // Create a official lead from AI session
        await Lead.create({
            fullName: contact.name || "AI Chat Lead",
            email: contact.email,
            serviceCategory: session.metadata.service || "Uncategorized AI Inquiry",
            serviceInterest: `Inquiry from Chat Session: ${session.sessionId}`,
            projectType: session.metadata.service || "Software Development",
            budgetRange: session.metadata.budget || "TBD (AI Discovery)",
            timeline: session.metadata.urgency === "HIGH" ? "Urgent" : "Discovery Phase",
            message: `Automatically captured from AI Chat. Lead Score: ${session.leadScore}. Last Mode: ${session.mode}`,
            source: "AI Chatbot",
            leadScore: session.leadScore,
            leadTier: session.leadScore > 40 ? "HOT" : session.leadScore > 20 ? "WARM" : "COLD",
            status: "NEW"
        });
    } catch (err) {
        console.error("Lead Sync Error:", err);
    }
}

function extractSignals(session: IChatSession, text: string) {
    const t = text.toLowerCase();

    // Budget signals
    if (t.includes("$") || t.includes("budget") || t.includes("cost") || t.includes("price")) {
        session.leadScore += 5;
        if (t.includes("5000") || t.includes("10000") || t.includes("10k") || t.includes("5k")) {
            session.leadScore += 10;
            session.metadata.budget = "Project Value Detected";
        }
    }

    // Urgency signals
    if (t.includes("urgent") || t.includes("asap") || t.includes("immediately") || t.includes("deadline")) {
        session.leadScore += 10;
        session.metadata.urgency = "HIGH";
    }

    // Service detection
    if (t.includes("website") || t.includes("nextjs") || t.includes("design")) session.metadata.service = "Web Development";
    if (t.includes("app") || t.includes("mobile") || t.includes("ios")) session.metadata.service = "Mobile App";
    if (t.includes("automation") || t.includes("n8n") || t.includes("workflow")) session.metadata.service = "Automation";

    // Contact info
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const emailMatch = t.match(emailRegex);
    if (emailMatch) {
        session.metadata.contactInfo = { ...session.metadata.contactInfo, email: emailMatch[0] };
        session.leadScore += 20;
    }
}

function updateChatMode(session: IChatSession, text: string) {
    const t = text.toLowerCase();
    const currentMode = session.mode;

    // Jump from INTRO to DISCOVER
    if (currentMode === "INTRO") {
        session.mode = "DISCOVER";
    }
    // Jump to QUALIFY if they mention service/need
    else if (currentMode === "DISCOVER" && session.metadata.service) {
        session.mode = "QUALIFY";
    }
    // Jump to CONVERT if lead score is high
    else if (session.leadScore >= 30 && currentMode !== "CONVERT" && currentMode !== "CAPTURE") {
        session.mode = "CONVERT";
    }
    // Jump to CAPTURE if in CONVERT and they say yes
    else if (currentMode === "CONVERT" && (t.includes("yes") || t.includes("sure") || t.includes("ok") || t.includes("quote"))) {
        session.mode = "CAPTURE";
    }

    // Common fallback
    if (t.includes("question") || t.includes("how") || t.includes("what is")) {
        session.mode = "QA";
    }
}
