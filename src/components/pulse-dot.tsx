"use client";

import { cn } from "@/lib/utils";

interface PulseDotProps {
  color?: "green" | "orange" | "red" | "violet";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colorMap = {
  green: "bg-cyber-green",
  orange: "bg-rht-orange",
  red: "bg-destructive",
  violet: "bg-rht-violet",
};

const sizeMap = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
};

export function PulseDot({ color = "green", size = "sm", className }: PulseDotProps) {
  return (
    <span className={cn("relative inline-flex", className)}>
      <span
        className={cn(
          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
          colorMap[color]
        )}
      />
      <span className={cn("relative inline-flex rounded-full", colorMap[color], sizeMap[size])} />
    </span>
  );
}
