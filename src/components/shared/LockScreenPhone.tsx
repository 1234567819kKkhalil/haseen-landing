"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BatteryFull, Camera, Flashlight, SignalHigh, Wifi } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ShieldMark } from "@/components/brand/Logo";
import { images } from "@/config/images";
import { content } from "@/content/ar";
import { cn } from "@/lib/cn";

const { lockScreen } = content;
type Notification = (typeof lockScreen.notifications)[number];

/** Delay between two notifications dropping in, in ms. */
const STEP_MS = 2600;

const dot: Record<Notification["tone"], string> = {
  alert: "bg-amber",
  ok: "bg-mist",
  info: "bg-orchid",
};

/**
 * The parent's iPhone lock screen. Haseen notifications drop in one after
 * another (newest on top): a finished task, a download request, then an
 * extortion alert — and the cycle restarts.
 */
export function LockScreenPhone() {
  const reduceMotion = useReducedMotion();
  const total = lockScreen.notifications.length;
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setVisibleCount(total);
      return;
    }
    const timer = window.setInterval(() => {
      // one extra empty step after the last notification so the loop "breathes"
      setVisibleCount((c) => (c > total ? 0 : c + 1));
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [total, reduceMotion]);

  const visible = lockScreen.notifications.slice(0, Math.min(visibleCount, total)).reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-[18.5rem]"
    >
      {/* glow behind the device */}
      <div
        aria-hidden
        className="absolute -inset-16 bg-[radial-gradient(closest-side,rgb(106_18_176/0.55),rgb(252_165_3/0.08)_60%,transparent)]"
      />

      {/* side buttons */}
      <span aria-hidden className="absolute top-28 -left-[3px] h-8 w-[3px] rounded-l bg-mist/30" />
      <span aria-hidden className="absolute top-40 -left-[3px] h-14 w-[3px] rounded-l bg-mist/30" />
      <span aria-hidden className="absolute top-36 -right-[3px] h-20 w-[3px] rounded-r bg-mist/30" />

      {/* titanium frame */}
      <div className="relative rounded-[3.3rem] bg-gradient-to-b from-mist/45 via-mist/15 to-mist/35 p-[3px] shadow-[0_50px_100px_-30px_rgb(0_0_0/0.85)]">
        <div className="rounded-[3.15rem] bg-ink p-[9px]">
          {/* screen */}
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.6rem] bg-gradient-to-b from-orchid to-fortress">
            <Image
              src={images.lockWallpaper.src}
              alt={images.lockWallpaper.alt}
              fill
              priority
              sizes="300px"
              className="object-cover object-[50%_25%]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-fortress/60 via-fortress/10 to-fortress/70" />

            {/* status bar */}
            <div dir="ltr" className="absolute inset-x-0 top-0 flex items-center justify-between px-7 pt-4 text-white">
              <span className="text-[13px] font-semibold">{lockScreen.time}</span>
              <span className="flex items-center gap-1">
                <SignalHigh className="size-3.5" aria-hidden />
                <Wifi className="size-3.5" aria-hidden />
                <BatteryFull className="size-4" aria-hidden />
              </span>
            </div>

            {/* dynamic island */}
            <div aria-hidden className="absolute top-2.5 left-1/2 h-7 w-24 -translate-x-1/2 rounded-full bg-ink" />

            {/* lock-screen clock */}
            <div className="absolute inset-x-0 top-14 text-center text-white">
              <p className="text-sm font-medium text-white/90">{lockScreen.date}</p>
              <p dir="ltr" className="font-sans text-[4.2rem] leading-none font-semibold tracking-tight">
                {lockScreen.time}
              </p>
            </div>

            {/* notifications */}
            <ul className="absolute inset-x-3 top-[10.75rem] flex flex-col gap-2" aria-label="إشعارات حصين">
              <AnimatePresence initial={false}>
                {visible.map((n) => (
                  <motion.li
                    key={n.key}
                    layout
                    initial={{ opacity: 0, y: -70, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                    transition={{ type: "spring", damping: 20, stiffness: 220 }}
                  >
                    <NotificationCard n={n} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {/* bottom controls */}
            <div aria-hidden className="absolute inset-x-0 bottom-0 flex items-end justify-between px-8 pb-9">
              <span className="grid size-11 place-items-center rounded-full bg-ink/45 text-white">
                <Camera className="size-5" />
              </span>
              <span className="grid size-11 place-items-center rounded-full bg-ink/45 text-white">
                <Flashlight className="size-5" />
              </span>
            </div>
            <span aria-hidden className="absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** iOS lock-screen style push notification from the Haseen app. */
function NotificationCard({ n }: { n: Notification }) {
  return (
    <article
      className={cn(
        "rounded-[1.35rem] bg-ink/70 p-3 text-white shadow-[0_8px_30px_-12px_rgb(0_0_0/0.6)] ring-1 ring-white/15",
        n.tone === "alert" && "ring-amber/60",
      )}
    >
      <div className="flex gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-[0.6rem] bg-white p-1">
          <ShieldMark className="h-full w-auto" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span dir="ltr" className="text-[11px] font-semibold tracking-wide text-white/75">
              {lockScreen.appName}
            </span>
            <time className="shrink-0 text-[10px] text-white/65">{n.time}</time>
          </div>
          <p className="mt-0.5 flex items-center gap-1.5 text-[13px] font-bold">
            <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", dot[n.tone])} />
            {n.title}
          </p>
          <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-white/90">{n.body}</p>
        </div>
      </div>
      {"actions" in n && n.actions && (
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          <span className="rounded-xl bg-amber py-1.5 text-center text-[12px] font-bold text-fortress">
            {lockScreen.approve}
          </span>
          <span className="rounded-xl bg-white/15 py-1.5 text-center text-[12px] font-semibold">{lockScreen.reject}</span>
        </div>
      )}
    </article>
  );
}
