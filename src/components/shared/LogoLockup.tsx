import { ShieldMark, Wordmark } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";

/** Horizontal logo: shield + white wordmark (the guide's "معكوس" version for dark backgrounds). */
export function LogoLockup({ className, latin = true }: { className?: string; latin?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-white", className)}>
      <ShieldMark className="h-9 w-auto drop-shadow-[0_6px_18px_rgb(106_18_176/0.6)]" />
      <Wordmark latin={latin} className="h-8 w-auto" />
    </span>
  );
}
