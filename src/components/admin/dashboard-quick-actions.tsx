"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, Bot, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddLeadModal } from "@/components/admin/add-lead-modal";

export function DashboardQuickActions() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 px-5 pb-5 pt-0 sm:grid-cols-2 lg:grid-cols-4">
        <Button className="w-full justify-start" onClick={() => setIsAddOpen(true)}>
          <Plus size={16} /> Add Lead
        </Button>
        <Link href="/admin/analytics">
          <Button variant="outline" className="w-full justify-start">
            <BarChart3 size={16} /> View Analytics
          </Button>
        </Link>
        <Link href="/admin/ai-assistant">
          <Button variant="outline" className="w-full justify-start">
            <Bot size={16} /> Run AI
          </Button>
        </Link>
        <Link href="/admin/settings">
          <Button variant="outline" className="w-full justify-start">
            <Settings size={16} /> Settings
          </Button>
        </Link>
      </div>

      <AddLeadModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </>
  );
}


