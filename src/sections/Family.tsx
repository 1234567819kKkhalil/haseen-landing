"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  AppWindow,
  BookOpen,
  Check,
  Clock,
  Film,
  Gamepad2,
  Globe,
  GraduationCap,
  ListChecks,
  Lock,
  MessageCircle,
  Moon,
  Plus,
  ShieldBan,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { ShieldMark } from "@/components/brand/Logo";
import { PhoneFrame } from "@/components/shared";
import { Reveal, Section, SectionHeading } from "@/components/ui";
import { content } from "@/content/ar";
import { cn } from "@/lib/cn";

const { family } = content;
type FeatureKey = (typeof family.features)[number]["key"];

const featureIcons: Record<FeatureKey, LucideIcon> = {
  tasks: ListChecks,
  requests: AppWindow,
  school: GraduationCap,
  blocking: ShieldBan,
};

/** How long each feature stays on screen before auto-advancing (ms). */
const CYCLE_MS = 6000;
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * "Parent control centre": a feature list on one side and the parent's phone
 * on the other. The phone screen changes with the selected feature and the
 * list auto-advances (paused on hover) with a gold progress line.
 */
export function Family() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const reduceMotion = useReducedMotion();
  const running = inView && !paused && !reduceMotion;
  const key = family.features[active]?.key ?? "tasks";

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % family.features.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [active, running]);

  return (
    <Section id="family" className="overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/20 to-transparent" />
      <SectionHeading eyebrow={family.eyebrow} title={family.title} highlight={family.highlight} subtitle={family.subtitle} />

      <div
        ref={ref}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-10"
      >
        {/* feature list (right side in RTL) */}
        <Reveal className="order-2 lg:order-1">
          <ul role="tablist" aria-label={family.highlight} className="flex flex-col gap-3">
            {family.features.map((f, i) => {
              const Icon = featureIcons[f.key];
              const selected = i === active;
              return (
                <li key={f.key}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative flex w-full items-start gap-4 overflow-hidden rounded-3xl border p-5 text-start transition-all duration-500",
                      selected
                        ? "border-amber/40 bg-gradient-to-l from-amber/[0.12] to-white/[0.03]"
                        : "border-mist/10 bg-white/[0.02] hover:border-mist/25",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-2xl transition-colors duration-500",
                        selected ? "bg-amber text-fortress" : "bg-white/5 text-mist/60 group-hover:text-amber",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "block font-display text-sm font-semibold leading-snug transition-colors sm:text-base",
                          selected ? "text-white" : "text-mist/75",
                        )}
                      >
                        {f.title}
                      </span>
                      <AnimatePresence initial={false}>
                        {selected && (
                          <motion.span
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease }}
                            className="block overflow-hidden"
                          >
                            <span className="block pt-1.5 text-xs leading-6 text-mist/65 sm:text-[13px]">{f.text}</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>

                    {/* auto-advance progress */}
                    {selected && (
                      <span className="absolute inset-x-5 bottom-0 h-0.5 overflow-hidden rounded-full bg-white/5">
                        <motion.span
                          key={`${active}-${running}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: running ? 1 : 0 }}
                          transition={{ duration: running ? CYCLE_MS / 1000 : 0.2, ease: "linear" }}
                          className="block h-full origin-right rounded-full bg-amber"
                        />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* phone */}
        <Reveal delay={0.1} className="relative order-1 mx-auto lg:order-2">
          <div
            aria-hidden
            className="absolute -inset-24 bg-[radial-gradient(closest-side,rgb(106_18_176/0.5),transparent)]"
          />
          <PhoneFrame className="relative">
            <AppHeader title={screenTitle(key)} />
            <AnimatePresence mode="wait">
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease }}
                className="relative z-10 -mt-8 px-3.5"
              >
                {key === "tasks" && <TasksScreen />}
                {key === "requests" && <RequestsScreen />}
                {key === "school" && <SchoolScreen />}
                {key === "blocking" && <BlockingScreen />}
              </motion.div>
            </AnimatePresence>
          </PhoneFrame>
        </Reveal>

        {/* big feature number (left side in RTL, desktop only) */}
        <div className="order-3 hidden flex-col items-start gap-4 lg:flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, ease }}
              className="flex flex-col gap-3"
            >
              <span className="font-display text-7xl font-bold text-gold">
                {(active + 1).toLocaleString("ar-SA")}
              </span>
              <span className="rule-gold h-px w-24" />
              <NotifCard notif={family.features[active]?.notif ?? family.features[0].notif} />
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 flex gap-2">
            {family.features.map((f, i) => (
              <button
                key={f.key}
                type="button"
                aria-label={f.title}
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === active ? "w-8 bg-amber" : "w-1.5 bg-mist/25 hover:bg-mist/50",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function screenTitle(key: FeatureKey) {
  return {
    tasks: family.tasks.screen,
    requests: family.requests.screen,
    school: family.school.screen,
    blocking: family.blocking.screen,
  }[key];
}

/** iOS-style push notification showing what lands on the parent's or child's phone. */
function NotifCard({ notif }: { notif: (typeof family.features)[number]["notif"] }) {
  return (
    <div className="w-[17rem]">
      <p className="mb-2 text-[11px] font-semibold text-amber">{notif.who}</p>
      <div className="surface flex gap-2.5 rounded-2xl! bg-night/80! p-3 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)]">
        <span className="grid size-9 shrink-0 place-items-center rounded-[0.6rem] bg-white p-1">
          <ShieldMark className="h-full w-auto" title="" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2 text-[10px] text-mist/55">
            <span className="font-semibold tracking-wide">HASEEN</span>
            <span>{notif.time}</span>
          </div>
          <p className="mt-0.5 truncate text-[12px] font-bold text-white">{notif.title}</p>
          <p className="truncate text-[11px] text-mist/70">{notif.body}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- phone UI building blocks ---------- */

function AppHeader({ title }: { title: string }) {
  return (
    <div className="bg-gradient-to-b from-orchid to-purple px-5 pt-12 pb-12 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-mist/70">{family.child}</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="font-display text-[15px] font-semibold"
            >
              {title}
            </motion.p>
          </AnimatePresence>
        </div>
        <span className="grid size-10 place-items-center rounded-2xl bg-white/15">
          <ShieldMark className="h-6 w-auto" title="" />
        </span>
      </div>
    </div>
  );
}

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-2xl bg-white p-3 shadow-[0_10px_30px_-18px_rgb(79_0_140/0.45)]", className)}>{children}</div>;
}

const stagger = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
};

/* ---------- screen: tasks ---------- */
function TasksScreen() {
  const t = family.tasks;
  const [done, setDone] = useState<boolean[]>(t.items.map((i) => i.done));
  const count = done.filter(Boolean).length;
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-2">
      <motion.div variants={item}>
        <Card>
          <div className="mb-2 flex items-center justify-between text-[11px]">
            <span className="font-semibold">{t.screen}</span>
            <span className="text-ink/50">
              {count.toLocaleString("ar-SA")} / {done.length.toLocaleString("ar-SA")}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-mist">
            <motion.div
              animate={{ width: `${(count / done.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="h-full rounded-full bg-gradient-to-l from-amber to-orchid"
            />
          </div>
        </Card>
      </motion.div>
      {t.items.map((task, i) => (
        <motion.button
          key={task.label}
          variants={item}
          type="button"
          onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
          className="flex items-center gap-2.5 rounded-2xl bg-white p-2.5 text-start"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-mist text-base">{task.emoji}</span>
          <span className="min-w-0 flex-1">
            <span className={cn("block truncate text-[12px] font-semibold", done[i] && "text-ink/40 line-through")}>
              {task.label}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-ink/45">
              <Clock className="size-2.5" />
              {task.time}
            </span>
          </span>
          <span
            className={cn(
              "grid size-6 shrink-0 place-items-center rounded-full border transition-colors",
              done[i] ? "border-amber bg-amber text-fortress" : "border-ink/20",
            )}
          >
            {done[i] && <Check className="size-3.5" strokeWidth={3} />}
          </span>
        </motion.button>
      ))}
      <motion.div
        variants={item}
        className="flex items-center justify-center gap-1.5 rounded-2xl border border-dashed border-purple/30 py-2.5 text-[11px] font-semibold text-purple"
      >
        <Plus className="size-3.5" />
        {t.add}
      </motion.div>
    </motion.div>
  );
}

/* ---------- screen: download requests ---------- */
function RequestsScreen() {
  const r = family.requests;
  const [state, setState] = useState<"pending" | "approved" | "rejected">("pending");
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-2">
      <motion.div variants={item}>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-amber/20 font-display text-[11px] font-bold text-purple">
              ر
            </span>
            <p className="text-[11px] text-ink/60">
              <span className="font-semibold text-ink">{r.child}</span> {r.ask}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-amber to-[#e08a00] text-fortress shadow-[0_10px_20px_-10px_rgb(252_165_3/0.9)]">
              <Gamepad2 className="size-7" />
            </span>
            <div>
              <p dir="ltr" className="text-end text-[14px] font-bold">
                {r.app}
              </p>
              <div className="mt-1 flex gap-1">
                {r.meta.map((m) => (
                  <span key={m} className="rounded-full bg-mist px-2 py-0.5 text-[9px] font-semibold text-purple">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 min-h-10">
            <AnimatePresence mode="wait">
              {state === "pending" ? (
                <motion.div key="btns" exit={{ opacity: 0, y: -6 }} className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setState("approved")}
                    className="flex items-center justify-center gap-1 rounded-xl bg-purple py-2.5 text-[12px] font-bold text-white transition-transform active:scale-95"
                  >
                    <Check className="size-3.5" /> {r.approve}
                  </button>
                  <button
                    type="button"
                    onClick={() => setState("rejected")}
                    className="flex items-center justify-center gap-1 rounded-xl border border-ink/15 py-2.5 text-[12px] font-bold transition-transform active:scale-95"
                  >
                    <X className="size-3.5" /> {r.reject}
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="done"
                  type="button"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setState("pending")}
                  className={cn(
                    "flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-[11px] font-bold",
                    state === "approved" ? "bg-amber/20 text-purple" : "bg-ink/5 text-ink/70",
                  )}
                >
                  {state === "approved" ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                  {state === "approved" ? r.approved : r.rejected}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
      <motion.p variants={item} className="px-1 pt-1 text-[11px] font-semibold text-ink/50">
        {r.history}
      </motion.p>
      {r.past.map((p) => (
        <motion.div key={p.app} variants={item}>
          <Card className="flex items-center justify-between p-2.5">
            <span className="flex items-center gap-2 text-[12px] font-medium">
              <span className="grid size-8 place-items-center rounded-xl bg-mist text-purple">
                <AppWindow className="size-4" />
              </span>
              {p.app}
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[9px] font-bold",
                p.state === "مقبول" ? "bg-amber/20 text-purple" : "bg-ink/5 text-ink/50",
              )}
            >
              {p.state}
            </span>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ---------- screen: school ---------- */
function SchoolScreen() {
  const s = family.school;
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-2">
      <motion.div variants={item}>
        <Card>
          <p className="mb-2.5 text-[11px] font-semibold">{s.week}</p>
          <div className="grid grid-cols-5 gap-1.5">
            {s.days.map((d, i) => (
              <div key={d} className="flex flex-col items-center gap-1">
                <span
                  className={cn(
                    "grid size-8 place-items-center rounded-xl",
                    i < 4 ? "bg-purple text-white" : "border border-dashed border-purple/30 text-purple/40",
                  )}
                >
                  {i < 4 ? <Check className="size-3.5" strokeWidth={3} /> : <Clock className="size-3.5" />}
                </span>
                <span className="text-[9px] text-ink/50">{d}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
      <motion.div variants={item}>
        <Card>
          <p className="mb-2 text-[11px] font-semibold">{s.homework}</p>
          <ul className="flex flex-col gap-1.5">
            {s.tasks.map((t, i) => (
              <li key={t.label} className="flex items-center justify-between rounded-xl bg-mist/60 px-2.5 py-2 text-[11px]">
                <span className="flex items-center gap-1.5 font-medium">
                  <BookOpen className="size-3.5 text-purple" />
                  {t.label}
                </span>
                <span className={cn("text-[10px] font-semibold", i === 0 ? "text-purple" : "text-[#b26f00]")}>{t.state}</span>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
      <motion.div variants={item}>
        <div className="rounded-2xl bg-gradient-to-br from-amber/25 to-amber/5 p-3 ring-1 ring-amber/40">
          <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-purple">
            <GraduationCap className="size-3.5" />
            {s.noteTitle}
          </p>
          <p className="text-[11px] leading-relaxed text-ink/80">{s.note}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- screen: blocking ---------- */
const appIcons: LucideIcon[] = [Gamepad2, Film, MessageCircle, Globe];
const scheduleIcons: LucideIcon[] = [Moon, BookOpen, Lock];

function BlockingScreen() {
  const b = family.blocking;
  const [on, setOn] = useState<boolean[]>(b.schedules.map((s) => s.on));
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-2">
      <motion.div variants={item}>
        <div className="flex items-center gap-3 rounded-2xl bg-ink p-3 text-white">
          <span className="relative grid size-10 place-items-center rounded-xl bg-amber text-fortress">
            <span className="animate-pulse-ring absolute inset-0 rounded-xl bg-amber/50" />
            <Moon className="relative size-5" />
          </span>
          <div>
            <p className="text-[12px] font-bold">{b.now}</p>
            <p className="text-[10px] text-mist/60">{b.until}</p>
          </div>
        </div>
      </motion.div>
      {b.schedules.map((s, i) => {
        const Icon = scheduleIcons[i] ?? Lock;
        return (
          <motion.button
            key={s.label}
            variants={item}
            type="button"
            role="switch"
            aria-checked={on[i]}
            onClick={() => setOn((v) => v.map((x, j) => (j === i ? !x : x)))}
            className="flex items-center gap-2.5 rounded-2xl bg-white p-2.5 text-start"
          >
            <span className="grid size-8 place-items-center rounded-xl bg-mist text-purple">
              <Icon className="size-4" />
            </span>
            <span className="flex-1">
              <span className="block text-[12px] font-semibold">{s.label}</span>
              <span className="text-[10px] text-ink/45">{s.time}</span>
            </span>
            <span
              className={cn(
                "flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors",
                on[i] ? "justify-end bg-purple" : "justify-start bg-ink/15",
              )}
            >
              <motion.span layout className="size-4 rounded-full bg-white shadow" />
            </span>
          </motion.button>
        );
      })}
      <motion.div variants={item}>
        <Card>
          <p className="mb-2 text-[11px] font-semibold">{b.appsTitle}</p>
          <div className="grid grid-cols-4 gap-1.5">
            {b.apps.map((a, i) => {
              const Icon = appIcons[i] ?? AppWindow;
              return (
                <div key={a} className="flex flex-col items-center gap-1">
                  <span className="relative grid size-10 place-items-center rounded-xl bg-mist text-ink/30">
                    <Icon className="size-5" />
                    <span className="absolute -end-1 -bottom-1 grid size-4 place-items-center rounded-full bg-purple text-white">
                      <Lock className="size-2.5" />
                    </span>
                  </span>
                  <span className="text-[9px] text-ink/50">{a}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
