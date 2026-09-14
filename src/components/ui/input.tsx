"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export type InputSize = "sm" | "md";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  label?: string;
  hint?: string;
  /** Setting this string triggers the destructive/error state and shows it as hint text */
  error?: string;
  leadingIcon?: ReactNode;
  required?: boolean;
}

// KLEO Input field — Default type, sm/md sizes, with label/hint/error composition
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      size = "md",
      label,
      hint,
      error,
      leadingIcon,
      required,
      id,
      className = "",
      disabled,
      ...props
    },
    ref
  ) {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const hintId = inputId ? `${inputId}-hint` : undefined;
    const isError = Boolean(error);

    const inputClasses = [
      "w-full font-sans bg-bg-primary text-text-primary",
      // shadow-sm matches Figma's shadow-xs: 0px 1px 2px rgba(10,13,18,0.05)
      "border rounded-lg shadow-sm transition-colors duration-150",
      "placeholder:text-text-placeholder",
      "focus:outline-none focus:ring-2 focus:ring-offset-0",
      // size
      size === "sm"
        ? "px-3 py-2 text-sm"
        : "px-3.5 py-2.5 text-sm",
      // leading icon padding
      leadingIcon ? (size === "sm" ? "pl-9" : "pl-10") : "",
      // state — error vs default
      isError
        ? "border-border-error focus:ring-border-error/20 focus:border-border-error"
        : "border-border-primary focus:ring-border-brand/20 focus:border-border-brand",
      // disabled
      disabled
        ? "bg-bg-disabled text-text-disabled border-border-disabled cursor-not-allowed opacity-60"
        : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium font-sans text-text-secondary"
          >
            {label}
            {/* brand-tertiary matches Figma's required asterisk colour (not error-red) */}
            {required && (
              <span className="ml-0.5 text-text-brand-tertiary" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {leadingIcon && (
            <span
              className={[
                "pointer-events-none absolute inset-y-0 left-0 flex items-center text-fg-tertiary",
                size === "sm" ? "pl-3" : "pl-3.5",
              ].join(" ")}
              aria-hidden="true"
            >
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={isError || undefined}
            aria-describedby={hintId}
            className={inputClasses}
            {...props}
          />
        </div>

        {(error || hint) && (
          <p
            id={hintId}
            className={[
              "text-xs font-sans",
              isError ? "text-text-error-primary" : "text-text-tertiary",
            ].join(" ")}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    );
  }
);
