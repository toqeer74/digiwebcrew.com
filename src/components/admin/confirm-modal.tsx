"use client";

import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  isLoading,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  const confirmButtonClass =
    variant === "warning"
      ? "bg-amber-500 text-white hover:bg-amber-600"
      : "bg-red-600 text-white hover:bg-red-700";

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-2xl">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {description ? <p className="mt-2 text-sm text-slate-500">{description}</p> : null}

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>{cancelLabel}</Button>
          <Button onClick={onConfirm} disabled={isLoading} className={confirmButtonClass}>
            {isLoading ? "Please wait..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}


