"use client"

import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClothingItem } from "@/types/donation";

export default function InventoryTab() {

    const [items, setItems] = useState<ClothingItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch("/api/charity/inventory", { credentials: "include" });
                const data = await res.json();

                if (!res.ok) throw new Error(data?.error ?? "Failed to load inventory");
                setItems(data);
            } catch (e: unknown) {
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <p>Loading inventory...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!items.length) return <p>No items in inventory yet.</p>;
    return (
        <div className="h-1/2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <div key={item.clothing_id} className="rounded-xl border p-4">
                        <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                            {item.front_image_url ? (
                                <Image
                                    src={item.front_image_url}
                                    alt={`${item.type} front`}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                                    No image
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="font-semibold">{item.type}</p>
                            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                                {item.size}
                            </span>
                        </div>

                        <p className="mt-1 text-sm text-gray-600">Condition: {item.condition}</p>
                        <p className="mt-1 text-xs text-gray-400">ID: {item.clothing_id}</p>
                    </div>
                ))}
            </div>


            <div className="relative flex h-full">
                <div className="w-1/2 border border-dashed border-red-300  rounded-xl p-8 text-center text-gray-500">

                </div>

                <div className="w-full border border-dashed border-red-300  rounded-xl p-8 text-center text-gray-500">

                </div>
            </div>
        </div>

    );
};