const cars = [
  { vin: "1HGCV1F5XKA123456", title: "2019 Honda Accord EX-L", price: 19995, mileage: 45210 },
  { vin: "3C6TRVAG1HE123456", title: "2017 Ram ProMaster 1500", price: 21500, mileage: 78000 },
];

export default function InventoryPage() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Inventory</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {cars.map((c) => (
          <a key={c.vin} href={`/vehicles/${c.vin}`} className="rounded-xl border p-4 shadow hover:shadow-md">
            <div className="font-medium">{c.title}</div>
            <div className="text-sm">Price: ${c.price.toLocaleString()}</div>
            <div className="text-sm">Mileage: {c.mileage.toLocaleString()} mi</div>
            <div className="text-xs text-gray-600">VIN: {c.vin}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
