"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";

type AILibraryResponse = {
  success: boolean;
  prompts?: any;
  workflows?: any;
  error?: string;
};

function extractVariables(text: string) {
  const found = new Set<string>();
  const regex = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text))) {
    found.add(match[1]);
  }
  return Array.from(found);
}

function buildVariableState(keys: string[]) {
  return keys.reduce<Record<string, string>>((acc, key) => {
    acc[key] = "";
    return acc;
  }, {});
}

export default function AIAssistantPage() {
  const [library, setLibrary] = useState<AILibraryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [openAiConfigured, setOpenAiConfigured] = useState(true);

  const [selectedPromptKey, setSelectedPromptKey] = useState("");
  const [promptVariables, setPromptVariables] = useState<Record<string, string>>({});
  const [generatedContent, setGeneratedContent] = useState("");
  const [draftId, setDraftId] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");

  const [selectedWorkflowKey, setSelectedWorkflowKey] = useState("");
  const [workflowVariables, setWorkflowVariables] = useState<Record<string, string>>({});
  const [workflowRunId, setWorkflowRunId] = useState("");
  const [workflowDraftIds, setWorkflowDraftIds] = useState<string[]>([]);
  const [isRunningWorkflow, setIsRunningWorkflow] = useState(false);
  const [workflowError, setWorkflowError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [libraryRes, statusRes] = await Promise.all([
          fetch("/api/admin/ai-library", { cache: "no-store" }),
          fetch("/api/admin/settings/status", { cache: "no-store" }),
        ]);

        const libraryJson = (await libraryRes.json()) as AILibraryResponse;
        const statusJson = await statusRes.json();
        if (!mounted) return;

        setLibrary(libraryJson);
        setOpenAiConfigured(!!statusJson?.openai);

        const promptMap = (libraryJson.prompts?.prompts || libraryJson.prompts || {}) as Record<string, any>;
        const workflowMap = (libraryJson.workflows?.workflows || libraryJson.workflows || {}) as Record<string, any>;
        const firstPrompt = Object.keys(promptMap)[0] || "";
        const firstWorkflow = Object.keys(workflowMap)[0] || "";
        if (firstPrompt) setSelectedPromptKey(firstPrompt);
        if (firstWorkflow) setSelectedWorkflowKey(firstWorkflow);
      } catch {
        if (mounted) {
          setLibrary({ success: false, error: "Failed to load AI library" });
          setOpenAiConfigured(false);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const promptMap = useMemo(() => ((library?.prompts?.prompts || library?.prompts || {}) as Record<string, any>), [library]);
  const workflowMap = useMemo(() => ((library?.workflows?.workflows || library?.workflows || {}) as Record<string, any>), [library]);

  const selectedPrompt = promptMap[selectedPromptKey];
  const selectedWorkflow = workflowMap[selectedWorkflowKey];

  const promptVars = useMemo(() => {
    const template = `${selectedPrompt?.system_prompt_template || ""}\n${selectedPrompt?.user_prompt_template || ""}`;
    return extractVariables(template);
  }, [selectedPrompt]);

  const workflowVars = useMemo(() => {
    const steps = Array.isArray(selectedWorkflow?.steps) ? selectedWorkflow.steps : [];
    return extractVariables(JSON.stringify(steps));
  }, [selectedWorkflow]);

  const workflowSteps = Array.isArray(selectedWorkflow?.steps) ? selectedWorkflow.steps : [];

  useEffect(() => {
    setPromptVariables(buildVariableState(promptVars));
  }, [selectedPromptKey, promptVars.join("|")]);

  useEffect(() => {
    setWorkflowVariables(buildVariableState(workflowVars));
  }, [selectedWorkflowKey, workflowVars.join("|")]);

  const runGenerate = async () => {
    setGenerationError("");
    setDraftId("");
    setGeneratedContent("");
    setIsGenerating(true);

    try {
      const res = await fetch("/api/admin/ai-studio/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptKey: selectedPromptKey, variables: promptVariables, type: "other" }),
      });
      const json = await res.json();
      if (!res.ok || !json?.success) {
        throw new Error(json?.detail || json?.error || "Generation failed");
      }

      setDraftId(json.draftId || "");
      setGeneratedContent(json.content || "");
    } catch (err: any) {
      setGenerationError(err?.message || "Generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  const runWorkflow = async () => {
    setWorkflowError("");
    setWorkflowRunId("");
    setWorkflowDraftIds([]);
    setIsRunningWorkflow(true);

    try {
      const res = await fetch("/api/admin/ai-studio/run-workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workflowKey: selectedWorkflowKey, variables: workflowVariables }),
      });
      const json = await res.json();
      if (!res.ok || !json?.success) {
        throw new Error(json?.detail || json?.error || "Workflow failed");
      }

      setWorkflowRunId(json.workflowRunId || "");
      setWorkflowDraftIds(Array.isArray(json.draftIds) ? json.draftIds : []);
    } catch (err: any) {
      setWorkflowError(err?.message || "Workflow failed");
    } finally {
      setIsRunningWorkflow(false);
    }
  };

  const renderVariableInputs = (
    keys: string[],
    values: Record<string, string>,
    onChange: (next: Record<string, string>) => void,
    emptyLabel: string
  ) => {
    if (keys.length === 0) {
      return <p className="text-sm text-slate-500">{emptyLabel}</p>;
    }

    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {keys.map((key) => (
          <div key={key}>
            <label className="text-xs font-medium text-slate-600">{key}</label>
            <input
              value={values[key] || ""}
              onChange={(e) => onChange({ ...values, [key]: e.target.value })}
              placeholder={key}
              className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="admin-page-stack space-y-6 pb-8 w-full">
      <PageHeader
        title="AI Assistant"
        subtitle="Generate drafts and run prompt workflows with stored outputs."
        breadcrumb={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "AI Assistant" }]}
      />

      {!openAiConfigured ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          `OPENAI_API_KEY` is not configured. Add it in the environment before running prompt generation or workflows.
        </div>
      ) : null}

      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">
        <Card className="admin-card self-start rounded-xl border-slate-300 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Generate Draft</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? <p className="text-sm text-slate-500">Loading...</p> : null}
            {!loading && !library?.success ? <p className="text-sm text-red-700">{library?.error || "Failed to load."}</p> : null}

            {!loading && library?.success ? (
              <>
                <div>
                  <label className="text-xs font-medium text-slate-600">Prompt</label>
                  <select
                    value={selectedPromptKey}
                    onChange={(e) => setSelectedPromptKey(e.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-slate-400"
                  >
                    {Object.entries(promptMap).map(([key, prompt]) => (
                      <option key={key} value={key}>{(prompt as any)?.name || key}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600">Detected Variables</label>
                  <p className="mt-1 text-xs text-slate-500">{promptVars.length ? promptVars.join(", ") : "No variables detected in this prompt."}</p>
                </div>

                {renderVariableInputs(promptVars, promptVariables, setPromptVariables, "No variables required for this prompt.")}

                {generationError ? <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{generationError}</div> : null}
                <Button onClick={runGenerate} disabled={!selectedPromptKey || isGenerating || !openAiConfigured}>
                  {isGenerating ? "Generating..." : "Generate + Save"}
                </Button>

                {draftId ? (
                  <p className="text-sm text-emerald-700">
                    Draft saved. <Link className="underline" href={`/admin/drafts/${draftId}`}>Open draft</Link>
                  </p>
                ) : null}

                {generatedContent ? (
                  <pre className="max-h-[320px] overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800 whitespace-pre-wrap">
                    {generatedContent}
                  </pre>
                ) : null}
              </>
            ) : null}
          </CardContent>
        </Card>

        <Card className="admin-card self-start rounded-xl border-slate-300 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Run Workflow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? <p className="text-sm text-slate-500">Loading...</p> : null}
            {!loading && !library?.success ? <p className="text-sm text-red-700">{library?.error || "Failed to load."}</p> : null}

            {!loading && library?.success ? (
              <>
                <div>
                  <label className="text-xs font-medium text-slate-600">Workflow</label>
                  <select
                    value={selectedWorkflowKey}
                    onChange={(e) => setSelectedWorkflowKey(e.target.value)}
                    className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-slate-400"
                  >
                    {Object.entries(workflowMap).map(([key, workflow]) => (
                      <option key={key} value={key}>{(workflow as any)?.name || key}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600">Detected Variables</label>
                  <p className="mt-1 text-xs text-slate-500">{workflowVars.length ? workflowVars.join(", ") : "No variables detected in this workflow."}</p>
                </div>

                {renderVariableInputs(workflowVars, workflowVariables, setWorkflowVariables, "No variables required for this workflow.")}

                {workflowError ? <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{workflowError}</div> : null}
                <Button onClick={runWorkflow} disabled={!selectedWorkflowKey || isRunningWorkflow || !openAiConfigured}>
                  {isRunningWorkflow ? "Running..." : "Run Workflow"}
                </Button>

                {workflowRunId ? (
                  <p className="text-sm text-emerald-700">
                    Workflow run created. <Link className="underline" href={`/admin/workflow-runs/${workflowRunId}`}>Open run</Link>
                  </p>
                ) : null}

                {workflowRunId ? (
                  <div className="space-y-2 rounded-lg border border-slate-200 p-3">
                    <p className="text-xs font-medium text-slate-600">Progress</p>
                    {workflowSteps.length === 0 ? <p className="text-sm text-slate-500">No steps found.</p> : null}
                    {workflowSteps.map((step: any, idx: number) => {
                      const done = idx < workflowDraftIds.length;
                      return (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-slate-700">Step {idx + 1}: {step?.prompt || step?.action || "step"}</span>
                          <span className={done ? "text-emerald-700" : "text-slate-400"}>{done ? "Completed" : "Pending"}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


