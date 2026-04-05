"use client";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export function RefreshButton() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);
  const handleClick = () => {
    setSpinning(true);
    router.refresh();
    setTimeout(() => setSpinning(false), 800);
  };
  return (
    <button onClick={handleClick} className="adm-btn adm-btn-secondary adm-btn-sm inline-flex items-center gap-2">
      <RefreshCw size={14} className={spinning ? "animate-spin" : ""} />
      Refresh
    </button>
  );
}
