"use client";

import React, { useEffect, useState } from "react";
import ImageSlider from "./imageSlider";
import { ClothingItem } from "@/types/donation";
import { CharityInventoryActionConfirm } from "@/components/modals/confirmMessageModal";

//shape of draft returned from route
type Draft = {
    draft_id: number;
    title: string;
    draft_status: string;
    items: ClothingItem[];
};

export default function DraftViewModal({
    open,
    draftId,
    onClose,
    onChanged,
}: {
    open: boolean;
    draftId: number | null;
    onClose: () => void;
    onChanged?: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    //draft data
    const [data, setData] = useState<Draft | null>(null);

    //state for cancel button
    const [cancelling, setCancelling] = useState(false);

    //set used for storing selected items in modal
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    //used to open the correct confirmation modal
    const [confirm, setConfirm] = useState<null | "cancel" | "remove">(null);

    useEffect(() => {
        if (!open || !draftId) return;

        //empty Set so selections are cleared when opening any draft
        setSelectedIds(new Set());

        async function reloadDraft() {
            try {
                setLoading(true);
                setErr(null);

                const res = await fetch(`/api/charity/inventory/drafts/${draftId}`, {
                    credentials: "include",
                });
                const json = await res.json();
                if (!res.ok) throw new Error(json?.error ?? "Failed to load draft");

                //store draft in state
                setData(json);

            } catch {
                setErr("Failed to load draft");
                setData(null);
            } finally {
                setLoading(false);
            }
        }

        reloadDraft();
    }, [open, draftId]);
    if (!open) return null;

    //handle used in "Cancel draft" button
    //sets clothing items draftedStatus to "AVAILABLE"
    async function cancelDraft() {
        if (!draftId) return;

        try {
            setCancelling(true);
            setErr(null);

            const res = await fetch(`/api/charity/inventory/drafts/${draftId}/cancel`, {
                method: "POST",
                credentials: "include",
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json?.error ?? "Failed to cancel draft");

            //refreshes inventory
            onChanged?.();
            //close draft
            onClose();
        } catch {
            setErr("Failed to cancel draft");
        } finally {
            setCancelling(false);
        }
    }

    //toggle selection of item
    function toggleSelect(id: number) {
        setSelectedIds((prev) => {
            const next = new Set(prev);

            //upon selecting an item

            //if set has item (already selected)
            //remove item from set
            if (next.has(id)) {
                next.delete(id);
            }

            //if set doesn't have item
            //add item to set
            else {
                next.add(id);
            }

            return next;
        });
    }

    //handle used in "Remove" button
    async function removeItems() {

        //if no selections are made yet, keep button disabled
        if (!draftId || selectedIds.size === 0) return;

        try {
            setLoading(true);
            setErr(null);

            const res = await fetch(
                `/api/charity/inventory/drafts/${draftId}/remove`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        itemIds: Array.from(selectedIds),
                    }),
                }
            );

            const json = await res.json();
            if (!res.ok) throw new Error(json?.error ?? "Failed to remove items");

            //update modal UI 
            setData((prev) =>
                prev
                    ? { ...prev, items: prev.items.filter((it) => !selectedIds.has(it.clothing_id)) }
                    : prev
            );

            //clear selections after removal
            setSelectedIds(new Set());

            onChanged?.(); //refresh inventory and drafts
        } catch {
            setErr("Failed to remove items");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50">
            {/* backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* modal */}
            <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-xl">
                {/* header div */}
                <div className="flex items-center border-b px-4 py-3">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {data?.title ?? "Draft"}
                        </h2>
                        <p className="text-xs text-gray-500">
                            {loading ? "Loading…" : `${data?.items?.length ?? 0} items`}
                        </p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        {/* remove button */}
                        <button
                            disabled={selectedIds.size === 0 || loading}
                            className="rounded-md bg-gray-900 px-3 py-1 text-sm text-white hover:bg-black disabled:opacity-50"
                            onClick={() => setConfirm("remove")}
                        >
                            Remove ({selectedIds.size})
                        </button>

                        {/* cancel button */}
                        <button
                            onClick={() => setConfirm("cancel")}
                            disabled={cancelling || loading}
                            className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                        >
                            {/* change button text depending on state */}
                            {cancelling ? "Cancelling…" : "Cancel draft"}
                        </button>

                        {/* close modal button */}
                        <button
                            onClick={() => onClose()}
                            className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                        >
                            Close
                        </button>
                    </div>
                </div>

                <div className="max-h-[70vh] overflow-y-auto p-3">
                    {loading && <p className="text-sm text-gray-500">Loading draft…</p>}
                    {err && <p className="text-sm text-red-600">{err}</p>}

                    {/* items grid */}
                    {!loading && !err && data && (
                        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4">
                            {data.items.map((item) => (
                                <ImageSlider
                                    key={item.clothing_id}
                                    item={item}
                                    isDraftMode={true}
                                    isSelected={selectedIds.has(item.clothing_id)}
                                    onToggleSelect={() => toggleSelect(item.clothing_id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* confirm modal */}
            <CharityInventoryActionConfirm
                isOpen={confirm !== null}
                onClose={() => setConfirm(null)}
                onConfirm={async () => {
                    const action = confirm;
                    setConfirm(null);

                    if (action === "cancel") {
                        await cancelDraft();
                    }

                    if (action === "remove") {
                        await removeItems();
                    }
                }}
                title="Confirm action"
                message="Are you sure you want to perform this action?"
                confirmLabel={confirm === "cancel" ? "Cancel draft" : "Remove items"}
                confirmClassName={
                    confirm === "cancel"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-900 hover:bg-black"
                }
            />
        </div>
    );
}
