import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/json-ld";
import { WorldMount } from "@/components/world/world-mount";

export const metadata: Metadata = buildMetadata({
  title: "The World",
  description:
    "Explore Tan Yong Hong's work as an interactive voxel world. Click into Crystara, Kavela, True North and more.",
  path: "/world",
});

export default function WorldPage() {
  return (
    <section className="relative pt-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "The World", path: "/world" },
        ])}
      />
      {/* Accessible heading for SEO; the experience itself is visual. */}
      <h1 className="sr-only">
        Tan Yong Hong: an interactive voxel world of my work
      </h1>
      <WorldMount />
    </section>
  );
}
