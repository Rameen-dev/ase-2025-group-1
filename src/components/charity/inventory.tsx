"use client"

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ClothingItem } from "@/types/donation";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

//frame motion for the images in the inventory
const slideVariants = {
    enter: { x: 40, opacity: 0 }, //makes image slide in from the right
    center: { x: 0, opacity: 1 }, //centers image
    exit: { x: -40, opacity: 0 }, //makes image leave to the left
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

    //for each item, onClick function which switches between front and back image 
    function ImageSlider({ item }: { item: ClothingItem }) {
        //boolean, when if TRUE = front image is showing and if FALSE = back image is showing
        const [showFront, setShowFront] = useState(true);

        //grab image URL from item
        const front = item.front_image_url;
        const back = item.back_image_url;

        //only allow flipping when both images exist
        const canFlip = Boolean(front && back);
        //based on showFront being true or false, choose which image to show
        const activeImage = showFront ? front : back;

        //event handler
        function handleNext() {
            if (!canFlip) return;
            setShowFront((prev) => !prev);
        }

        return (
            <div className="p-2 m-2">
                <div
                    className="relative mb-1 h-50 w-full overflow-hidden rounded-md bg-gray-100 cursor-pointer"
                >
                    {activeImage ? (
                        <AnimatePresence initial={false} mode="popLayout">
                            <motion.div
                                key={activeImage}
                                //calling slide variants from the top of the file
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

                    {/* Only if canFlip is true (front and back image exists), show arrow to switch image */}
                    {canFlip && (
                        <div className="absolute inset-y-0 right-1 flex items-center">
                            <div className="rounded bg-black/5 hover:bg-black/30 transition-colors duration-200 px-1 py-2 h-full"
                                onClick={handleNext}>
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

    //count how many items of each type there are in the inventory
    const countsByType = items.reduce<Record<string, number>>((acc, item) => {
        const type = item.type?.trim();
        acc[type] = (acc[type] ?? 0) + 1;
        return acc;
    }, {});

    //chart labels are the types
    const labels = Object.keys(countsByType);
    //values in the chart is equal to count
    const values = Object.values(countsByType);

    //colours of each type
    const typeColours: Record<string, string> = {
        JACKET: "#BFDBFE",   //blue
        PANTS: "#C4B5FD",    //purple
        SHIRT: "#BBF7D0",    //green
        SHOES: "#FEF3C7",    //yellow
        OTHER: "#D1D5DB",    // gray
    };

    //apply type colour to background of the slice in doughnut chart
    const backgroundColors = labels.map(
        (type) => typeColours[type]
    );

    const doughnutData = {
        labels,
        datasets: [
            {
                label: "Amount",
                data: values, //count of each type in countsByType const
                backgroundColor: backgroundColors,
                borderWidth: 0,
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false, //allows to fit the container
        cutout: "65%", //contorls thickness of chart
        plugins: {
            legend: {
                display: false, //disabled, allowing to control size of the chart
            },
        },
    };

    return (
        <div className="h-[calc(100vh-180px)] flex flex-col">
            <div className="flex-1 overflow-y-auto border rounded-lg shadow-md">
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                    {items?.map((item) => (
                        <ImageSlider key={item.clothing_id} item={item} />
                    ))}
                </div>
            </div>
            <div className="mt-4 flex gap-4">
                <div className="w-full border border-dashed border-red-300 rounded-xl p-4 text-center text-gray-500">
                    Left panel
                </div>
                <div className="w-1/3 border shadow-md rounded-xl p-4 text-gray-500">
                    <div className="flex items-center justify-center gap-6 h-full">
                        <div className="relative h-48 w-48 shrink-0">
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xs text-gray-500">Total items</span>
                                <span className="text-2xl font-semibold tabular-nums">{items.length}</span>
                            </div>
                        </div>
                        <ul className="space-y-2 text-sm">
                            {labels.map((label) => (
                                <li key={label} className="flex items-center gap-2">
                                    <span
                                        className="h-3 w-3 rounded-full"
                                        style={{ backgroundColor: typeColours[label] }}
                                    />
                                    <span className="truncate">{label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};