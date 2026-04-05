"use client";

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
  open, title, description,
  confirmLabel = "Confirm", cancelLabel = "Cancel",
  variant = "danger", isLoading, onConfirm, onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  const confirmColor = variant === "warning" ? "var(--adm-warning)" : "var(--adm-danger)";

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/40 px-4">
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        style={{ border: "1.5px solid var(--adm-border)" }}
      >
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--adm-text)" }}>{title}</h3>
        {description && (
          <p style={{ fontSize: 13.5, color: "var(--adm-text-muted)", marginTop: 8 }}>{description}</p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="adm-btn adm-btn-secondary adm-btn-sm"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="adm-btn adm-btn-sm text-white"
            style={{ background: confirmColor }}
          >
            {isLoading ? "Please wait…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
