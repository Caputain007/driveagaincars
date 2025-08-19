// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Host-aware metadata (works for both domains)
export async function generateMetadata() {
  const host = headers().get("host") || "www.driveagaincars.com";
  const isHouston = host.includes("houstoncashcars.com");
  const brand = isHouston ? "HoustonCashCars" : "DriveAgainCars";
  const description = isHouston
    ? "Affordable cash cars in Houston, TX. Clean titles. CARFAX on every vehicle."
    : "Quality used vehicles in Houston, TX. Cash-friendly pricing and a CARFAX link on every vehicle.";

  return {
    metadataBase: new URL(`https://${host}`),
    title: { default: brand, template: `%s | ${brand}` },
    description,
    alternates: { canonical: "/" },
    openGraph: { url: `https://${host}`, siteName: brand, title: brand, description },
    twitter: { card: "summary_large_image", title: brand, description },
    icons: { icon: "/favicon.ico" },
  };
}

export default function RootLayout({ children }) {
  const host = headers().get("host") || "";
  const isHouston = host.includes("houstoncashcars.com");
  const brand = isHouston ? "HoustonCashCars" : "DriveAgainCars";

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold">{brand}</a>
          <nav className="space-x-4 text-sm">
            <a className="border rounded-xl px-3 py-2" href="/inventory">Inventory</a>
            <a className="border rounded-xl px-3 py-2" href="/contact">Contact</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="max-w-6xl mx-auto p-6 text-xs text-gray-600">
          © {new Date().getFullYear()} {brand} • Houston, TX
        </footer>
      </body>
    </html>
  );
}
