import { ShieldMark } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";

/**
 * Luxury section divider: two gold hairlines that fade outwards, a light
 * that keeps gliding along them towards the centre, small gold diamonds,
 * and the Haseen shield inside a glowing gold ring.
 */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center justify-center gap-3 sm:gap-4", className)}>
      {/* right line (first in RTL) — light travels right → left, towards the shield */}
      <span className="relative h-px w-24 overflow-hidden bg-gradient-to-r from-amber/70 via-amber/25 to-transparent sm:w-60">
        <span className="animate-sweep-rtl absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent via-[#ffe2a3] to-transparent" />
      </span>
      <span className="size-1.5 rotate-45 bg-amber/70" />

      {/* emblem */}
      <span className="relative grid size-14 place-items-center">
        <span className="animate-glow absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgb(252_165_3/0.35),transparent)]" />
        <span className="animate-spin-slow absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgb(252_165_3/0.9)_60deg,transparent_120deg,transparent_360deg)] p-px [mask:radial-gradient(closest-side,transparent_calc(100%-1.5px),black_calc(100%-1px))]" />
        <span className="absolute inset-[3px] rounded-full border border-amber/25 bg-night" />
        <ShieldMark className="relative h-7 w-auto drop-shadow-[0_4px_12px_rgb(252_165_3/0.35)]" title="" />
      </span>

      <span className="size-1.5 rotate-45 bg-amber/70" />
      {/* left line — light travels left → right, towards the shield */}
      <span className="relative h-px w-24 overflow-hidden bg-gradient-to-l from-amber/70 via-amber/25 to-transparent sm:w-60">
        <span className="animate-sweep-ltr absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#ffe2a3] to-transparent" />
      </span>
    </div>
  );
}
