import * as React from "react";

/**
 * Inline SVG illustration for the marketing hero.
 * Pure SVG — themable via currentColor and CSS variables.
 */
export function CloudHero({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="cloudGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--brand-400))" />
          <stop offset="100%" stopColor="rgb(var(--accent-500))" />
        </linearGradient>
        <linearGradient id="serverGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--surface-0))" />
          <stop offset="100%" stopColor="rgb(var(--surface-2))" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dy="6" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Backdrop blob */}
      <ellipse
        cx="240"
        cy="200"
        rx="200"
        ry="140"
        fill="url(#cloudGrad)"
        opacity="0.18"
      />

      {/* Floating cloud (large) */}
      <g filter="url(#softShadow)">
        <path
          d="M120 180c-22 0-40 18-40 40 0 22 18 40 40 40h220c28 0 50-22 50-50 0-25-19-46-44-49-4-30-30-53-61-53-25 0-46 14-57 35-3-1-7-1-10-1-22 0-40 17-40 38z"
          fill="url(#cloudGrad)"
        />
      </g>

      {/* Server stack */}
      <g filter="url(#softShadow)">
        <rect
          x="180"
          y="140"
          width="120"
          height="120"
          rx="14"
          fill="url(#serverGrad)"
          stroke="rgb(var(--border))"
          strokeWidth="1"
        />
        <rect x="196" y="160" width="88" height="20" rx="6" fill="rgb(var(--brand-100))" />
        <circle cx="206" cy="170" r="3" fill="rgb(var(--success))" />
        <circle cx="218" cy="170" r="3" fill="rgb(var(--warning))" />

        <rect x="196" y="190" width="88" height="20" rx="6" fill="rgb(var(--brand-100))" />
        <circle cx="206" cy="200" r="3" fill="rgb(var(--success))" />
        <circle cx="218" cy="200" r="3" fill="rgb(var(--brand-400))" />

        <rect x="196" y="220" width="88" height="20" rx="6" fill="rgb(var(--brand-100))" />
        <circle cx="206" cy="230" r="3" fill="rgb(var(--success))" />
        <circle cx="218" cy="230" r="3" fill="rgb(var(--success))" />
      </g>

      {/* Floating accent dots */}
      <circle cx="80" cy="100" r="6" fill="rgb(var(--accent-500))" opacity="0.6" />
      <circle cx="420" cy="80" r="4" fill="rgb(var(--brand-500))" opacity="0.6" />
      <circle cx="100" cy="300" r="5" fill="rgb(var(--brand-400))" opacity="0.5" />
      <circle cx="400" cy="290" r="6" fill="rgb(var(--accent-400))" opacity="0.5" />

      {/* Orbiting ring */}
      <ellipse
        cx="240"
        cy="200"
        rx="180"
        ry="60"
        stroke="rgb(var(--brand-500))"
        strokeWidth="1"
        strokeDasharray="4 6"
        opacity="0.35"
        fill="none"
      />
    </svg>
  );
}
