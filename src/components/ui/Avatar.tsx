import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center bg-gradient-to-br from-brand-500 to-accent-500 font-bold text-white",
  {
    variants: {
      size: {
        sm: "h-9 w-9 text-sm",
        md: "h-11 w-11 text-base",
        lg: "h-12 w-12 text-lg",
        xl: "h-20 w-20 text-3xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-2xl",
      },
    },
    defaultVariants: { size: "sm", shape: "circle" },
  },
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  /** Source name — the uppercased first character is used as the initial. */
  name: string;
}

/** Gradient "initial" avatar used for users and authors across the app. */
export function Avatar({ name, size, shape, className, ...props }: AvatarProps) {
  return (
    <span className={cn(avatarVariants({ size, shape }), className)} {...props}>
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
