"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Bolt,
  ShieldCheck,
  GitBranch,
  Cloud,
  LineChart,
  Lock,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const FEATURES = [
  {
    icon: Bolt,
    title: "Edge-fast",
    body: "Deployed across 200+ POPs worldwide. Your users get sub-50ms response times.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    body: "Free SSL, DDoS protection, and continuous WAF rules tuned by our security team.",
  },
  {
    icon: GitBranch,
    title: "Git-driven deploys",
    body: "Push to deploy. Preview every PR. Roll back instantly when something breaks.",
  },
  {
    icon: Cloud,
    title: "Scale on demand",
    body: "Burst from idle to 10k req/s without lifting a finger. Pay only for what you use.",
  },
  {
    icon: LineChart,
    title: "Built-in analytics",
    body: "Real-user metrics, error tracking, and a dashboard that doesn't get in your way.",
  },
  {
    icon: Lock,
    title: "Privacy-first",
    body: "GDPR-compliant infrastructure. Your data stays in the region you choose.",
  },
];

export function Features() {
  return (
    <Section
      eyebrow="Why us"
      title="Everything you need, nothing you don't"
      subtitle="Built by developers who've shipped — for developers who ship."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card variant="elevated" className="h-full p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/15 to-accent-500/15 text-brand-500">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
