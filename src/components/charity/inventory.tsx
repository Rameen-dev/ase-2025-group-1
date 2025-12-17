"use client"

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ClothingItem } from "@/types/donation";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Drafts from "./drafts";

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

    //filter item types
    const [typeMenuOpen, setTypeMenuOpen] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());

    //sortMode is either SIZE or CONDITION
    const [sortMode, setSortMode] = useState<"SIZE" | "CONDITION" | null>(null);
    //sort direction, ascending or descending
    const [sortDir, setSortDir] = useState<"ASC" | "DESC">("ASC");

    const [isDraftMode, setIsDraftMode] = useState(false); //switch 
    const [draftTitle, setDraftTitle] = useState(""); //title entered for the draft
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [savingDraft, setSavingDraft] = useState(false);
    const [draftErr, setDraftErr] = useState<string | null>(null);
    const [refreshDraftsToken, setRefreshDraftsToken] = useState(0); //refresh 

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch("/api/charity/inventory", { credentials: "include" });
                const data = await res.json();

                if (!res.ok) throw new Error(data?.error ?? "Failed to load inventory");
                setItems(data);
            } catch {
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    function startDraftMode() {
        setDraftErr(null); //clear previous errors
        setDraftTitle(""); //resets the title input
        setSelectedIds(new Set()); //clear any selected items if previously made a draft
        setIsDraftMode(true); //switch UI to drafting mode
    }

    function cancelDraftMode() {
        setDraftErr(null);
        setDraftTitle("");
        setSelectedIds(new Set());
        setIsDraftMode(false);
    }

    function toggleSelectItem(id: number) {
        setSelectedIds((prev) => {
            const next = new Set(prev);

            //unselect if already selected
            if (next.has(id)) {
                next.delete(id);
            }

            //select if not selected
            else {
                next.add(id);
            }
            return next;
        });
    }

    async function saveDraft() {
        const title = draftTitle.trim();

        //validation
        if (!title) {
            setDraftErr("Title is required");
            return;
        }
        if (selectedIds.size === 0) {
            setDraftErr("Select at least one item");
            return;
        }

        try {
            setSavingDraft(true); //show loading state
            setDraftErr(null); //clear previous errors

            const res = await fetch("/api/charity/inventory/drafts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    title,
                    items: Array.from(selectedIds), //convert set of selected items into an array for backend to send it to database
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data?.error ?? "Failed to save draft");

            const ids = Array.from(selectedIds); //save selected items in array var

            cancelDraftMode();
            setRefreshDraftsToken((x) => x + 1);

            setItems((prev) => prev.filter((it) => !ids.includes(it.clothing_id)));

        } catch {
            setDraftErr("Failed to save draft");
        } finally {
            setSavingDraft(false);
        }
    }



    //for each item, onClick function which switches between front and back image 
    function ImageSlider({ item }: { item: ClothingItem }) {
        const selected = selectedIds.has(item.clothing_id);

        function handleCardClick() {
            if (!isDraftMode) return;
            toggleSelectItem(item.clothing_id);
        }
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
            <div
                className={`p-2 m-2 rounded-md transition cursor-pointer ${isDraftMode ? "border" : ""
                    } ${selected ? "border-green-600 ring-2 ring-green-200" : "border-transparent"}`}
                onClick={handleCardClick}
            >
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
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[13px]">
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
                display: false,
            },
        },
    };

    //item types in array, used for filtering
    const allTypes = ["JACKET", "PANTS", "SHIRT", "SHOES", "OTHER"];

    //sort order maps
    const sizeOrder: Record<string, number> = {
        XS: 0,
        S: 1,
        M: 2,
        L: 3,
        XL: 4,
    };

    const conditionOrder: Record<string, number> = {
        NEW: 0,
        GOOD: 1,
        WORN: 2,
    };

    const displayItems = items
        .filter((item) => {
            //filter items by selected type
            //if nothing is selected, show all items
            if (selectedTypes.size === 0) return true;
            return selectedTypes.has((item.type));
        })
        .slice()

        //apply only one active sorting function (size or condition) by checking sortMode
        .sort((a, b) => {
            const dir = sortDir === "ASC" ? 1 : -1;

            if (sortMode === "SIZE") {
                const aRank = sizeOrder[(a.size)] ?? 999;
                const bRank = sizeOrder[(b.size)] ?? 999;
                if (aRank !== bRank) return (aRank - bRank) * dir;
                return (b.clothing_id - a.clothing_id) * dir; // tie-breaker
            }

            if (sortMode === "CONDITION") {
                const aRank = conditionOrder[(a.condition)] ?? 999;
                const bRank = conditionOrder[(b.condition)] ?? 999;
                if (aRank !== bRank) return (aRank - bRank) * dir;
                return (b.clothing_id - a.clothing_id) * dir; // tie-breaker
            }

            //default order if no sort is active
            return b.clothing_id - a.clothing_id;
        });

    //size sorting event handler
    function toggleSizeSort() {
        if (sortMode === "SIZE") {
            setSortDir((d) => (d === "ASC" ? "DESC" : "ASC"));
        } else {
            setSortMode("SIZE");
            setSortDir("ASC");
        }
    }

    //condition sorting event handler
    function toggleConditionSort() {
        if (sortMode === "CONDITION") {
            setSortDir((d) => (d === "ASC" ? "DESC" : "ASC"));
        } else {
            setSortMode("CONDITION");
            setSortDir("ASC");
        }
    }

    //filter by type event handler
    function toggleType(t: string) {
        setSelectedTypes((prev) => {
            const next = new Set(prev);
            if (next.has(t)) next.delete(t);
            else next.add(t);
            return next;
        });
    }

    function clearTypes() {
        setSelectedTypes(new Set());
    }


    return (
        <div className="h-[calc(100vh-180px)] flex flex-col">
            <div className="flex items-center justify-between mb-0.5 relative gap-2">
                <div className="flex items-center gap-2">
                    {isDraftMode && (
                        <>
                            <input
                                value={draftTitle}
                                onChange={(e) => setDraftTitle(e.target.value)}
                                placeholder="Draft title…"
                                className="text-sm px-3 py-1 rounded-md border w-64"
                                disabled={savingDraft}
                            />

                            <button
                                onClick={saveDraft}
                                disabled={savingDraft}
                                className="text-sm px-3 py-1 rounded-md bg-green-700 text-white hover:bg-green-800 disabled:opacity-50"
                            >
                                {savingDraft ? "Saving…" : `Save draft (${selectedIds.size})`}
                            </button>

                            <button
                                onClick={cancelDraftMode}
                                disabled={savingDraft}
                                className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                    {draftErr && <span className="text-xs text-red-600">{draftErr}</span>}
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={() => setTypeMenuOpen((v) => !v)}
                        className="text-sm px-3 py-1 m-1 rounded-md border hover:bg-gray-50"
                        disabled={savingDraft}
                    >
                        Filter by {selectedTypes.size ? `(${selectedTypes.size})` : ""}
                    </button>
                    <button className="text-sm px-3 py-1 m-1 rounded-md border hover:bg-gray-50"
                        onClick={toggleConditionSort}
                        disabled={savingDraft} >
                        Condition {sortMode === "CONDITION" ? (sortDir === "ASC" ? "↑" : "↓") : ""}
                    </button>
                    <button className="text-sm px-3 py-1 m-1 rounded-md border hover:bg-gray-50"
                        onClick={toggleSizeSort}
                        disabled={savingDraft}>
                        Size {sortMode === "SIZE" ? (sortDir === "ASC" ? "↑" : "↓") : ""}
                    </button>
                    {typeMenuOpen && (
                        <div className="absolute right-2 top-12 z-20 w-56 rounded-lg border bg-white shadow-md p-2">
                            <div className="flex items-center justify-between px-2 py-1">
                                <span className="text-xs text-gray-500">Item types</span>
                                <button
                                    onClick={clearTypes}
                                    disabled={savingDraft}
                                    className="text-xs text-blue-600 hover:underline"
                                >
                                    Clear
                                </button>
                            </div>

                            <div className="max-h-56 overflow-y-auto">
                                {allTypes.map((t) => (
                                    <label key={t} className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded">
                                        <input
                                            type="checkbox"
                                            checked={selectedTypes.has(t)}
                                            onChange={() => toggleType(t)}
                                            disabled={savingDraft} />
                                        <span className="text-sm">{t}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto border rounded-lg shadow-md bg-green-50">

                {/* using displayItems const instead of items, which handles all sorting functions */}
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                    {displayItems?.map((item) => (
                        <ImageSlider key={item.clothing_id} item={item} />
                    ))}
                </div>
            </div>
            <div className="mt-4 flex gap-4">
                <div className="w-full border shadow-md rounded-xl p-4 text-gray-500 bg-green-50">
                    <Drafts onCreateDraft={startDraftMode} refreshToken={refreshDraftsToken} />
                </div>
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
                                        style={{ backgroundColor: typeColours[label] }}
                                    />
                                    <span className="truncate">{label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    );
};