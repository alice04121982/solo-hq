import { ShapeMark, type ShapeName } from "./shapes";
import type { Guide } from "@/lib/guides";

/**
 * The format system for resources: every guide format gets a fixed mark from
 * the bank, the same way every family pathway does in FAMILY_SHAPES — so a
 * checklist is recognisable before its title is read, and the resources page
 * can key its filters and cards off the marks instead of bare text labels.
 */
export type GuideType = Guide["type"];

export const GUIDE_TYPE_MARKS: Record<GuideType, ShapeName> = {
  Guide: "bloom", // the core reading pieces take the site's lead mark
  Explainer: "egg", // understanding what is happening
  Checklist: "cross", // the × marked against each item
  Template: "pause", // hard-edged bars: structure you fill in
  Script: "halves", // two halves of a conversation
  Directory: "asterisk", // the reference mark — points elsewhere
  "Reading list": "asterisk", // a directory of books
  Stories: "spark",
};

/** The format label with its mark — the compact form used on cards. */
export function GuideTypeBadge({
  type,
  className,
}: {
  type: GuideType;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 text-[10px] font-[600] uppercase tracking-[0.12em] text-teal font-sans",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <ShapeMark name={GUIDE_TYPE_MARKS[type]} size={12} style={{ color: "var(--lavender)" }} />
      {type}
    </span>
  );
}
