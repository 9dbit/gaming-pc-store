import type { Metadata } from "next";
import "./globals.css";
import PaymentStrip from "../components/PaymentStrip";

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
      <body>{children}<PaymentStrip/></body>
    </html>
  );
}
