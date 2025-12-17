"use client";

import React, { useEffect, useState } from "react";
import ImageSlider from "./imageSlider";
import { ClothingItem } from "@/types/donation";

type DraftPayload = {
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
    const [data, setData] = useState<DraftPayload | null>(null);

    const [cancelling, setCancelling] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    //when modal opens, reset selections
    useEffect(() => {
        if (!open || !draftId) return;

        (async () => {
            try {
                setLoading(true);
                setErr(null);
            } catch {
                setErr("Failed to load draft");
                setData(null);
            } finally {
                setLoading(false);
            }
        })();
    }, [open, draftId]);

    useEffect(() => {
        if (!open || !draftId) return;

        (async () => {
            try {
                setLoading(true);
                setErr(null);

                const res = await fetch(`/api/charity/inventory/drafts/${draftId}`, {
                    credentials: "include",
                });
                const json = await res.json();
                if (!res.ok) throw new Error(json?.error ?? "Failed to load draft");

                setData(json);
            } catch {
                setErr("Failed to load draft");
                setData(null);
            } finally {
                setLoading(false);
            }
        })();
    }, [open, draftId]);

    useEffect(() => {
        if (!open || !draftId) return;

        async function reloadDraft() {
            try {
                setLoading(true);
                setErr(null);

                const res = await fetch(`/api/charity/inventory/drafts/${draftId}`, {
                    credentials: "include",
                });
                const json = await res.json();
                if (!res.ok) throw new Error(json?.error ?? "Failed to load draft");

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

            onChanged?.();
            onClose();
        } catch {
            setErr("Failed to cancel draft");
        } finally {
            setCancelling(false);
        }
    }

    function toggleSelect(id: number) {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    async function removeItems() {
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

                        <button
                            disabled={selectedIds.size === 0 || loading}
                            className="rounded-md bg-gray-900 px-3 py-1 text-sm text-white hover:bg-black disabled:opacity-50"
                            onClick={removeItems}
                        >
                            Remove ({selectedIds.size})
                        </button>

                        <button
                            onClick={cancelDraft}
                            disabled={cancelling || loading}
                            className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                        >
                            {cancelling ? "Cancelling…" : "Cancel draft"}
                        </button>

                        <button
                            onClick={onClose}
                            className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                        >
                            Close
                        </button>
                    </div>
                </div>

                <div className="max-h-[70vh] overflow-y-auto p-3">
                    {loading && <p className="text-sm text-gray-500">Loading draft…</p>}
                    {err && <p className="text-sm text-red-600">{err}</p>}

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
        </div>
    );
}
