// Pure class-string utility — no React, safe to import from server components.

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "link";
export type ButtonSize = "sm" | "md" | "lg";

export const VARIANT: Record<ButtonVariant, string> = {
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

export const SIZE: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2   text-sm  gap-1.5 rounded-lg",
  md: "px-4   py-2.5 text-sm  gap-1.5 rounded-lg",
  lg: "px-[18px] py-2.5 text-md gap-2   rounded-lg",
};

export const ICON_ONLY_SIZE: Record<ButtonSize, string> = {
  sm: "p-2   rounded-lg",
  md: "p-2.5 rounded-lg",
  lg: "p-3   rounded-lg",
};

export const ICON_SIZE: Record<ButtonSize, string> = {
  sm: "h-4 w-4",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
}: { variant?: ButtonVariant; size?: ButtonSize } = {}): string {
  return [
    "inline-flex items-center justify-center gap-2",
    "font-sans font-semibold transition-colors duration-150 select-none",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-border-brand focus-visible:ring-offset-2",
    VARIANT[variant],
    SIZE[size],
  ]
    .filter(Boolean)
    .join(" ");
}
