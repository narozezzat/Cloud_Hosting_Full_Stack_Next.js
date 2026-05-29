"use client";

import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input, type InputProps } from "@/components/ui/Input";

export type PasswordInputProps = Omit<InputProps, "type" | "rightIcon">;

/**
 * Password field with a built-in show/hide toggle. Defaults to a lock left icon
 * (override via `leftIcon`). Everything else forwards to the underlying `Input`.
 */
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ leftIcon, ...props }, ref) => {
    const [show, setShow] = React.useState(false);

    return (
      <Input
        ref={ref}
        type={show ? "text" : "password"}
        leftIcon={leftIcon ?? <Lock className="h-4 w-4" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="cursor-pointer hover:text-foreground"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        {...props}
      />
    );
  },
);
PasswordInput.displayName = "PasswordInput";
