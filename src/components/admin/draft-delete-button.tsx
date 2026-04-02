"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
      <Button type="button" variant="outline" className="h-8 px-3 text-xs" onClick={() => setOpen(true)} disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </Button>
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

