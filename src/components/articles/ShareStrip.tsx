"use client";

import * as React from "react";
import { Share2, Link as LinkIcon, Check } from "lucide-react";
import { FaXTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import { toast } from "react-toastify";

interface ShareStripProps {
  title: string;
}

export function ShareStrip({ title }: ShareStripProps) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  const url =
    typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const text = encodeURIComponent(title);

  const links = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      icon: <FaXTwitter className="h-3.5 w-3.5" />,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      icon: <FaLinkedinIn className="h-3.5 w-3.5" />,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      icon: <FaFacebookF className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <div className="my-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/15 to-accent-500/15 text-brand-500">
          <Share2 className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold">Enjoyed this?</p>
          <p className="text-xs text-muted-foreground">
            Share it with someone who'd benefit.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${l.label}`}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-brand-500/40 hover:text-brand-500"
          >
            {l.icon}
          </a>
        ))}
        <button
          type="button"
          onClick={copy}
          aria-label="Copy link"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-brand-500/40 hover:text-brand-500"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-success" />
          ) : (
            <LinkIcon className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
