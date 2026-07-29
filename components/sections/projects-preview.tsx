"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { projects } from "@/lib/projects";
import { formatMonthYear } from "@/lib/utils";
import { Container, MonoLabel, Tag } from "@/components/ui";
import { ImageSlot } from "@/components/placeholder";
import { IconArrowUpRight } from "@/components/icons";

export function ProjectsPreview() {
  const [hovered, setHovered] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 26, mass: 0.4 });

  return (
    <section id="work" className="relative scroll-mt-24 border-t border-line py-24 sm:py-32">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <MonoLabel index="02">Selected work</MonoLabel>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
              Things I&apos;ve built &amp; shipped.
            </h2>
          </div>
          <span className="mono-label hidden shrink-0 text-fg-subtle sm:block">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>

        <ul
          className="mt-14 border-t border-line"
          onMouseMove={(e) => {
            mx.set(e.clientX);
            my.set(e.clientY);
          }}
        >
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="focus-ring group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-4 border-b border-line py-7 transition-colors sm:gap-x-8 sm:py-9"
              >
                <span className="mono-label w-7 text-fg-subtle transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-3xl md:text-4xl">
                      {p.name}
                    </h3>
                    <span className="mono-label hidden text-fg-subtle sm:inline">
                      {p.role}
                    </span>
                  </div>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-fg-muted">
                    {p.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Tag>{p.category}</Tag>
                    <Tag>
                      {formatMonthYear(p.period.start + "-01")}
                      {p.period.end ? "" : " · Now"}
                    </Tag>
                    {p.metrics?.[0] && (
                      <span className="mono-label text-accent">
                        {p.metrics[0].value} · {p.metrics[0].label}
                      </span>
                    )}
                  </div>
                </div>

                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg-subtle transition-all duration-300 ease-expo group-hover:border-accent group-hover:text-accent">
                  <IconArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      {/* Floating cover that follows the cursor (desktop only). */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2 pl-40">
              <ImageSlot
                src={projects[hovered].images.cover}
                alt={projects[hovered].name}
                label={projects[hovered].name}
                className="h-52 w-80 shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
