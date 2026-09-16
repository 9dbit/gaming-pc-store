import type { MetadataRoute } from "next";

const BASE="https://gaming-pc-store-web-production.up.railway.app";

export default function robots():MetadataRoute.Robots{
 return {
  rules:[
   {userAgent:"*",allow:"/",disallow:["/checkout","/cart","/wishlist","/account","/api/"]},
   {userAgent:"Googlebot",allow:"/",disallow:["/checkout","/cart","/wishlist","/account","/api/"]},
   {userAgent:"Googlebot-Image",allow:"/api/media/",disallow:["/api/"]},
   {userAgent:"facebookexternalhit",allow:"/",disallow:["/checkout","/cart","/wishlist","/account","/api/"]},
   {userAgent:"Facebot",allow:"/",disallow:["/checkout","/cart","/wishlist","/account","/api/"]},
   {userAgent:"meta-externalagent",allow:"/",disallow:["/checkout","/cart","/wishlist","/account","/api/"]}
  ],
  sitemap:`${BASE}/sitemap.xml`,
  host:BASE
 };
}
