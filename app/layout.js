// app/layout.js
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  metadataBase: new URL("https://www.driveagaincars.com"),
  title: { default: "DriveAgainCars", template: "%s | DriveAgainCars" },
  description: "Quality used vehicles in Houston, TX. Cash-friendly pricing and a CARFAX link on every vehicle.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">DriveAgainCars</Link>
          <nav className="space-x-4 text-sm">
            <Link href="/inventory" className="border rounded-xl px-3 py-2">Inventory</Link>
            <Link href="/contact" className="border rounded-xl px-3 py-2">Contact</Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="max-w-6xl mx-auto p-6 text-xs text-gray-600">
          © {new Date().getFullYear()} DriveAgainCars • Houston, TX
        </footer>
      </body>
    </html>
  );
}
