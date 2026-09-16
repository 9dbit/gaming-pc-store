import Link from "next/link";

const posts=[
 {slug:"cara-memilih-processor-gaming",cat:"Processor",title:"Cara Memilih Processor Gaming: FPS, Core, Cache, dan Upgrade Path",desc:"Panduan memilih CPU untuk esports, AAA, streaming, dan creator workload tanpa overspend."},
 {slug:"gpu-1080p-1440p-4k",cat:"GPU",title:"GPU untuk 1080p vs 1440p vs 4K",desc:"Pahami target resolusi, refresh rate, VRAM, dan kelas GPU yang cocok untuk monitor kamu."},
 {slug:"ddr5-32gb-vs-64gb",cat:"Memory",title:"DDR5 32GB vs 64GB untuk Gaming dan Creator",desc:"Kapan 32GB sudah cukup dan kapan 64GB mulai terasa manfaatnya."},
 {slug:"berapa-watt-psu-gaming",cat:"Power Supply",title:"Berapa Watt PSU yang Dibutuhkan Gaming PC?",desc:"Hitung kebutuhan daya, transient spike, efisiensi, dan headroom upgrade."},
 {slug:"nvme-gen4-vs-gen5",cat:"Storage",title:"NVMe Gen4 vs Gen5: Mana yang Lebih Masuk Akal?",desc:"Bedakan benchmark puncak dengan pengalaman nyata saat boot, gaming, dan transfer file."},
 {slug:"cara-memilih-gaming-monitor",cat:"Monitor",title:"Cara Memilih Gaming Monitor: Resolution, Hz, Panel, dan Response Time",desc:"Susun prioritas monitor berdasarkan game, GPU, dan target refresh rate."},
 {slug:"pc-gaming-15-juta",cat:"Build Guide",title:"PC Gaming 15 Juta: Prioritas Budget yang Benar",desc:"Contoh pembagian budget agar FPS, storage, PSU, dan upgrade path tetap seimbang."},
 {slug:"pc-gaming-25-juta",cat:"Build Guide",title:"PC Gaming 25 Juta untuk 1440p High Refresh",desc:"Bangun sistem 1440p yang kuat tanpa terlalu banyak budget bocor ke komponen kosmetik."},
 {slug:"checklist-kompatibilitas-pc",cat:"PC Builder",title:"Checklist Kompatibilitas Sebelum Merakit PC",desc:"Cek socket, DDR generation, PSU, GPU clearance, cooler height, radiator, dan airflow."}
];

export const metadata={
 title:"NEXRIG Guides | Gaming PC, Hardware & Build Tips",
 description:"Panduan gaming PC Indonesia: processor, GPU, RAM, SSD, PSU, monitor, compatibility, dan build guide berdasarkan budget.",
 alternates:{canonical:"/blog"},
 robots:{index:true,follow:true},
 openGraph:{type:"website",url:"/blog",title:"NEXRIG Guides | Gaming PC, Hardware & Build Tips",description:"Panduan gaming PC Indonesia tentang hardware, compatibility, dan build guide."},
 twitter:{card:"summary_large_image",title:"NEXRIG Guides",description:"Gaming PC hardware, compatibility, and build guides."}
};

export default function Blog(){return <main><header className="topbar"><Link href="/" className="brand">NEX<span>RIG</span></Link><Link href="/category/all">Shop</Link></header><section className="pageHero"><span className="kicker">NEXRIG GUIDES</span><h1>Build smarter. Upgrade with context.</h1><p>Artikel hardware dan PC gaming yang fokus pada keputusan nyata: target FPS, budget, kompatibilitas, thermal, power, dan upgrade path.</p></section><section className="contentSection blogHub"><div className="blogFeature"><span>FEATURED GUIDE</span><h2>Checklist Kompatibilitas Sebelum Merakit PC</h2><p>Satu checklist untuk mencegah salah socket, RAM tidak cocok, PSU terlalu kecil, GPU mentok casing, atau cooler tidak muat.</p><Link href="/blog/checklist-kompatibilitas-pc">Read featured guide →</Link></div><div className="blogGrid">{posts.map(p=><Link href={`/blog/${p.slug}`} key={p.slug}><span>{p.cat}</span><h3>{p.title}</h3><p>{p.desc}</p><b>Read article →</b></Link>)}</div></section></main>}
