import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GradientBlob } from "@/components/ui/GradientBlob";

export function FinalCTA() {
  return (
    <section className="container py-20">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 px-8 py-16 text-center text-white shadow-xl sm:py-20">
        <GradientBlob
          position="top-right"
          size="lg"
          from="rgb(255 255 255 / 0.25)"
          via="rgb(255 255 255 / 0.05)"
        />
        <GradientBlob
          position="bottom-left"
          size="md"
          from="rgb(255 255 255 / 0.2)"
          via="rgb(255 255 255 / 0.05)"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-display-sm font-extrabold sm:text-display-md text-balance">
            Ready to ship something you're proud of?
          </h2>
          <p className="mt-4 text-white/85 text-balance">
            Spin up your first deploy in under a minute. 14-day free trial — no
            credit card required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-white text-brand-600 hover:bg-white/90"
            >
              <Link href="/register">
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <Link href="/about">Talk to us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
