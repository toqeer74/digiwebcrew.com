import { getDashboardStats, getLeadTrends, getCategoryDistribution } from "@/lib/actions/analytics-actions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AnalyticsChart } from "@/components/admin/analytics-chart";
import { Users, Target, Zap, TrendingUp, ArrowUpRight, ArrowDownRight, Download, ArrowRight, CheckSquare, Rocket, Clock, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";

export default async function AnalyticsPage() {
    // Fetch real data
    const [statsData, trends, distribution] = await Promise.all([
        getDashboardStats(),
        getLeadTrends(),
        getCategoryDistribution(),
    ]);

    const stats = [
        { label: "Total Intake", value: statsData.totalLeads.toString(), change: "+12.5%", trending: "up", icon: FolderKanban },
        { label: "Hot Leads", value: statsData.hotLeads.toString(), change: "+5.2%", trending: "up", icon: Rocket },
        { label: "Avg Quality", value: `${statsData.avgHotScore}%`, change: "-18%", trending: "down", icon: Clock },
        { label: "New Leads", value: statsData.newLeads.toString(), change: "+2.1%", trending: "up", icon: TrendingUp },
    ];

    return (
        <div className="space-y-6 pb-10 w-full">
            <PageHeader
                label="Operations Suite"
                title="Analytics"
                highlight="Active"
                description="Neural engine sync complete. Projected growth: "
                descriptionHighlight="+14%"
                icon={<Users />}
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <Card key={i} className="group overflow-hidden relative border-border bg-white dark:bg-midnight-900 shadow-sm hover:shadow-md transition-all rounded-2xl">
                        <CardHeader className="flex flex-row items-center justify-between p-4 pb-1">
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">{stat.label}</span>
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-midnight-800 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                <stat.icon size={14} />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-1">
                            <div className="text-xl font-black tracking-tight text-foreground tabular-nums">
                                {stat.value}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={cn(
                                    "flex items-center text-[8px] font-black px-1.5 py-0.5 rounded-lg border",
                                    stat.trending === "up" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                                )}>
                                    {stat.trending === "up" ? <ArrowUpRight size={8} className="mr-0.5" /> : <ArrowDownRight size={8} className="mr-0.5" />}
                                    {stat.change}
                                </span>
                                <span className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-widest text-[6px]">vs prev</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Chart Section */}
            <AnalyticsChart />

            {/* Widgets Grid */}
            <div className="grid grid-cols-1 gap-8 items-start">
                {/* Category Distribution */}
                <div className="space-y-4">
                    <Card className="rounded-2xl border-border bg-white dark:bg-midnight-900 shadow-sm overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between p-5 pb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-midnight-800 text-indigo-600 flex items-center justify-center shadow-inner">
                                    <Target size={16} />
                                </div>
                                <div>
                                    <CardTitle className="text-base font-black">Service Category Distribution</CardTitle>
                                    <p className="text-[7px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mt-0.5">Lead intake by service type</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-5 pt-2">
                            <div className="space-y-3">
                                {distribution.map((item: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between p-3 px-4 rounded-xl bg-secondary/20 hover:bg-secondary/40 transition-colors group cursor-pointer border border-transparent hover:border-border">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/20" />
                                            <span className="font-bold text-[11px] text-gray-700 dark:text-gray-200">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="px-2.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest bg-indigo-500 text-white">{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-border bg-white dark:bg-midnight-900 shadow-sm overflow-hidden">
                        <CardHeader className="p-5 pb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-midnight-800 text-orange-600 flex items-center justify-center shadow-inner">
                                    <TrendingUp size={16} />
                                </div>
                                <CardTitle className="text-base font-black text-gray-900 dark:text-white">Engineering Metrics</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-5 pt-2 pb-5">
                            <div className="space-y-6">
                                {[
                                    { label: "Sprint Velocity Target", percentage: 94, color: "bg-indigo-600 shadow-lg shadow-indigo-600/20" },
                                    { label: "Code Coverage (Unit Tests)", percentage: 88, color: "bg-emerald-500 shadow-lg shadow-emerald-500/20" },
                                    { label: "Client Deliverables", percentage: 63, color: "bg-orange-500 shadow-lg shadow-orange-500/20" }
                                ].map((goal, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="font-bold text-[11px] tracking-tight">{goal.label}</span>
                                            <span className="font-black text-[11px] tabular-nums">{goal.percentage}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden">
                                            <div className={cn("h-full rounded-full transition-all duration-1000", goal.color)} style={{ width: `${goal.percentage}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="rounded-2xl border-border bg-white dark:bg-midnight-900 shadow-sm p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-midnight-800 text-indigo-600 flex items-center justify-center">
                                    <Target size={16} />
                                </div>
                                <h3 className="text-base font-black">Active Projects</h3>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {[
                                { name: "E-commerce Platform", tasks: 12, team: 4, color: "bg-indigo-600/10 text-indigo-600" },
                                { name: "SaaS Dashboard", tasks: 8, team: 3, color: "bg-blue-500/10 text-blue-500" },
                                { name: "Mobile App API", tasks: 15, team: 5, color: "bg-emerald-500/10 text-emerald-500" }
                            ].map((project, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/30 transition-all group cursor-pointer border border-transparent hover:border-border">
                                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center font-black text-xs", project.color)}>P</div>
                                    <div>
                                        <h4 className="font-bold text-[11px] text-gray-700 dark:text-gray-200">{project.name}</h4>
                                        <p className="text-[7px] font-black text-muted-foreground/40 uppercase tracking-widest mt-0.5">
                                            {project.tasks} tasks • {project.team} mates
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full h-10 rounded-xl border-2 border-dashed border-border flex items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-all mt-2 text-[7px] font-black uppercase tracking-widest">
                                + New Instance
                            </button>
                        </div>
                    </Card>

                    <Card className="rounded-2xl border-border bg-white dark:bg-midnight-900 shadow-sm p-5 overflow-hidden relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-midnight-800 text-rose-600 flex items-center justify-center">
                                    <Users size={16} />
                                </div>
                                <h3 className="text-base font-black">System Reminders</h3>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[8px] font-black text-foreground uppercase tracking-widest">Today</span>
                                <span className="text-[8px] font-black text-muted-foreground/30">• 2</span>
                            </div>

                            {[
                                "Assess risks identified in morning terminal sync.",
                                "Finalize stand-up metrics for Q1 Roadmap."
                            ].map((reminder, i) => (
                                <div key={i} className="flex gap-3 group">
                                    <div className="w-4 h-4 rounded-md border-2 border-border mt-0.5 group-hover:border-primary transition-colors shrink-0 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-sm group-hover:bg-primary transition-colors" />
                                    </div>
                                    <p className="text-[11px] font-medium leading-relaxed text-gray-600 dark:text-gray-400">{reminder}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

            {/* Forecast Footer */}
            <div className="p-8 px-10 rounded-[2.5rem] bg-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group border border-white/5">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-electric/20 transition-all duration-500 group-hover:border-electric/50">
                        <Zap size={24} className="text-electric animate-pulse" fill="currentColor" />
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-xl font-black tracking-tight uppercase tracking-widest text-indigo-200">System Forecast Overview</p>
                        <p className="text-[9px] font-black text-white/40 mt-1 uppercase tracking-[0.3em]">Expected velocity pulse: <span className="text-emerald-400">+14% projected</span></p>
                    </div>
                </div>
                <Button className="h-12 px-10 rounded-xl bg-white text-indigo-950 font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all relative z-10 shadow-2xl text-[10px]">
                    Access Terminal
                </Button>

                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/30 transition-all duration-1000" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-electric/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 group-hover:bg-electric/20 transition-all duration-1000" />
            </div>
        </div>
    );
}
