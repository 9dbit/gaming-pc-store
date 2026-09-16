import type { MetadataRoute } from "next";
import { products, categories } from "../lib/catalog";

const BASE="https://gaming-pc-store-web-production.up.railway.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    {path:"",freq:"daily" as const,priority:1},
    {path:"/category/all",freq:"daily" as const,priority:.9},
    {path:"/builder",freq:"weekly" as const,priority:.8},
    {path:"/blog",freq:"weekly" as const,priority:.8},
    {path:"/gaming-pc/high-end",freq:"weekly" as const,priority:.7},
    {path:"/guides/build-gaming-pc",freq:"monthly" as const,priority:.7}
  ];
  const blog = ["cara-memilih-processor-gaming","gpu-1080p-1440p-4k","ddr5-32gb-vs-64gb","berapa-watt-psu-gaming","nvme-gen4-vs-gen5","cara-memilih-gaming-monitor","pc-gaming-15-juta","pc-gaming-25-juta","checklist-kompatibilitas-pc"];
  const now=new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((x) => ({
    url: BASE+x.path,
    lastModified:now,
    changeFrequency:x.freq,
    priority:x.priority,
  }));
  const categoryEntries: MetadataRoute.Sitemap = categories.filter((x) => x !== "all").map((x) => ({
    url: `${BASE}/category/${x}`,
    lastModified:now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    lastModified:now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));
  const blogEntries: MetadataRoute.Sitemap = blog.map((x) => ({
    url: `${BASE}/blog/${x}`,
    lastModified:now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries, ...blogEntries];
}
