import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** A premium phone shell (titanium-like bezel + dynamic island) wrapping any screen. */
export function PhoneFrame({
  children,
  className,
  screenClassName,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  screenClassName?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative w-[272px] rounded-[3rem] bg-gradient-to-b from-mist/30 via-mist/10 to-mist/25 p-[3px]",
        "shadow-[0_50px_100px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(243_236_249/0.08)]",
        className,
      )}
    >
      <div className="rounded-[2.85rem] bg-ink p-[9px]">
        <div
          className={cn(
            "relative h-[540px] overflow-hidden rounded-[2.35rem]",
            dark ? "bg-ink text-white" : "bg-mist text-ink",
            screenClassName,
          )}
        >
          {/* status bar */}
          <div
            dir="ltr"
            className={cn(
              "absolute inset-x-0 top-0 z-20 flex items-center justify-between px-7 pt-3 text-[11px] font-semibold",
              "text-white",
            )}
          >
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-3 rounded-[2px] border border-current" />
            </span>
          </div>
          <div className="absolute top-2.5 left-1/2 z-30 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-ink" />
          {children}
        </div>
      </div>
    </div>
  );
}
