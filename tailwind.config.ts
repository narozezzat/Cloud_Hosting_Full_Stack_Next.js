import type { Config } from "tailwindcss";

const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  important: true,
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        brand: {
          50: withAlpha("--brand-50"),
          100: withAlpha("--brand-100"),
          200: withAlpha("--brand-200"),
          300: withAlpha("--brand-300"),
          400: withAlpha("--brand-400"),
          500: withAlpha("--brand-500"),
          600: withAlpha("--brand-600"),
          700: withAlpha("--brand-700"),
          800: withAlpha("--brand-800"),
          900: withAlpha("--brand-900"),
          DEFAULT: withAlpha("--brand-500"),
        },
        accent: {
          300: withAlpha("--accent-300"),
          400: withAlpha("--accent-400"),
          500: withAlpha("--accent-500"),
          600: withAlpha("--accent-600"),
          DEFAULT: withAlpha("--accent"),
          foreground: withAlpha("--accent-foreground"),
        },
        ink: {
          900: withAlpha("--ink-900"),
          700: withAlpha("--ink-700"),
          500: withAlpha("--ink-500"),
          400: withAlpha("--ink-400"),
          300: withAlpha("--ink-300"),
          200: withAlpha("--ink-200"),
          100: withAlpha("--ink-100"),
        },
        surface: {
          0: withAlpha("--surface-0"),
          1: withAlpha("--surface-1"),
          2: withAlpha("--surface-2"),
          3: withAlpha("--surface-3"),
        },
        background: withAlpha("--background"),
        foreground: withAlpha("--foreground"),
        primary: {
          DEFAULT: withAlpha("--primary"),
          foreground: withAlpha("--primary-foreground"),
        },
        secondary: {
          DEFAULT: withAlpha("--secondary"),
          foreground: withAlpha("--secondary-foreground"),
        },
        muted: {
          DEFAULT: withAlpha("--muted"),
          foreground: withAlpha("--muted-foreground"),
        },
        card: {
          DEFAULT: withAlpha("--card"),
          foreground: withAlpha("--card-foreground"),
        },
        popover: {
          DEFAULT: withAlpha("--popover"),
          foreground: withAlpha("--popover-foreground"),
        },
        destructive: {
          DEFAULT: withAlpha("--destructive"),
          foreground: withAlpha("--destructive-foreground"),
        },
        border: withAlpha("--border"),
        input: withAlpha("--input"),
        ring: withAlpha("--ring"),
        success: withAlpha("--success"),
        warning: withAlpha("--warning"),
        danger: withAlpha("--danger"),
        info: withAlpha("--info"),
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        glow: "var(--shadow-glow)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-xl": ["4.5rem", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
      },
      transitionTimingFunction: {
        "out-quint": "var(--ease-out-quint)",
      },
      transitionDuration: {
        hover: "var(--duration-hover)",
        enter: "var(--duration-enter)",
        layout: "var(--duration-layout)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(8px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms var(--ease-out-quint) both",
        "fade-up": "fade-up 320ms var(--ease-out-quint) both",
        "slide-in-right": "slide-in-right 200ms var(--ease-out-quint) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
