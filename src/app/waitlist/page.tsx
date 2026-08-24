import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { Section } from "@/components/section";
import { ShapeMark } from "@/components/shapes";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Keep in Touch | CairnFertility",
  description: "Get an email when there's something worth telling you about CairnFertility. To join the community itself, apply on the community page — every member is approved by a person.",
};

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto px-6 md:px-12 lg:px-16">
        <SiteNav />
      </div>

      <Section band={0} padding="py-12 md:py-16" backdrop={{ shape: "dots" }}>
        <div className="max-w-2xl">
          <p
            className="text-[13px] font-[600] uppercase tracking-[2px] font-sans flex items-center gap-2 mb-5"
            style={{ color: "var(--teal)" }}
          >
            <ShapeMark name="egg" size={14} style={{ color: "var(--lavender)" }} />
            Keep in touch
          </p>
          <h1
            className="font-sans font-bold text-teal mb-4"
            style={{ fontSize: "clamp(2.75rem, 5vw, 5rem)", lineHeight: 1.06 }}
          >
            Hear from us now and then.
          </h1>
          <p className="text-[16px] font-sans text-muted leading-[1.65]">
            One list, rarely used: new guides, changes to clinic pricing, and anything about IVF funding or the law that we think you&apos;d want to know. Leave your email and that is all it does.
          </p>
        </div>
      </Section>

      <Section band={1} padding="py-12 md:py-16">
        <div className="max-w-2xl">
          <WaitlistForm />
        </div>
      </Section>
    </main>
  );
}
