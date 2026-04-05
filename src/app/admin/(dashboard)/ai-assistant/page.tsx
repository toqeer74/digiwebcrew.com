"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";
import { ACard, ACardBody } from "@/components/admin/acard";
import { Sparkles, Play, Loader2, AlertCircle, CheckCircle, Send, ExternalLink } from "lucide-react";

type AILibraryResponse = { success:boolean; prompts?:any; workflows?:any; error?:string; };

function extractVariables(text: string) {
  const found = new Set<string>();
  const regex = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;
  let m: RegExpExecArray|null;
  while ((m = regex.exec(text))) found.add(m[1]);
  return Array.from(found);
}

const AI_QUICK_TEMPLATES = [
  { label:"📧 Follow-up Email",    prompt:"Write a professional follow-up email for a web development lead" },
  { label:"📄 Project Proposal",   prompt:"Write a project proposal for e-commerce website development" },
  { label:"📋 Discovery Agenda",   prompt:"Write a discovery call agenda for a new lead" },
  { label:"💼 Cold Outreach",      prompt:"Write a professional cold outreach message for a potential client" },
  { label:"🏆 Closing Email",      prompt:"Write a closing email to win a web design project" },
];

const MOCK_RESPONSES = [
  "Here's a professional follow-up email:\n\n---\nSubject: Following Up on Your Project Inquiry\n\nDear [Name],\n\nI hope this message finds you well. I wanted to follow up on our conversation and share some additional thoughts on how we can help with your project...\n\nBest regards,\nDigi Web Crew Team",
  "Here's your project proposal outline:\n\n📋 PROJECT OVERVIEW\nWe propose a comprehensive solution tailored to your needs...\n\n💼 SCOPE OF WORK\n• Phase 1: Discovery & Strategy\n• Phase 2: Design & Prototyping\n• Phase 3: Development\n• Phase 4: Testing & Launch\n\n💰 INVESTMENT\nStarting from $5,000 depending on scope.",
  "Here's your discovery call agenda:\n\n🗓️ AGENDA (45 mins)\n\n1. Introductions (5 min)\n2. Current challenges (10 min)\n3. Goals & success metrics (10 min)\n4. Budget & timeline (10 min)\n5. Next steps (10 min)",
];

