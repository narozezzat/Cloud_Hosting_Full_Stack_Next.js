import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const skeletonVariants = cva("shimmer relative overflow-hidden", {
  variants: {
    shape: {
      rect: "rounded-md",
      pill: "rounded-full",
      circle: "rounded-full aspect-square",
      card: "rounded-xl",
    },
  },
  defaultVariants: { shape: "rect" },
});

interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export function Skeleton({ className, shape, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(skeletonVariants({ shape }), className)}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------
 * Composed skeleton blocks — design-system-aware loading placeholders
 * ------------------------------------------------------------------ */

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-3", i === lines - 1 ? "w-4/6" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-14 w-14" };
  return <Skeleton shape="circle" className={cn(sizes[size], className)} />;
}

/** Card with header, body, and a footer line. Used in grids of articles, stats, etc. */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-card p-6 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Skeleton shape="pill" className="h-5 w-16" />
        <Skeleton shape="pill" className="h-5 w-12" />
      </div>
      <Skeleton className="mt-4 h-5 w-4/5" />
      <SkeletonText className="mt-3" lines={3} />
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}

export function SkeletonStatCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-card p-6 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
      <Skeleton shape="pill" className="mt-4 h-5 w-20" />
    </div>
  );
}

/** Generic table row block. Used in admin tables loading. */
export function SkeletonRow({ cols = 3 }: { cols?: number }) {
  return (
    <div className="flex items-center gap-4 px-5 py-3 border-b border-border/60 last:border-0">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-3",
            i === 0 ? "flex-[2]" : i === cols - 1 ? "w-12 ml-auto" : "flex-1",
          )}
        />
      ))}
    </div>
  );
}
