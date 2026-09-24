import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "navy" | "white" | "outline-white" | "secondary" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98] select-none cursor-pointer min-h-[44px] whitespace-nowrap";

    const variantStyles = {
      // Primary: Signature Green CTA
      primary:
        "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/25 focus:ring-emerald-500 font-semibold",
      // White: High contrast crisp white CTA for dark backgrounds
      white:
        "bg-white hover:bg-slate-100 text-[#0B1F3A] border-2 border-white shadow-xl shadow-black/25 focus:ring-white font-bold",
      // Outline-White: Transparent with prominent white border
      "outline-white":
        "border-2 border-white text-white hover:bg-white hover:text-[#0B1F3A] bg-white/10 backdrop-blur-sm shadow-md font-bold focus:ring-white",
      // Navy: Corporate Navy
      navy:
        "bg-[#0B1F3A] hover:bg-[#162E52] text-white shadow-sm shadow-navy/20 focus:ring-[#0B1F3A] font-semibold",
      // Secondary: Soft Navy background
      secondary:
        "bg-slate-100 hover:bg-slate-200 text-[#0B1F3A] focus:ring-slate-300 font-medium",
      // Outline: Navy border
      outline:
        "border-2 border-[#0B1F3A] text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white bg-transparent focus:ring-[#0B1F3A] font-semibold",
      // Ghost: Subtly hoverable
      ghost:
        "bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-300",
      // WhatsApp: Dedicated Brand Green
      whatsapp:
        "bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-sm shadow-[#25D366]/30 focus:ring-[#25D366] font-semibold",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-2 gap-1.5 min-h-[38px]",
      md: "text-sm px-5 py-2.5 gap-2 min-h-[44px]",
      lg: "text-base px-6 py-3.5 gap-2.5 min-h-[48px]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
