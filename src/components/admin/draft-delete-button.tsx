"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/admin/confirm-modal";

export function DraftDeleteButton({ draftId }: { draftId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/drafts/${draftId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Draft deleted");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to delete draft");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={loading}
        className="adm-btn adm-btn-sm"
        style={{ color: "var(--adm-danger)", background: "var(--adm-danger-dim)", borderColor: "transparent" }}
      >
        {loading ? "Deleting…" : "Delete"}
      </button>
      <ConfirmModal
        open={open}
        title="Delete this draft?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        isLoading={loading}
        onCancel={() => setOpen(false)}
        onConfirm={onDelete}
      />
    </>
  );
}