export default function AIAssistantPage() {
  const [library, setLibrary] = useState<AILibraryResponse|null>(null);
  const [loading, setLoading] = useState(true);
  const [openAiConfigured, setOpenAiConfigured] = useState(true);
  const [selectedPromptKey, setSelectedPromptKey] = useState("");
  const [promptVariables, setPromptVariables] = useState<Record<string,string>>({});
  const [generatedContent, setGeneratedContent] = useState("");
  const [draftId, setDraftId] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");
  const [selectedWorkflowKey, setSelectedWorkflowKey] = useState("");
  const [workflowVariables, setWorkflowVariables] = useState<Record<string,string>>({});
  const [workflowRunId, setWorkflowRunId] = useState("");
  const [workflowDraftIds, setWorkflowDraftIds] = useState<string[]>([]);
  const [isRunningWorkflow, setIsRunningWorkflow] = useState(false);
  const [workflowError, setWorkflowError] = useState("");

  // Chat state
  const [chatMessages, setChatMessages] = useState<{role:"bot"|"user";text:string}[]>([
    { role:"bot", text:"Hi! I'm your AI writing assistant. I can help you craft proposals, follow-up emails, client briefs, and more. What would you like to create today?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [tone, setTone] = useState("Professional");
  const [language, setLanguage] = useState("English");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mockIdx = useRef(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [lr, sr] = await Promise.all([fetch("/api/admin/ai-library",{cache:"no-store"}), fetch("/api/admin/settings/status",{cache:"no-store"})]);
        const lj = await lr.json() as AILibraryResponse;
        const sj = await sr.json();
        if (!mounted) return;
        setLibrary(lj); setOpenAiConfigured(!!sj?.openai);
        const pm = (lj.prompts?.prompts||lj.prompts||{}) as Record<string,any>;
        const wm = (lj.workflows?.workflows||lj.workflows||{}) as Record<string,any>;
        const fp = Object.keys(pm)[0]||""; const fw = Object.keys(wm)[0]||"";
        if (fp) setSelectedPromptKey(fp); if (fw) setSelectedWorkflowKey(fw);
      } catch { if (mounted) { setLibrary({success:false,error:"Failed to load"}); setOpenAiConfigured(false); } }
      finally { if (mounted) setLoading(false); }
    })();
    return () => { mounted=false; };
  }, []);

  const promptMap = useMemo(()=>((library?.prompts?.prompts||library?.prompts||{}) as Record<string,any>),[library]);
  const workflowMap = useMemo(()=>((library?.workflows?.workflows||library?.workflows||{}) as Record<string,any>),[library]);
  const selectedPrompt = promptMap[selectedPromptKey];
  const selectedWorkflow = workflowMap[selectedWorkflowKey];
  const promptVars = useMemo(()=>extractVariables(`${selectedPrompt?.system_prompt_template||""}\n${selectedPrompt?.user_prompt_template||""}`),[selectedPrompt]);
  const workflowVars = useMemo(()=>extractVariables(JSON.stringify(Array.isArray(selectedWorkflow?.steps)?selectedWorkflow.steps:[])),[selectedWorkflow]);
  const workflowSteps = Array.isArray(selectedWorkflow?.steps) ? selectedWorkflow.steps : [];

  useEffect(()=>{ setPromptVariables(promptVars.reduce((a,k)=>({...a,[k]:""}),{})); },[selectedPromptKey,promptVars.join("|")]);
  useEffect(()=>{ setWorkflowVariables(workflowVars.reduce((a,k)=>({...a,[k]:""}),{})); },[selectedWorkflowKey,workflowVars.join("|")]);
  useEffect(()=>{ messagesEndRef.current?.scrollIntoView({behavior:"smooth"}); },[chatMessages]);

  const sendChat = async (text?: string) => {
    const msg = (text || chatInput).trim();
    if (!msg) return;
    setChatInput("");
    setChatMessages(prev => [...prev, { role:"user", text:msg }]);
    setChatLoading(true);
    try {
      const res = await fetch("/api/admin/ai-studio/generate", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ promptKey: selectedPromptKey||"general", variables:{ input:msg }, type:"other" }),
      });
      const json = await res.json();
      const reply = json?.content || MOCK_RESPONSES[mockIdx.current % MOCK_RESPONSES.length];
      mockIdx.current++;
      setChatMessages(prev => [...prev, { role:"bot", text:reply }]);
    } catch {
      const reply = MOCK_RESPONSES[mockIdx.current % MOCK_RESPONSES.length];
      mockIdx.current++;
      setChatMessages(prev => [...prev, { role:"bot", text:reply }]);
    }
    setChatLoading(false);
  };

  const runGenerate = async () => {
    setGenerationError(""); setDraftId(""); setGeneratedContent(""); setIsGenerating(true);
    try {
      const res = await fetch("/api/admin/ai-studio/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({promptKey:selectedPromptKey,variables:promptVariables,type:"other"})});
      const json = await res.json();
      if (!res.ok||!json?.success) throw new Error(json?.detail||json?.error||"Failed");
      setDraftId(json.draftId||""); setGeneratedContent(json.content||"");
    } catch(e:any) { setGenerationError(e?.message||"Generation failed"); }
    finally { setIsGenerating(false); }
  };

  const runWorkflow = async () => {
    setWorkflowError(""); setWorkflowRunId(""); setWorkflowDraftIds([]); setIsRunningWorkflow(true);
    try {
      const res = await fetch("/api/admin/ai-studio/run-workflow",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workflowKey:selectedWorkflowKey,variables:workflowVariables})});
      const json = await res.json();
      if (!res.ok||!json?.success) throw new Error(json?.detail||json?.error||"Failed");
      setWorkflowRunId(json.workflowRunId||""); setWorkflowDraftIds(Array.isArray(json.draftIds)?json.draftIds:[]);
    } catch(e:any) { setWorkflowError(e?.message||"Failed"); }
    finally { setIsRunningWorkflow(false); }
  };

  return (
    <div className="admin-page-stack w-full pb-8">
      <PageHeader
        title="AI Assistant"
        subtitle="Generate proposals, emails, and content with AI."
        breadcrumb={[{label:"Dashboard",href:"/admin/dashboard"},{label:"AI Assistant"}]}
      />

      {!openAiConfigured && (
        <div className="rounded-xl p-4 flex items-center gap-3" style={{background:"var(--adm-danger-dim)",border:"1.5px solid #fca5a5",color:"#991b1b"}}>
          <AlertCircle size={16}/><p style={{fontSize:13.5}}><strong>OPENAI_API_KEY</strong> is not configured. Add it to your environment to enable AI generation.</p>
        </div>
      )}

      {/* Chat interface + templates */}
      <div className="adm-col-2">
        <ACard>
          <div className="adm-card-header">
            <span className="adm-card-title">Chat with AI</span>
            <span className="adm-badge adm-badge-purple">Powered by Claude</span>
          </div>
          <ACardBody style={{padding:16}}>
            <div className="adm-ai-chat-wrap">
              {chatMessages.map((m, i) => (
                <div key={i} className={`adm-ai-msg${m.role==="bot"?" bot":" user"}`}>
                  <div className={`adm-ai-avatar${m.role==="bot"?" bot":" user-av"}`}>{m.role==="bot"?"AI":"You"}</div>
                  <div className="adm-ai-bubble">{m.text}</div>
                </div>
              ))}
              {chatLoading && (
                <div className="adm-ai-msg bot">
                  <div className="adm-ai-avatar bot">AI</div>
                  <div className="adm-ai-bubble" style={{color:"var(--adm-text-muted)"}}>Thinking…</div>
                </div>
              )}
              <div ref={messagesEndRef}/>
            </div>
            <div style={{display:"flex",gap:10,marginTop:12}}>
              <input
                type="text" value={chatInput} onChange={e=>setChatInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&sendChat()}
                placeholder="Ask me to write something…"
                className="adm-input" style={{flex:1}}
              />
              <button onClick={()=>sendChat()} disabled={chatLoading||!chatInput.trim()} className="adm-btn adm-btn-primary inline-flex items-center gap-2">
                <Send size={14}/> Send
              </button>
            </div>
          </ACardBody>
        </ACard>

        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          <ACard>
            <div className="adm-card-header"><span className="adm-card-title">Quick Templates</span></div>
            <ACardBody style={{display:"flex",flexDirection:"column",gap:8}}>
              {AI_QUICK_TEMPLATES.map(t=>(
                <button key={t.label} onClick={()=>sendChat(t.prompt)} className="adm-btn adm-btn-secondary adm-btn-full" style={{justifyContent:"flex-start",textAlign:"left"}}>
                  {t.label}
                </button>
              ))}
            </ACardBody>
          </ACard>
          <ACard>
            <div className="adm-card-header"><span className="adm-card-title">AI Settings</span></div>
            <ACardBody style={{display:"flex",flexDirection:"column",gap:12}}>
              <div className="adm-form-group">
                <label className="adm-label">Tone</label>
                <select value={tone} onChange={e=>setTone(e.target.value)} className="adm-input">
                  {["Professional","Friendly","Formal","Casual"].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Language</label>
                <select value={language} onChange={e=>setLanguage(e.target.value)} className="adm-input">
                  {["English","Urdu","Arabic","Spanish"].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            </ACardBody>
          </ACard>
        </div>
      </div>

      {/* Generate Draft + Run Workflow */}
      <div className="adm-col-2">
        <ACard>
          <div className="adm-card-header">
            <span className="adm-card-title inline-flex items-center gap-2"><Sparkles size={15}/>Generate Draft</span>
          </div>
          <ACardBody className="space-y-4">
            {loading && <p style={{fontSize:13,color:"var(--adm-text-muted)"}}>Loading prompts…</p>}
            {!loading && !library?.success && <p style={{fontSize:13,color:"var(--adm-danger)"}}>{library?.error}</p>}
            {!loading && library?.success && (
              <>
                <div className="adm-form-group">
                  <label className="adm-label">Select Prompt</label>
                  <select value={selectedPromptKey} onChange={e=>setSelectedPromptKey(e.target.value)} className="adm-input">
                    {Object.entries(promptMap).map(([k,p])=><option key={k} value={k}>{(p as any)?.name||k}</option>)}
                  </select>
                </div>
                {promptVars.length>0 && (
                  <div>
                    <label className="adm-label" style={{display:"block",marginBottom:8}}>Variables</label>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
                      {promptVars.map(v=><span key={v} className="adm-badge adm-badge-accent">{v}</span>)}
                    </div>
                    <div className="adm-form-grid">
                      {promptVars.map(k=>(
                        <div key={k} className="adm-form-group">
                          <label className="adm-label">{k}</label>
                          <input value={promptVariables[k]||""} onChange={e=>setPromptVariables(p=>({...p,[k]:e.target.value}))} placeholder={k} className="adm-input"/>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {generationError && <div className="rounded-xl p-3" style={{background:"var(--adm-danger-dim)",color:"#991b1b",border:"1.5px solid #fca5a5",fontSize:13}}>{generationError}</div>}
                <button onClick={runGenerate} disabled={!selectedPromptKey||isGenerating||!openAiConfigured} className="adm-btn adm-btn-primary adm-btn-full inline-flex items-center justify-center gap-2">
                  {isGenerating?<Loader2 size={15} className="animate-spin"/>:<Play size={14}/>}
                  {isGenerating?"Generating…":"Generate + Save Draft"}
                </button>
                {draftId && <div className="rounded-xl p-3 flex items-center gap-2" style={{background:"var(--adm-success-dim)",border:"1.5px solid #6ee7b7",color:"#065f46",fontSize:13}}>
                  <CheckCircle size={14}/> Draft saved. <Link href={`/admin/drafts/${draftId}`} className="font-semibold underline inline-flex items-center gap-1">Open<ExternalLink size={11}/></Link>
                </div>}
                {generatedContent && <pre className="adm-console max-h-64 text-xs">{generatedContent}</pre>}
              </>
            )}
          </ACardBody>
        </ACard>

        <ACard>
          <div className="adm-card-header">
            <span className="adm-card-title inline-flex items-center gap-2"><Play size={15}/>Run Workflow</span>
          </div>
          <ACardBody className="space-y-4">
            {loading && <p style={{fontSize:13,color:"var(--adm-text-muted)"}}>Loading workflows…</p>}
            {!loading && library?.success && (
              <>
                <div className="adm-form-group">
                  <label className="adm-label">Select Workflow</label>
                  <select value={selectedWorkflowKey} onChange={e=>setSelectedWorkflowKey(e.target.value)} className="adm-input">
                    {Object.entries(workflowMap).map(([k,w])=><option key={k} value={k}>{(w as any)?.name||k}</option>)}
                  </select>
                </div>
                {workflowVars.length>0 && (
                  <div className="adm-form-grid">
                    {workflowVars.map(k=>(
                      <div key={k} className="adm-form-group">
                        <label className="adm-label">{k}</label>
                        <input value={workflowVariables[k]||""} onChange={e=>setWorkflowVariables(p=>({...p,[k]:e.target.value}))} placeholder={k} className="adm-input"/>
                      </div>
                    ))}
                  </div>
                )}
                {workflowError && <div className="rounded-xl p-3" style={{background:"var(--adm-danger-dim)",color:"#991b1b",border:"1.5px solid #fca5a5",fontSize:13}}>{workflowError}</div>}
                <button onClick={runWorkflow} disabled={!selectedWorkflowKey||isRunningWorkflow||!openAiConfigured} className="adm-btn adm-btn-primary adm-btn-full inline-flex items-center justify-center gap-2" style={{background:"var(--adm-purple)"}}>
                  {isRunningWorkflow?<Loader2 size={15} className="animate-spin"/>:<Play size={14}/>}
                  {isRunningWorkflow?"Running…":"Run Workflow"}
                </button>
                {workflowRunId && <>
                  <div className="rounded-xl p-3 flex items-center gap-2" style={{background:"var(--adm-success-dim)",border:"1.5px solid #6ee7b7",color:"#065f46",fontSize:13}}>
                    <CheckCircle size={14}/> Run created. <Link href={`/admin/workflow-runs/${workflowRunId}`} className="font-semibold underline">View run</Link>
                  </div>
                  {workflowSteps.length>0 && (
                    <div className="rounded-xl p-4" style={{background:"var(--adm-bg)",border:"1.5px solid var(--adm-border)"}}>
                      <p className="adm-label" style={{display:"block",marginBottom:10}}>Progress</p>
                      {workflowSteps.map((step:any,i:number)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid var(--adm-border)"}}>
                          <span style={{fontSize:13,color:"var(--adm-text-dim)"}}>Step {i+1}: {step?.prompt||step?.action||"step"}</span>
                          <span className={`adm-badge ${i<workflowDraftIds.length?"adm-badge-success":"adm-badge-muted"}`}>{i<workflowDraftIds.length?"Done":"Pending"}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>}
              </>
            )}
          </ACardBody>
        </ACard>
      </div>
    </div>
  );
}
