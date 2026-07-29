"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Generative flow-field background (the Kavela-style drifting wisps).
 * - Particles advect through a cheap layered-sine noise field.
 * - Colors are read from the live CSS theme vars, so it adapts to
 *   light / dark / fuzzy without a re-mount.
 * - Renders a single static frame under prefers-reduced-motion.
 */
export function FlowField({
  className,
  density = 1,
  opacity = 0.5,
}: {
  className?: string;
  density?: number;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const root = document.documentElement;
    const colors = { bg: "10 12 13", fg: "237 237 234", accent: "45 212 191" };
    const readColors = () => {
      const s = getComputedStyle(root);
      colors.bg = s.getPropertyValue("--bg").trim() || colors.bg;
      colors.fg = s.getPropertyValue("--fg").trim() || colors.fg;
      colors.accent = s.getPropertyValue("--accent").trim() || colors.accent;
    };
    readColors();
    const observer = new MutationObserver(readColors);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    type P = { x: number; y: number; a: boolean };
    let particles: P[] = [];
    const seed = () => {
      const count = Math.min(
        Math.floor((w * h) / 9000) * density,
        320
      );
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        a: i % 7 === 0, // ~14% carry the accent color
      }));
    };

    // Cheap, smooth angle field — layered sines standing in for noise.
    const field = (x: number, y: number, t: number) => {
      const s = 0.0022;
      return (
        Math.sin(x * s + t) * 1.1 +
        Math.cos(y * s * 1.3 - t * 0.8) * 1.1 +
        Math.sin((x + y) * s * 0.6 + t * 0.5)
      );
    };

    let t = 0;
    let raf = 0;
    const step = () => {
      // Fade previous frame toward bg for soft trails.
      ctx.fillStyle = `rgb(${colors.bg} / 0.06)`;
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        const angle = field(p.x, p.y, t) * Math.PI;
        const nx = p.x + Math.cos(angle) * 0.9;
        const ny = p.y + Math.sin(angle) * 0.9;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = p.a
          ? `rgb(${colors.accent} / ${0.22 * opacity})`
          : `rgb(${colors.fg} / ${0.09 * opacity})`;
        ctx.lineWidth = p.a ? 1.1 : 0.8;
        ctx.stroke();

        p.x = nx;
        p.y = ny;
        if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
        }
      }

      t += 0.0016;
      raf = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduce) {
      // One settled frame instead of animation.
      for (let i = 0; i < 240; i++) step();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [density, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
