"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AppWindow,
  BellRing,
  Check,
  Clock,
  GraduationCap,
  ListChecks,
  Lock,
  Moon,
  RotateCcw,
  ShieldBan,
  BookOpen,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { ShieldMark } from "@/components/brand/Logo";
import { Reveal, Section, SectionHeading } from "@/components/ui";
import { content } from "@/content/ar";
import { cn } from "@/lib/cn";

const { family } = content;

export function Family() {
  return (
    <Section id="family">
      <SectionHeading
        eyebrow={family.eyebrow}
        title={family.title}
        highlight={family.highlight}
        subtitle={family.subtitle}
      />

      <div className="grid gap-5 lg:grid-cols-6">
        <Reveal className="lg:col-span-3 lg:row-span-2">
          <Card icon={<ListChecks className="size-5" />} title={family.tasks.title} text={family.tasks.text}>
            <Tasks />
          </Card>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-3">
          <Card icon={<AppWindow className="size-5" />} title={family.requests.title} text={family.requests.text}>
            <AppRequest />
          </Card>
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-3">
          <Card icon={<GraduationCap className="size-5" />} title={family.school.title} text={family.school.text}>
            <School />
          </Card>
        </Reveal>
        <Reveal delay={0.2} className="lg:col-span-6">
          <Card icon={<ShieldBan className="size-5" />} title={family.blocking.title} text={family.blocking.text} wide>
            <Blocking />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

function Card({
  icon,
  title,
  text,
  children,
  wide = false,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <article
      className={cn(
        "group surface card-hover relative flex h-full flex-col gap-6 overflow-hidden p-6 sm:p-8",
        wide && "md:flex-row md:items-center md:gap-10",
      )}
    >
      <div aria-hidden className="absolute -top-32 -end-32 size-80 bg-[radial-gradient(closest-side,rgb(106_18_176/0.3),transparent)]" />
      <header className={cn("relative", wide && "md:w-1/3")}>
        <span className="icon-pop mb-4 grid size-12 place-items-center rounded-2xl bg-amber/15 text-amber">{icon}</span>
        <h3 className="font-display text-sm font-semibold leading-snug sm:text-base">{title}</h3>
        <p className="mt-2 text-xs leading-6 text-mist/65 sm:text-[13px]">{text}</p>
      </header>
      <div className={cn("relative", wide && "md:flex-1")}>{children}</div>
    </article>
  );
}

/* ---------- daily tasks (tap to tick) ---------- */
function Tasks() {
  const [done, setDone] = useState<boolean[]>([true, true, false, false]);
  const count = done.filter(Boolean).length;
  return (
    <div className="flex flex-col gap-2.5">
      {family.tasks.items.map((t, i) => {
        const isDone = done[i];
        return (
          <button
            key={t.label}
            type="button"
            onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
            className={cn(
              "flex items-center gap-3 rounded-2xl border p-3.5 text-start transition-all duration-300",
              isDone ? "border-amber/30 bg-amber/10" : "border-mist/10 bg-white/[0.03] hover:border-mist/25",
            )}
          >
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-lg border transition-colors",
                isDone ? "border-amber bg-amber text-fortress" : "border-mist/30",
              )}
            >
              <AnimatePresence>
                {isDone && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check className="size-4" strokeWidth={3} />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span className="flex-1">
              <span className={cn("block font-semibold transition-colors", isDone && "text-mist/60 line-through")}>
                {t.label}
              </span>
              <span className="mt-0.5 flex items-center gap-1.5 text-xs text-mist/50">
                <Clock className="size-3" />
                {t.time}
              </span>
            </span>
            <BellRing className="size-4 text-mist/30" />
          </button>
        );
      })}
      <div className="mt-2 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={{ width: `${(count / done.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="h-full rounded-full bg-gradient-to-l from-amber to-orchid"
          />
        </div>
        <span className="text-xs text-mist/60">
          {count.toLocaleString("ar-SA")} / {done.length.toLocaleString("ar-SA")}
        </span>
      </div>

      {/* what the child sees on their phone */}
      <div className="mt-4 rounded-2xl border border-mist/10 bg-night/60 p-3.5">
        <p className="mb-2 text-[11px] text-mist/45">{family.tasks.preview}</p>
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.06] p-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white">
            <ShieldMark className="h-6 w-auto" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">{family.tasks.notifTitle}</span>
            <span className="block truncate text-xs text-mist/60">{family.tasks.notifBody}</span>
          </span>
          <span className="text-[10px] text-mist/40">{family.tasks.notifTime}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- download request (approve / reject) ---------- */
function AppRequest() {
  const r = family.requests;
  const [state, setState] = useState<"pending" | "approved" | "rejected">("pending");
  return (
    <div className="rounded-3xl border border-mist/10 bg-night/50 p-4">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-amber/20 font-display font-bold text-amber">ع</span>
        <div className="flex-1">
          <p className="font-semibold">
            {r.child} <span className="font-normal text-mist/60">{r.ask}</span>
          </p>
          <p className="text-xs text-mist/50">{r.app}</p>
        </div>
      </div>
      <div className="mt-4 min-h-12">
        <AnimatePresence mode="wait">
          {state === "pending" ? (
            <motion.div key="btns" exit={{ opacity: 0, y: -6 }} className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setState("approved")}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-amber py-3 text-sm font-bold text-fortress transition-transform hover:-translate-y-0.5"
              >
                <Check className="size-4" /> {r.approve}
              </button>
              <button
                type="button"
                onClick={() => setState("rejected")}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-mist/20 py-3 text-sm font-bold transition-colors hover:border-mist/40"
              >
                <X className="size-4" /> {r.reject}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between gap-3"
            >
              <span
                className={cn(
                  "flex items-center gap-2 text-sm font-semibold",
                  state === "approved" ? "text-amber" : "text-mist/80",
                )}
              >
                {state === "approved" ? <Check className="size-4" /> : <X className="size-4" />}
                {state === "approved" ? r.approved : r.rejected}
              </span>
              <button
                type="button"
                onClick={() => setState("pending")}
                aria-label={r.reset}
                title={r.reset}
                className="grid size-8 place-items-center rounded-full border border-mist/15 text-mist/60 hover:text-amber"
              >
                <RotateCcw className="size-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- school follow-up ---------- */
function School() {
  return (
    <ul className="divide-y divide-mist/10 rounded-3xl border border-mist/10 bg-night/50 px-4">
      {family.school.rows.map((row) => (
        <li key={row.label} className="flex items-center justify-between gap-4 py-3.5 text-sm">
          <span className="text-mist/60">{row.label}</span>
          <span className="flex items-center gap-1.5 font-semibold">
            <Check className="size-4 text-amber" />
            {row.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- blocking schedules ---------- */
const modeIcons = [Moon, BookOpen, Lock];

function Blocking() {
  const [on, setOn] = useState<boolean[]>([true, false, true]);
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {family.blocking.modes.map((m, i) => {
        const Icon = modeIcons[i] ?? Lock;
        const active = on[i];
        return (
          <button
            key={m.label}
            type="button"
            role="switch"
            aria-checked={active}
            onClick={() => setOn((s) => s.map((v, j) => (j === i ? !v : v)))}
            className={cn(
              "flex items-center gap-3 rounded-2xl border p-4 text-start transition-all duration-300",
              active ? "border-amber/35 bg-amber/10" : "border-mist/10 bg-white/[0.03]",
            )}
          >
            <Icon className={cn("size-5 shrink-0", active ? "text-amber" : "text-mist/40")} />
            <span className="flex-1">
              <span className="block text-sm font-semibold">{m.label}</span>
              <span className="text-xs text-mist/50">{m.time}</span>
            </span>
            <span
              className={cn(
                "flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors",
                active ? "justify-end bg-amber" : "justify-start bg-white/15",
              )}
            >
              <motion.span layout className="size-5 rounded-full bg-white shadow" />
            </span>
          </button>
        );
      })}
    </div>
  );
}
