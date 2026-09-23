import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "navy" | "slate" | "amber";
}

export function Badge({ children, className, variant = "green", ...props }: BadgeProps) {
  const variantStyles = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200/80 font-semibold",
    navy: "bg-[#0B1F3A]/5 text-[#0B1F3A] border-[#0B1F3A]/15 font-semibold",
    slate: "bg-slate-100 text-slate-700 border-slate-200 font-medium",
    amber: "bg-amber-50 text-amber-800 border-amber-200 font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
