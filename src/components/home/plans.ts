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

export const DEFAULT_PLANS: Plan[] = [
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
