// app/vehicles/[vin]/page.jsx
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

// ensure per-request render so headers() reflects the current host
export const dynamic = "force-dynamic"; // or: export const revalidate = 0;

// --- demo data (replace with your DB later) ---
async function getVehicleByVIN(vin) {
  return {
    vin,
    year: 2019,
    make: "Honda",
    model: "Accord",
    trim: "EX-L",
    price: 19995,
    mileage: 45210,
    bodyStyle: "Sedan",
    color: "White",
    transmission: "Automatic",
    fuelType: "Gasoline",
    photos: ["/demo/accord-1.jpg", "/demo/accord-2.jpg", "/demo/accord-3.jpg"],
    description: "Clean 1-Owner. Fresh service & detail. Ready to go.",
    availability: "InStock",
  };
}

// internal route to build dealer VIN link server-side
function carfaxUrl(vin) {
  return `/api/carfax-link?vin=${encodeURIComponent(vin)}`;
}

export default async function VehiclePage({ params }) {
  const v = await getVehicleByVIN(params.vin);

  // host-aware base so JSON-LD points to the domain the visitor is on
  const host = headers().get("host") || "www.driveagaincars.com";
  const base = `https://${host}`;

  // absolute image URLs for JSON-LD
  const images = (v.photos || []).map((p) => (p.startsWith("http") ? p : `${base}${p.startsWith("/") ? p : `/${p}`}`));

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
    mileageFromOdometer: { "@type": "QuantitativeValue", value: v.mileage, unitCode: "SMI" },
    offers: {
      "@type": "Offer",
      url: `${base}/vehicles/${v.vin}`,
      price: String(v.price),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
    },
  };

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-8">
      {/* SEO structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative rounded-2xl overflow-hidden shadow" style={{ aspectRatio: "16/9" }}>
            <Image src={v.photos[0]} alt={`${v.make} ${v.model}`} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {v.photos.slice(1).map((src, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden shadow" style={{ aspectRatio: "16/9" }}>
                <Image src={src} alt={`${v.make} ${v.model} ${i + 2}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold">
            {v.year} {v.make} {v.model} {v.trim}
          </h1>
          <div className="text-xl font-bold">${v.price.toLocaleString()}</div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border p-3"><div className="font-medium">Mileage</div><div>{v.mileage.toLocaleString()} mi</div></div>
            <div className="rounded-xl border p-3"><div className="font-medium">VIN</div><div>{v.vin}</div></div>
            <div className="rounded-xl border p-3"><div className="font-medium">Body Style</div><div>{v.bodyStyle}</div></div>
            <div className="rounded-xl border p-3"><div className="font-medium">Color</div><div>{v.color}</div></div>
            <div className="rounded-xl border p-3"><div className="font-medium">Transmission</div><div>{v.transmission}</div></div>
            <div className="rounded-xl border p-3"><div className="font-medium">Fuel</div><div>{v.fuelType}</div></div>
          </div>

          <p className="text-sm leading-6">{v.description}</p>

          {/* CARFAX button (internal route = ok to use Link) */}
          <Link
            href={carfaxUrl(v.vin)}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center rounded-2xl border px-4 py-3 text-sm font-medium shadow hover:shadow-md"
          >
            View CARFAX Report
          </Link>
        </div>
      </div>
    </main>
  );
}
