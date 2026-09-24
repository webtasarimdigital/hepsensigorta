import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({
  variant = "dark",
  className,
  size = "md",
}: LogoProps) {
  const isDark = variant === "dark";

  const heights = {
    sm: "h-10 sm:h-11",
    md: "h-11 sm:h-12 lg:h-14",
    lg: "h-16 sm:h-20",
    xl: "h-24 sm:h-28",
  };

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center group focus:outline-none shrink-0 select-none",
        className
      )}
    >
      <div
        className={cn(
          "relative flex items-center shrink-0 transition-transform duration-200 group-hover:scale-[1.02]",
          !isDark && "p-1.5 rounded-2xl bg-white/10 backdrop-blur-sm"
        )}
      >
        <Image
          src="/logo-hepsen-sigorta.png"
          alt="Hepsen Sigorta - Seni Düşünen Sigorta"
          width={454}
          height={428}
          priority
          className={cn(
            heights[size],
            "w-auto object-contain",
            !isDark && "brightness-0 invert drop-shadow-md"
          )}
        />
      </div>
    </Link>
  );
}
