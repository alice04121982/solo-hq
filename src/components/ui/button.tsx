"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  VARIANT,
  SIZE,
  ICON_ONLY_SIZE,
  ICON_SIZE,
  type ButtonVariant,
  type ButtonSize,
} from "./button-variants";

// Re-export so existing imports from "./button" keep working.
export type { ButtonVariant, ButtonSize } from "./button-variants";
export { buttonVariants } from "./button-variants";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
  iconOnly?: boolean;
}

function Spinner({ size }: { size: ButtonSize }) {
  return (
    <svg
      className={`animate-spin ${ICON_SIZE[size]}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading = false,
      iconLeading,
      iconTrailing,
      iconOnly = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          "inline-flex items-center justify-center font-sans font-semibold",
          "transition-colors duration-150 select-none",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-border-brand focus-visible:ring-offset-2",
          "disabled:pointer-events-none",
          VARIANT[variant],
          iconOnly ? ICON_ONLY_SIZE[size] : SIZE[size],
          variant === "link" ? "h-auto min-h-0 px-0 py-0" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading ? (
          <Spinner size={size} />
        ) : (
          iconLeading && (
            <span aria-hidden="true" className={ICON_SIZE[size]}>
              {iconLeading}
            </span>
          )
        )}

        {!iconOnly && <span>{children}</span>}

        {!loading && iconTrailing && (
          <span aria-hidden="true" className={ICON_SIZE[size]}>
            {iconTrailing}
          </span>
        )}
      </button>
    );
  }
);
