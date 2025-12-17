"use client"

import React, { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

type Draft = {
    draft_id: number;
    title: string;
    draft_status: "DRAFT" | string;
};


export default function Drafts({
    onCreateDraft,
}: {
    onCreateDraft: () => void;
    refreshToken: number;
}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [drafts, setDrafts] = useState<Draft[]>([]);

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
    }, []);

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

            <div className="overflow-y-auto mt-3">
                <table className="w-full text-sm table-fixed">
                    <colgroup>
                        <col className="w-3/5" />
                        <col className="w-1/5" />
                        <col className="w-1/5" />
                    </colgroup>

                    <thead className="text-left text-gray-600">
                        <tr className="border-b">
                            <th className="py-2">Title</th>
                            <th className="py-2">Status</th>
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
                                    <td className="py-2 pr-2 truncate">{d.title}</td>
                                    <td className="py-2">{d.draft_status}</td>
                                    <td className="py-2">
                                        <button
                                            className="text-xs px-2 py-1 rounded bg-gray-900 text-white hover:bg-black"
                                            onClick={() => {
                                                alert(`View draft ${d.draft_id}`);
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
        </div>
    );
}