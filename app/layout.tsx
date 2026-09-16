import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NEXRIG | Gaming PC Components & Hardware",
    template: "%s | NEXRIG"
  },
  description: "Premium gaming PC components, compatible hardware, monitors, storage, memory, cooling and build recommendations.",
  metadataBase: new URL("https://gaming-pc-store-web-production.up.railway.app")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
