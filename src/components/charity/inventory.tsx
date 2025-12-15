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
        <div className="h-[calc(100vh-300px)] flex flex-col">
            {/* Scrollable grid area */}
            <div className="flex-1 overflow-y-auto pr-2 border rounded-lg shadow">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                    {items?.map((item) => (
                        <div key={item.clothing_id} className="p-2 m-2">
                            <div className="relative mb-1 h-50 w-full overflow-hidden rounded-md bg-gray-100">
                                {item.front_image_url ? (
                                    <Image
                                        src={item.front_image_url}
                                        alt={`${item.type} front`}
                                        fill
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
                                        No image
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold truncate">{item.type}</p>
                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px]">
                                    {item.size}
                                </span>
                            </div>

                            <p className="mt-1 text-xs text-gray-600 truncate">
                                Wear: {item.condition}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Optional bottom area stays fixed (not scrollable) */}
            <div className="mt-4 flex gap-4">
                <div className="w-1/2 border border-dashed border-red-300 rounded-xl p-4 text-center text-gray-500">
                    Left panel
                </div>
                <div className="w-1/2 border border-dashed border-red-300 rounded-xl p-4 text-center text-gray-500">
                    Right panel
                </div>
            </div>
        </div>
    );
};