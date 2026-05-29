import * as React from "react";
import { cn } from "@/lib/cn";

interface GradientBlobProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Position preset for hero backgrounds */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  size?: "sm" | "md" | "lg" | "xl";
  /** Color stops — defaults to brand → accent gradient */
  from?: string;
  via?: string;
  to?: string;
}

const sizeMap = {
  sm: "h-64 w-64",
  md: "h-96 w-96",
  lg: "h-[32rem] w-[32rem]",
  xl: "h-[48rem] w-[48rem]",
};

const positionMap = {
  "top-left": "-top-32 -left-32",
  "top-right": "-top-32 -right-32",
  "bottom-left": "-bottom-32 -left-32",
  "bottom-right": "-bottom-32 -right-32",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

/**
 * Pure-CSS aurora gradient blob for hero/section backgrounds.
 * Drifts subtly; respects prefers-reduced-motion via global rule.
 */
export function GradientBlob({
  position = "top-right",
  size = "lg",
  from = "rgb(var(--brand-400) / 0.45)",
  via = "rgb(var(--accent-400) / 0.35)",
  to = "transparent",
  className,
  style,
  ...props
}: GradientBlobProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl aurora-drift",
        sizeMap[size],
        positionMap[position],
        className,
      )}
      style={{
        background: `radial-gradient(closest-side, ${from}, ${via}, ${to})`,
        ...style,
      }}
      {...props}
    />
  );
}
