import Link from "next/link";
import { Cpu, CircuitBoard, MemoryStick, HardDrive, Monitor, Cable, Zap, Box, Search, ShoppingCart, Heart, Star } from "lucide-react";
import HeroCarousel from "../components/HeroCarousel";
import { getHeroSlides } from "../lib/heroes";

const categories = [
  ["Processor", Cpu, "processor"], ["Motherboard", CircuitBoard, "motherboard"], ["Memory", MemoryStick, "memory"],
  ["Storage", HardDrive, "storage"], ["Power Supply", Zap, "power-supply"], ["Gaming Case", Box, "gaming-case"],
  ["Monitor", Monitor, "monitor"], ["Cable", Cable, "cable"]
] as const;

const products = [
  {name:"AMD Ryzen 7 9800X3D",cat:"Processor",price:"Rp 8.799.000",rating:"4.9",img:"https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=900&q=85"},
  {name:"ROG Strix X870-F Gaming WiFi",cat:"Motherboard",price:"Rp 7.299.000",rating:"4.8",img:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85"},
  {name:"RTX Gaming Graphics Card",cat:"Graphics Card",price:"Rp 17.999.000",rating:"4.9",img:"https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=900&q=85"},
  {name:"DDR5 RGB 32GB Kit",cat:"Memory",price:"Rp 2.399.000",rating:"4.7",img:"https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=900&q=85"}
];

export default function Home() {
  const slides = getHeroSlides();
  return <main>
    <header className="topbar"><Link href="/" className="brand">NEX<span>RIG</span></Link><div className="actions"><Link href="/search" aria-label="Search"><Search size={21}/></Link><Link href="/wishlist" aria-label="Wishlist"><Heart size={21}/></Link><Link href="/cart" aria-label="Cart"><ShoppingCart size={21}/></Link></div></header>
    <HeroCarousel slides={slides}/>

    <section className="categoryWrap">
      <div className="sectionHead"><h2>Shop by category</h2><Link href="/category/all">See all</Link></div>
      <div className="categories">{categories.map(([label,Icon,slug])=><Link className="category" href={`/category/${slug}`} key={slug}><div className="icon"><Icon size={24}/></div><span>{label}</span></Link>)}</div>
    </section>

    <section id="shop" className="productsWrap">
      <div className="sectionHead"><div><span className="kicker">TRENDING NOW</span><h2>Featured gear</h2></div><Link href="/category/all">View all</Link></div>
      <div className="productGrid">{products.map((p,i)=><Link href={`/product/${p.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`} className="card" key={p.name}>
        <div className="imageBox"><img src={p.img} alt={p.name}/><span className="badge">{i<2?"BEST SELLER":"NEW"}</span><span className="heart"><Heart size={17}/></span></div>
        <div className="cat">{p.cat}</div><h3>{p.name}</h3><div className="rating"><Star size={14} fill="currentColor"/> {p.rating}</div><strong>{p.price}</strong>
      </Link>)}</div>
    </section>

    <section id="builder" className="builder"><span>PC COMPATIBILITY ENGINE</span><h2>Build without the guesswork.</h2><p>Choose a CPU and we’ll narrow down compatible motherboards, memory, cooling, power, cases, and monitors.</p><Link href="/builder">Start Your Build</Link></section>

    <section className="seo"><h2>Explore NEXRIG</h2><div className="seoGrid"><Link href="/guides/best-gaming-processor">Best Gaming Processors</Link><Link href="/guides/how-to-choose-gpu">How to Choose a GPU</Link><Link href="/gaming-pc/high-end">High-End Gaming Build</Link><Link href="/brand/asus">Shop ASUS Gaming</Link></div></section>

    <nav className="bottomNav"><Link href="/">Home</Link><Link href="/category/all">Categories</Link><Link href="/search">Search</Link><Link href="/wishlist">Wishlist</Link><Link href="/cart">Cart</Link></nav>
  </main>
}
