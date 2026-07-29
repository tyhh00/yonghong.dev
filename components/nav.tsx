"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav as navItems, site } from "@/lib/site";
import { ThemeSwitcher } from "./theme-switcher";
import { IconMenu, IconClose } from "./icons";
import { cn } from "@/lib/utils";

function Monogram() {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      className="focus-ring group flex items-center gap-2.5"
    >
      <span className="relative flex h-8 w-8 items-center justify-center">
        <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
          <rect
            x="1"
            y="1"
            width="30"
            height="30"
            rx="8"
            className="fill-none stroke-line"
            strokeWidth="1.3"
          />
          <path
            d="M9.5 9 L16 16 L22.5 9"
            className="stroke-fg"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M16 16 L16 23.5"
            className="stroke-accent"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="2" className="fill-accent" />
        </svg>
        <span className="absolute inset-0 rounded-[8px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 glow-accent" />
      </span>
      <span className="font-display text-[15px] font-semibold tracking-tight">
        yonghong
        <span className="text-fg-subtle">.dev</span>
      </span>
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-expo",
        scrolled
          ? "border-b border-line bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Monogram />

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-full px-3.5 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeSwitcher className="hidden sm:inline-flex" />
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-line md:hidden"
          >
            {open ? (
              <IconClose className="h-5 w-5" />
            ) : (
              <IconMenu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-line bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5">
              {navItems.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring flex items-center justify-between rounded-xl px-3 py-3 text-lg font-medium text-fg-muted transition-colors hover:bg-fg/[0.03] hover:text-fg"
                >
                  <span>{item.label}</span>
                  <span className="mono-label">0{i + 1}</span>
                </Link>
              ))}
              <div className="mt-4 flex items-center justify-between px-3">
                <span className="mono-label">Theme</span>
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
