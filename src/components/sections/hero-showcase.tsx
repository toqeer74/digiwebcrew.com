"use client";

/* eslint-disable @next/next/no-img-element --
 * These templates are static, non-interactive UI mockups rendered at ~8-24px
 * inside a 3D-transformed card. next/image's optimization pipeline adds no
 * value at that scale and complicates the absolute/fill layouts, so plain
 * <img> against pre-sized local assets is intentional here. */

import { motion } from "framer-motion";
import {
  Menu, Search, Bell, User, Users, ChevronRight,
  BarChart2, PieChart, Activity, Globe,
  Zap, ArrowRight, Play, Layout,
  Phone, Mail, MapPin, BedDouble, Bath, Maximize, Star
} from "lucide-react";

function TemplateFintech() {
  return (
    <div className="flex h-full flex-col bg-[#f8fafc] overflow-hidden pointer-events-none font-sans text-slate-800 shadow-inner shadow-white/5">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-16 bg-white border-r border-slate-200 flex flex-col relative z-20 shadow-[4px_0_15px_rgba(0,0,0,0.02)]">
          <div className="p-2.5 border-b border-slate-100 flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-inner shadow-white/20">
              <span className="text-[5px] font-black text-white">F</span>
            </div>
            <div className="text-[4px] font-black tracking-widest text-slate-800">PAYFLOW</div>
          </div>
          <div className="flex-1 py-3 px-2 space-y-1.5">
            {[Layout, Activity, PieChart, Users, Menu].map((Icon, i) => (
              <div key={i} className={`flex items-center gap-2 p-1.5 rounded-[3px] transition-colors ${i === 0 ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-600 border border-indigo-100/50' : 'text-slate-400 hover:bg-slate-50'}`}>
                <Icon size={7} className={i === 0 ? 'drop-shadow-sm' : ''} />
                <div className={`h-1 w-6 rounded-full opacity-60 ${i === 0 ? 'bg-indigo-600' : 'bg-slate-300'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative bg-slate-50">
          {/* Header */}
          <div className="h-9 border-b border-slate-200 flex items-center justify-between px-3 bg-white/80 backdrop-blur-md z-10">
            <div className="text-[6px] font-black text-slate-800">Dashboard</div>
            <div className="flex items-center gap-2">
               <Bell size={7} className="text-slate-400" />
               <div className="w-4 h-4 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                  <User size={6} className="text-indigo-500" />
               </div>
            </div>
          </div>

          {/* Dashboard Area */}
          <div className="flex-1 p-2.5 flex flex-col z-10 gap-2">
            
            {/* Main Balance Card */}
            <div className="h-20 bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 rounded-lg p-3 relative overflow-hidden shadow-lg shadow-indigo-500/20 text-white flex flex-col justify-between group">
               <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-white/10 rounded-full blur-xl transition-transform group-hover:scale-150" />
               <div className="relative z-10">
                  <div className="text-[4px] text-indigo-100 font-medium mb-0.5">Total Balance</div>
                  <div className="text-[12px] font-black tracking-tight">$124,562.00</div>
               </div>
               <div className="relative z-10 flex gap-1.5">
                  <div className="px-2 py-0.5 bg-white text-indigo-600 rounded-[2px] text-[3px] font-black shadow-sm">Transfer</div>
                  <div className="px-2 py-0.5 bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-[2px] text-[3px] font-bold">Request</div>
               </div>
               {/* Abstract chart line */}
               <svg className="absolute bottom-0 right-0 w-32 h-10 opacity-30 pointer-events-none" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,30 L0,15 Q10,5 20,15 T40,15 T60,10 T80,20 T100,5 L100,30 Z" fill="white" />
               </svg>
            </div>

            {/* Grid Stats */}
            <div className="flex gap-2">
               {[
                 { title: "Income", val: "+$12,450", color: "text-emerald-500", icon: ArrowRight },
                 { title: "Expenses", val: "-$4,230", color: "text-rose-500", icon: ArrowRight }
               ].map((s, i) => (
                  <div key={i} className="flex-1 bg-white rounded-md p-2 shadow-sm border border-slate-100 flex items-center justify-between">
                     <div>
                        <div className="text-[4px] text-slate-400 font-medium mb-0.5">{s.title}</div>
                        <div className={`text-[7px] font-black ${s.color}`}>{s.val}</div>
                     </div>
                     <div className={`w-4 h-4 rounded-full flex items-center justify-center ${s.color === 'text-emerald-500' ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                        <s.icon size={5} className={s.color} />
                     </div>
                  </div>
               ))}
            </div>

            {/* Recent Transactions */}
            <div className="flex-1 bg-white rounded-md p-2 shadow-sm border border-slate-100 flex flex-col">
               <div className="flex justify-between items-center mb-2">
                  <div className="text-[5px] font-bold text-slate-700">Recent Activity</div>
                  <div className="text-[3px] font-bold text-indigo-500">View All</div>
               </div>
               <div className="space-y-1.5 flex-1 overflow-hidden">
                  {[
                     { name: "Apple Store", cat: "Electronics", amt: "-$999.00", iconBg: "bg-slate-100" },
                     { name: "Upwork Escrow", cat: "Income", amt: "+$2,450.00", iconBg: "bg-emerald-50" },
                     { name: "Starbucks", cat: "Food & Drink", amt: "-$12.50", iconBg: "bg-rose-50" }
                  ].map((tr, i) => (
                     <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                           <div className={`w-5 h-5 rounded-md flex items-center justify-center ${tr.iconBg}`}>
                              <div className="w-2.5 h-2.5 bg-slate-300 rounded-sm" />
                           </div>
                           <div>
                              <div className="text-[4.5px] font-bold text-slate-800 leading-tight">{tr.name}</div>
                              <div className="text-[3px] text-slate-400">{tr.cat}</div>
                           </div>
                        </div>
                        <div className={`text-[4.5px] font-bold ${tr.amt.startsWith('+') ? 'text-emerald-500' : 'text-slate-700'}`}>{tr.amt}</div>
                     </div>
                  ))}
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateTech() {
  return (
    <div className="flex h-full flex-col bg-[#0b0c10] overflow-hidden pointer-events-none text-white shadow-inner shadow-white/5">
      {/* App Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-16 bg-[#12131a] border-r border-white/5 flex flex-col relative z-20 shadow-[4px_0_15px_rgba(0,0,0,0.3)]">
          <div className="p-2.5 border-b border-white/5 flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center shadow-inner shadow-white/20">
              <Activity size={8} className="text-white drop-shadow-sm" />
            </div>
            <div className="text-[5px] font-black tracking-widest text-indigo-100">TECHLOOM</div>
          </div>
          <div className="flex-1 py-3 px-2 space-y-1.5">
            {[Layout, BarChart2, PieChart, Users, Menu].map((Icon, i) => (
              <div key={i} className={`flex items-center gap-2 p-1.5 rounded-[3px] transition-colors ${i === 0 ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
                <Icon size={7} className={i === 0 ? 'drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' : ''} />
                <div className="h-1 w-6 bg-current rounded-full opacity-60" />
              </div>
            ))}
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col relative">
          <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-indigo-600/10 rounded-full blur-[40px] pointer-events-none" />
          
          {/* Topbar */}
          <div className="h-9 border-b border-white/5 flex items-center justify-between px-3 bg-[#0b0c10]/80 backdrop-blur-md z-10">
            <div className="flex items-center gap-1.5 bg-[#12131a] px-2 py-1 rounded-[3px] border border-white/5 w-28 shadow-inner shadow-black/20">
              <Search size={6} className="text-slate-400" />
              <div className="h-0.5 w-16 bg-slate-600 rounded-full" />
            </div>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Bell size={8} className="text-slate-400" />
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-[#0b0c10]" />
              </div>
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-[#12131a] rounded-full flex items-center justify-center">
                  <User size={8} className="text-indigo-400" />
                </div>
              </div>
            </div>
          </div>
          {/* Dashboard Area */}
          <div className="flex-1 p-3.5 flex flex-col z-10">
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="text-[9px] font-black text-white tracking-tight mb-0.5 drop-shadow-sm">System Overview</div>
                <div className="text-[5px] text-slate-400 font-medium">Real-time infrastructure metrics</div>
              </div>
              <div className="px-2.5 py-1 bg-white text-slate-900 rounded-[3px] text-[4px] font-bold shadow-[0_2px_10px_rgba(255,255,255,0.1)]">Export CSV</div>
            </div>
            
            {/* Stats row */}
            <div className="flex gap-2.5 mb-3">
              {[
                { label: "Active Nodes", val: "1,204", color: "text-white", badge: "+12%", badgeBg: "bg-emerald-500/20 text-emerald-400" },
                { label: "Network Load", val: "84.2 TB", color: "text-indigo-300", badge: "High", badgeBg: "bg-rose-500/20 text-rose-400" }
              ].map((stat, i) => (
                <div key={i} className="flex-1 bg-gradient-to-b from-[#161720] to-[#101118] border border-white/5 rounded-lg p-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.3)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2">
                    <div className={`px-1.5 py-0.5 rounded text-[4px] font-bold ${stat.badgeBg}`}>{stat.badge}</div>
                  </div>
                  <div className="text-[5px] text-slate-400 mb-1.5 font-medium">{stat.label}</div>
                  <div className={`text-[11px] font-black ${stat.color} tracking-tight`}>{stat.val}</div>
                </div>
              ))}
            </div>

            {/* Chart Area */}
            <div className="flex-1 bg-[#12131a] border border-white/5 rounded-lg p-2.5 flex flex-col shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]">
              <div className="flex justify-between items-center mb-3">
                <div className="text-[6px] font-bold text-slate-300">Traffic Distribution</div>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_5px_rgba(99,102,241,0.8)]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                </div>
              </div>
              <div className="flex-1 flex items-end justify-between gap-1 px-1 relative pb-1">
                {/* Chart grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-1">
                  {[1,2,3,4].map(i => <div key={i} className="w-full h-px bg-white/5" />)}
                </div>
                {/* Bars */}
                {[30, 45, 25, 70, 50, 95, 65, 85, 45, 100].map((h, i) => (
                  <div key={i} className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-sm relative group shadow-[0_0_10px_rgba(99,102,241,0.2)] z-10" style={{ height: `${h}%` }}>
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/40 rounded-t-sm mix-blend-overlay" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateRealEstate() {
  const listings = [
    { name: "Skyline Penthouse", price: "$2.8M", loc: "Manhattan, NY", beds: 3, img: "/images/mockups/estate-1.jpg" },
    { name: "Coastal Retreat", price: "$1.9M", loc: "Malibu, CA", beds: 4, img: "/images/mockups/estate-2.jpg" },
    { name: "Garden Loft", price: "$1.2M", loc: "Austin, TX", beds: 2, img: "/images/mockups/estate-3.jpg" },
  ];
  const stats = [
    { val: "1,240+", label: "Listings" },
    { val: "$2.1B", label: "Sold Volume" },
    { val: "18 yrs", label: "In Business" },
  ];
  return (
    <div className="flex h-full flex-col bg-[#0a0a0c] overflow-hidden pointer-events-none text-white border border-white/5 shadow-inner shadow-white/5">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-[#0a0a0c]/95 backdrop-blur-md z-20 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-[3px] bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-[0_0_10px_rgba(251,191,36,0.3)]">
            <MapPin size={8} className="text-[#0a0a0c]" />
          </div>
          <div className="text-[6px] font-black tracking-widest text-white">ESTATE&nbsp;CO.</div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-[3px] font-bold text-white/50 tracking-widest">LISTINGS</span>
          <span className="text-[3px] font-bold text-white/50 tracking-widest">AGENTS</span>
          <div className="px-2 py-1 bg-amber-400 text-[#0a0a0c] rounded-full text-[3.5px] font-black shadow-[0_2px_10px_rgba(251,191,36,0.25)]">Book Viewing</div>
        </div>
      </div>

      {/* Search / filter bar */}
      <div className="mx-3 mt-2 flex items-center gap-1.5 shrink-0">
        <div className="flex flex-1 items-center gap-1 rounded-[3px] border border-white/10 bg-white/5 px-1.5 py-1">
          <Search size={5} className="text-white/40" />
          <span className="text-[3px] text-white/40 font-medium">Beverly Hills, CA</span>
        </div>
        <div className="flex items-center gap-0.5 rounded-[3px] border border-white/10 bg-white/5 px-1.5 py-1">
          <span className="text-[3px] text-white/50 font-semibold">Any Type</span>
          <ChevronRight size={5} className="text-white/40 rotate-90" />
        </div>
        <div className="flex items-center justify-center rounded-[3px] bg-amber-400 px-1.5 py-1">
          <Search size={5} className="text-[#0a0a0c]" />
        </div>
      </div>

      {/* Trust stats */}
      <div className="mx-3 mt-2 grid grid-cols-3 gap-1.5 shrink-0">
        {stats.map((s) => (
          <div key={s.label} className="rounded-[3px] border border-white/5 bg-white/[0.03] px-1 py-1 text-center">
            <div className="text-[5px] font-black text-amber-400 leading-none">{s.val}</div>
            <div className="mt-0.5 text-[2.5px] font-bold uppercase tracking-wider text-white/40">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Hero listing */}
      <div className="relative h-24 mx-3 mt-2 rounded-lg overflow-hidden shadow-lg border border-white/10 shrink-0">
        <img src="/images/mockups/estate-hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-amber-400 text-[#0a0a0c] rounded-[2px] text-[3px] font-black flex items-center gap-0.5">
          <Zap size={5} /> FEATURED
        </div>
        <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-black/50 backdrop-blur-sm rounded-[2px] text-[3px] font-bold text-white flex items-center gap-0.5 border border-white/10">
          <Globe size={5} /> 3D Tour
        </div>
        <div className="absolute bottom-1.5 left-1.5 right-1.5">
          <div className="text-[7px] font-black text-white leading-tight drop-shadow-md">Modern Hillside Villa</div>
          <div className="flex items-center gap-0.5 text-[3px] text-white/70 mb-1">
            <MapPin size={4} /> Beverly Hills, CA
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[8px] font-black text-amber-400">$4.2M</div>
            <div className="flex items-center gap-1.5 text-white/80">
              <span className="flex items-center gap-0.5 text-[3px]"><BedDouble size={5} /> 5</span>
              <span className="flex items-center gap-0.5 text-[3px]"><Bath size={5} /> 4</span>
              <span className="flex items-center gap-0.5 text-[3px]"><Maximize size={5} /> 4,200 sqft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Listings grid */}
      <div className="flex-1 min-h-0 p-3 grid grid-cols-3 gap-1.5">
        {listings.map((p) => (
          <div key={p.name} className="flex flex-col rounded-lg border border-white/10 bg-white/5 overflow-hidden">
            <img src={p.img} alt="" className="h-8 w-full shrink-0 object-cover" />
            <div className="p-1 flex-1 flex flex-col">
              <div className="text-[3.5px] font-black text-white leading-tight">{p.name}</div>
              <div className="text-[2.5px] text-white/40 mb-0.5">{p.loc}</div>
              <div className="mt-auto flex items-center justify-between">
                <div className="text-[4px] font-black text-amber-400">{p.price}</div>
                <span className="flex items-center gap-0.5 text-[2.5px] text-white/50">
                  <BedDouble size={4} /> {p.beds}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Agent bar */}
      <div className="mx-3 mb-3 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-2 shrink-0">
        <img src="/images/mockups/agent.jpg" alt="" className="w-5 h-5 rounded-full object-cover ring-1 ring-amber-400/40" />
        <div className="flex-1">
          <div className="text-[4px] font-bold text-white">Olivia Bennett</div>
          <div className="text-[3px] text-white/40">Senior Property Advisor</div>
        </div>
        <div className="flex items-center gap-0.5 text-amber-400">
          <Star size={6} className="fill-amber-400" />
          <span className="text-[3.5px] font-bold">4.9</span>
        </div>
      </div>
    </div>
  );
}

function TemplateInsight() {
  return (
    <div className="flex h-full flex-col bg-slate-50 overflow-hidden pointer-events-none font-serif">
      {/* Header */}
      <div className="flex flex-col border-b border-slate-200 bg-white shadow-[0_2px_15px_rgba(0,0,0,0.02)] z-20">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-100">
          <Search size={8} className="text-slate-400" />
          <div className="text-[10px] font-black text-slate-900 uppercase tracking-[0.1em] font-sans drop-shadow-sm">The Insight Hub</div>
          <Menu size={8} className="text-slate-400" />
        </div>
        <div className="flex items-center justify-center gap-3 py-2 font-sans bg-slate-50/50">
          {["Technology", "Business", "Design", "Culture"].map(t => (
            <span key={t} className="text-[4px] font-bold text-slate-600 uppercase tracking-widest">{t}</span>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-3.5 flex flex-col font-sans bg-slate-50">
        {/* Featured */}
        <div className="relative h-32 bg-slate-900 rounded-xl overflow-hidden mb-3.5 shadow-md group border border-slate-200/50">
          <img src="/images/mockups/news-featured.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

          <div className="absolute bottom-3 left-3 right-3">
            <div className="px-1.5 py-0.5 bg-blue-600/90 backdrop-blur-sm text-white rounded-[2px] text-[3.5px] font-black tracking-widest inline-block mb-1.5 shadow-sm">TECHNOLOGY</div>
            <div className="text-[10px] font-black text-white leading-[1.15] mb-1.5 font-serif drop-shadow-md">The Future of Artificial Intelligence in Enterprise Workflows</div>
            <div className="flex items-center gap-1.5 text-white/80">
              <img src="/images/mockups/author.jpg" alt="" className="w-3.5 h-3.5 rounded-full object-cover border border-white/20 shadow-sm" />
              <span className="text-[4px] font-medium">By Sarah Jenkins • 5 min read</span>
            </div>
          </div>
        </div>
        
        {/* List */}
        <div className="text-[4.5px] font-black text-slate-400 uppercase tracking-widest mb-2.5 border-b border-slate-200 pb-1.5">Trending Stories</div>
        <div className="space-y-2.5 flex-1 overflow-hidden">
          {[
            { tag: "DESIGN", title: "Minimalism in Modern UI Interfaces", time: "2 hrs ago", img: "/images/mockups/news-1.jpg" },
            { tag: "BUSINESS", title: "Q3 Market Analysis and Predictions", time: "5 hrs ago", img: "/images/mockups/news-2.jpg" }
          ].map((post, i) => (
            <div key={i} className="flex gap-2 items-center group">
              <img src={post.img} alt="" className="w-12 h-10 shrink-0 rounded-md border border-slate-200 object-cover shadow-sm" />
              <div className="flex-1">
                <div className="text-[4px] font-black text-blue-600 tracking-wider mb-0.5">{post.tag}</div>
                <div className="text-[6.5px] font-bold text-slate-800 leading-tight mb-1 font-serif">{post.title}</div>
                <div className="text-[4px] text-slate-500 font-medium">{post.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateMedical() {
  return (
    <div className="flex h-full flex-col bg-white overflow-hidden pointer-events-none font-sans text-slate-800 shadow-inner shadow-white/5">
      {/* Very Top Bar */}
      <div className="bg-[#123663] text-white flex justify-between items-center px-2 py-0.5 border-b border-white/10">
         <div className="flex gap-2 items-center">
            <div className="text-[2.5px] opacity-80 flex items-center gap-0.5 font-medium tracking-wide"><Phone size={3.5} /> 1-800-123-4567</div>
            <div className="text-[2.5px] opacity-80 flex items-center gap-0.5 font-medium tracking-wide"><Mail size={3.5} /> info@medtraining.com</div>
         </div>
         <div className="flex items-center gap-1">
            <div className="bg-amber-400 text-[#123663] text-[2.5px] px-1.5 py-0.5 font-black tracking-widest shadow-sm">CONTACT US</div>
            <div className="bg-amber-400 text-[#123663] text-[2.5px] px-1 py-0.5 font-black flex items-center shadow-sm"><Search size={3} /></div>
         </div>
      </div>
      
      {/* Main Header */}
      <div className="flex items-center justify-between px-2 py-1.5 bg-white shadow-sm z-20">
         <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-[#1a4b83] rounded-[2px] flex items-center justify-center shadow-inner">
               <span className="text-[6px] font-black text-amber-400">M</span>
            </div>
            <div className="text-[7px] font-black text-[#1a4b83] tracking-tighter">MedTraining</div>
         </div>
         <div className="flex items-center gap-1.5">
            <span className="text-[2.5px] font-bold text-slate-500 tracking-widest">HOME</span>
            <span className="text-[2.5px] font-bold text-slate-500 tracking-widest">COURSES</span>
            <span className="text-[2.5px] font-bold text-slate-500 tracking-widest">ABOUT</span>
            <div className="border border-[#1a4b83] text-[#1a4b83] px-1.5 py-0.5 text-[2.5px] font-bold rounded-[1px] ml-1">Sign In</div>
            <div className="bg-[#1a4b83] text-white px-1.5 py-0.5 text-[2.5px] font-bold rounded-[1px] shadow-sm">Sign Up</div>
         </div>
      </div>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#123663] to-[#164a85] px-2.5 py-3 flex gap-1.5 shrink-0 z-10 overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
         
         {/* Left Side */}
         <div className="w-[55%] relative z-10 flex flex-col justify-center">
            <div className="text-[7px] font-black text-white leading-[1.1] mb-1.5 drop-shadow-md tracking-tight">
               Empowering the Next<br/>Generation of<br/>
               <span className="text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.3)]">Medical Training<br/>Professionals</span>
            </div>
            <div className="text-[3px] text-blue-100/90 mb-2.5 leading-relaxed font-medium">
               Courses & certifications designed for the medical field. Join our comprehensive programs today.
            </div>
            <div className="flex gap-1.5">
               <div className="px-2 py-1 bg-amber-400 text-[#123663] rounded-[2px] text-[3.5px] font-black shadow-[0_2px_10px_rgba(251,191,36,0.2)]">Explore Courses</div>
               <div className="px-2 py-1 bg-transparent border border-white text-white rounded-[2px] text-[3.5px] font-bold flex items-center gap-1 hover:bg-white/10 transition-colors">
                  <Play size={4} className="fill-white" /> Watch Video
               </div>
            </div>
         </div>
         
         {/* Right Side Form */}
         <div className="w-[45%] relative z-20">
            <div className="bg-white rounded p-2 shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-t-2 border-[#164a85]">
               <div className="text-[5px] font-black text-center text-[#164a85] mb-0.5 tracking-tight">Request Information</div>
               <div className="text-[2.5px] text-center text-slate-400 mb-1.5 font-medium leading-tight">Fill out the form below and we will contact you.</div>
               
               <div className="grid grid-cols-2 gap-1 mb-1">
                  <div>
                     <div className="text-[2.5px] text-slate-500 mb-0.5 font-semibold">First Name *</div>
                     <div className="h-3 border border-slate-200 rounded-[1px] bg-slate-50 shadow-inner" />
                  </div>
                  <div>
                     <div className="text-[2.5px] text-slate-500 mb-0.5 font-semibold">Last Name *</div>
                     <div className="h-3 border border-slate-200 rounded-[1px] bg-slate-50 shadow-inner" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-1 mb-1">
                  <div>
                     <div className="text-[2.5px] text-slate-500 mb-0.5 font-semibold">Email Address *</div>
                     <div className="h-3 border border-slate-200 rounded-[1px] bg-slate-50 shadow-inner" />
                  </div>
                  <div>
                     <div className="text-[2.5px] text-slate-500 mb-0.5 font-semibold">Phone Number *</div>
                     <div className="h-3 border border-slate-200 rounded-[1px] bg-slate-50 shadow-inner" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-1 mb-1.5">
                  <div>
                     <div className="text-[2.5px] text-slate-500 mb-0.5 font-semibold">Program of Interest *</div>
                     <div className="h-3 border border-slate-200 rounded-[1px] bg-slate-50 flex items-center px-1 shadow-inner">
                        <div className="h-[1px] w-4 bg-slate-300" />
                        <ChevronRight size={3} className="ml-auto text-slate-400 rotate-90" />
                     </div>
                  </div>
                  <div>
                     <div className="text-[2.5px] text-slate-500 mb-0.5 font-semibold">Zip Code *</div>
                     <div className="h-3 border border-slate-200 rounded-[1px] bg-slate-50 shadow-inner" />
                  </div>
               </div>
               <div className="h-4 w-full bg-amber-400 text-[#123663] text-[4px] font-black rounded-[1px] flex items-center justify-center shadow-md">
                  Submit
               </div>
            </div>
         </div>
      </div>
      
      {/* Logos Bar */}
      <div className="bg-white py-1 flex justify-center items-center gap-2 border-b border-slate-100 shadow-sm relative z-10">
         <div className="text-[3px] font-black text-slate-400 tracking-widest">ACCREDITATIONS:</div>
         <div className="flex gap-1.5">
            <div className="h-2 w-6 bg-slate-100 border border-slate-200 rounded-[1px]" />
            <div className="h-2 w-6 bg-slate-100 border border-slate-200 rounded-[1px]" />
            <div className="h-2 w-6 bg-slate-100 border border-slate-200 rounded-[1px]" />
         </div>
      </div>

      {/* Career Choice Section */}
      <div className="bg-slate-50 py-2.5 px-2.5 flex gap-2 items-center">
         <div className="w-[45%] aspect-[4/3] rounded-md overflow-hidden border border-slate-300/50 shadow-sm relative">
             <img src="/images/mockups/med-classroom.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
             <div className="absolute inset-0 bg-blue-900/5" />
         </div>
         <div className="w-[55%]">
            <div className="text-[5.5px] font-black text-[#123663] mb-1.5 leading-[1.1] tracking-tight">Starting your Career at a Training Institute can be a Great Choice!</div>
            <div className="space-y-1">
               {[1,2,3,4].map(i => (
                 <div key={i} className="flex gap-1 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 shadow-sm flex items-center justify-center">
                       <span className="text-[2px] text-[#123663]">✓</span>
                    </div>
                    <div className="h-[1.5px] w-full bg-slate-200 rounded-full" />
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* 3 Cards Section (Comprehensive Programs) */}
      <div className="bg-[#123663] py-2.5 px-2.5 flex-1 flex flex-col items-center shadow-inner relative overflow-hidden">
         <div className="absolute top-0 inset-x-0 h-px bg-white/10" />
         <div className="text-[6.5px] font-black text-white mb-0.5 tracking-tight">Comprehensive training programs</div>
         <div className="text-[3px] text-blue-200/80 mb-2 font-medium">Choose from a wide variety of medical training programs.</div>
         <div className="flex gap-1.5 w-full">
            {[
               { tag: "Online Learning", price: "$400.00", course: "Medical Billing & Coding", img: "/images/mockups/med-1.jpg" },
               { tag: "Hybrid Learning", price: "$600.00", course: "Clinical Medical Assistant", img: "/images/mockups/med-2.jpg" },
               { tag: "Online Learning", price: "$350.00", course: "Pharmacy Technician", img: "/images/mockups/med-3.jpg" }
            ].map((prog, i) => (
               <div key={i} className="flex-1 bg-white rounded-md border-t-2 border-amber-400 shadow-[0_4px_15px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden pb-1.5 relative">
                  <div className="absolute top-0 left-0 bg-[#164a85] text-white text-[2px] font-bold px-1 py-0.5 rounded-br-sm z-10">{prog.tag}</div>
                  <div className="w-full aspect-video relative overflow-hidden group">
                     <img src={prog.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
                     <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="px-1.5 pt-1.5 flex-1 flex flex-col">
                     <div className="text-[2.5px] font-black text-amber-500 mb-0.5 tracking-widest uppercase">Medical Training</div>
                     <div className="text-[4px] font-black text-[#123663] leading-tight mb-0.5">{prog.course}</div>
                     <div className="text-[4px] font-bold text-slate-800 mb-1">{prog.price}</div>
                     <div className="space-y-1 mb-1.5">
                        {[1,2,3].map(j => (
                           <div key={j} className="flex gap-1 items-center">
                              <span className="text-[3px] text-amber-500 font-bold">✓</span>
                              <div className="h-[1.5px] w-full bg-slate-100 rounded-full" />
                           </div>
                        ))}
                     </div>
                     <div className="mt-auto px-1.5 py-1 border border-[#164a85] text-[#164a85] hover:bg-[#164a85] hover:text-white transition-colors text-[3px] font-black rounded-[2px] text-center shadow-sm">
                        Read More
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}

const TEMPLATES = [
  {
    Screen: TemplateFintech,
    className: "absolute top-0 right-0 z-10 w-[260px] h-[340px] rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)] bg-white",
    zFloat: [0, 15, 0],
    duration: 6,
    delay: 0,
    x: 60,
    y: -80,
  },
  {
    Screen: TemplateTech,
    className: "absolute top-1/2 left-0 z-20 w-[260px] h-[340px] rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.7)] bg-[#0f0e17]",
    zFloat: [0, -10, 0],
    duration: 7,
    delay: 0.5,
    x: -80,
    y: -40,
  },
  {
    Screen: TemplateMedical,
    className: "absolute top-1/4 left-1/4 z-50 w-[260px] h-[340px] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.9)] bg-white border border-amber-400/20",
    zFloat: [0, 25, 0],
    duration: 8,
    delay: 2,
    x: -10,
    y: 10,
  },
  {
    Screen: TemplateRealEstate,
    className: "absolute bottom-[-20%] right-1/4 z-30 w-[260px] h-[340px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.8)] bg-[#050505]",
    zFloat: [0, 20, 0],
    duration: 5.5,
    delay: 1,
    x: 20,
    y: 60,
  },
  {
    Screen: TemplateInsight,
    className: "absolute bottom-1/4 left-1/4 z-40 w-[260px] h-[340px] rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)] bg-white",
    zFloat: [0, 12, 0],
    duration: 6.5,
    delay: 1.5,
    x: -50,
    y: 120,
  },
];

export function HeroShowcase() {
  return (
    <div className="relative mx-auto hidden h-[550px] w-full max-w-[700px] lg:flex items-center justify-center -translate-x-6 lg:-translate-x-12 xl:-translate-x-16 -translate-y-4 lg:-translate-y-8">
      {/* 3D Isometric Container */}
      <div 
        className="relative w-[300px] h-[300px]"
        style={{
          transformStyle: "preserve-3d",
          transform: "perspective(1200px) rotateX(60deg) rotateY(0deg) rotateZ(-45deg) scale(1.15)",
        }}
      >
        {TEMPLATES.map(({ Screen, className, zFloat, duration, delay, x, y }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, z: -50 }}
            animate={{ opacity: 1, z: zFloat }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 * i },
              z: { duration: duration, delay: delay, repeat: Infinity, ease: "easeInOut" },
            }}
            className={className}
            style={{
              x: x,
              y: y,
              transformStyle: "preserve-3d",
            }}
          >
            {/* The actual template component */}
            <div className="w-full h-full overflow-hidden rounded-xl border border-white/20 relative z-20 bg-inherit">
              <Screen />
            </div>
            
            {/* 3D Depth layers for thickness effect */}
            <div className="absolute inset-0 bg-slate-900/50 rounded-xl pointer-events-none" style={{ transform: "translateZ(-1px)" }} />
            <div className="absolute inset-0 bg-slate-900/40 rounded-xl pointer-events-none" style={{ transform: "translateZ(-2px)" }} />
            <div className="absolute inset-0 bg-slate-900/30 rounded-xl pointer-events-none" style={{ transform: "translateZ(-3px)" }} />
            <div className="absolute inset-0 bg-slate-900/20 rounded-xl pointer-events-none shadow-[0_30px_50px_rgba(0,0,0,0.5)]" style={{ transform: "translateZ(-4px)" }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
