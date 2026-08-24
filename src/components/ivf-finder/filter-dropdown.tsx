"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronDown, X } from "lucide-react";

/**
 * The finder's filter row is built from one control shape: a pill trigger that
 * opens a panel of options. Every filter uses it — multi-select, single-select
 * and the country picker — so the row reads as one instrument rather than a
 * stack of unrelated widgets.
 *
 * Panels are bordered bg-background surfaces, in keeping with the finder's
 * no-shadow elevation.
 */

/** Shared trigger styling, so every pill in the row lines up. */
const TRIGGER_BASE =
  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors";

function triggerClasses(active: boolean): string {
  return `${TRIGGER_BASE} bg-background ${
    active
      ? "border-teal text-teal"
      : "border-teal/20 text-teal hover:bg-surface-hover"
  }`;
}

/** Panel width, matching the `w-64` below. Used for edge-collision checks. */
const PANEL_WIDTH = 256;
const VIEWPORT_MARGIN = 16;

interface FilterDropdownProps {
  /** Text on the trigger pill. */
  triggerLabel: string;
  /** Highlights the trigger: the filter is narrowing the list. */
  active?: boolean;
  /** Accessible name for the panel, when the trigger text alone is thin. */
  panelLabel: string;
  /** Explanatory line under the options, where a filter needs one. */
  note?: string;
  /** Dismisses the panel once an option is chosen, for single-value filters. */
  closeOnSelect?: boolean;
  children: React.ReactNode;
}

/**
 * Trigger + panel shell: open state, outside-click and Escape dismissal. The
 * options themselves come from the caller.
 */
export function FilterDropdown({
  triggerLabel,
  active = false,
  panelLabel,
  note,
  closeOnSelect = false,
  children,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  // Panels hang left of their trigger until that would run off the viewport,
  // then flip to the right edge. Decided on open, so the panel never appears
  // in one place and jumps to another.
  const [alignRight, setAlignRight] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  /** Closing by keyboard or by choosing an option hands focus back. */
  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  const closeAndFocus = useCallback(() => close(true), [close]);

  const toggle = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const overflowsRight = rect.left + PANEL_WIDTH > window.innerWidth - VIEWPORT_MARGIN;
      setAlignRight(overflowsRight && rect.right - PANEL_WIDTH > VIEWPORT_MARGIN);
    }
    setOpen((o) => !o);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={open ? panelId : undefined}
        className={triggerClasses(active || open)}
      >
        <span className="max-w-[15rem] truncate">{triggerLabel}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div
          id={panelId}
          role="group"
          aria-label={panelLabel}
          className={`absolute top-full mt-2 z-30 w-64 max-w-[calc(100vw-3rem)] rounded-2xl bg-background border border-border p-2 ${
            alignRight ? "right-0" : "left-0"
          }`}
        >
          {/* Change events from the inputs bubble to here, so a single-value
              filter can dismiss itself the moment it is answered. */}
          <div
            className="max-h-72 overflow-y-auto"
            onChange={closeOnSelect ? closeAndFocus : undefined}
          >
            {children}
          </div>
          {note && (
            <p className="border-t border-border mt-1 pt-2 px-3 pb-1 text-xs text-muted">{note}</p>
          )}
        </div>
      )}
    </div>
  );
}

/** One row inside a panel: a checkbox or radio, its label, optional flag. */
function OptionRow({
  type,
  name,
  checked,
  onSelect,
  children,
}: {
  type: "checkbox" | "radio";
  name?: string;
  checked: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground cursor-pointer hover:bg-surface-hover transition-colors">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onSelect}
        className={`h-4 w-4 accent-(--teal) ${type === "checkbox" ? "rounded" : ""}`}
      />
      <span className="font-medium">{children}</span>
    </label>
  );
}

export interface FilterOption<T> {
  value: T;
  label: string;
  /** Shorter form for the trigger pill, where the full label is a mouthful. */
  shortLabel?: string;
  /** Rendered before the label inside the panel, e.g. a country flag. */
  prefix?: ReactNode;
}

interface MultiSelectProps<T> {
  label: string;
  options: FilterOption<T>[];
  selected: T[];
  onChange: (values: T[]) => void;
  note?: string;
}

/**
 * Multi-select filter: any number of options, none of them gating results.
 * Clearing the selection returns every clinic.
 *
 * The pill names what is selected — "Region: Europe +1" — rather than showing
 * a bare count, so the current narrowing is readable without opening anything.
 */
export function MultiSelectDropdown<T extends string>({
  label,
  options,
  selected,
  onChange,
  note,
}: MultiSelectProps<T>) {
  const toggle = (value: T) =>
    onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]);

  // Summarised in the options' own order, so the pill reads the same however
  // the selection was built up.
  const chosen = options.filter((o) => selected.includes(o.value));
  const first = chosen[0]?.shortLabel ?? chosen[0]?.label;
  const triggerLabel =
    chosen.length === 0
      ? label
      : `${label}: ${first}${chosen.length > 1 ? ` +${chosen.length - 1}` : ""}`;

  return (
    <FilterDropdown
      triggerLabel={triggerLabel}
      active={selected.length > 0}
      panelLabel={label}
      note={note}
    >
      {options.map((o) => (
        <OptionRow
          key={o.value}
          type="checkbox"
          checked={selected.includes(o.value)}
          onSelect={() => toggle(o.value)}
        >
          {o.prefix && (
            <span aria-hidden className="mr-2">
              {o.prefix}
            </span>
          )}
          {o.label}
        </OptionRow>
      ))}
      <div className="border-t border-border mt-1 pt-2 px-3 pb-1">
        <button
          type="button"
          onClick={() => onChange([])}
          disabled={selected.length === 0}
          className="text-sm text-muted hover:text-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear selection
        </button>
      </div>
    </FilterDropdown>
  );
}

interface SingleSelectProps<T> {
  label: string;
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** The value that counts as "not narrowing", so the pill stays quiet. */
  defaultValue: T;
  /**
   * Keeps the chosen value on the pill even at the default — for age, where
   * the value drives the ranking and must always be readable.
   */
  alwaysShowValue?: boolean;
  note?: string;
}

/**
 * Single-select filter. The pill carries the chosen value once it differs from
 * the default, so the row states the current narrowing without being opened.
 */
export function SingleSelectDropdown<T extends string>({
  label,
  options,
  value,
  onChange,
  defaultValue,
  alwaysShowValue = false,
  note,
}: SingleSelectProps<T>) {
  const name = useId();
  const selected = options.find((o) => o.value === value);
  const isDefault = value === defaultValue;
  const showValue = selected != null && (alwaysShowValue || !isDefault);

  return (
    <FilterDropdown
      triggerLabel={showValue ? `${label}: ${selected.shortLabel ?? selected.label}` : label}
      active={!isDefault}
      panelLabel={label}
      note={note}
      closeOnSelect
    >
      {options.map((o) => (
        <OptionRow
          key={o.value}
          type="radio"
          name={name}
          checked={o.value === value}
          onSelect={() => onChange(o.value)}
        >
          {o.label}
        </OptionRow>
      ))}
    </FilterDropdown>
  );
}

/**
 * A standalone yes/no filter, sized to sit in the same row as the dropdowns.
 * Active state carries an inline remove affordance, like the filter Tags.
 */
export function FilterTogglePill({
  label,
  active,
  onToggle,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={
        active
          ? `${TRIGGER_BASE} bg-teal border-teal text-on-teal`
          : triggerClasses(false)
      }
    >
      {label}
      {active && <X className="h-4 w-4" aria-hidden />}
    </button>
  );
}
