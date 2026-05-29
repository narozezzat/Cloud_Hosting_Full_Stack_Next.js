import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About — Cloud Hosting",
  description:
    "We're a small team of builders shipping premium hosting infrastructure.",
};

const STATS = [
  { label: "Developers", value: "12,000+" },
  { label: "Uptime SLA", value: "99.99%" },
  { label: "Regions", value: "28" },
  { label: "Years building", value: "7" },
];

const VALUES = [
  {
    title: "Craft over speed-of-light",
    body: "We'd rather ship something we're proud of than rush a half-baked feature out the door.",
  },
  {
    title: "Honest defaults",
    body: "No dark patterns, no surprise bills. The cheapest plan that fits your use case is the one we recommend.",
  },
  {
    title: "Real humans in support",
    body: "Every ticket is answered by an engineer. No tier-1 scripts, no run-around.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <GradientBlob position="top-right" size="lg" />
        <div className="container py-20 lg:py-28">
          <div className="max-w-3xl space-y-5">
            <Badge variant="default">About us</Badge>
            <h1 className="font-display text-display-md font-extrabold tracking-tight text-balance sm:text-display-lg">
              Premium hosting,{" "}
              <span className="text-gradient-brand">built by a small team</span>{" "}
              who care.
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              Cloud Hosting started in a garage in 2018 with one rule: build the
              hosting platform we wished we had as developers. Seven years
              later, that rule still holds.
            </p>
          </div>
        </div>
      </section>

      <Section align="left" eyebrow="By the numbers" title="Trusted at scale">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s) => (
            <Card key={s.label} variant="elevated" className="p-6">
              <p className="font-display text-3xl font-bold tracking-tight text-gradient-brand">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section align="left" eyebrow="Our values" title="What we believe">
        <div className="grid gap-5 md:grid-cols-3">
          {VALUES.map((v) => (
            <Card key={v.title} variant="elevated" className="p-6">
              <h3 className="font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
