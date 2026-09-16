import type { MetadataRoute } from "next";
import { products, categories } from "../lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gaming-pc-store-web-production.up.railway.app";
  const staticRoutes = ["", "/category/all", "/builder", "/search", "/blog", "/cart", "/wishlist"];
  const blog = ["cara-memilih-processor-gaming", "gpu-1080p-1440p-4k", "ddr5-32gb-vs-64gb", "berapa-watt-psu-gaming", "nvme-gen4-vs-gen5", "cara-memilih-gaming-monitor", "pc-gaming-15-juta", "pc-gaming-25-juta", "checklist-kompatibilitas-pc"];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((x) => ({
    url: base + x,
    changeFrequency: x === "" ? "daily" : "weekly",
    priority: x === "" ? 1 : 0.8,
  }));
  const categoryEntries: MetadataRoute.Sitemap = categories.filter((x) => x !== "all").map((x) => ({
    url: `${base}/category/${x}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.75,
  }));
  const blogEntries: MetadataRoute.Sitemap = blog.map((x) => ({
    url: `${base}/blog/${x}`,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries, ...blogEntries];
}
