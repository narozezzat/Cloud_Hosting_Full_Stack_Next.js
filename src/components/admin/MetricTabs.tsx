"use client";

import { cn } from "@/lib/cn";
import type { Metric } from "@/lib/analytics";
import { METRICS } from "./analyticsChartConfig";

interface MetricTabsProps {
  value: Metric;
  onChange: (metric: Metric) => void;
}

/** Segmented control to switch the analytics chart's active metric. */
export function MetricTabs({ value, onChange }: MetricTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Metric"
      className="inline-flex w-full items-center gap-1 rounded-md border border-border bg-card p-1 sm:w-auto"
    >
      {METRICS.map((m) => (
        <button
          key={m.key}
          type="button"
          role="tab"
          aria-selected={value === m.key}
          onClick={() => onChange(m.key)}
          className={cn(
            "flex-1 rounded-sm px-3 py-1.5 text-xs font-medium transition-colors duration-hover sm:flex-initial",
            value === m.key
              ? "bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
