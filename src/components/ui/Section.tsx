import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import { Container } from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  containerClassName?: string;
}

/** Standard vertical rhythm + container for every page section. */
export function Section({ id, className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 py-24 sm:py-32", className)} {...props}>
      <Container className={cn("relative", containerClassName)}>{children}</Container>
    </section>
  );
}
