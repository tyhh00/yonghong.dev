"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/projects";
import { WorldScene } from "./scene";
import { IconArrowUpRight, IconClose, IconArrowRight } from "@/components/icons";
import { Tag } from "@/components/ui";

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function WorldExperience() {
  const { resolvedTheme } = useTheme();
  const fuzzy = resolvedTheme === "fuzzy";
  const [selected, setSelected] = useState<Project | null>(null);
  const [canRender, setCanRender] = useState<boolean | null>(null);
  const [lowPerf, setLowPerf] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanRender(supportsWebGL() && !reduce);
    setLowPerf(
      window.innerWidth < 820 ||
        window.matchMedia("(pointer: coarse)").matches
    );
  }, []);

  if (canRender === null) {
    return <div className="h-[calc(100dvh-4rem)] w-full" aria-hidden />;
  }

  if (!canRender) return <WorldFallback />;

  return (
    <div className="relative h-[calc(100dvh-4rem)] w-full overflow-hidden">
      <Canvas
        shadows={!lowPerf}
        dpr={lowPerf ? [1, 1.5] : [1, 2]}
        camera={{ position: [11, 8, 13], fov: 42 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <WorldScene
            fuzzy={fuzzy}
            lowPerf={lowPerf}
            onSelect={setSelected}
            activeSlug={selected?.slug ?? null}
          />
        </Suspense>
      </Canvas>

      {/* Controls hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="mono-label rounded-full border border-line bg-bg/60 px-4 py-2 backdrop-blur">
          Drag to orbit · Scroll to zoom · Click a monument
        </div>
      </div>

      {/* legend */}
      <div className="pointer-events-none absolute left-5 top-5 hidden flex-col gap-2 sm:flex">
        {projects.map((p) => (
          <div key={p.slug} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-[3px]"
              style={{ background: p.monument.color }}
            />
            <span className="mono-label text-fg-muted">{p.name}</span>
          </div>
        ))}
      </div>

      {/* Selection panel */}
      <AnimatePresence>
        {selected && (
          <motion.aside
            key={selected.slug}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="absolute right-4 top-4 z-20 w-[min(92vw,26rem)]"
          >
            <div className="panel bg-bg/85 p-6 backdrop-blur-xl sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-[3px]"
                      style={{ background: selected.monument.color }}
                    />
                    <span className="mono-label text-fg-muted">
                      {selected.category} · {selected.role}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                    {selected.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-fg-subtle hover:text-fg"
                >
                  <IconClose className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                {selected.summary}
              </p>

              {selected.metrics && (
                <div className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-4">
                  {selected.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                      <div className="font-display text-xl font-semibold tracking-tight">
                        {m.value}
                      </div>
                      <div className="mono-label mt-1 leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {selected.stack.slice(0, 4).map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/projects/${selected.slug}`}
                  className="focus-ring group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-all hover:opacity-90"
                >
                  Full case study
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                {selected.url && (
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-fg/40"
                  >
                    Visit
                    <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

/* 2D fallback for no-WebGL / reduced-motion — still fully usable. */
function WorldFallback() {
  const items = useMemo(() => projects, []);
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <p className="mono-label">Static view</p>
      <p className="mt-3 max-w-lg text-sm text-fg-muted">
        The interactive world is disabled (reduced motion or no WebGL). Here are
        the same destinations.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="focus-ring panel group flex flex-col justify-between p-6 transition-colors hover:border-fg/30"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-[3px]"
                style={{ background: p.monument.color }}
              />
              <span className="mono-label text-fg-muted">{p.category}</span>
            </div>
            <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight group-hover:text-accent">
              {p.name}
            </h2>
            <p className="mt-2 text-sm text-fg-muted">{p.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
