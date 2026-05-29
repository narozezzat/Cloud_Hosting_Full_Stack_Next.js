import * as React from "react";
import { cn } from "@/lib/cn";

export interface FormFieldProps {
  label: React.ReactNode;
  /** Associates the label with its control. */
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

/** A labelled form control wrapper: `<label>` + spacing + the field itself. */
export function FormField({ label, htmlFor, className, children }: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
