import * as React from "react";

/** Decorative SVG used in the auth split-layout side panel. */
export function AuthArt({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="authGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--brand-500))" />
          <stop offset="100%" stopColor="rgb(var(--accent-500))" />
        </linearGradient>
      </defs>

      {/* Floating cards */}
      <g opacity="0.95">
        <rect
          x="60"
          y="120"
          width="200"
          height="120"
          rx="18"
          fill="rgb(255 255 255 / 0.12)"
          stroke="rgb(255 255 255 / 0.25)"
        />
        <rect x="80" y="142" width="60" height="10" rx="5" fill="rgb(255 255 255 / 0.5)" />
        <rect x="80" y="162" width="140" height="8" rx="4" fill="rgb(255 255 255 / 0.3)" />
        <rect x="80" y="180" width="120" height="8" rx="4" fill="rgb(255 255 255 / 0.3)" />
        <rect x="80" y="210" width="80" height="22" rx="11" fill="rgb(255 255 255 / 0.85)" />
      </g>

      <g opacity="0.95">
        <rect
          x="140"
          y="250"
          width="220"
          height="140"
          rx="22"
          fill="rgb(255 255 255 / 0.18)"
          stroke="rgb(255 255 255 / 0.3)"
        />
        <circle cx="172" cy="282" r="14" fill="rgb(255 255 255 / 0.7)" />
        <rect x="196" y="276" width="90" height="8" rx="4" fill="rgb(255 255 255 / 0.55)" />
        <rect x="196" y="290" width="70" height="6" rx="3" fill="rgb(255 255 255 / 0.35)" />
        <rect x="160" y="320" width="180" height="8" rx="4" fill="rgb(255 255 255 / 0.35)" />
        <rect x="160" y="336" width="120" height="8" rx="4" fill="rgb(255 255 255 / 0.35)" />
        <rect x="160" y="358" width="100" height="20" rx="10" fill="rgb(255 255 255 / 0.85)" />
      </g>

      {/* Stars */}
      <g fill="rgb(255 255 255 / 0.8)">
        <circle cx="60" cy="60" r="3" />
        <circle cx="340" cy="80" r="2" />
        <circle cx="380" cy="180" r="3" />
        <circle cx="40" cy="280" r="2" />
        <circle cx="60" cy="420" r="3" />
        <circle cx="340" cy="440" r="2" />
      </g>
    </svg>
  );
}
