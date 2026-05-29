"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Gauge } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { CloudHero } from "@/components/illustrations/CloudHero";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <GradientBlob position="top-right" size="xl" />
      <GradientBlob
        position="bottom-left"
        size="lg"
        from="rgb(var(--accent-400) / 0.4)"
        via="rgb(var(--brand-400) / 0.3)"
      />

      <div className="container relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <Badge variant="default" className="gap-1.5">
              <Sparkles className="h-3 w-3" />
              New — Faster edge network
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="font-display text-display-md font-extrabold tracking-tight text-balance sm:text-display-lg lg:text-display-xl"
          >
            Premium <span className="text-gradient-brand">cloud hosting</span>{" "}
            for builders who care.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="max-w-xl text-lg text-muted-foreground text-balance"
          >
            Ship fast, sleep well. Globally distributed infrastructure with
            zero-config deploys, automatic backups, and the polish your product
            deserves.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <Link href="/#plans">
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/articles?pageNumber=1">Read the blog</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-brand-500" />
              99.99% uptime SLA
            </span>
            <span className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-brand-500" />
              Sub-50ms edge response
            </span>
            <span>Trusted by 12,000+ devs</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <CloudHero className="mx-auto w-full max-w-lg drop-shadow-xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
