import Link from "next/link";
import { Cpu, CircuitBoard, MemoryStick, HardDrive, Monitor, Cable, Zap, Box, Search, ShoppingCart, Heart, Star, Fan, ShieldCheck, Truck, Wrench, CreditCard } from "lucide-react";
import HeroCarousel from "../components/HeroCarousel";
import { getHeroSlides } from "../lib/heroes";
import { products, money } from "../lib/catalog";

const categories = [
  ["Processor", Cpu, "processor"], ["Motherboard", CircuitBoard, "motherboard"], ["GPU", Cpu, "graphics-card"], ["Memory", MemoryStick, "memory"],
  ["Storage", HardDrive, "storage"], ["Power Supply", Zap, "power-supply"], ["Gaming Case", Box, "gaming-case"], ["Cooling", Fan, "cooling"],
  ["Monitor", Monitor, "monitor"], ["Cable", Cable, "cable"]
] as const;

function ProductRail({title,kicker,items,href="/category/all"}:{title:string;kicker:string;items:typeof products;href?:string}){
 return <section className="productsWrap homeRail"><div className="sectionHead"><div><span className="kicker">{kicker}</span><h2>{title}</h2></div><Link href={href}>View all</Link></div><div className="homeProductRail">{items.map((p,i)=><Link href={`/product/${p.slug}`} className="card" key={p.id}><div className="imageBox"><img src={p.image} alt={p.name} loading={i<3?"eager":"lazy"}/>{p.badge&&<span className="badge">{p.badge}</span>}<span className="heart"><Heart size={17}/></span></div><div className="cat">{p.category}</div><h3>{p.name}</h3><div className="rating"><Star size={14} fill="currentColor"/> {p.rating} <small>({p.reviews})</small></div><strong>{money(p.price)}</strong>{p.oldPrice&&<del className="homeOldPrice">{money(p.oldPrice)}</del>}<span className="homeStock">{p.stock} ready stock</span></Link>)}</div></section>
}

export const metadata = {
  title:"Gaming PC Components & Custom PC Hardware Indonesia | NEXRIG",
  description:"Belanja processor, GPU, motherboard, DDR5 RAM, NVMe SSD, PSU, casing, cooling, gaming monitor, dan aksesori PC. NEXRIG menyediakan panduan kompatibilitas dan PC Builder untuk gamer Indonesia.",
  alternates:{canonical:"/"},
  openGraph:{title:"NEXRIG Gaming PC Components Indonesia",description:"Build faster. Play harder. Original gaming PC components, compatibility guidance, and PC Builder.",type:"website"}
};

