"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Global Lenis smooth scroll. Disabled entirely under prefers-reduced-motion
 * (native scroll takes over). Intercepts in-page hash links for eased jumps.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"], a[href^="/#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const hash = target.getAttribute("href")!.split("#")[1];
      if (!hash) return;
      const el = document.getElementById(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80 });
      history.pushState(null, "", `#${hash}`);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
