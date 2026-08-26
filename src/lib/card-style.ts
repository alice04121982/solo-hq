/**
 * Colour treatments for the clinic finder's cards.
 *
 * Two surfaces are defined here so they can be compared on the real page
 * with real data, rather than in a mockup:
 *
 *   paper    white fill, warm hairline edge. The quietest option — the data
 *            is the only colour on the card.
 *   outline  no fill at all: the cream band shows through a teal hairline.
 *            The most editorial, and the lightest on the page.
 *
 * A pale-yellow fill was tried and dropped: yellow cards on the pink band
 * clash, so the citrus surface is deliberately not an option here. The badge
 * keeps the yellow; the card does not.
 *
 * Both drop the grey border entirely (grey on the cream band goes muddy) and
 * share the same dark-green hover.
 *
 * The defaults below are what ships. `?cards=paper|outline` on the finder
 * overrides both grids at once, so the two can be flipped between without a
 * rebuild.
 */
export type ClinicCardVariant = "paper" | "outline";

export const CLINIC_CARD_VARIANTS: ClinicCardVariant[] = ["paper", "outline"];

/**
 * Both grids ship on paper. The top-performers strip is picked out by its
 * heading and its position above the list, not by a different fill.
 */
export const DEFAULT_TOP_PERFORMER_VARIANT: ClinicCardVariant = "paper";
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
