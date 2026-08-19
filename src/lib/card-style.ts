/**
 * Colour treatments for the clinic finder's cards.
 *
 * Three surfaces are defined here so they can be compared on the real page
 * with real data, rather than in a mockup:
 *
 *   paper    white fill, warm hairline edge. The quietest option — the data
 *            is the only colour on the card.
 *   citrus   filled with the pale yellow the HFEA verified badge already
 *            uses, promoted to a solid surface. Warmer, and it ties the
 *            cards to the badge.
 *   outline  no fill at all: the cream band shows through a teal hairline.
 *            The most editorial, and the lightest on the page.
 *
 * All three drop the grey border entirely (grey on the cream band goes
 * muddy) and share the same dark-green hover.
 *
 * The defaults below are what ships. `?cards=paper|citrus|outline` on the
 * finder overrides both grids at once, so the three can be flipped between
 * without a rebuild.
 */
export type ClinicCardVariant = "paper" | "citrus" | "outline";

export const CLINIC_CARD_VARIANTS: ClinicCardVariant[] = ["paper", "citrus", "outline"];

/**
 * The top-performers strip is three cards that are meant to read as picked
 * out, so it takes the citrus fill; the seventeen-card results grid stays on
 * paper, where seventeen yellow cards would be a lot of yellow.
 */
export const DEFAULT_TOP_PERFORMER_VARIANT: ClinicCardVariant = "citrus";
export const DEFAULT_RESULT_VARIANT: ClinicCardVariant = "paper";

/** The URL parameter that overrides both grids. */
export const CARD_VARIANT_PARAM = "cards";

export function parseCardVariant(raw: string | null): ClinicCardVariant | null {
  return CLINIC_CARD_VARIANTS.includes(raw as ClinicCardVariant)
    ? (raw as ClinicCardVariant)
    : null;
}

const VARIANT_CLASS: Record<ClinicCardVariant, string> = {
  paper: "",
  citrus: "clinic-card--citrus",
  outline: "clinic-card--outline",
};

/**
 * The class list for a card surface. The colours themselves live on
 * `.clinic-card` in globals.css as custom properties, which is what lets the
 * hover state re-tint the whole card — badges and buttons included — from a
 * single rule.
 */
export function clinicCardClasses(variant: ClinicCardVariant, isSelected: boolean): string {
  return [
    "clinic-card",
    VARIANT_CLASS[variant],
    isSelected && "clinic-card--selected",
    "rounded-[24px] p-5 flex flex-col",
  ]
    .filter(Boolean)
    .join(" ");
}
