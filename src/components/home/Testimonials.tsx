"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const TESTIMONIALS = [
  {
    quote:
      "Moved 14 production services in a weekend. The deploy DX is genuinely the best I've used.",
    author: "Priya Shah",
    role: "Staff Engineer, Lumen",
  },
  {
    quote:
      "Our p95 dropped 40% the day we cut over. Support actually answered on a Sunday.",
    author: "Marcus Lee",
    role: "CTO, Spool",
  },
  {
    quote:
      "Finally, a hosting platform that doesn't feel like 2014. Beautiful and fast.",
    author: "Ana Costa",
    role: "Indie maker",
  },
];

export function Testimonials() {
  return (
    <Section
      eyebrow="Loved by teams"
      title="The kind of words you can't fake"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.author}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <Card variant="elevated" className="h-full p-6">
              <Quote className="h-6 w-6 text-brand-500/40" />
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                “{t.quote}”
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-sm font-bold text-white">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
