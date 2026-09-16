import type { MetadataRoute } from "next";
import { products, categories } from "../lib/catalog";

export default function sitemap():MetadataRoute.Sitemap{
 const base="https://gaming-pc-store-web-production.up.railway.app";
 const staticRoutes=["","/category/all","/builder","/search","/blog","/cart","/wishlist"];
 const blog=["cara-memilih-processor-gaming","gpu-1080p-1440p-4k","ddr5-32gb-vs-64gb","berapa-watt-psu-gaming","nvme-gen4-vs-gen5","cara-memilih-gaming-monitor","pc-gaming-15-juta","pc-gaming-25-juta","checklist-kompatibilitas-pc"];
 return [
  ...staticRoutes.map(x=>({url:base+x,changeFrequency:x===""?"daily":"weekly" as const,priority:x===""?1:.8})),
  ...categories.filter(x=>x!=="all").map(x=>({url:`${base}/category/${x}`,changeFrequency:"weekly" as const,priority:.8})),
  ...products.map(p=>({url:`${base}/product/${p.slug}`,changeFrequency:"weekly" as const,priority:.75})),
  ...blog.map(x=>({url:`${base}/blog/${x}`,changeFrequency:"monthly" as const,priority:.65}))
 ];
}
