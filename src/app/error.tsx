"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background flex items-center px-6 md:px-12 lg:px-16">
      <div className="mx-auto max-w-xl py-24 text-center">
        <p className="text-[13px] font-[500] uppercase tracking-[0.15em] text-muted mb-4 font-sans">
          Something went wrong
        </p>
        <h1 className="font-sans font-bold text-foreground mb-6 text-3xl md:text-4xl">
          Sorry, this page hit an error.
        </h1>
        <p className="text-sm font-sans leading-relaxed text-muted mb-8">
          Nothing you did caused this. You can try again, or head back to the
          homepage.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => unstable_retry()}
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-sans font-medium transition-opacity duration-200 hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-sans font-medium text-foreground transition-colors duration-200 hover:bg-surface-hover"
          >
            Back to the homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
