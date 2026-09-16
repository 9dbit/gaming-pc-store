import Link from "next/link";
import {ShoppingCart} from "lucide-react";
import CommerceEngine from "../../components/CommerceEngine";
import {products} from "../../lib/catalog";

const humanize=(s:string)=>s.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase());

function Shell({title,kicker="NEXRIG",children}:{title:string;kicker?:string;children:React.ReactNode}){
  return <main><header className="topbar"><Link href="/" className="brand">NEX<span>RIG</span></Link><Link href="/cart"><ShoppingCart size={21}/></Link></header><div className="pageHero"><span className="kicker">{kicker}</span><h1>{title}</h1><p>Performance-first PC components, compatibility guidance, official warranty, and expert support for your next gaming rig.</p></div>{children}<div className="pageLinks"><Link href="/">Home</Link><Link href="/category/all">All Components</Link><Link href="/builder">PC Builder</Link><Link href="/guides/build-gaming-pc">Guides</Link></div></main>
}

export default async function CatchAll({params}:{params:Promise<{slug:string[]}>}){
  const {slug}=await params;
  const [type,...rest]=slug;
  const leaf=rest.join("-")||"all";

  if(type==="category") return <CommerceEngine mode="category" slug={leaf}/>;
  if(type==="product") return <CommerceEngine mode="product" slug={leaf}/>;
  if(type==="search") return <CommerceEngine mode="search"/>;
  if(type==="cart") return <CommerceEngine mode="cart"/>;
  if(type==="wishlist") return <CommerceEngine mode="wishlist"/>;
  if(type==="checkout") return <CommerceEngine mode="checkout"/>;
  if(type==="builder") return <CommerceEngine mode="builder"/>;

  const title=humanize(leaf);
  if(type==="guides") return <Shell title={title} kicker="NEXRIG GUIDE"><article className="contentSection article"><p>Choosing the right PC component starts with your target game, resolution, refresh rate, budget, and upgrade path.</p><h2>Start with your performance target</h2><p>Competitive gaming benefits from stable frame rates and low latency. Cinematic RPG and open-world builds need a balanced GPU, memory, storage, cooling, and PSU configuration.</p><h2>Check compatibility before checkout</h2><p>Use the NEXRIG PC Builder to validate CPU socket, memory generation, PSU headroom, case GPU clearance, and cooler socket support before adding the build to cart.</p><div className="seoGrid"><Link href="/builder">Open PC Builder</Link><Link href="/category/processor">Processors</Link><Link href="/category/graphics-card">Graphics Cards</Link><Link href="/category/memory">Memory</Link></div></article></Shell>;
  if(type==="gaming-pc") return <Shell title={`${title} Gaming PC Build`} kicker="CURATED BUILD"><section className="contentSection"><p>Use this as a starting point, then validate every component with the compatibility engine.</p><div className="commerceGrid">{products.slice(0,8).map(p=><Link className="commerceCard" href={`/product/${p.slug}`} key={p.id}><div className="productImage"><img src={p.image} alt={p.name}/></div><div className="commerceBody"><span className="cat">{p.category}</span><h3>{p.name}</h3><strong>View product →</strong></div></Link>)}</div></section></Shell>;
  if(type==="brand") return <Shell title={`${title} Gaming Hardware`} kicker="SHOP BY BRAND"><section className="contentSection"><p>Browse gaming components selected for performance, reliability, warranty coverage, and PC-build compatibility.</p><div className="seoGrid"><Link href="/category/all">Shop All Components</Link><Link href="/builder">PC Builder</Link><Link href="/guides/build-gaming-pc">Build Guide</Link><Link href="/search">Search NEXRIG</Link></div></section></Shell>;

  return <Shell title={humanize(slug.join("-"))} kicker="NEXRIG STORE"><section className="contentSection"><p>This NEXRIG page is live and connected to the storefront navigation.</p><div className="seoGrid"><Link href="/category/all">Shop Components</Link><Link href="/search">Search Products</Link><Link href="/builder">Build a PC</Link><Link href="/cart">Shopping Cart</Link></div></section></Shell>;
}
