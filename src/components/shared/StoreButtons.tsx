import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { content } from "@/content/ar";
import { cn } from "@/lib/cn";

const { stores } = content;

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden>
      <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.72-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.59 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.5Zm-2.18-6.46c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.67-.92 2.66.97.07 1.96-.49 2.56-1.21Z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
      <path d="M4 2.8v18.4c0 .5.5.8.9.6l10-9.2-10-9.2c-.4-.3-.9 0-.9.4Z" fill="#FCA503" />
      <path d="m14.9 12.6 2.9 2.7-11.4 6.6 8.5-9.3Z" fill="#F3ECF9" opacity=".8" />
      <path d="m14.9 11.4-8.5-9.3 11.4 6.6-2.9 2.7Z" fill="#F3ECF9" opacity=".55" />
      <path d="m17.8 8.7 2.7 1.6c1.2.7 1.2 2.6 0 3.3l-2.7 1.6-2.9-3.2 2.9-3.3Z" fill="#FCA503" opacity=".85" />
    </svg>
  );
}

function StoreButton({ href, top, label, glyph }: { href: string; top: string; label: string; glyph: ReactNode }) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 rounded-2xl border border-mist/15 bg-white/[0.06] px-5 py-2.5",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/50 hover:bg-white/10",
      )}
    >
      <span className="text-white transition-colors group-hover:text-amber">{glyph}</span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[11px] text-mist/60">{top}</span>
        <span dir="ltr" className="font-display text-sm font-semibold">
          {label}
        </span>
      </span>
    </a>
  );
}

export function StoreButtons({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <StoreButton href={siteConfig.stores.appStore} top={stores.appStoreTop} label={stores.appStore} glyph={<AppleGlyph />} />
      <StoreButton
        href={siteConfig.stores.googlePlay}
        top={stores.googlePlayTop}
        label={stores.googlePlay}
        glyph={<PlayGlyph />}
      />
    </div>
  );
}
