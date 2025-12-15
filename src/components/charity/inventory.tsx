"use client"

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ClothingItem } from "@/types/donation";


const slideVariants = {
    enter: { x: 40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
};

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


    function ImageSlider({ item }: { item: ClothingItem }) {
        const [showFront, setShowFront] = useState(true);

        const front = item.front_image_url ?? null;
        const back = item.back_image_url ?? null;

        const canFlip = Boolean(front && back);
        const activeImage = showFront ? front : back;

        function handleNext() {
            if (!canFlip) return;
            setShowFront((prev) => !prev);
        }

        return (
            <div className="p-2 m-2">
                <div
                    onClick={handleNext}
                    className="relative mb-1 h-50 w-full overflow-hidden rounded-md bg-gray-100 cursor-pointer"
                >
                    {activeImage ? (
                        <AnimatePresence initial={false} mode="popLayout">
                            <motion.div
                                key={activeImage}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={activeImage}
                                    alt={`${item.type} ${showFront ? "front" : "back"}`}
                                    fill
                                    className="object-contain"
                                />
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
                            No image
                        </div>
                    )}

                    {canFlip && (
                        <div className="absolute inset-y-0 right-1 flex items-center">
                            <div className="rounded bg-black/5 hover:bg-black/30 transition-colors duration-200 px-1 py-2 h-full">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-full w-5"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </div>
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
        )
    }

    if (loading) return <p>Loading inventory...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!items.length) return <p>No items in inventory yet.</p>;
    return (
        <div className="h-[calc(100vh-300px)] flex flex-col">
            <div className="flex-1 overflow-y-auto border rounded-lg shadow">
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                    {items?.map((item) => (
                        <ImageSlider key={item.clothing_id} item={item} />
                    ))}
                </div>
            </div>
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