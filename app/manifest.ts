import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · ${site.role}`,
    short_name: site.alias,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0A0C0D",
    theme_color: "#0A0C0D",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
