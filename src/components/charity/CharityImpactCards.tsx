// This component fetches the charities sustainability impact 
// from the backend and displays it as cards on the charity dashboard (Home page).


"use client";

import { useEffect, useState} from "react";

type Impact = {
    kgDiverted: number;
    co2Saved: number;
    peopleSupported: number;
};

export default function CharityImpactCards() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<{ totalItems: number; impact: Impact } | null>(null);

    useEffect(() => {
        (async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("/api/impact/charity", {
                credentials: "include",
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json?.error || "Failed to load impact");
            }

            setData(json);


        } catch (error: any) {
            setError(error.message || "Something went wrong"); 

        } finally {
            setLoading(false);
        }
        })();
    }, []);

    if (loading) return <p className="text-gray-500">Loading impact...</p>;
    if (error) return <p className="text-red-600">Impact error: {error}</p>;
    if (!data) return null;

    const { impact } = data;

      return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Clothing Diverted</p>
        <p className="mt-2 text-3xl font-bold">{impact.kgDiverted.toFixed(1)} kg</p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Estimated CO₂ Saved</p>
        <p className="mt-2 text-3xl font-bold">{impact.co2Saved.toFixed(1)} kg</p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">People Supported</p>
        <p className="mt-2 text-3xl font-bold">{impact.peopleSupported}</p>
      </div>
    </div>
  );
}