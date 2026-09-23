import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  withSlogan?: boolean;
  withAllianzBadge?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  variant = "dark",
  withSlogan = true,
  withAllianzBadge = false,
  className,
  size = "md",
}: LogoProps) {
  const isDark = variant === "dark"; // dark text for light backgrounds

  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const titleSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link href="/" className={cn("inline-flex items-center gap-3 group focus:outline-none", className)}>
      {/* Brand Emblem */}
      <div
        className={cn(
          iconSizes[size],
          "relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#162E52] border border-emerald-500/30 shadow-sm transition-transform duration-200 group-hover:scale-105 shrink-0"
        )}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
        >
          {/* Shield Silhouette */}
          <path
            d="M20 4L7 9V18C7 26.5 12.6 34.3 20 37C27.4 34.3 33 26.5 33 18V9L20 4Z"
            stroke="#50C878"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Growth Sprout / Heart Leaf */}
          <path
            d="M20 13C16.5 13 14 15.5 14 19C14 24 20 28 20 28C20 28 26 24 26 19C26 15.5 23.5 13 20 13Z"
            fill="#50C878"
            fillOpacity="0.25"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 18V24"
            stroke="#50C878"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={cn(
              titleSizes[size],
              "font-bold tracking-tight",
              isDark ? "text-[#0B1F3A]" : "text-white"
            )}
          >
            HEPSEN
          </span>
          <span
            className={cn(
              titleSizes[size],
              "font-medium tracking-wider text-emerald-600 dark:text-emerald-400"
            )}
          >
            SİGORTA
          </span>
        </div>

        {withSlogan && (
          <span
            className={cn(
              "text-[10.5px] font-medium tracking-wide mt-0.5",
              isDark ? "text-slate-500" : "text-slate-300/80"
            )}
          >
            Seni Düşünen Sigorta
          </span>
        )}
      </div>

      {/* Optional Allianz Badge */}
      {withAllianzBadge && (
        <div className="hidden lg:flex items-center pl-3 border-l border-slate-200 dark:border-slate-800 ml-1">
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
            Allianz Yetkili Acentesi
          </span>
        </div>
      )}
    </Link>
  );
}
