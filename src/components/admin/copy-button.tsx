"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="adm-btn adm-btn-secondary adm-btn-sm inline-flex items-center gap-2"
    >
      {copied ? <Check size={13} style={{ color: "var(--adm-success)" }} /> : <Copy size={13} />}
      {copied ? "Copied!" : label}
    </button>
  );
}
