import type { Metadata } from "next";
import "./globals.css";
import "./storefront.css";
import "./commerce.css";
import "./commerce-v2.css";
import "./chrome.css";
import "./qa.css";
import "./polish.css";
import PaymentStrip from "../components/PaymentStrip";
import {SiteHeader,MobileNav} from "../components/SiteChrome";

export const metadata: Metadata = {
  title: {
    default: "NEXRIG | Gaming PC Components & Hardware Indonesia",
    template: "%s | NEXRIG"
  },
  description: "Premium gaming PC components, PC Builder compatibility guidance, monitors, storage, memory, cooling, power supply, and build recommendations for Indonesia.",
  metadataBase: new URL("https://gaming-pc-store-web-production.up.railway.app"),
  keywords:["gaming pc indonesia","pc components","processor gaming","gpu gaming","ddr5 ram","nvme ssd","gaming monitor","pc builder"],
  robots:{index:true,follow:true},
  openGraph:{siteName:"NEXRIG",type:"website",locale:"id_ID"},
  twitter:{card:"summary_large_image"}
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <SiteHeader/>
        {children}
        <PaymentStrip/>
        <MobileNav/>
        {/* Chatvice Chat Widget */}
        <script src="https://chatvice.app/api/widget/chatvice.js?merchant=m_04ab193f4d47b1b4" async></script>
      </body>
    </html>
  );
}
