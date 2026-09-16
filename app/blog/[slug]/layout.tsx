import type {Metadata} from "next";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;
 return {
  alternates:{canonical:`/blog/${slug}`},
  robots:{index:true,follow:true},
  openGraph:{type:"article",url:`/blog/${slug}`}
 };
}

export default function BlogArticleLayout({children}:{children:React.ReactNode}){return children;}
