import type { Metadata } from "next";
import "./globals.css";
import "./storefront.css";
import "./commerce.css";
import "./commerce-v2.css";
import "./chrome.css";
import "./qa.css";
import "./polish.css";
import "./final-freeze.css";
import "./chatvice-privacy.css";
import PaymentStrip from "../components/PaymentStrip";
import {SiteHeader} from "../components/SiteChrome";
import ChatviceWidget from "../components/ChatviceWidget";
import ProductImageOverride from "../components/ProductImageOverride";

const BASE="https://gaming-pc-store-web-production.up.railway.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  applicationName:"NEXRIG",
  title:{
    default:"NEXRIG | Gaming PC Components & Hardware Indonesia",
    template:"%s | NEXRIG"
  },
  description:"Gaming PC components, PC Builder compatibility guidance, monitors, storage, memory, cooling, power supply, and build recommendations for Indonesia.",
  keywords:["gaming pc indonesia","pc components indonesia","processor gaming","gpu gaming","graphics card","ddr5 ram","nvme ssd","gaming monitor","power supply","pc builder"],
  authors:[{name:"NEXRIG"}],
  creator:"NEXRIG",
  publisher:"NEXRIG",
  category:"technology",
  referrer:"strict-origin-when-cross-origin",
  formatDetection:{telephone:false,email:false,address:false},
  alternates:{canonical:"/"},
  robots:{
    index:true,
    follow:true,
    nocache:false,
    googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}
  },
  openGraph:{
    type:"website",
    locale:"id_ID",
    siteName:"NEXRIG",
    title:"NEXRIG Gaming PC Components Indonesia",
    description:"Shop gaming PC components and use compatibility guidance for your next build.",
    url:BASE
  },
  twitter:{
    card:"summary_large_image",
    title:"NEXRIG Gaming PC Components Indonesia",
    description:"Gaming hardware, PC Builder compatibility guidance, and component recommendations."
  },
  other:{
    "theme-color":"#090a0c",
    "color-scheme":"dark",
    "google":"notranslate"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <SiteHeader/>
        {children}
        <PaymentStrip/>
        <ProductImageOverride/>
        <ChatviceWidget/>
      </body>
    </html>
  );
}
