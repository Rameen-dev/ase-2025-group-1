"use client"

import React, { useEffect, useState } from "react";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export default function Drafts() {
    const [loading, setLoading] = useState(true);
    const [drafts, setDrafts] = useState<unknown[]>([]); // replace `any` with Draft type later

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);

                const res = await fetch(`${API_BASE}/api/charity/inventory/drafts`);
                const data = await res.json();

                setDrafts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error loading drafts:", err);
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
                <button className="text-sm px-3 py-1 rounded-md bg-green-700 text-white hover:bg-green-800" >
                    Create draft
                </button>
            </div>

            <div className="overflow-y-auto">
                <table className="w-full text-sm table-fixed">
                    <colgroup>
                        <col className="w-3/5" />
                        <col className="w-1/5" />
                        <col className="w-1/5" />
                    </colgroup>
                </table>
            </div>
        </div>
    )
}