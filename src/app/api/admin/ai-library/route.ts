import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import fs from "fs";
import path from "path";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const promptsPath = path.join(process.cwd(), "digi", "ai-prompts.json");
    const workflowsPath = path.join(process.cwd(), "digi", "workflows.json");

    const promptsRaw = fs.readFileSync(promptsPath, "utf-8");
    const workflowsRaw = fs.readFileSync(workflowsPath, "utf-8");

    const prompts = JSON.parse(promptsRaw);
    const workflows = JSON.parse(workflowsRaw);

    return NextResponse.json({ success: true, prompts, workflows });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Failed to load AI library" }, { status: 500 });
  }
}
