"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Plan } from "./plans";

interface PlanCardProps {
  plan: Plan;
  index: number;
}

export function PlanCard({ plan, index }: PlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative h-full",
        plan.popular && "lg:scale-[1.04] lg:z-10",
      )}
    >
      {plan.popular && (
        <div
          aria-hidden="true"
          className="absolute -inset-px rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 opacity-90"
        />
      )}
      <Card
        variant={plan.popular ? "default" : "elevated"}
        className={cn(
          "relative flex h-full flex-col gap-6 p-8",
          plan.popular && "bg-card",
        )}
      >
        {plan.popular && (
          <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-3.5 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-lg ring-1 ring-white/20">
            <Star className="h-3 w-3 fill-current" strokeWidth={0} />
            Most popular
          </span>
        )}

        <div className="space-y-2">
          <h3 className="font-display text-xl font-bold">{plan.name}</h3>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="font-display text-5xl font-extrabold tracking-tight">
            ${plan.price}
          </span>
          <span className="text-muted-foreground">{plan.period}</span>
          {plan.discountLabel && (
            <Badge variant="success" className="ml-2">
              {plan.discountLabel}
            </Badge>
          )}
        </div>

        <ul className="flex-1 space-y-3 border-t border-border pt-6">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          asChild
          variant={plan.popular ? "primary" : "outline"}
          size="lg"
          className="w-full"
        >
          <Link href="/register">{plan.cta}</Link>
        </Button>
      </Card>
    </motion.div>
  );
}
