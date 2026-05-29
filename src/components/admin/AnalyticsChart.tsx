"use client";

import * as React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";
import type { Metric, SeriesPoint } from "@/lib/analytics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const METRICS: { key: Metric; label: string }[] = [
  { key: "users", label: "Users" },
  { key: "articles", label: "Articles" },
  { key: "comments", label: "Comments" },
];

interface AnalyticsChartProps {
  series: SeriesPoint[];
}

export function AnalyticsChart({ series }: AnalyticsChartProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [metric, setMetric] = React.useState<Metric>("users");
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  const data = {
    labels: series.map((s) => s.label),
    datasets: [
      {
        label: METRICS.find((m) => m.key === metric)!.label,
        data: series.map((s) => s[metric]),
        borderColor: isDark ? "#608EF6" : "#3B6FE8",
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "rgba(59, 111, 232, 0.2)";
          const g = ctx.createLinearGradient(0, 0, 0, 280);
          g.addColorStop(0, "rgba(59, 111, 232, 0.45)");
          g.addColorStop(1, "rgba(124, 92, 255, 0)");
          return g;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: isDark ? "#608EF6" : "#3B6FE8",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? "#111827" : "#0B1220",
        titleColor: "#fff",
        bodyColor: "#cbd5e1",
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: isDark ? "#94A3B8" : "#64748B" },
        border: { display: false },
      },
      y: {
        grid: {
          color: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)",
        },
        ticks: {
          color: isDark ? "#94A3B8" : "#64748B",
          precision: 0,
        },
        border: { display: false },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold sm:text-xl">
            Growth
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            New {metric} over the last {series.length} months
          </p>
        </div>
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
              aria-selected={metric === m.key}
              onClick={() => setMetric(m.key)}
              className={cn(
                "flex-1 rounded-sm px-3 py-1.5 text-xs font-medium transition-colors duration-hover sm:flex-initial",
                metric === m.key
                  ? "bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 h-56 sm:mt-6 sm:h-72">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