export default function Home() {
  const slides=getHeroSlides();
  const best=products.slice().sort((a,b)=>b.reviews-a.reviews).slice(0,8);
  const deals=products.filter(p=>p.oldPrice).slice(0,8);
  const gpu=products.filter(p=>p.categorySlug==="graphics-card");
  const core=products.filter(p=>["processor","motherboard","memory","storage"].includes(p.categorySlug)).slice(0,10);
  const setup=products.filter(p=>["monitor","gaming-case","cooling","cable","power-supply"].includes(p.categorySlug)).slice(0,10);
  const schema={"@context":"https://schema.org","@type":"WebSite",name:"NEXRIG",url:"https://gaming-pc-store-web-production.up.railway.app",potentialAction:{"@type":"SearchAction",target:"https://gaming-pc-store-web-production.up.railway.app/search?q={search_term_string}","query-input":"required name=search_term_string"}};
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <header className="topbar"><Link href="/" className="brand">NEX<span>RIG</span></Link><div className="actions"><Link href="/search" aria-label="Search"><Search size={21}/></Link><Link href="/wishlist" aria-label="Wishlist"><Heart size={21}/></Link><Link href="/cart" aria-label="Cart"><ShoppingCart size={21}/></Link></div></header>
    <HeroCarousel slides={slides}/>

    <section className="categoryWrap">
      <div className="sectionHead"><div><span className="kicker">SHOP FAST</span><h2>Shop by category</h2></div><Link href="/category/all">See all</Link></div>
      <div className="categories">{categories.map(([label,Icon,slug])=><Link className="category" href={`/category/${slug}`} key={slug}><div className="icon"><Icon size={24}/></div><span>{label}</span></Link>)}</div>
    </section>

    <ProductRail title="Best sellers" kicker="MOST WANTED" items={best}/>
    <ProductRail title="Deals worth grabbing" kicker="PRICE DROP" items={deals}/>
    <ProductRail title="GPU for every frame target" kicker="GRAPHICS CARD" items={gpu} href="/category/graphics-card"/>

    <section className="builder homeBuilder"><div><span>PC COMPATIBILITY ENGINE</span><h2>Build without the guesswork.</h2><p>Pick your CPU first. NEXRIG then narrows motherboard, DDR5 memory, cooling, PSU, case, and display choices that fit the build.</p><Link href="/builder">Start Your Build</Link></div><div className="builderMetrics"><span><b>9</b>guided part steps</span><span><b>5</b>compatibility checks</span><span><b>1</b>cart-ready build</span></div></section>

    <ProductRail title="Core components" kicker="BUILD THE ENGINE" items={core}/>
    <ProductRail title="Complete the setup" kicker="FINISH THE RIG" items={setup}/>

    <section className="homeTrust"><div><ShieldCheck/><b>Original Hardware</b><span>Distributor-backed stock and clear warranty information.</span></div><div><Truck/><b>Fast Delivery</b><span>Ready-stock visibility and transparent shipping guidance.</span></div><div><Wrench/><b>Compatibility Help</b><span>Use PC Builder before checkout to reduce wrong-part purchases.</span></div><div><CreditCard/><b>Secure Payment Ready</b><span>UI prepared for VA, QRIS, cards, bank transfer, and e-wallet gateway integration.</span></div></section>

    <section className="seo homeEditorial"><div className="sectionHead"><div><span className="kicker">NEXRIG GUIDES</span><h2>Learn before you upgrade</h2></div><Link href="/blog">View blog</Link></div><div className="blogPreviewGrid"><Link href="/blog/cara-memilih-processor-gaming"><span>Processor</span><h3>Cara Memilih Processor Gaming: FPS, Core, Cache, dan Upgrade Path</h3><p>Kenali perbedaan kebutuhan esports, AAA, streaming, dan creator workload.</p></Link><Link href="/blog/gpu-1080p-1440p-4k"><span>Graphics</span><h3>GPU untuk 1080p vs 1440p vs 4K</h3><p>Pilih kelas GPU berdasarkan resolusi, refresh rate, dan target visual.</p></Link><Link href="/blog/berapa-watt-psu-gaming"><span>Power</span><h3>Berapa Watt PSU yang Dibutuhkan Gaming PC?</h3><p>Hitung kebutuhan daya, transient spike, dan headroom upgrade.</p></Link><Link href="/blog/checklist-kompatibilitas-pc"><span>PC Builder</span><h3>Checklist Kompatibilitas Sebelum Merakit PC</h3><p>Socket, RAM generation, PSU, GPU clearance, cooling, dan airflow.</p></Link></div></section>

    <section className="seo homeSeoCopy"><h2>Gaming PC components & custom PC hardware Indonesia</h2><p>NEXRIG membantu gamer dan creator memilih komponen PC dengan jalur yang lebih jelas, mulai dari processor, graphics card, motherboard, DDR5 memory, NVMe SSD, power supply, gaming case, CPU cooling, gaming monitor, hingga cable dan aksesori. Setiap kategori dirancang dengan spesifikasi yang mudah dibandingkan, informasi stok, harga, rating, dan tautan internal menuju komponen yang relevan.</p><p>Gunakan <Link href="/builder">NEXRIG PC Builder</Link> untuk mengecek kecocokan socket CPU dan motherboard, generasi memory, kebutuhan daya GPU, PSU headroom, ukuran graphics card terhadap case, dan dukungan socket CPU cooler. Untuk rekomendasi lebih dalam, buka <Link href="/blog">NEXRIG Guides</Link> dan artikel pemilihan hardware berdasarkan target FPS, resolusi, budget, dan upgrade path.</p><div className="seoGrid"><Link href="/category/processor">Gaming Processor</Link><Link href="/category/graphics-card">Gaming GPU</Link><Link href="/category/memory">DDR5 RAM</Link><Link href="/category/storage">NVMe SSD</Link><Link href="/category/power-supply">Gaming PSU</Link><Link href="/category/monitor">Gaming Monitor</Link><Link href="/builder">PC Builder</Link><Link href="/blog">PC Gaming Guides</Link></div></section>

    <nav className="bottomNav"><Link href="/">Home</Link><Link href="/category/all">Categories</Link><Link href="/search">Search</Link><Link href="/wishlist">Wishlist</Link><Link href="/cart">Cart</Link></nav>
  </main>
}
