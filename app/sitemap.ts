import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://poaecohostel.lovable.app";
  return ["", "/hospedagem", "/galeria", "/experiencias", "/social"].map((path) => ({ url: `${origin}${path}` }));
}
