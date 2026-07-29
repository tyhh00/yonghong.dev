import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { IconArrowRight, IconArrowUpRight } from "./icons";

/* -------------------------------------------------------------------------- */
/*  Layout                                                                    */
/* -------------------------------------------------------------------------- */

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-24 sm:py-32", className)}
    >
      {children}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Signature micro-label (mono, uppercase, ticked)                           */
/* -------------------------------------------------------------------------- */

export function MonoLabel({
  children,
  index,
  className,
  tick = true,
}: {
  children: ReactNode;
  index?: string;
  className?: string;
  tick?: boolean;
}) {
  return (
    <span className={cn("mono-label inline-flex items-center gap-2.5", className)}>
      {tick && (
        <span className="inline-block h-[6px] w-[6px] rounded-full bg-accent" />
      )}
      {index && <span className="text-accent">{index}</span>}
      <span>{children}</span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section heading — kicker + big display title                              */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  kicker,
  index,
  title,
  className,
}: {
  kicker: string;
  index?: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <MonoLabel index={index}>{kicker}</MonoLabel>
      <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Buttons / links                                                           */
/* -------------------------------------------------------------------------- */

type BtnVariant = "primary" | "accent" | "ghost";
const btnBase =
  "focus-ring group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 ease-expo";
const btnVariants: Record<BtnVariant, string> = {
  primary:
    "bg-fg text-bg px-5 py-2.5 hover:opacity-90 active:scale-[0.98]",
  accent:
    "bg-accent text-accent-fg px-5 py-2.5 hover:brightness-110 active:scale-[0.98]",
  ghost:
    "border border-line px-5 py-2.5 text-fg hover:border-fg/40 hover:bg-fg/[0.03]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = "right",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: BtnVariant;
  arrow?: "right" | "up-right" | "none";
  className?: string;
}) {
  const external = href.startsWith("http");
  const content = (
    <>
      {children}
      {arrow === "right" && (
        <IconArrowRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5" />
      )}
      {arrow === "up-right" && (
        <IconArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );
  const cls = cn(btnBase, btnVariants[variant], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Data / stats                                                              */
/* -------------------------------------------------------------------------- */

export function Stat({
  value,
  label,
  className,
}: {
  value: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl">
        {value}
      </span>
      <span className="mono-label mt-3 max-w-[16ch] leading-relaxed">
        {label}
      </span>
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-line", className)} />;
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="mono-label rounded-full border border-line px-2.5 py-1 text-fg-muted">
      {children}
    </span>
  );
}
