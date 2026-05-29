import * as React from "react";

interface UseControllableStateParams {
  /** Controlled value. When defined, the hook is in controlled mode. */
  prop?: boolean;
  /** Initial value when uncontrolled. */
  defaultProp?: boolean;
  /** Called whenever the value changes (controlled or not). */
  onChange?: (value: boolean) => void;
}

/**
 * Supports both controlled and uncontrolled boolean state (e.g. modal `open`).
 * When `prop` is provided the component is controlled; otherwise internal state
 * is used. `onChange` always fires so parents can react in either mode.
 */
export function useControllableState({
  prop,
  defaultProp = false,
  onChange,
}: UseControllableStateParams): [boolean, (next: boolean) => void] {
  const isControlled = prop !== undefined;
  const [internal, setInternal] = React.useState(defaultProp);
  const value = isControlled ? (prop as boolean) : internal;

  const setValue = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [value, setValue];
}
