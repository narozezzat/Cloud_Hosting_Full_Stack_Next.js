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
      <Card variant="elevated" className={cn("relative overflow-hidden p-6", className)}>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="font-display text-3xl font-bold tracking-tight">
              {value}
            </p>
          </div>
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
              {icon}
            </div>
          )}
        </div>
        {(delta || sparkline) && (
          <div className="mt-4 flex items-end justify-between gap-3">
            {delta && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
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
                  <span className="text-muted-foreground"> {delta.label}</span>
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
