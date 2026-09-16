"use client";

import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {usePathname,useRouter} from "next/navigation";
import {Search,Heart,ShoppingCart,Menu,X,ChevronDown,Home,Grid2X2,Gamepad2,Wrench,BookOpen,Tag,UserRound} from "lucide-react";
import {products,money} from "../lib/catalog";

const CART_KEY="nexrig_cart_v1";
const WISH_KEY="nexrig_wishlist_v1";

function readCounts(){
 if(typeof window==="undefined") return {cart:0,wish:0};
 try{
  const cart=JSON.parse(localStorage.getItem(CART_KEY)||"[]") as {qty?:number}[];
  const wish=JSON.parse(localStorage.getItem(WISH_KEY)||"[]") as string[];
  return {cart:cart.reduce((n,x)=>n+(x.qty||1),0),wish:wish.length};
 }catch{return {cart:0,wish:0}}
}

function useStoreCounts(){
 const [counts,setCounts]=useState({cart:0,wish:0});
 useEffect(()=>{
  const sync=()=>setCounts(readCounts());
  sync();
  window.addEventListener("storage",sync);
  window.addEventListener("nexrig-store",sync as EventListener);
  const id=window.setInterval(sync,700);
  return()=>{window.removeEventListener("storage",sync);window.removeEventListener("nexrig-store",sync as EventListener);window.clearInterval(id)};
 },[]);
 return counts;
}

const componentLinks=[
 ["Processor","/category/processor"],["Graphics Card","/category/graphics-card"],["Motherboard","/category/motherboard"],["Memory / RAM","/category/memory"],
 ["NVMe Storage","/category/storage"],["Power Supply","/category/power-supply"],["Gaming Case","/category/gaming-case"],["Cooling","/category/cooling"],
 ["Gaming Monitor","/category/monitor"],["Cable & Connectivity","/category/cable"]
] as const;

