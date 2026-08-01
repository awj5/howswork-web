import type { MetadataRoute } from "next";

const routes = ["", "/about", "/how-it-works", "/pricing", "/contact/demo", "/contact/sales", "/contact/support"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://howswork.com.au${route}`,
    lastModified: new Date(),
  }));
}
