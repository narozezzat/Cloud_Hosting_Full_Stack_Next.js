import Hero from "@/components/home/Hero";
import WebHostingPlan from "@/components/home/WebHostingPlan";
import { Features } from "@/components/home/Features";
import { Steps } from "@/components/home/Steps";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Steps />
      <WebHostingPlan />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
