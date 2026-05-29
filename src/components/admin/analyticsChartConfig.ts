import type { Metric, SeriesPoint } from "@/lib/analytics";

export const METRICS: { key: Metric; label: string }[] = [
  { key: "users", label: "Users" },
  { key: "articles", label: "Articles" },
  { key: "comments", label: "Comments" },
];

/** Build the chart.js dataset for the selected metric, theme-aware. */
export function buildChartData(
  series: SeriesPoint[],
  metric: Metric,
  isDark: boolean,
) {
  return {
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
}

/** Build the chart.js options object, theme-aware. */
export function buildChartOptions(isDark: boolean) {
  return {
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
}
