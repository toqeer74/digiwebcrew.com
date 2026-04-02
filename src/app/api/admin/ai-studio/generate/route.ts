import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ContentDraft } from "@/lib/models/content-draft";
import { requireAdminSession } from "@/lib/auth-middleware";
import { logAudit } from "@/lib/audit";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

type GenerateBody = {
  promptKey: string;
  variables: Record<string, unknown>;
  type?: "blog" | "landing" | "seo" | "internal_links" | "email" | "social" | "other";
};

function fillTemplate(template: string, variables: Record<string, unknown>) {
  return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key: string) => {
    const v = variables[key];
    if (v === undefined || v === null) return "";
    if (typeof v === "string") return v;
    return JSON.stringify(v);
  });
}

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminSession(req);
  if (!auth.success) {
    return NextResponse.json({ success: false, error: (auth as any).error }, { status: (auth as any).status });
  }

  try {
    const body = (await req.json()) as GenerateBody;

    if (!body?.promptKey) {
      return NextResponse.json({ success: false, error: "Missing promptKey" }, { status: 400 });
    }

    await logAudit({
      action: "RUN_AI_PROMPT",
      resource: "ai-studio",
      resourceId: body.promptKey,
      metadata: { variables: body.variables, type: body.type },
    });

    const promptsPath = path.join(process.cwd(), "digi", "ai-prompts.json");
    const promptsRaw = fs.readFileSync(promptsPath, "utf-8");
    const promptsJson = JSON.parse(promptsRaw);

    const prompt = promptsJson?.prompts?.[body.promptKey];
    if (!prompt) {
      return NextResponse.json({ success: false, error: "Unknown promptKey" }, { status: 400 });
    }

    const variables = body.variables || {};

    const systemPrompt = String(prompt.system_prompt || "");
    const userTemplate = String(prompt.user_prompt_template || "");
    const userPrompt = fillTemplate(userTemplate, variables);

    const modelFromPrompt = String(prompt.model || "gpt-4o-mini");
    const model = modelFromPrompt === "gpt-4" ? "gpt-4o-mini" : modelFromPrompt;

    const temperature = typeof prompt.temperature === "number" ? prompt.temperature : 0.7;
    const maxTokens = typeof prompt.max_tokens === "number" ? prompt.max_tokens : 800;

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature,
      max_tokens: maxTokens,
    });

    const content = response.choices?.[0]?.message?.content || "";

    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({ success: false, error: "Database unavailable" }, { status: 503 });
    }

    const draft = await ContentDraft.create({
      type: body.type || "other",
      promptKey: body.promptKey,
      content,
      variables,
      modelName: model,
    });

    await logAudit({
      action: "CREATE_DRAFT",
      resource: "content-draft",
      resourceId: draft._id.toString(),
      metadata: { promptKey: body.promptKey, type: body.type },
    });

    return NextResponse.json({ success: true, draftId: draft._id.toString(), content });
  } catch (error) {
    const detail = error instanceof Error ? error.message : undefined;
    await logAudit({
      action: "RUN_AI_PROMPT",
      error: detail,
      success: false,
    });
    return NextResponse.json(
      {
        success: false,
        error: "Generation failed",
        ...(process.env.NODE_ENV !== "production" && detail ? { detail } : {}),
      },
      { status: 500 }
    );
  }
}

