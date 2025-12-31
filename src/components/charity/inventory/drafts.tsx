"use client"

import React, { useEffect, useState } from "react";
import DraftViewModal from "./viewDraftModal";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

type Draft = {
    draft_id: number;
    title: string;
    draft_status: "DRAFT" | string;
    _count: {
        items: number;
    }
};


export default function Drafts({
    onCreateDraft,
    refreshToken,
    onChanged,
    onAddItems,
}: {
    onCreateDraft: () => void;
    refreshToken: number;
    onChanged: () => void;
    onAddItems: (draftId: number, title: string) => void;
}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //list of drafts fetched from the back end
    const [drafts, setDrafts] = useState<Draft[]>([]);

    //selected draft id for correct view modal to open
    const [viewDraftId, setViewDraftId] = useState<number | null>(null);

    //open / close modal boolean
    const [isViewOpen, setIsViewOpen] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`${API_BASE}/api/charity/inventory/drafts`, {
                    credentials: "include",
                });
                const data = await res.json();

                if (!res.ok) throw new Error(data?.error ?? "Failed to load drafts");
                setDrafts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error loading drafts:", err);
                setError("Failed to load drafts: ")
                setDrafts([]);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [refreshToken]);

    return (
        <div>
            <div className="flex justify-between ">

                <h1 className="text-xl text-black font-bold">Allocate items</h1>
                <button className="text-sm px-3 py-1 rounded-md bg-green-700 text-white hover:bg-green-800"
                    onClick={onCreateDraft}>
                    Create draft
                </button>
            </div>

            {loading && <p className="text-sm text-gray-500 mt-2">Loading drafts…</p>}
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

            <div className="overflow-y-auto mt-3 max-h-30">
                <table className="w-full text-sm table-fixed">
                    <colgroup>
                        <col className="w-3/5" />
                        <col className="w-1/5" />
                        <col className="w-1/5" />
                    </colgroup>

                    <thead className="text-left text-gray-600">
                        <tr className="border-b">
                            <th className="py-2">Title</th>
                            <th className="py-2">Items</th>
                            <th className="py-2">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {!loading && drafts.length === 0 ? (
                            <tr>
                                <td className="py-3 text-gray-500" colSpan={3}>
                                    No drafts yet.
                                </td>
                            </tr>
                        ) : (
                            drafts.map((d) => (
                                <tr key={d.draft_id} className="border-b">
                                    <td className="py-2 pr-2 truncate font-bold text-lg text-gray-600 underline">{d.title}</td>
                                    <td className="py-2 tabular-nums">{d._count.items ?? 0}</td>
                                    <td className="py-2">
                                        <button
                                            className="text-xs px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                                            onClick={() => {
                                                setViewDraftId(d.draft_id);
                                                setIsViewOpen(true);
                                            }}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <DraftViewModal
                open={isViewOpen}
                draftId={viewDraftId}
                onClose={() => setIsViewOpen(false)}
                onChanged={onChanged}
                onAddItems={(draftId) => {
                    const title = drafts.find((x) => x.draft_id === draftId)?.title ?? `Draft #${draftId}`;
                    onAddItems(draftId, title);
                    setIsViewOpen(false);
                }}
            />
        </div>
    );
}