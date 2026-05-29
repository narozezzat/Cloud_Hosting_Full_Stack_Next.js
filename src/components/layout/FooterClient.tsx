"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { Logo } from "@/components/brand/Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

// Routes whose content already fills the viewport — the footer's top margin
// would otherwise read as an empty gap above the footer.
const FULL_BLEED_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const FOOTER_COLS: {
  title: string;
  links: { label: string; href: string }[];
}[] = [
    {
      title: "Product",
      links: [
        { label: "Hosting Plans", href: "/#plans" },
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/#plans" },
        { label: "Articles", href: "/articles?pageNumber=1" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/articles?pageNumber=1" },
        { label: "Contact", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Docs", href: "#" },
        { label: "Status", href: "#" },
        { label: "Support", href: "#" },
        { label: "API", href: "#" },
      ],
    },
  ];

export default function FooterClient() {
  const pathname = usePathname() || "/";
  if (pathname.startsWith("/admin")) return null;

  const fullBleed = FULL_BLEED_ROUTES.includes(pathname);

  return (
    <footer
      className={cn(
        "relative border-t border-border bg-card/40",
        fullBleed ? "mt-0" : "mt-24",
      )}
    >
      {/* gradient top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />

      <div className="container py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5 space-y-5">
            <Logo />
            <p className="max-w-sm text-sm text-muted-foreground">
              Fast, secure, and reliable cloud hosting built for developers and
              teams who care about craft.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex max-w-sm gap-2"
            >
              <Input
                type="email"
                placeholder="you@company.com"
                aria-label="Email for newsletter"
              />
              <Button type="submit" size="md" aria-label="Subscribe">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Cloud Hosting. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <SocialLink href="#" label="GitHub">
              <FaGithub className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="#" label="X / Twitter">
              <FaXTwitter className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="#" label="LinkedIn">
              <FaLinkedinIn className="h-4 w-4" />
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-brand-500/40 hover:text-brand-500"
    >
      {children}
    </Link>
  );
}
