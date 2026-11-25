/**
 * Photography used on the page (Unsplash — free for commercial use).
 * Swap a photo by changing its id here. The allowed host is set in
 * `next.config.ts` → images.remotePatterns.
 */
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const images = {
  /** Saudi boy in shemagh — the child's photo as the parent's lock-screen wallpaper (hero). */
  lockWallpaper: {
    src: unsplash("1621878166843-d060a5ff51ea"),
    alt: "طفل سعودي بالشماغ والثوب",
  },
} as const;
