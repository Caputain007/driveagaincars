// app/page.jsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">DriveAgainCars</h1>
      <p className="text-sm">Quality used vehicles • Houston, TX • (xxx) xxx-xxxx</p>
      <Link href="/inventory" className="inline-block rounded-2xl border px-4 py-3 shadow text-sm">
        Browse Inventory
      </Link>
    </main>
  );
}
