"use client";

import React, { useMemo } from "react";
import type { ClothingItem } from "@/types/donation";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    items: ClothingItem[];
};

const ALL_TYPES = ["JACKET", "PANTS", "SHIRT", "SHOES", "OTHER"] as const;

const TYPE_COLOURS: Record<string, string> = {
    JACKET: "#BFDBFE",
    PANTS: "#C4B5FD",
    SHIRT: "#BBF7D0",
    SHOES: "#FEF3C7",
    OTHER: "#D1D5DB",
};

export default function InventoryChart({ items }: Props) {
    const { doughnutData, doughnutOptions, allTypes } = useMemo(() => {
        const countsByType = items.reduce<Record<string, number>>((acc, item) => {
            const type = (item.type ?? "OTHER").trim();
            acc[type] = (acc[type] ?? 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(countsByType);
        const values = Object.values(countsByType);

        const backgroundColors = labels.map((type) => TYPE_COLOURS[type] ?? "#D1D5DB");

        const doughnutData = {
            labels,
            datasets: [
                {
                    label: "Amount",
                    data: values,
                    backgroundColor: backgroundColors,
                    borderWidth: 0,
                },
            ],
        };

        const doughnutOptions = {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "65%",
            plugins: {
                legend: { display: false },
            },
        };

        return { doughnutData, doughnutOptions, allTypes: ALL_TYPES };
    }, [items]);

    return (
        <div className="w-1/3 border shadow-md rounded-xl p-4 text-gray-500 bg-green-50">
            <div className="flex items-center justify-center gap-6 h-full">
                <div className="relative h-48 w-48 shrink-0">
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xs text-gray-500">Total items</span>
                        <span className="text-2xl font-semibold tabular-nums">{items.length}</span>
                    </div>
                </div>

                <ul className="space-y-2 text-sm">
                    {allTypes.map((label) => (
                        <li key={label} className="flex items-center gap-2">
                            <span
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: TYPE_COLOURS[label] }}
                            />
                            <span className="truncate">{label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
