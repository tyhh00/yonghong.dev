"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { journey } from "@/lib/journey";
import { milestoneIcons, IconArrowUpRight } from "@/components/icons";
import { Container, MonoLabel } from "@/components/ui";

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 55%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="journey" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <MonoLabel index="01">The path</MonoLabel>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            From a bedroom server to the{" "}
            <span className="text-accent">AI frontier.</span>
          </h2>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-fg-muted">
            Seven chapters, one obsession: building things that are real.
          </p>
        </div>

        <div ref={ref} className="relative mt-16 sm:mt-20">
          {/* rail */}
          <div className="absolute left-[19px] top-2 h-full w-px bg-line sm:left-[27px]" />
          <motion.div
            className="absolute left-[19px] top-2 w-px origin-top bg-accent sm:left-[27px]"
            style={{ height: "100%", scaleY: reduce ? 1 : scaleY }}
          />

          <ol className="space-y-12 sm:space-y-16">
            {journey.map((m, i) => {
              const Icon = milestoneIcons[m.icon];
              return (
                <motion.li
                  key={m.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid grid-cols-[40px_1fr] gap-x-5 sm:grid-cols-[56px_1fr] sm:gap-x-8"
                >
                  {/* node */}
                  <div className="relative z-10 flex justify-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg sm:h-14 sm:w-14">
                      <Icon className="h-5 w-5 text-accent sm:h-6 sm:w-6" />
                    </span>
                  </div>

                  {/* content */}
                  <div className="pt-1 sm:pt-2.5">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="mono-label text-accent">{m.when}</span>
                      <span className="mono-label text-fg-subtle">
                        {m.chapter}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                      {m.href ? (
                        <Link
                          href={m.href}
                          className="focus-ring group inline-flex items-center gap-1.5 hover:text-accent"
                        >
                          {m.title}
                          <IconArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                        </Link>
                      ) : (
                        m.title
                      )}
                    </h3>
                    <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-fg-muted">
                      {m.body}
                    </p>
                    {m.metric && (
                      <div className="mt-5 inline-flex items-baseline gap-3 border-l-2 border-accent/50 pl-4">
                        <span className="font-display text-3xl font-semibold leading-none tracking-tight sm:text-4xl">
                          {m.metric.value}
                        </span>
                        <span className="mono-label max-w-[18ch]">
                          {m.metric.label}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
