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
import {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export default function AnalyticsPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  const buildGradient = (ctx: CanvasRenderingContext2D) => {
    const g = ctx.createLinearGradient(0, 0, 0, 280);
    g.addColorStop(0, "rgba(59, 111, 232, 0.45)");
    g.addColorStop(1, "rgba(124, 92, 255, 0)");
    return g;
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Users",
        data: [50, 95, 140, 200, 260, 300, 380],
        borderColor: isDark ? "#608EF6" : "#3B6FE8",
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return "rgba(59, 111, 232, 0.2)";
          return buildGradient(ctx);
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
        grid: { color: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)" },
        ticks: { color: isDark ? "#94A3B8" : "#64748B" },
        border: { display: false },
      },
    },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Growth, engagement, and what's trending.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total users"
          value="380"
          icon={<Users className="h-5 w-5" />}
          delta={{ value: 26, label: "vs. last month" }}
        />
        <StatCard
          label="Articles"
          value="42"
          icon={<FileText className="h-5 w-5" />}
          delta={{ value: 12 }}
        />
        <StatCard
          label="Comments"
          value="186"
          icon={<MessageSquare className="h-5 w-5" />}
          delta={{ value: 48 }}
        />
        <StatCard
          label="Avg. engagement"
          value="4.4 min"
          icon={<TrendingUp className="h-5 w-5" />}
          delta={{ value: -3, label: "WoW" }}
        />
      </div>

      {/* Bento grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card variant="elevated" className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold">User growth</h2>
              <p className="text-sm text-muted-foreground">Last 7 months</p>
            </div>
          </div>
          <div className="mt-6 h-72">
            <Line data={data} options={options} />
          </div>
        </Card>

        <Card variant="elevated" className="p-6">
          <h2 className="font-display text-xl font-semibold">Top sources</h2>
          <ul className="mt-4 space-y-3">
            {[
              { name: "Organic search", value: 48 },
              { name: "Direct", value: 24 },
              { name: "Referral", value: 18 },
              { name: "Social", value: 10 },
            ].map((s) => (
              <li key={s.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-muted-foreground">{s.value}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                    style={{ width: `${s.value}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
