"use client";

import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, Bot, Zap, MessageSquare, Terminal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/page-header";
import { useEffect, useState } from "react";

type AILibraryResponse = {
    success: boolean;
    prompts?: any;
    workflows?: any;
    error?: string;
};

export default function AIAssistantPage() {
    const features = [
        { title: "Logic Mapping", desc: "AI-driven architecture blueprints based on lead intent.", icon: BrainCircuit, color: "text-blue-500" },
        { title: "Scope Extraction", desc: "Automated cost and timeline estimations for new inquiries.", icon: Zap, color: "text-amber-500" },
        { title: "Drafting Assistant", desc: "AI-powered proposal generation and technical responses.", icon: Bot, color: "text-electric" },
    ];

    const [aiLibrary, setAiLibrary] = useState<AILibraryResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const [selectedPromptKey, setSelectedPromptKey] = useState<string>("");
    const [variablesJson, setVariablesJson] = useState<string>("{}");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState<string | null>(null);
    const [generatedContent, setGeneratedContent] = useState<string>("");
    const [draftId, setDraftId] = useState<string>("");

    const [selectedWorkflowKey, setSelectedWorkflowKey] = useState<string>("");
    const [workflowVariablesJson, setWorkflowVariablesJson] = useState<string>("{}");
    const [isRunningWorkflow, setIsRunningWorkflow] = useState(false);
    const [workflowError, setWorkflowError] = useState<string | null>(null);
    const [workflowRunId, setWorkflowRunId] = useState<string>("");
    const [workflowDraftIds, setWorkflowDraftIds] = useState<string[]>([]);

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const res = await fetch("/api/admin/ai-library", { cache: "no-store" });
                const json = (await res.json()) as AILibraryResponse;
                if (isMounted) {
                    setAiLibrary(json);
                    const firstKey = json.success ? Object.keys(json.prompts?.prompts || {})[0] : "";
                    if (firstKey) {
                        setSelectedPromptKey((prev) => prev || firstKey);
                    }

                    const firstWorkflowKey = json.success ? Object.keys(json.prompts?.workflows || {})[0] : "";
                    if (firstWorkflowKey) {
                        setSelectedWorkflowKey((prev) => prev || firstWorkflowKey);
                    }
                }
            } catch (e: any) {
                if (isMounted) setAiLibrary({ success: false, error: "Failed to load AI library" });
            } finally {
                if (isMounted) setLoading(false);
            }
        })();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="space-y-10 pb-12">
                <PageHeader
                    label="Experimental Feature"
                    title="AI Assistant"
                    icon={<Sparkles />}
                    description="Unified Intelligence Layer Operational."
                />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="rounded-[2rem] border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all h-full group">
                            <CardHeader>
                                <div className={`w-12 h-12 rounded-2xl ${feature.color.replace('text', 'bg').replace('-500', '/10')} flex items-center justify-center ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                                    <feature.icon size={24} />
                                </div>
                                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Card className="rounded-[3rem] border-dashed border-2 border-gray-100 bg-gray-50/50 p-12 flex flex-col items-center text-center justify-center min-h-[300px]">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-300 mb-6">
                    <MessageSquare size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-400">Initialize Neural Processing</h3>
                <p className="max-w-md text-gray-400 font-medium mt-2">Connect your logic mapping module to start generating AI-driven insights for your leads.</p>
                <button className="mt-8 px-8 h-12 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gray-900/20">
                    Connect Modules
                </button>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-[2rem] border-gray-100 bg-white shadow-sm overflow-hidden">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-black uppercase tracking-widest text-muted-foreground/60">Prompt Library</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Loading...</div>
                        ) : !aiLibrary?.success ? (
                            <div className="text-xs font-bold text-rose-500 uppercase tracking-widest">
                                {aiLibrary?.error || "Failed to load"}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {Object.entries((aiLibrary.prompts?.prompts || {}) as Record<string, any>).map(([key, p]) => (
                                    <div key={key} className="p-4 rounded-2xl border border-border bg-secondary/10">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{key}</div>
                                        <div className="text-sm font-black mt-1">{p?.name}</div>
                                        <div className="text-xs text-muted-foreground/70 font-medium mt-1 line-clamp-2">{p?.system_prompt}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="rounded-[2rem] border-gray-100 bg-white shadow-sm overflow-hidden">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-black uppercase tracking-widest text-muted-foreground/60">Workflow Library</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Loading...</div>
                        ) : !aiLibrary?.success ? (
                            <div className="text-xs font-bold text-rose-500 uppercase tracking-widest">
                                {aiLibrary?.error || "Failed to load"}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {Object.entries((aiLibrary.workflows?.workflows || {}) as Record<string, any>).map(([key, wf]) => (
                                    <div key={key} className="p-4 rounded-2xl border border-border bg-secondary/10">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{key}</div>
                                        <div className="text-sm font-black mt-1">{wf?.name}</div>
                                        <div className="text-xs text-muted-foreground/70 font-medium mt-1 line-clamp-2">{wf?.description}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mt-2">
                                            {Array.isArray(wf?.steps) ? `${wf.steps.length} steps` : ""}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-[2rem] border-gray-100 bg-white shadow-sm overflow-hidden">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base font-black uppercase tracking-widest text-muted-foreground/60">AI Studio: Generate + Save Draft</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {loading ? (
                        <div className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Loading...</div>
                    ) : !aiLibrary?.success ? (
                        <div className="text-xs font-bold text-rose-500 uppercase tracking-widest">
                            {aiLibrary?.error || "Failed to load"}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                                <div className="lg:col-span-4">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-2">Prompt</div>
                                    <select
                                        value={selectedPromptKey}
                                        onChange={(e) => {
                                            setSelectedPromptKey(e.target.value);
                                            setGenerationError(null);
                                            setDraftId("");
                                            setGeneratedContent("");
                                        }}
                                        className="w-full h-11 rounded-xl border border-border bg-white px-3 text-sm font-bold"
                                    >
                                        {Object.entries((aiLibrary.prompts?.prompts || {}) as Record<string, any>).map(([key, p]) => (
                                            <option key={key} value={key}>
                                                {p?.name || key}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="lg:col-span-8">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-2">Variables (JSON)</div>
                                    <textarea
                                        value={variablesJson}
                                        onChange={(e) => setVariablesJson(e.target.value)}
                                        className="w-full min-h-[110px] rounded-xl border border-border bg-white p-3 font-mono text-xs"
                                        placeholder='{"topic":"...","keywords":"...","tone":"..."}'
                                    />
                                </div>
                            </div>

                            {generationError && (
                                <div className="text-xs font-bold text-rose-500 uppercase tracking-widest">{generationError}</div>
                            )}

                            <button
                                disabled={isGenerating || !selectedPromptKey}
                                onClick={async () => {
                                    setIsGenerating(true);
                                    setGenerationError(null);
                                    setDraftId("");
                                    setGeneratedContent("");
                                    try {
                                        let vars: any = {};
                                        try {
                                            vars = variablesJson ? JSON.parse(variablesJson) : {};
                                        } catch {
                                            throw new Error("Variables must be valid JSON");
                                        }

                                        const res = await fetch("/api/admin/ai-studio/generate", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                promptKey: selectedPromptKey,
                                                variables: vars,
                                                type: "other",
                                            }),
                                        });

                                        const json = await res.json();
                                        if (!res.ok || !json?.success) {
                                            throw new Error(json?.detail || json?.error || "Generation failed");
                                        }

                                        setDraftId(json.draftId || "");
                                        setGeneratedContent(json.content || "");
                                    } catch (e: any) {
                                        setGenerationError(e?.message || "Generation failed");
                                    } finally {
                                        setIsGenerating(false);
                                    }
                                }}
                                className="h-11 px-6 rounded-xl bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {isGenerating ? "Generating..." : "Generate + Save Draft"}
                            </button>

                            {(draftId || generatedContent) && (
                                <div className="space-y-2">
                                    {draftId && (
                                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Saved Draft ID: {draftId}</div>
                                    )}
                                    <textarea
                                        value={generatedContent}
                                        readOnly
                                        className="w-full min-h-[220px] rounded-xl border border-border bg-secondary/10 p-3 font-mono text-xs"
                                    />
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-gray-100 bg-white shadow-sm overflow-hidden">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base font-black uppercase tracking-widest text-muted-foreground/60">Workflow Runner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {loading ? (
                        <div className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Loading...</div>
                    ) : !aiLibrary?.success ? (
                        <div className="text-xs font-bold text-rose-500 uppercase tracking-widest">
                            {aiLibrary?.error || "Failed to load"}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                                <div className="lg:col-span-4">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-2">Workflow</div>
                                    <select
                                        value={selectedWorkflowKey}
                                        onChange={(e) => {
                                            setSelectedWorkflowKey(e.target.value);
                                            setWorkflowError(null);
                                            setWorkflowRunId("");
                                            setWorkflowDraftIds([]);
                                        }}
                                        className="w-full h-11 rounded-xl border border-border bg-white px-3 text-sm font-bold"
                                    >
                                        {Object.entries((aiLibrary.prompts?.workflows || {}) as Record<string, any>).map(([key, wf]) => (
                                            <option key={key} value={key}>
                                                {wf?.name || key}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="lg:col-span-8">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-2">Variables (JSON)</div>
                                    <textarea
                                        value={workflowVariablesJson}
                                        onChange={(e) => setWorkflowVariablesJson(e.target.value)}
                                        className="w-full min-h-[110px] rounded-xl border border-border bg-white p-3 font-mono text-xs"
                                        placeholder='{"topic":"...","keywords":"...","tone":"..."}'
                                    />
                                </div>
                            </div>

                            {workflowError && (
                                <div className="text-xs font-bold text-rose-500 uppercase tracking-widest">{workflowError}</div>
                            )}

                            <button
                                disabled={isRunningWorkflow || !selectedWorkflowKey}
                                onClick={async () => {
                                    setIsRunningWorkflow(true);
                                    setWorkflowError(null);
                                    setWorkflowRunId("");
                                    setWorkflowDraftIds([]);
                                    try {
                                        let vars: any = {};
                                        try {
                                            vars = workflowVariablesJson ? JSON.parse(workflowVariablesJson) : {};
                                        } catch {
                                            throw new Error("Variables must be valid JSON");
                                        }

                                        const res = await fetch("/api/admin/ai-studio/run-workflow", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ workflowKey: selectedWorkflowKey, variables: vars }),
                                        });

                                        const json = await res.json();
                                        if (!res.ok || !json?.success) {
                                            throw new Error(json?.detail || json?.error || "Workflow failed");
                                        }

                                        setWorkflowRunId(json.workflowRunId || "");
                                        setWorkflowDraftIds(Array.isArray(json.draftIds) ? json.draftIds : []);
                                    } catch (e: any) {
                                        setWorkflowError(e?.message || "Workflow failed");
                                    } finally {
                                        setIsRunningWorkflow(false);
                                    }
                                }}
                                className="h-11 px-6 rounded-xl bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {isRunningWorkflow ? "Running..." : "Run Workflow"}
                            </button>

                            {(workflowRunId || workflowDraftIds.length > 0) && (
                                <div className="space-y-2">
                                    {workflowRunId && (
                                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Workflow Run ID: {workflowRunId}</div>
                                    )}
                                    {workflowDraftIds.length > 0 && (
                                        <div className="space-y-2">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Drafts</div>
                                            <div className="flex flex-col gap-2">
                                                {workflowDraftIds.map((id) => (
                                                    <a
                                                        key={id}
                                                        href={`/admin/drafts/${id}`}
                                                        className="text-xs font-bold text-electric hover:underline"
                                                    >
                                                        {id}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
