import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "gold" | "glass";
  size?: "md" | "lg";
}

const variants = {
  gold: "bg-amber text-fortress shadow-[0_18px_40px_-18px_rgb(252_165_3/0.8)] hover:shadow-[0_22px_50px_-16px_rgb(252_165_3/0.9)]",
  glass: "border border-mist/20 bg-white/5 text-white hover:border-amber/50 hover:bg-white/10",
} as const;

const sizes = {
  md: "px-4 py-2 text-[13px] font-semibold",
  lg: "px-5 py-2.5 text-[13px]",
} as const;

/** Pill link button. */
export function ButtonLink({ variant = "gold", size = "lg", className, ...props }: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full font-bold transition-all duration-300",
        "hover:-translate-y-0.5 active:translate-y-0",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
