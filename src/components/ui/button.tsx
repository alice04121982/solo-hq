"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "link";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
  iconOnly?: boolean;
}

// KLEO emphasis ladder: Primary (one per view) > Secondary > Tertiary > Link
const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-bg-brand-solid text-text-white border border-transparent " +
    "hover:bg-bg-brand-solid-hover " +
    "disabled:bg-bg-disabled disabled:text-text-disabled disabled:border-border-disabled",

  secondary:
    "bg-bg-primary text-text-secondary border border-border-primary " +
    "hover:bg-bg-secondary hover:text-text-primary " +
    "disabled:bg-bg-disabled-subtle disabled:text-text-disabled disabled:border-border-disabled",

  tertiary:
    "bg-transparent text-text-secondary border border-transparent " +
    "hover:bg-bg-secondary-hover hover:text-text-primary " +
    "disabled:text-text-disabled",

  link:
    "bg-transparent text-text-brand-secondary border border-transparent " +
    "hover:text-text-brand-secondary underline-offset-4 hover:underline " +
    "disabled:text-text-disabled",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2   text-sm  gap-1.5 rounded-lg",
  md: "px-4   py-2.5 text-sm  gap-1.5 rounded-lg",
  lg: "px-[18px] py-2.5 text-md gap-2   rounded-lg",
};

const ICON_ONLY_SIZE: Record<ButtonSize, string> = {
  sm: "p-2   rounded-lg",
  md: "p-2.5 rounded-lg",
  lg: "p-3   rounded-lg",
};

const ICON_SIZE: Record<ButtonSize, string> = {
  sm: "h-4 w-4",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

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
          // base
          "inline-flex items-center justify-center font-sans font-semibold",
          "transition-colors duration-150 select-none",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-border-brand focus-visible:ring-offset-2",
          "disabled:pointer-events-none",
          // variant + size
          VARIANT[variant],
          iconOnly ? ICON_ONLY_SIZE[size] : SIZE[size],
          // link variant: strip block padding so it sits inline
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

        {!iconOnly && (
          <span>{children}</span>
        )}

        {!loading && iconTrailing && (
          <span aria-hidden="true" className={ICON_SIZE[size]}>
            {iconTrailing}
          </span>
        )}
      </button>
    );
  }
);
