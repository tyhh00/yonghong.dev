import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Age derived from birth year — self-updating, no hardcoded number to rot. */
export function ageFrom(birthYear: number, now = new Date()) {
  return now.getFullYear() - birthYear;
}

/** Format an ISO date as e.g. "Feb 2026". */
export function formatMonthYear(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/** Format an ISO date as e.g. "February 12, 2026". */
export function formatLongDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
