"use client";

import dynamic from "next/dynamic";

const WorldExperience = dynamic(
  () => import("./world-experience").then((m) => m.WorldExperience),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[calc(100dvh-4rem)] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" />
          <span className="mono-label">Building the world…</span>
        </div>
      </div>
    ),
  }
);

export function WorldMount() {
  return <WorldExperience />;
}
