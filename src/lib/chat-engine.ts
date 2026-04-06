import OpenAI from "openai";
import { prisma } from "@/lib/db";
import { generateSystemPrompt } from "./prompts";

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
  return new OpenAI({ apiKey });
}

// session is a Prisma ChatSession with included messages[]
export async function processChatMessage(session: any, userMessage: string) {
  const sessionId = session.sessionId;

  // 1. Save user message
  await prisma.chatMessage.create({
    data: { chatSessionId: session.id, role: "USER", content: userMessage },
  });

  // 2. Extract signals & compute score delta
  const { scoreDelta, updates } = extractSignals(session, userMessage);

  // 3. Update mode
  const newMode = updateChatMode(session, userMessage, updates);

  // 4. Fetch last 10 messages for context
  const history = await prisma.chatMessage.findMany({
    where: { chatSessionId: session.id },
    orderBy: { timestamp: "asc" },
    take: 10,
  });

  const systemPrompt = generateSystemPrompt(newMode, {
    service: updates.service ?? session.service,
    leadScore: session.leadScore + scoreDelta,
    intent: updates.intent ?? session.intent,
  });

  // 5. Get AI reply
  let assistantReply = "I'm sorry, I'm having trouble processing that right now.";
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...history.map((m) => ({ role: m.role.toLowerCase() as any, content: m.content })),
      ],
      max_tokens: 150,
      temperature: 0.7,
    });
    assistantReply = response.choices[0].message.content || assistantReply;
  } catch (err) {
    console.error("OpenAI Chat Completion Error:", err);
    throw err;
  }

  // 6. Save assistant message
  await prisma.chatMessage.create({
    data: { chatSessionId: session.id, role: "ASSISTANT", content: assistantReply },
  });

  // 7. Persist state updates
  const newScore = Math.min(100, session.leadScore + scoreDelta);
  const contactEmail = updates.contactEmail;

  const updatedSession = await prisma.chatSession.update({
    where: { id: session.id },
    data: {
      mode: newMode as any,
      leadScore: newScore,
      ...(updates.service ? { service: updates.service } : {}),
      ...(updates.intent ? { intent: updates.intent } : {}),
      ...(updates.budget ? { budget: updates.budget } : {}),
      ...(updates.urgency ? { urgency: updates.urgency } : {}),
      ...(contactEmail ? { contactEmail } : {}),
    },
  });

  // 8. Auto-convert to lead if in CAPTURE mode with email
  if (newMode === "CAPTURE" && contactEmail && !session.isConverted) {
    await syncToLeads(updatedSession);
    await prisma.chatSession.update({ where: { id: session.id }, data: { isConverted: true } });
  }

  return assistantReply;
}

async function syncToLeads(session: any) {
  try {
    if (!session.contactEmail) return;
    const { calculateLeadScore } = await import("./lead-scoring");

    const payload = {
      fullName: session.contactName || "AI Chat Lead",
      email: session.contactEmail,
      serviceCategory: session.service || "Uncategorized AI Inquiry",
      serviceInterest: `Inquiry from Chat Session: ${session.sessionId}`,
      projectType: session.service || "Software Development",
      budgetRange: session.budget || "TBD (AI Discovery)",
      timeline: session.urgency === "HIGH" ? "Urgent" : "Discovery Phase",
      message: `Auto-captured from AI Chat. Lead Score: ${session.leadScore}. Mode: ${session.mode}`,
      source: "AI Chatbot",
    };

    const scored = calculateLeadScore(payload);
    await prisma.lead.create({
      data: {
        ...payload,
        company: "",
        leadScore: scored.score,
        leadTier: scored.tier as any,
        status: "NEW",
        events: {
          create: [{ type: "LeadCreated", meta: { source: "chat-conversion", sessionId: session.sessionId } }],
        },
      },
    });
  } catch (err) {
    console.error("Lead Sync Error:", err);
  }
}

function extractSignals(session: any, text: string) {
  const t = text.toLowerCase();
  let scoreDelta = 0;
  const updates: Record<string, string> = {};

  if (t.includes("$") || t.includes("budget") || t.includes("cost") || t.includes("price")) {
    scoreDelta += 5;
    if (["5000", "10000", "10k", "5k"].some((w) => t.includes(w))) {
      scoreDelta += 10;
      updates.budget = "Project Value Detected";
    }
  }
  if (["urgent", "asap", "immediately", "deadline"].some((w) => t.includes(w))) {
    scoreDelta += 10;
    updates.urgency = "HIGH";
  }
  if (["website", "nextjs", "design"].some((w) => t.includes(w))) updates.service = "Web Development";
  if (["app", "mobile", "ios"].some((w) => t.includes(w))) updates.service = "Mobile App";
  if (["automation", "n8n", "workflow"].some((w) => t.includes(w))) updates.service = "Automation";

  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    updates.contactEmail = emailMatch[0];
    scoreDelta += 20;
  }

  return { scoreDelta, updates };
}

function updateChatMode(session: any, text: string, updates: Record<string, string>) {
  const t = text.toLowerCase();
  const currentMode: string = session.mode;
  const service = updates.service || session.service;
  const newScore = session.leadScore + (updates.contactEmail ? 20 : 0);

  if (currentMode === "INTRO") return "DISCOVER";
  if (currentMode === "DISCOVER" && service) return "QUALIFY";
  if (newScore >= 30 && !["CONVERT", "CAPTURE"].includes(currentMode)) return "CONVERT";
  if (currentMode === "CONVERT" && ["yes", "sure", "ok", "quote"].some((w) => t.includes(w))) return "CAPTURE";
  if (["question", "how", "what is"].some((w) => t.includes(w))) return "QA";
  return currentMode;
}
