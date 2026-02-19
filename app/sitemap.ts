import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = "https://kahramanat.com";
  const locales = ["ar", "en"];
  const pages = ["", "/menu", "/branches", "/events", "/recipes", "/gallery", "/our-story"];

  return pages.flatMap((path) =>
    locales.map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
    }))
  );
}
