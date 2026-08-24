import {
  BookOpen,
  Compass,
  LayoutTemplate,
  Library,
  Lightbulb,
  ListChecks,
  MessagesSquare,
  Quote,
  Signpost,
  type LucideIcon,
} from "lucide-react";

/**
 * The format system for resources: every entry format gets a flat icon that
 * depicts what the resource actually is — a checklist for checklists, an
 * open book for guides — so the format is recognisable before its title is
 * read. An unknown format falls back to the signpost, the "points elsewhere"
 * mark.
 */
export const GUIDE_TYPE_ICONS: Record<string, LucideIcon> = {
  Guide: BookOpen, // the core reading pieces
  Explainer: Lightbulb, // understanding what is happening
  Checklist: ListChecks, // items to mark off
  Template: LayoutTemplate, // structure you fill in
  Script: MessagesSquare, // two sides of a conversation
  Scripts: MessagesSquare,
  Directory: Signpost, // points elsewhere
  "Reading list": Library, // a shelf of books
  Hub: Compass, // a page that gathers everything on a topic
  Stories: Quote, // people in their own words
};

/**
 * The format's flat icon at a fixed 48px, tinted with the format accent.
 * Decorative — the format is always named in text beside it.
 */
export function GuideTypeIcon({ type, className }: { type: string; className?: string }) {
  const Icon = GUIDE_TYPE_ICONS[type] ?? Signpost;
  return (
    <Icon
      aria-hidden
      strokeWidth={1.75}
      className={["h-12 w-12 shrink-0", className].filter(Boolean).join(" ")}
      style={{ color: "var(--lavender)" }}
    />
  );
}

/** The format label — the compact text form used beside the icon on cards. */
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
        "inline-flex items-center text-[11px] font-[600] uppercase tracking-[0.12em] text-muted font-sans",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {type}
    </span>
  );
}
