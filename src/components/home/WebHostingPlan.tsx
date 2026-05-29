"use client";

import { Section } from "@/components/ui/Section";
import { PlanCard } from "./PlanCard";
import { DEFAULT_PLANS, type Plan } from "./plans";

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
