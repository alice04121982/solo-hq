const EASE = "cubic-bezier(0.16,1,0.3,1)";

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

export function StatCard({ value, label, delay = 0 }: StatCardProps) {
  return (
    <div
      style={{ animation: `kleo-fade-in-up 0.7s ${EASE} ${delay}s both` }}
      className="flex flex-col gap-3 py-8 border-t border-border-secondary"
    >
      <span
        className="font-display font-bold text-text-brand-secondary leading-none"
        style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)", letterSpacing: "-0.03em" }}
      >
        {value}
      </span>
      <span className="text-md font-sans text-text-tertiary leading-snug" style={{ maxWidth: "28ch" }}>
        {label}
      </span>
    </div>
  );
}
