"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { AuthArt } from "@/components/illustrations/AuthArt";
import { GradientBlob } from "@/components/ui/GradientBlob";

const TAGLINES = [
  "Ship fast. Sleep well.",
  "Premium hosting for builders.",
  "Edge-fast, by default.",
  "Deploy with confidence.",
];

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function AuthLayout({
  eyebrow,
  title,
  subtitle,
  footer,
  children,
}: AuthLayoutProps) {
  const [taglineIndex, setTaglineIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(
      () => setTaglineIndex((i) => (i + 1) % TAGLINES.length),
      3500,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Left — form */}
      <div className="relative flex items-center justify-center px-6 py-12 sm:px-10">
        <GradientBlob position="bottom-right" size="md" />
        <div className="relative w-full max-w-md space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-500">
              {eyebrow}
            </span>
            <h1 className="font-display text-display-sm font-extrabold tracking-tight text-balance">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {children}

          {footer && (
            <div className="text-center text-sm text-muted-foreground">
              {footer}
            </div>
          )}
        </div>
      </div>

      {/* Right — illustration panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="relative z-10 flex items-center justify-between text-white">
          <Logo
            href="/"
            showWordmark={true}
            className="text-white [&>span]:text-white [&_span]:!text-white"
          />
        </div>

        {/* Background art */}
        <AuthArt className="absolute inset-0 h-full w-full opacity-90" />
        <GradientBlob
          position="top-left"
          size="lg"
          from="rgb(255 255 255 / 0.25)"
          via="rgb(255 255 255 / 0.05)"
        />

        <div className="relative z-10 max-w-md space-y-4 text-white">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl font-extrabold tracking-tight"
            >
              {TAGLINES[taglineIndex]}
            </motion.p>
          </AnimatePresence>
          <p className="text-white/80">
            Join 12,000+ developers shipping on Cloud Hosting.
          </p>
        </div>
      </div>
    </section>
  );
}
