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
import type { Metric, SeriesPoint } from "@/lib/analytics";
import { buildChartData, buildChartOptions } from "./analyticsChartConfig";
import { MetricTabs } from "./MetricTabs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface AnalyticsChartProps {
  series: SeriesPoint[];
}

export function AnalyticsChart({ series }: AnalyticsChartProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [metric, setMetric] = React.useState<Metric>("users");
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  const data = buildChartData(series, metric, isDark);
  const options = buildChartOptions(isDark);

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
        <MetricTabs value={metric} onChange={setMetric} />
      </div>
      <div className="mt-5 h-56 sm:mt-6 sm:h-72">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
