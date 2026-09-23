import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "dark" | "light";
  withSlogan?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  variant = "dark",
  className,
  size = "md",
}: LogoProps) {
  const isDark = variant === "dark";

  const heights = {
    sm: "h-9",
    md: "h-11 sm:h-12",
    lg: "h-14",
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
          !isDark && "p-1.5 rounded-xl bg-white shadow-sm"
        )}
      >
        <Image
          src="/logo-hepsen-sigorta.png"
          alt="Hepsen Sigorta - Seni Düşünen Sigorta"
          width={180}
          height={136}
          priority
          className={cn(heights[size], "w-auto object-contain")}
        />
      </div>
    </Link>
  );
}
