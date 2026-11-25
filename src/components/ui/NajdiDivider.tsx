import { cn } from "@/lib/cn";

/**
 * A row of Najdi crenellations (الشُّرَف النجدية) — the stepped triangles that
 * crown mud-brick walls in Najd. Used as a quiet gold ornament between sections.
 */
export function NajdiDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center justify-center gap-4", className)}>
      <span className="rule-gold h-px w-24 sm:w-40" />
      <svg viewBox="0 0 120 16" className="h-4 w-28 text-amber/70" fill="currentColor">
        {Array.from({ length: 5 }, (_, i) => (
          <path
            key={i}
            d={`M${i * 24 + 2} 16 L${i * 24 + 2} 10 L${i * 24 + 6} 10 L${i * 24 + 6} 6 L${i * 24 + 10} 6 L${i * 24 + 10} 2 L${i * 24 + 14} 2 L${i * 24 + 14} 6 L${i * 24 + 18} 6 L${i * 24 + 18} 10 L${i * 24 + 22} 10 L${i * 24 + 22} 16 Z`}
            opacity={i === 2 ? 1 : 0.45}
          />
        ))}
      </svg>
      <span className="rule-gold h-px w-24 sm:w-40" />
    </div>
  );
}
