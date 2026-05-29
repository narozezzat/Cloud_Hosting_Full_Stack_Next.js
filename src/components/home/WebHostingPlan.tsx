"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export type PlanTier = "starter" | "premium" | "business";

export interface Plan {
  tier: PlanTier;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  discountLabel?: string;
}

const DEFAULT_PLANS: Plan[] = [
  {
    tier: "starter",
    name: "Starter",
    price: 2.99,
    period: "/mo",
    description: "Everything you need to launch a personal site.",
    features: [
      "1 website",
      "10 GB SSD storage",
      "Free SSL",
      "Weekly backups",
      "Community support",
    ],
    cta: "Start free",
  },
  {
    tier: "premium",
    name: "Premium",
    price: 4.99,
    period: "/mo",
    description: "Scale with confidence. The choice of most teams.",
    features: [
      "100 websites",
      "100 GB SSD storage",
      "Daily backups",
      "Unlimited bandwidth",
      "Free SSL + Email",
      "Priority support",
    ],
    cta: "Choose Premium",
    popular: true,
    discountLabel: "10% OFF",
  },
  {
    tier: "business",
    name: "Business",
    price: 9.99,
    period: "/mo",
    description: "Built for production workloads and high traffic.",
    features: [
      "Unlimited websites",
      "200 GB NVMe storage",
      "Hourly backups",
      "CDN + DDoS protection",
      "Dedicated IP",
      "24/7 white-glove support",
    ],
    cta: "Go Business",
  },
];

interface PlanCardProps {
  plan: Plan;
  index: number;
}

function PlanCard({ plan, index }: PlanCardProps) {
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
          <Badge
            variant="accent"
            className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1 px-3 py-1 shadow-md"
          >
            <Sparkles className="h-3 w-3" />
            Most popular
          </Badge>
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

interface WebHostingPlanProps {
  plans?: Plan[];
}

const WebHostingPlan = ({ plans = DEFAULT_PLANS }: WebHostingPlanProps) => {
  return (
    <Section
      id="plans"
      eyebrow="Pricing"
      title="Pick the plan that fits your stage"
      subtitle="Simple, predictable pricing. Upgrade or downgrade at any time — no contracts, no surprises."
    >
      <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
        {plans.map((plan, i) => (
          <PlanCard key={plan.tier} plan={plan} index={i} />
        ))}
      </div>
    </Section>
  );
};

export default WebHostingPlan;
