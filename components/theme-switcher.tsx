"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { IconSun, IconMoon, IconJoystick } from "./icons";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { key: "light", label: "Light", Icon: IconSun },
  { key: "dark", label: "Dark", Icon: IconMoon },
  { key: "fuzzy", label: "Fuzzy", Icon: IconJoystick },
] as const;

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const active = mounted ? theme ?? "dark" : "dark";

  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-0.5 rounded-full border border-line bg-bg-elev/70 p-1 backdrop-blur",
        className
      )}
      role="radiogroup"
      aria-label="Color theme"
    >
      {OPTIONS.map(({ key, label, Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${label} theme`}
            title={`${label} mode`}
            onClick={() => setTheme(key)}
            className="focus-ring relative flex h-8 w-8 items-center justify-center rounded-full"
          >
            {isActive && (
              <motion.span
                layoutId="theme-indicator"
                className="absolute inset-0 rounded-full bg-fg"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <Icon
              className={cn(
                "relative h-[18px] w-[18px] transition-colors",
                isActive ? "text-bg" : "text-fg-subtle hover:text-fg"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
