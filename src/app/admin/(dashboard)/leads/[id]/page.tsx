import { getLeadById } from "@/lib/actions/lead-actions";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import {
   Mail, Building2, Calendar, Globe, Clock,
   ChevronLeft, MessageSquare, Target, Zap,
   CheckCircle2, Clock3, AlertCircle, Plus, Terminal
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeadDetailsClient } from "@/components/admin/lead-details-client";

export default async function LeadDetailPage({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const { id } = await params;
   let lead: any = null;

   try {
      lead = await getLeadById(id);
   } catch (err) {
      console.error("Critical error fetching lead details:", err);
      // Let it fall through to notFound or show an error state
   }

   if (!lead) notFound();

   // Safely process arrays
   const events = Array.isArray(lead.events) ? lead.events : [];
   const tasks = Array.isArray(lead.tasks) ? lead.tasks : [];

   return (
      <div className="space-y-12 pb-20 relative">
         <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

         {/* Header Area */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 relative z-10">
            <div className="flex items-center gap-10">
               <Link href="/admin/leads">
                  <Button variant="ghost" size="sm" className="h-16 w-16 p-0 rounded-3xl bg-white border border-gray-100 shadow-sm group/back hover:bg-gray-50">
                     <ChevronLeft size={28} className="text-gray-900 group-hover/back:-translate-x-1 transition-transform" />
                  </Button>
               </Link>
               <div>
                  <h1 className="text-6xl font-[1000] tracking-[-0.05em] text-gray-900 uppercase">
                     {lead.fullName || "Anonymous Lead"}
                  </h1>
                  <div className="flex items-center gap-3 mt-4">
                     <div className="w-3 h-3 rounded-full bg-electric animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                     <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Inquiry ID: <span className="text-gray-900/80">{lead._id}</span></p>
                  </div>
               </div>
            </div>
            <div className="flex gap-4">
               <Button variant="outline" className="h-16 px-10 rounded-full border-gray-200 bg-white shadow-sm text-[11px] font-[900] uppercase tracking-widest hover:bg-gray-50 hover:scale-105 transition-all">
                  Manage Lead
               </Button>
               <Button className="h-16 px-10 rounded-full bg-[#111827] text-white shadow-2xl shadow-gray-900/20 text-[11px] font-[900] uppercase tracking-widest hover:scale-105 transition-all">
                  Update Details
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
            {/* Left Side: Intelligence Modules */}
            <div className="lg:col-span-8 space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="rounded-[3.5rem] border-gray-100 bg-white/40 backdrop-blur-3xl p-12 shadow-sm hover:shadow-2xl transition-all group border-b-4 border-b-transparent hover:border-b-electric">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Service Category</p>
                     <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-[2rem] bg-gray-50 text-gray-900 flex items-center justify-center border border-gray-100 group-hover:bg-electric group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                           <Target size={32} />
                        </div>
                        <div className="flex flex-col gap-1">
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Selected Focus</span>
                           <span className="text-sm font-[1000] text-gray-900 uppercase tracking-tighter leading-tight">{(lead.serviceCategory || "None").replace("-", " ")}</span>
                        </div>
                     </div>
                  </Card>
                  <Card className="rounded-[3.5rem] border-gray-100 bg-white/40 backdrop-blur-3xl p-12 shadow-sm hover:shadow-2xl transition-all group border-b-4 border-b-transparent hover:border-b-rose-500">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Lead Protocol</p>
                     <div className="flex items-center gap-6">
                        <div className={cn(
                           "w-20 h-20 rounded-[2rem] flex items-center justify-center border group-hover:scale-110 transition-all duration-500 shadow-sm",
                           lead.leadTier === "HOT" ? "bg-rose-500 text-white border-rose-500/20" :
                              lead.leadTier === "WARM" ? "bg-amber-500 text-white border-amber-500/20" :
                                 "bg-gray-900 text-white border-gray-900/20"
                        )}>
                           <Zap size={32} fill="currentColor" />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-sm font-[1000] text-gray-900 uppercase tracking-tighter">{lead.leadTier || "COLD"} Priority</span>
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Score: {lead.leadScore || 0}</span>
                        </div>
                     </div>
                  </Card>
                  <Card className="rounded-[3.5rem] border-gray-100 bg-white/40 backdrop-blur-3xl p-12 shadow-sm hover:shadow-2xl transition-all group border-b-4 border-b-transparent hover:border-b-electric">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Pipeline Logic</p>
                     <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-[2rem] bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-electric group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                           <Clock size={32} />
                        </div>
                        <span className="text-sm font-[1000] text-electric uppercase tracking-tighter">{lead.status || "NEW"}</span>
                     </div>
                  </Card>
               </div>

               <Card className="rounded-[4rem] border-gray-100 bg-white shadow-2xl shadow-gray-300/40 p-16 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-electric/5 blur-[120px] rounded-full -mr-40 -mt-40 transition-all duration-700 group-hover:scale-125" />

                  <div className="flex items-center gap-6 mb-16 pb-10 border-b border-gray-50 relative z-10">
                     <div className="w-14 h-14 rounded-[1.25rem] bg-gray-900 flex items-center justify-center text-white shadow-xl">
                        <Globe size={26} />
                     </div>
                     <div>
                        <h3 className="text-3xl font-[1000] tracking-[-0.03em] text-gray-900 uppercase">Project Architecture</h3>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1.5 opacity-60">Detailed Technical Specifications</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
                     <div className="space-y-12">
                        <div className="group/item">
                           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-5 group-hover/item:text-electric transition-colors">Service Interest</p>
                           <p className="text-2xl font-[1000] text-gray-900 uppercase tracking-tighter">{(lead.serviceInterest || "None").replace("-", " ")}</p>
                        </div>
                        <div className="group/item">
                           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-5 group-hover/item:text-electric transition-colors">Target Environment</p>
                           <div className="flex items-center gap-3">
                              <Terminal size={18} className="text-gray-400" />
                              <p className="text-base font-[900] text-gray-500 tracking-tight">{lead.projectType || "Unspecified"}</p>
                           </div>
                        </div>
                     </div>
                     <div className="space-y-12">
                        <div className="group/item">
                           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-5 group-hover/item:text-electric transition-colors">Budget Allocation</p>
                           <p className="text-2xl font-[1000] tabular-nums text-electric tracking-tighter">{lead.budgetRange || "Flexible"}</p>
                        </div>
                        <div className="group/item">
                           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-5 group-hover/item:text-electric transition-colors">Target Timeline</p>
                           <div className="flex items-center gap-3">
                              <Calendar size={18} className="text-gray-400" />
                              <p className="text-base font-[900] text-gray-500 tracking-tight">{lead.timeline || "TBD"}</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mt-20 pt-16 border-t border-gray-50 relative z-10">
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-10">Inquiry Transmission</p>
                     <div className="bg-gray-50/50 rounded-[3rem] p-12 italic leading-relaxed text-gray-600 text-2xl font-[900] relative border border-gray-100 group-hover:bg-white transition-all shadow-inner tracking-tight">
                        <MessageSquare size={64} className="absolute -top-8 -right-8 text-gray-100 rotate-12 opacity-50" />
                        "{lead.message || "No message provided."}"
                     </div>
                  </div>
               </Card>
            </div>

            {/* Right Side: Timeline & Protocols */}
            <div className="lg:col-span-4 space-y-10">
               <Card className="rounded-[4rem] border-gray-100 bg-white/40 backdrop-blur-3xl p-12 shadow-sm">
                  <div className="flex items-center justify-between mb-12">
                     <h3 className="text-xl font-[1000] tracking-tighter text-gray-900 uppercase">
                        Activity Log
                     </h3>
                     <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Syncing</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                     </div>
                  </div>
                  <div className="space-y-16 relative before:absolute before:inset-0 before:left-[27px] before:w-[2px] before:bg-gray-100">
                     {events.length > 0 ? (
                        events.slice().reverse().map((event: any, i: number) => (
                           <div key={i} className="relative pl-16 group/event">
                              <div className="absolute left-0 top-1 w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center z-10 shadow-sm group-hover/event:border-electric group-hover/event:scale-110 transition-all overflow-hidden duration-500">
                                 <div className="w-2.5 h-2.5 rounded-full bg-gray-900 group-hover/event:bg-electric transition-colors" />
                              </div>
                              <div>
                                 <div className="text-[10px] font-[900] uppercase tracking-widest text-gray-300 mb-3 italic">
                                    {event.at ? format(new Date(event.at), "MMM d · HH:mm") : "Unknown Date"}
                                 </div>
                                 <div className="text-base font-[1000] text-gray-900 group-hover/event:text-electric transition-colors tracking-tight uppercase">{event.type || "Event"}</div>
                              </div>
                           </div>
                        ))
                     ) : (
                        <div className="text-center py-10 opacity-30 font-black text-xs uppercase tracking-widest">No activity recorded</div>
                     )}
                  </div>
               </Card>

               <Card className="rounded-[4rem] border-gray-100 bg-white p-12 shadow-xl shadow-gray-200/50">
                  <div className="flex items-center justify-between mb-12">
                     <h3 className="text-xl font-[1000] tracking-tighter text-gray-900 uppercase">Protocols</h3>
                     <span className="bg-gray-900 text-white border border-gray-900 px-5 py-2 rounded-2xl text-[10px] font-black tracking-widest tabular-nums shadow-lg">
                        {tasks.filter((t: any) => !t.done).length} ACTIVE
                     </span>
                  </div>
                  <div className="space-y-6">
                     {tasks.length > 0 ? (
                        tasks.map((task: any, i: number) => (
                           <div key={i} className="flex items-center gap-5 p-6 rounded-[2.5rem] bg-gray-50/50 hover:bg-gray-50 transition-all cursor-pointer group/task border border-transparent hover:border-gray-100">
                              <div className={cn(
                                 "w-8 h-8 rounded-xl border flex items-center justify-center transition-all shadow-sm",
                                 task.done ? "bg-electric border-electric text-white" : "bg-white border-gray-200 group-hover/task:border-electric"
                              )}>
                                 {task.done && <CheckCircle2 size={18} strokeWidth={3} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className={cn("text-base font-black tracking-tight truncate", task.done ? "line-through opacity-30 text-gray-900" : "text-gray-900")}>{task.title || "Untitled Task"}</div>
                                 <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 italic">
                                    Protocol Deadline: {task.dueAt ? format(new Date(task.dueAt), "MMM d") : "No Date"}
                                 </div>
                              </div>
                           </div>
                        ))
                     ) : (
                        <div className="text-center py-10 opacity-30 font-black text-xs uppercase tracking-widest">No protocols assigned</div>
                     )}
                  </div>
                  <Button variant="outline" className="w-full mt-12 h-16 rounded-[2rem] border-dashed border-2 border-gray-200 hover:border-electric/50 hover:bg-electric/5 transition-all text-[11px] font-[1000] uppercase tracking-[0.2em] text-gray-400 hover:text-electric flex items-center justify-center gap-4">
                     <Plus size={20} />
                     New Protocol
                  </Button>
               </Card>
            </div>
         </div>

         {/* Client-side CRM Features */}
         <LeadDetailsClient 
            leadId={id}
            initialNotes={lead.notes || []}
            initialTasks={tasks}
            initialStatus={lead.status || "NEW"}
         />
      </div>
   );
}
