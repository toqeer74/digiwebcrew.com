import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-[var(--site-primary)] text-white hover:opacity-90",
                secondary:
                    "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
                destructive:
                    "border-transparent bg-rose-500 text-white hover:bg-rose-600",
                outline: "border-slate-200 text-slate-900 dark:border-white/10 dark:text-white",
                electric: "border-transparent bg-[var(--site-primary)]/10 text-[var(--site-primary)] hover:bg-[var(--site-primary)]/20",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }

