import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export function Logo({
  variant = "dark",
  className,
  size = "md",
  showText = true,
}: LogoProps) {
  const isDark = variant === "dark";

  const iconHeights = {
    sm: "h-8 sm:h-9",
    md: "h-9 sm:h-10 lg:h-12",
    lg: "h-14 sm:h-16",
    xl: "h-20 sm:h-24",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm sm:text-base lg:text-lg",
    lg: "text-lg sm:text-xl",
    xl: "text-2xl sm:text-3xl",
  };

  const sloganSizes = {
    sm: "text-[9px]",
    md: "text-[10px] sm:text-[11px]",
    lg: "text-xs",
    xl: "text-sm",
  };

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 sm:gap-2.5 group focus:outline-none shrink-0 select-none",
        className
      )}
    >
      {/* Logo Icon */}
      <div
        className={cn(
          "relative flex items-center shrink-0 transition-transform duration-200 group-hover:scale-[1.03]",
          !isDark && "p-1 rounded-xl bg-white/90 shadow-sm"
        )}
      >
        <Image
          src="/logo-hepsen-sigorta.png"
          alt="Hepsen Sigorta"
          width={454}
          height={428}
          priority
          className={cn(iconHeights[size], "w-auto object-contain")}
        />
      </div>

      {/* Text beside logo */}
      {showText && (size === "sm" || size === "md") && (
        <div className="flex flex-col leading-none min-w-0">
          <span
            className={cn(
              "font-extrabold tracking-tight leading-tight",
              textSizes[size],
              isDark ? "text-[#0B1F3A]" : "text-white"
            )}
          >
            HEPSEN SİGORTA
          </span>
          <span
            className={cn(
              "font-medium italic tracking-wide leading-tight mt-0.5",
              sloganSizes[size],
              isDark ? "text-emerald-700" : "text-emerald-400"
            )}
          >
            Seni düşünen Sigorta
          </span>
        </div>
      )}
    </Link>
  );
}
