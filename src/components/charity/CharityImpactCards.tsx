// This component fetches the charity’s sustainability impact
// from the backend and displays it as cards on the charity dashboard (Home page)

"use client";
import { useEffect, useState } from "react";

// This will be the shape of the sustainability impact data returned by the API
type Impact = {
  kgDiverted: number;
  co2Saved: number;
  peopleSupported: number;
};

// This component will display the sustainability impact cards, on the charity dashboard (Home page)
export default function CharityImpactCards() {
  // We track whether we are still loading data from the API
  const [loading, setLoading] = useState(true);
  // We store any error message if the request fails
  const [error, setError] = useState<string | null>(null);

  // Here we store any data returned from the /api/impact/charity route
  // We keep the same shape as the donor component for consistency across dashboards
  const [data, setData] = useState<{ totalItems: number; impact: Impact } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/impact/charity", {
          method: "GET",
          credentials: "include", // Here we ensure the cookie is sent
        });

        const json = await res.json();

        // If we hit an error, throw an error
        if (!res.ok) {
          throw new Error(json?.error || "Failed to load impact");
        }

        // Here we save the data so the UI can render it
        setData(json);
      } catch (error: any) {
        // We store this error message so it can be shown to the user
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Here we display a loading message while we're fetching data
  if (loading) return <p className="text-gray-500">Loading your impact…</p>;
  // Here we display an error message if something goes wrong
  if (error) return <p className="text-red-600">Impact error: {error}</p>;
  // If no data is available, we render nothing and return null
  if (!data) return null;

  // Here we extract the impact values
  const { impact } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Card 1 - Clothing diverted from landfill */}
      <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
        <p className="text-sm text-gray-500">Clothing Diverted from Landfill</p>
        <p className="mt-2 text-3xl font-bold">
          {impact.kgDiverted.toFixed(1)} kg
        </p>
      </div>

      {/* Card 2 - Estimated CO2 saved */}
      <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
        <p className="text-sm text-gray-500">Estimated CO₂ Saved</p>
        <p className="mt-2 text-3xl font-bold">
          {impact.co2Saved.toFixed(1)} kg
        </p>
      </div>

      {/* Card 3 - People supported */}
      <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition">
        <p className="text-sm text-gray-500">People Supported</p>
        <p className="mt-2 text-3xl font-bold">{impact.peopleSupported}</p>
      </div>

      {/* A small disclaimer explaining the numbers are estimates */} 
      <p className="md:col-span-3 text-xs text-gray-400 mt-2">
        Impact values are estimates based on average clothing weights and conversion factors.
      </p>
    </div>
  );
}
