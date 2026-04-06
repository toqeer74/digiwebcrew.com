import { NextRequest, NextResponse } from "next/server";
import { prisma, connectToDatabase } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth-middleware";
import { logAudit } from "@/lib/audit";
import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";

type RunWorkflowBody = {
  workflowKey: string;
  variables: Record<string, unknown>;
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
    const body = (await req.json()) as RunWorkflowBody;

    if (!body?.workflowKey) {
      return NextResponse.json({ success: false, error: "Missing workflowKey" }, { status: 400 });
    }

    await logAudit({
      action: "RUN_AI_WORKFLOW",
      resource: "ai-studio",
      resourceId: body.workflowKey,
      metadata: { variables: body.variables },
    });

    const promptsPath = path.join(process.cwd(), "digi", "ai-prompts.json");
    const promptsRaw = fs.readFileSync(promptsPath, "utf-8");
    const promptsJson = JSON.parse(promptsRaw);

    const workflow = promptsJson?.workflows?.[body.workflowKey];
    if (!workflow) {
      return NextResponse.json({ success: false, error: "Unknown workflowKey" }, { status: 400 });
    }

    const steps = Array.isArray(workflow.steps) ? workflow.steps : [];
    if (steps.length === 0) {
      return NextResponse.json({ success: false, error: "Workflow has no steps" }, { status: 400 });
    }

    await connectToDatabase();

    const workflowRunId = uuidv4();
    const outputs: Record<string, string> = {};
    const createdDraftIds: Array<string> = [];

    const openai = getOpenAIClient();

    for (let idx = 0; idx < steps.length; idx++) {
      const step = steps[idx] as any;

      if (!step?.prompt) {
        continue;
      }

      const promptKey = String(step.prompt);
      const prompt = promptsJson?.prompts?.[promptKey];
      if (!prompt) {
        continue;
      }

      const baseVariables = body.variables || {};
      const mergedVariables: Record<string, unknown> = {
        ...baseVariables,
        ...outputs,
      };

      const inputFrom = step.input_from ? String(step.input_from) : "";
      if (inputFrom && outputs[inputFrom]) {
        if (mergedVariables.content === undefined) {
          mergedVariables.content = outputs[inputFrom];
        }
      }

      const systemPrompt = String(prompt.system_prompt || "");
      const userTemplate = String(prompt.user_prompt_template || "");
      const userPrompt = fillTemplate(userTemplate, mergedVariables);

      const modelFromPrompt = String(prompt.model || "gpt-4o-mini");
      const model = modelFromPrompt === "gpt-4" ? "gpt-4o-mini" : modelFromPrompt;
      const temperature = typeof prompt.temperature === "number" ? prompt.temperature : 0.7;
      const maxTokens = typeof prompt.max_tokens === "number" ? prompt.max_tokens : 800;

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
      const outputKey = step.output ? String(step.output) : `step_${idx + 1}`;
      outputs[outputKey] = content;

      const draft = await prisma.contentDraft.create({
        data: {
          type: "OTHER",
          promptKey,
          content,
          variables: mergedVariables as any,
          modelName: model,
          workflowRunId,
          workflowKey: body.workflowKey,
          workflowStepId: step.action ? String(step.action) : undefined,
          workflowStepIndex: idx + 1,
        },
      });

      createdDraftIds.push(draft.id);
    }

    return NextResponse.json({
      success: true,
      workflowRunId,
      draftIds: createdDraftIds,
      outputs,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : undefined;
    await logAudit({
      action: "RUN_AI_WORKFLOW",
      error: detail,
      success: false,
    });
    return NextResponse.json(
      {
        success: false,
        error: "Workflow run failed",
        ...(process.env.NODE_ENV !== "production" && detail ? { detail } : {}),
      },
      { status: 500 }
    );
  }
}

