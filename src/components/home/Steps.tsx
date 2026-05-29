"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { fadeInUp } from "@/lib/animations";

const STEPS = [
  {
    n: "01",
    title: "Connect your repo",
    body: "Sign in with GitHub, GitLab, or Bitbucket. Pick a project — we handle the rest.",
  },
  {
    n: "02",
    title: "We auto-detect & build",
    body: "Frameworks, environment, and dependencies are detected automatically. No yaml gymnastics.",
  },
  {
    n: "03",
    title: "Ship to the edge",
    body: "Every push deploys to 200+ POPs in seconds. Roll back any release instantly.",
  },
];

export function Steps() {
  return (
    <Section
      eyebrow="How it works"
      title="From git push to global in seconds"
      subtitle="Three steps. Zero config. Sane defaults that respect your time."
    >
      <div className="relative grid gap-6 lg:grid-cols-3">
        {/* connector line on desktop */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
        />
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            {...fadeInUp({ delay: i * 0.1 })}
            className="relative flex flex-col items-start gap-4 rounded-xl bg-card p-6 shadow-sm border border-border/60"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 font-display text-base font-bold text-white shadow-md">
              {s.n}
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
