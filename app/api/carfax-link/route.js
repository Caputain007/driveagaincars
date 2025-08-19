// app/api/carfax-link/route.js
import { NextResponse } from "next/server";

// Ensure this runs fresh each request (no static caching)
export const dynamic = "force-dynamic"; // or: export const revalidate = 0;

function isValidVIN(vin) {
  return typeof vin === "string" && vin.length === 17;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const vin = searchParams.get("vin") || "";

  if (!isValidVIN(vin)) {
    return NextResponse.json({ error: "Missing or invalid VIN" }, { status: 400 });
  }

  // OPTION A (best): build from an env template you’ll get from CARFAX
  // Example template you’ll set in .env: CARFAX_URL_TEMPLATE="https://www.carfax.com/VehicleHistory/p/DEALER_TOKEN?vin={VIN}"
  const tmpl = process.env.CARFAX_URL_TEMPLATE;

  const url = tmpl && tmpl.includes("{VIN}")
    ? tmpl.replace("{VIN}", encodeURIComponent(vin))
    // OPTION B (temporary): fallback placeholder until you have the real link
    : `https://www.carfax.com/VehicleHistory/p/placeholder?vin=${encodeURIComponent(vin)}`;

  const res = NextResponse.redirect(url, 302); // 302 = temporary redirect (safe for changes)
  res.headers.set("Cache-Control", "no-store");
  return res;
}
