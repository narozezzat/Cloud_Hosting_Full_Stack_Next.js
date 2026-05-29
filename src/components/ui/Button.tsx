"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-all duration-hover ease-out-quint disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-sm hover:shadow-md hover:brightness-105 active:brightness-95",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-ink-200/70 dark:hover:bg-ink-200",
        ghost:
          "bg-transparent text-foreground hover:bg-secondary",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-secondary",
        danger:
          "bg-destructive text-destructive-foreground hover:brightness-110 active:brightness-95 shadow-sm",
        link:
          "text-brand-500 underline-offset-4 hover:underline px-0 h-auto",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    // Radix Slot requires exactly ONE child element — when asChild is true we
    // can't inject a sibling spinner, so we render the spinner inside the
    // child element itself by cloning it.
    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {React.isValidElement(children)
            ? React.cloneElement(
                children as React.ReactElement,
                undefined,
                <>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  {(children as React.ReactElement).props.children}
                </>,
              )
            : children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
