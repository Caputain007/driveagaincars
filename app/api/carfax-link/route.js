// app/api/carfax-link/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const vin = searchParams.get("vin") || "";
  // TODO: replace with your official CARFAX dealer VIN URL later
  const url = `https://www.carfax.com/VehicleHistory/p/placeholder?vin=${encodeURIComponent(vin)}`;
  return Response.redirect(url, 302);
}
