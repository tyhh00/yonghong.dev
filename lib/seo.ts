import type { Metadata } from "next";
import { site } from "./site";

/**
 * Build per-page metadata consistently. `path` should start with "/".
 * OG images fall back to the dynamic /opengraph-image route.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  type = "website",
  publishedTime,
  imageAlt,
}: {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  imageAlt?: string;
}): Metadata {
  const url = new URL(path, site.url).toString();
  // Bare title for the document <title> — the root layout's title.template
  // appends "· {site.name}" exactly once. Full title is used for OG/Twitter.
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · ${site.role}`;
  const desc = description ?? site.description;

  return {
    title: title ?? { absolute: fullTitle },
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: type === "profile" ? "profile" : type,
      url,
      title: fullTitle,
      description: desc,
      siteName: site.name,
      locale: "en_SG",
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: imageAlt ?? fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      creator: "@tyhho0",
      images: ["/opengraph-image"],
    },
  };
}
