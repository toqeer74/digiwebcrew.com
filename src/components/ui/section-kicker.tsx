import { cn } from "@/lib/utils";

export function SectionKicker({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2 mb-8", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--site-primary)]" />
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--site-primary)] dark:text-[var(--site-primary-soft)]">
        {label}
      </span>
    </div>
  );
}
