"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, TrendingUp, Zap, CheckCircle2, Layout, Mail, CircleDollarSign } from "lucide-react";

export function HeroUICards() {
  return (
    <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center lg:justify-end">
      {/* Container to center and scale cards */}
      <div className="relative w-full max-w-[450px] aspect-square">
        
        {/* Card 1: Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-[5%] left-[0%] z-20 w-[260px] rounded-2xl bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
          style={{ transform: "rotate(-3deg)" }}
        >
          <div className="p-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center">
                <BarChart3 className="w-3 h-3 text-blue-400" />
              </div>
              <span className="text-xs font-semibold text-white/90">Pulse Analytics</span>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-end gap-2">
              <div className="bg-white/5 p-2 rounded-lg flex-1 border border-white/5">
                <p className="text-[10px] text-white/50 mb-1">Revenue</p>
                <p className="text-sm font-bold text-white">$84.2k</p>
                <p className="text-[9px] text-emerald-400 mt-1 flex items-center gap-0.5">
                  <TrendingUp className="w-2 h-2" /> +12%
                </p>
              </div>
              <div className="bg-white/5 p-2 rounded-lg flex-1 border border-white/5">
                <p className="text-[10px] text-white/50 mb-1">Users</p>
                <p className="text-sm font-bold text-white">12.4k</p>
                <p className="text-[9px] text-emerald-400 mt-1 flex items-center gap-0.5">
                  <TrendingUp className="w-2 h-2" /> +8%
                </p>
              </div>
            </div>
            {/* Fake chart */}
            <div className="h-16 flex items-end justify-between gap-1 mt-2">
              {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className="w-full bg-gradient-to-t from-blue-500/40 to-blue-400 rounded-t-sm"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 2: Automation */}
        <motion.div
          initial={{ opacity: 0, y: -50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-[10%] right-[0%] z-10 w-[240px] rounded-2xl bg-[#1a1525]/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
          style={{ transform: "rotate(4deg)" }}
        >
          <div className="p-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center">
                <Zap className="w-3 h-3 text-purple-400" />
              </div>
              <span className="text-xs font-semibold text-white/90">Flow Builder</span>
            </div>
            <div className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[8px] font-bold">
              ● RUNNING
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/5">
              <Users className="w-4 h-4 text-white/70" />
              <div className="text-[9px]">
                <span className="text-white/60">Trigger: </span>
                <span className="text-white bg-purple-500/30 px-1.5 py-0.5 rounded">New Signup</span>
              </div>
            </div>
            <div className="w-[1px] h-3 bg-white/20 mx-auto" />
            <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div className="text-[9px]">
                <span className="text-white/60">Action: </span>
                <span className="text-white">Qualify Lead</span>
              </div>
            </div>
            <div className="w-[1px] h-3 bg-white/20 mx-auto" />
            <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/5">
              <Mail className="w-4 h-4 text-blue-400" />
              <div className="text-[9px]">
                <span className="text-white/60">Action: </span>
                <span className="text-white">Send Welcome</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 3: CRM Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-[5%] right-[5%] z-30 w-[220px] rounded-2xl bg-[#0f1715]/80 backdrop-blur-xl border border-emerald-500/20 shadow-2xl overflow-hidden"
          style={{ transform: "rotate(-2deg)" }}
        >
          <div className="p-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center">
                <CircleDollarSign className="w-3 h-3 text-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-white/90">Sales Pipeline</span>
            </div>
          </div>
          <div className="p-3">
            <div className="flex gap-2">
              {/* Column 1 */}
              <div className="flex-1 bg-white/5 rounded-lg p-2 space-y-1.5 border border-white/5">
                <div className="text-[8px] font-bold text-white/50 mb-1">IN PROGRESS</div>
                <div className="h-6 bg-white/10 rounded-md border border-white/5" />
                <div className="h-6 bg-white/10 rounded-md border border-white/5" />
              </div>
              {/* Column 2 */}
              <div className="flex-1 bg-white/5 rounded-lg p-2 space-y-1.5 border border-white/5">
                <div className="text-[8px] font-bold text-emerald-400 mb-1 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> WON
                </div>
                <div className="h-6 bg-emerald-500/20 rounded-md border border-emerald-500/20 relative overflow-hidden">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Web UI */}
        <motion.div
          initial={{ opacity: 0, y: -20, x: -60 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-[15%] left-[5%] z-10 w-[220px] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
          style={{ transform: "rotate(6deg)" }}
        >
          <div className="p-3 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <Layout className="w-2 h-2 text-white" />
              </div>
              <span className="text-[10px] font-bold text-white">brandsite.io</span>
            </div>
            <div className="flex gap-2 text-[8px] font-semibold text-white/70">
              <span>Home</span>
              <span>Product</span>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div className="w-3/4 h-2.5 rounded bg-white/20" />
            <div className="w-full h-3 rounded bg-gradient-to-r from-blue-500 to-purple-500" />
            <div className="space-y-1.5">
              <div className="w-full h-1 rounded bg-white/10" />
              <div className="w-5/6 h-1 rounded bg-white/10" />
              <div className="w-4/6 h-1 rounded bg-white/10" />
            </div>
            <div className="w-1/2 h-5 rounded-full bg-white/10 mt-3" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
