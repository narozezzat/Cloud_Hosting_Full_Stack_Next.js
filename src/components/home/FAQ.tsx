"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/Section";

const FAQS = [
  {
    q: "Is there a free trial?",
    a: "Yes — every plan comes with a 14-day trial, no credit card required.",
  },
  {
    q: "Can I bring my own domain?",
    a: "Absolutely. We provision SSL automatically and propagate DNS in under a minute.",
  },
  {
    q: "What runtimes do you support?",
    a: "Node.js, Bun, Deno, Python, Go, Ruby, PHP, Elixir, and static sites — all first-class.",
  },
  {
    q: "Where is my data stored?",
    a: "You pick the region at deploy time. We never replicate data outside your chosen region without explicit opt-in.",
  },
  {
    q: "What about support?",
    a: "Email + chat for everyone, and 24/7 phone + on-call escalation on Business.",
  },
];

export function FAQ() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <Section
      eyebrow="FAQ"
      title="Questions, answered"
      subtitle="Still curious? Reach out — we read every message."
      containerClassName="max-w-3xl"
    >
      <div className="divide-y divide-border rounded-xl border border-border bg-card">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
                aria-expanded={isOpen}
              >
                <span className="font-display text-base font-semibold">
                  {item.q}
                </span>
                <Plus
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-enter",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