export function SiteHeader(){
 const counts=useStoreCounts();
 const pathname=usePathname();
 const router=useRouter();
 const [searchOpen,setSearchOpen]=useState(false);
 const [menuOpen,setMenuOpen]=useState(false);
 const [q,setQ]=useState("");
 const suggestions=useMemo(()=>q.trim()?products.filter(p=>(p.name+" "+p.category+" "+p.brand+" "+Object.values(p.specs).join(" ")).toLowerCase().includes(q.toLowerCase())).slice(0,6):products.slice().sort((a,b)=>b.reviews-a.reviews).slice(0,6),[q]);
 useEffect(()=>{if(searchOpen||menuOpen)document.body.classList.add("chromeLocked");else document.body.classList.remove("chromeLocked");return()=>document.body.classList.remove("chromeLocked")},[searchOpen,menuOpen]);
 useEffect(()=>{setSearchOpen(false);setMenuOpen(false)},[pathname]);
 useEffect(()=>{
  const keys=(e:KeyboardEvent)=>{
   if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();setMenuOpen(false);setSearchOpen(true)}
   if(e.key==="Escape"){setSearchOpen(false);setMenuOpen(false)}
  };
  window.addEventListener("keydown",keys);
  return()=>window.removeEventListener("keydown",keys);
 },[]);
 const submitSearch=(e:React.FormEvent)=>{e.preventDefault();const query=q.trim();setSearchOpen(false);router.push(query?`/search?q=${encodeURIComponent(query)}`:"/search")};
 return <>
  <div className="announcementBar"><span>FREE SHIPPING above Rp 3.000.000</span><span>•</span><span>Compatibility checked gaming hardware</span></div>
  <header className="siteHeader">
   <div className="siteHeaderInner">
    <button className="mobileMenuBtn" onClick={()=>setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}><Menu size={21}/></button>
    <Link href="/" className="siteBrand" aria-label="NEXRIG home">NEX<span>RIG</span></Link>
    <nav className="desktopNav" aria-label="Main navigation">
     <div className="navMega"><button aria-haspopup="true">Components <ChevronDown size={14}/></button><div className="megaMenu"><div><span className="megaKicker">PC COMPONENTS</span><h3>Build the machine, part by part.</h3><p>Browse performance hardware with compatibility context before checkout.</p><Link className="megaCta" href="/category/all">Shop all components →</Link></div><div className="megaLinkGrid">{componentLinks.map(([label,href])=><Link href={href} key={href}>{label}<small>Shop category</small></Link>)}</div></div></div>
     <Link href="/gaming-pc/high-end">Gaming PC</Link>
     <Link href="/builder">PC Builder</Link>
     <Link href="/category/all?sort=deal"><Tag size={14}/> Deals</Link>
     <Link href="/blog"><BookOpen size={14}/> Guides</Link>
    </nav>
    <div className="siteActions">
     <button className="desktopSearchTrigger" onClick={()=>setSearchOpen(true)} aria-label="Search products"><Search size={18}/><span>Search hardware</span><kbd>⌘K</kbd></button>
     <button className="compactSearchBtn" onClick={()=>setSearchOpen(true)} aria-label="Search"><Search size={20}/></button>
     <Link href="/wishlist" className="chromeIcon" aria-label={`Wishlist${counts.wish?` (${counts.wish})`:""}`}><Heart size={20}/>{counts.wish>0&&<b>{counts.wish}</b>}</Link>
     <Link href="/cart" className="chromeIcon" aria-label={`Cart${counts.cart?` (${counts.cart})`:""}`}><ShoppingCart size={20}/>{counts.cart>0&&<b>{counts.cart}</b>}</Link>
     <Link href="/account" className="desktopAccount" aria-label="Account"><UserRound size={19}/></Link>
    </div>
   </div>
  </header>

  {searchOpen&&<div className="searchOverlay" role="dialog" aria-modal="true" aria-label="Search NEXRIG products"><button className="overlayBackdrop" onClick={()=>setSearchOpen(false)} aria-label="Close search"/><div className="searchPanel"><form className="searchPanelTop" onSubmit={submitSearch}><Search size={22}/><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search processor, GPU, DDR5, 850W, 180Hz..." aria-label="Search products"/><button type="button" onClick={()=>setSearchOpen(false)} aria-label="Close"><X/></button></form><div className="searchQuick"><span>Quick access</span><Link href="/category/graphics-card" onClick={()=>setSearchOpen(false)}>GPU</Link><Link href="/category/processor" onClick={()=>setSearchOpen(false)}>Processor</Link><Link href="/category/storage" onClick={()=>setSearchOpen(false)}>NVMe SSD</Link><Link href="/builder" onClick={()=>setSearchOpen(false)}>PC Builder</Link></div><div className="searchResults"><div className="searchResultsHead"><b>{q?"Search suggestions":"Popular right now"}</b><Link href={`/search${q?`?q=${encodeURIComponent(q)}`:""}`} onClick={()=>setSearchOpen(false)}>View all</Link></div>{suggestions.map(p=><Link className="searchResult" href={`/product/${p.slug}`} key={p.id} onClick={()=>setSearchOpen(false)}><img src={p.image} alt=""/><span><b>{p.name}</b><small>{p.category} · {p.brand}</small></span><strong>{money(p.price)}</strong></Link>)}</div></div></div>}

  {menuOpen&&<div className="mobileDrawer" role="dialog" aria-modal="true" aria-label="Mobile menu"><button className="drawerBackdrop" onClick={()=>setMenuOpen(false)} aria-label="Close menu"/><aside><div className="drawerHead"><Link href="/" className="siteBrand" onClick={()=>setMenuOpen(false)}>NEX<span>RIG</span></Link><button onClick={()=>setMenuOpen(false)} aria-label="Close menu"><X/></button></div><button className="drawerSearch" onClick={()=>{setMenuOpen(false);setSearchOpen(true)}}><Search size={18}/>Search products</button><div className="drawerPrimary"><Link href="/category/all" onClick={()=>setMenuOpen(false)}><Grid2X2/>All Components</Link><Link href="/builder" onClick={()=>setMenuOpen(false)}><Wrench/>PC Builder</Link><Link href="/gaming-pc/high-end" onClick={()=>setMenuOpen(false)}><Gamepad2/>Gaming PC</Link><Link href="/blog" onClick={()=>setMenuOpen(false)}><BookOpen/>Guides</Link></div><div className="drawerCategories"><span>SHOP BY CATEGORY</span>{componentLinks.map(([label,href])=><Link href={href} key={href} onClick={()=>setMenuOpen(false)}>{label}<small>→</small></Link>)}</div></aside></div>}
 </>
}

export function MobileNav(){
 const counts=useStoreCounts();
 const pathname=usePathname();
 const links=[
  ["Home","/",Home],["Shop","/category/all",Grid2X2],["Search","/search",Search],["Wishlist","/wishlist",Heart],["Cart","/cart",ShoppingCart]
 ] as const;
 return <nav className="mobileNavV2" aria-label="Mobile navigation">{links.map(([label,href,Icon])=>{const active=href==="/"?pathname===href:pathname.startsWith(href);const badge=label==="Cart"?counts.cart:label==="Wishlist"?counts.wish:0;return <Link href={href} className={active?"active":""} key={href} aria-current={active?"page":undefined}><span><Icon size={20}/>{badge>0&&<b>{badge}</b>}</span><small>{label}</small></Link>})}</nav>
}
