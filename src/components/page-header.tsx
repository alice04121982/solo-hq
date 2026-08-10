import type { ReactNode } from "react";
import { Section } from "./section";
import { ShapeMark, type ShapeName } from "./shapes";

/**
 * The shape-led header band for top-level pages.
 *
 * Top panels carry the same shape language as the homepage sections: the
 * eyebrow takes a small mark from the bank, and the band takes the same mark
 * oversized as a backdrop, cropped by the section edge. Pass the mark that
 * says what the page is about — spark for stories (the day it works), egg
 * for the science, asterisk (the reference mark) for resources.
 */
interface PageHeaderProps {
  /** The page's mark — small in the eyebrow, oversized in the backdrop. */
  mark: ShapeName;
  eyebrow: string;
  title: string;
  lede: string;
  /** Small print under the lede. */
  note?: string;
  /** Chips, filters, or anchors that belong with the header copy. */
  children?: ReactNode;
}

export function PageHeader({ mark, eyebrow, title, lede, note, children }: PageHeaderProps) {
  return (
    <Section band={0} padding="pt-16 pb-14 md:pt-24 md:pb-16" backdrop={{ shape: mark }}>
      <p className="text-[11px] font-[600] uppercase tracking-[0.15em] text-teal mb-4 font-sans flex items-center gap-2">
        <ShapeMark name={mark} size={14} style={{ color: "var(--lavender)" }} />
        {eyebrow}
      </p>
      <h1
        className="font-sans font-bold text-foreground mb-5"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}
      >
        {title}
      </h1>
      <p className="text-[17px] font-sans text-muted leading-relaxed" style={{ maxWidth: "52ch" }}>
        {lede}
      </p>
      {note && (
        <p className="text-sm font-sans text-muted leading-relaxed mt-4" style={{ maxWidth: "52ch" }}>
          {note}
        </p>
      )}
      {children && <div className="mt-10">{children}</div>}
    </Section>
  );
}
