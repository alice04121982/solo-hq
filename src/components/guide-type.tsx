import { ShapeMark, type ShapeName } from "./shapes";

/**
 * The format system for resources: every entry format gets a fixed mark from
 * the bank, the same way every family pathway does in FAMILY_SHAPES — so a
 * checklist is recognisable before its title is read, and the resources page
 * can key its filters and cards off the marks instead of bare text labels.
 *
 * Keyed by plain string because the library also badges non-guide entries
 * (hub pages, script collections); an unknown format falls back to the
 * asterisk, the bank's reference mark.
 */
export const GUIDE_TYPE_MARKS: Record<string, ShapeName> = {
  Guide: "bloom", // the core reading pieces take the site's lead mark
  Explainer: "egg", // understanding what is happening
  Checklist: "cross", // the × marked against each item
  Template: "pause", // hard-edged bars: structure you fill in
  Script: "halves", // two halves of a conversation
  Scripts: "halves",
  Directory: "asterisk", // the reference mark — points elsewhere
  "Reading list": "asterisk", // a directory of books
  Hub: "asterisk", // a page that gathers everything on a topic
  Stories: "spark",
};

/** The format label with its mark — the compact form used on cards. */
export function GuideTypeBadge({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 text-[11px] font-[600] uppercase tracking-[0.12em] text-muted font-sans",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ShapeMark name={GUIDE_TYPE_MARKS[type] ?? "asterisk"} size={11} style={{ color: "var(--lavender)" }} />
      {type}
    </span>
  );
}
