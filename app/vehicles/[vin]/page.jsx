import Image from "next/image";
import { headers } from "next/headers";

// ensure per-request render so `headers()` always has the current host
export const dynamic = "force-dynamic"; // or: export const revalidate = 0;

// --- demo data (replace with your DB later) ---
// async function getVehicleByVIN(vin) { ... }

function carfaxUrl(vin) {
  return `/api/carfax-link?vin=${encodeURIComponent(vin)}`;
}

export default async function VehiclePage({ params }) {
  const v = await getVehicleByVIN(params.vin);

  // 1) get current host (domain) and build absolute base URL
  const host = headers().get("host") || "www.driveagaincars.com";
  const base = `https://${host}`;

  // 2) optional: brand name by host
  const brandName = host.includes("houstoncashcars.com")
    ? "HoustonCashCars"
    : "DriveAgainCars";

  // 3) make absolute image URLs for JSON-LD
  const images = (v.photos || []).map((p) =>
    p.startsWith("http") ? p : `${base}${p.startsWith("/") ? p : `/${p}`}`
  );

  // 4) FULL JSON-LD object (Vehicle + Offer)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${v.year} ${v.make} ${v.model} ${v.trim}`,
    url: `${base}/vehicles/${v.vin}`,
    image: images,
    vehicleIdentificationNumber: v.vin,
    brand: v.make,
    model: v.model,
    vehicleModelDate: String(v.year),
    bodyType: v.bodyStyle,
    color: v.color,
    vehicleTransmission: v.transmission,
    fuelType: v.fuelType,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: v.mileage,
      unitCode: "SMI",
    },
    // optional extras if you have them:
    // vehicleEngine: { "@type": "EngineSpecification", engineType: v.engine },
    // driveWheelConfiguration: v.drivetrain, // e.g., "FWD"
    // sku: v.stockNumber,

    offers: {
      "@type": "Offer",
      url: `${base}/vehicles/${v.vin}`, // host-aware
      price: String(v.price),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
      seller: {
        "@type": "AutoDealer",
        name: brandName,
        telephone: "(xxx) xxx-xxxx", // <-- replace with your phone
        address: {
          "@type": "PostalAddress",
          addressLocality: "Houston",
          addressRegion: "TX",
          addressCountry: "US",
          // streetAddress: "123 Example St", // optional
          // postalCode: "77000"              // optional
        },
      },
    },
  };

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-8">
      {/* 5) Render JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ...your existing gallery/details/button JSX below... */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* gallery & details */}
      </div>
    </main>
  );
}
