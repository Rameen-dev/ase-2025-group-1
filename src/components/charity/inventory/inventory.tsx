"use client"

import React from "react";
import { useEffect, useState } from "react";
import { ClothingItem } from "@/types/donation";
import Drafts from "./drafts";
import ImageSlider from "./imageSlider";
import InventoryTypeChart from "./inventoryChart";

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

    //items for chart
    const [chartItems, setChartItems] = useState<Pick<ClothingItem, "type">[]>([]);

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

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/charity/inventory/chart", {
                    credentials: "include",
                });
                const data = await res.json();
                if (res.ok) setChartItems(data);
            } catch {
            }
        })();
    }, [refreshDraftsToken]);

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

    if (loading) return <p>Loading inventory...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!items.length) return <p>No items in inventory yet.</p>;

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
                        <ImageSlider
                            key={item.clothing_id}
                            item={item}
                            isDraftMode={isDraftMode}
                            isSelected={selectedIds.has(item.clothing_id)}
                            onToggleSelect={toggleSelectItem}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-4 flex gap-4">
                <div className="w-full border shadow-md rounded-xl p-4 text-gray-500 bg-green-50">
                    <Drafts onCreateDraft={startDraftMode} refreshToken={refreshDraftsToken} />
                </div>
                <InventoryTypeChart items={chartItems} />
            </div>
        </div >
    );
};