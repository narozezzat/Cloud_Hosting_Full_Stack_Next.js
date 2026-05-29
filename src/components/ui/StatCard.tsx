"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Card } from "./Card";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  delta?: { value: number; label?: string };
  sparkline?: React.ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  delta,
  sparkline,
  className,
}: StatCardProps) {
  const positive = (delta?.value ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card
        variant="elevated"
        className={cn("relative overflow-hidden p-4 sm:p-6", className)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 space-y-1">
            <p className="truncate text-xs font-medium text-muted-foreground sm:text-sm">
              {label}
            </p>
            <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {value}
            </p>
          </div>
          {icon && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300 sm:h-10 sm:w-10">
              {icon}
            </div>
          )}
        </div>
        {(delta || sparkline) && (
          <div className="mt-3 flex items-end justify-between gap-3 sm:mt-4">
            {delta && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold sm:text-xs",
                  positive
                    ? "bg-success/15 text-success"
                    : "bg-destructive/15 text-destructive",
                )}
              >
                {positive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {Math.abs(delta.value)}%
                {delta.label && (
                  <span className="hidden text-muted-foreground sm:inline">
                    {" "}
                    {delta.label}
                  </span>
                )}
              </span>
            )}
            {sparkline && <div className="h-8 flex-1">{sparkline}</div>}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
