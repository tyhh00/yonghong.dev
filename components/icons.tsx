import type { SVGProps } from "react";

/**
 * Custom monoline icon set. All icons: 24x24 viewBox, stroke = currentColor,
 * no fills, no background chips. Consistent 1.6 stroke weight, round joins.
 * Brand marks (x/linkedin/github) are drawn as minimal currentColor glyphs.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconServer(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="4" width="17" height="6" rx="1.5" />
      <rect x="3.5" y="14" width="17" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
      <path d="M11 7h6M11 17h6" strokeWidth={1.2} opacity={0.6} />
    </svg>
  );
}

export function IconGamepad(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M7 12H4.5M5.75 10.75v2.5" />
      <path d="M14.5 11.5h.01M17 13h.01" />
      <path d="M8.5 7h7a5 5 0 0 1 4.9 4l.02.1a3.2 3.2 0 0 1-6.06 2.02L14 12.5h-4l-.38.62A3.2 3.2 0 0 1 3.56 11.1L3.6 11a5 5 0 0 1 4.9-4Z" />
    </svg>
  );
}

export function IconShield(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3.5 5 6v5.2c0 4 2.8 7 7 9.3 4.2-2.3 7-5.3 7-9.3V6l-7-2.5Z" />
      <path d="M9.2 12.2 11 14l4-4.2" strokeWidth={1.4} />
    </svg>
  );
}

export function IconCube(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3 20 7.3v9.4L12 21l-8-4.3V7.3L12 3Z" />
      <path d="M4 7.3 12 11.7l8-4.4" />
      <path d="M12 11.7V21" />
    </svg>
  );
}

export function IconCap(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M2.5 8.5 12 4.5l9.5 4-9.5 4-9.5-4Z" />
      <path d="M6.5 10.4V15c0 1.3 2.46 2.5 5.5 2.5s5.5-1.2 5.5-2.5v-4.6" />
      <path d="M21.5 8.5v4.2" />
    </svg>
  );
}

export function IconCompass(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.8 9.2-1.7 4-4 1.6 1.7-4 4-1.6Z" />
      <path d="M12 3.5v1.2M12 19.3v1.2M3.5 12h1.2M19.3 12h1.2" strokeWidth={1.2} />
    </svg>
  );
}

export function IconSpark(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3c.4 4.4 1.6 5.6 6 6-4.4.4-5.6 1.6-6 6-.4-4.4-1.6-5.6-6-6 4.4-.4 5.6-1.6 6-6Z" />
      <path d="M18.5 4c.15 1.4.6 1.85 2 2-1.4.15-1.85.6-2 2-.15-1.4-.6-1.85-2-2 1.4-.15 1.85-.6 2-2Z" strokeWidth={1.2} />
    </svg>
  );
}

export function IconArrowRight(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function IconArrowUpRight(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function IconSun(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.5 4.5l1.4 1.4M18.1 18.1l1.4 1.4M2.5 12h2M19.5 12h2M4.5 19.5l1.4-1.4M18.1 5.9l1.4-1.4" />
    </svg>
  );
}

export function IconMoon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

/** Fuzzy / game mode toggle — a joystick glyph. */
export function IconJoystick(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="6" r="2.5" />
      <path d="M12 8.5V14" />
      <path d="M6 20.5a6 6 0 0 1 12 0Z" />
      <path d="M9.5 17.5h5" strokeWidth={1.2} opacity={0.7} />
    </svg>
  );
}

export function IconMenu(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconCheck(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4.5 12.5 9 17l10.5-11" />
    </svg>
  );
}

export function IconMail(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </svg>
  );
}

/* ---- Brand marks (minimal, currentColor) ---- */

export function IconX(p: IconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M17.53 3H20.5l-6.49 7.42L21.75 21h-6.03l-4.72-6.17L5.6 21H2.63l6.94-7.94L2.25 3h6.18l4.27 5.64L17.53 3Zm-1.06 16.2h1.65L7.6 4.71H5.83L16.47 19.2Z" />
    </svg>
  );
}

export function IconLinkedin(p: IconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M6.94 6.5A1.94 1.94 0 1 1 3.06 6.5a1.94 1.94 0 0 1 3.88 0ZM3.4 9h3.1v11.5H3.4V9Zm5.06 0h2.97v1.57h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74v6.79h-3.1v-6.02c0-1.43-.02-3.28-2-3.28-2 0-2.31 1.56-2.31 3.17v6.13H8.46V9Z" />
    </svg>
  );
}

export function IconGithub(p: IconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.85c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.01 10.01 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function IconTelegram(p: IconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M21.94 4.4a1.6 1.6 0 0 0-2.2-1.83L2.9 9.5c-1.36.53-1.29 2.5.1 2.94l4.34 1.35 1.63 5.1c.32 1 1.6 1.27 2.3.49l2.1-2.34 4.3 3.16c.88.65 2.12.2 2.33-.86l2.94-14.94ZM9.3 13.1l8.4-5.4c.32-.21.65.22.36.48l-6.85 6.16a1 1 0 0 0-.3.55l-.36 2.68c-.05.36-.55.4-.65.05l-1.07-3.4a.6.6 0 0 1 .27-.72Z" />
    </svg>
  );
}

export function IconKavela(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5Z" />
      <path d="M4 8l8 4.5L20 8" />
      <path d="M12 12.5V20.5" />
    </svg>
  );
}

export const socialIcons = {
  x: IconX,
  linkedin: IconLinkedin,
  github: IconGithub,
  mail: IconMail,
  telegram: IconTelegram,
  kavela: IconKavela,
} as const;

export const milestoneIcons = {
  server: IconServer,
  gamepad: IconGamepad,
  shield: IconShield,
  cube: IconCube,
  cap: IconCap,
  compass: IconCompass,
  spark: IconSpark,
} as const;
