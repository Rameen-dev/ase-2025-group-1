"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { DonationRequest } from "@/types/donation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

interface ClothingItemView {
    clothing_id: number;
    type: string;
    size: string;
    condition: string;
    front_image_url?: string;
    back_image_url?: string;
}

interface DonationRequestModalProps {
    isOpen: boolean;
    request: DonationRequest | null;
    onClose: () => void;
    setRequests: React.Dispatch<React.SetStateAction<DonationRequest[]>>;
}

export default function CharityViewDonationRequest({
    isOpen,
    request,
    onClose,
    setRequests,
}: DonationRequestModalProps) {
    const [items, setItems] = useState<ClothingItemView[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [imageModalItem, setImageModalItem] = useState<ClothingItemView | null>(null);

    const allUnchecked = selectedItems.length === 0;

    // Load items when modal opens for a specific request
    useEffect(() => {
        if (!isOpen || !request) return;

        const requestId = request.donation_request_id;

        async function loadItems(id: number) {
            try {
                setLoading(true);
                setItems([]);
                setSelectedItems([]);

                const res = await fetch(
                    `${API_BASE}/api/donation-requests/${id}/items`
                );
                const data = await res.json();
                const itemsArray: ClothingItemView[] = Array.isArray(data) ? data : [];
                setItems(itemsArray);
                setSelectedItems(itemsArray.map((item) => item.clothing_id));
            } catch (err) {
                console.error("Error loading items:", err);
                setItems([]);
            } finally {
                setLoading(false);
            }
        }

        loadItems(requestId);
    }, [isOpen, request]);

    async function handleAccept() {
        if (!request) return;

        if (selectedItems.length === 0) {
            alert("Select at least one item to approve.");
            return;
        }

        const res = await fetch(
            `${API_BASE}/api/donation-requests/${request.donation_request_id}/accept`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ itemIds: selectedItems }),
            }
        );

        if (!res.ok) {
            alert("Failed to approve request.");
            return;
        }

        // Update status locally
        setRequests((prev) =>
            prev.map((r) =>
                r.donation_request_id === request.donation_request_id
                    ? { ...r, status: "APPROVED" }
                    : r
            )
        );

        // Optional: refresh full list from server so UI stays consistent
        try {
            const refresh = await fetch(`${API_BASE}/api/donation-requests`);
            const updatedRequests = await refresh.json();
            if (Array.isArray(updatedRequests)) {
                setRequests(updatedRequests);
            }
        } catch (err) {
            console.error("Error refreshing requests:", err);
        }

        alert("Request approved.");
        onClose();
    }

    async function handleDecline() {
        if (!request) return;

        const confirmDelete = confirm(
            "Are you sure? This will DELETE the entire donation request permanently."
        );
        if (!confirmDelete) return;

        const res = await fetch(
            `${API_BASE}/api/donation-requests/${request.donation_request_id}/decline`,
            { method: "POST" }
        );

        if (!res.ok) {
            alert("Failed to delete donation request.");
            return;
        }

        setRequests((prev) =>
            prev.filter((r) => r.donation_request_id !== request.donation_request_id)
        );

        alert("Donation request deleted.");
        onClose();
    }

    if (!isOpen || !request) return null;

    return (
        <>
            {/* Main view modal */}
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                    <h2 className="text-lg font-semibold mb-3">{request.title}</h2>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table className="w-full border text-sm">
                            <thead>
                                <tr>
                                    <th className="p-2 text-center">Pick</th>
                                    <th className="p-2 text-left">Images</th>
                                    <th className="p-2 text-left">Type</th>
                                    <th className="p-2 text-left">Size</th>
                                    <th className="p-2 text-left">Condition</th>
                                </tr>
                            </thead>

                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.clothing_id} className="border-t">
                                        <td className="p-2 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.clothing_id)}
                                                onChange={() =>
                                                    setSelectedItems((prev) =>
                                                        prev.includes(item.clothing_id)
                                                            ? prev.filter((x) => x !== item.clothing_id)
                                                            : [...prev, item.clothing_id]
                                                    )
                                                }
                                            />
                                        </td>
                                        <td className="p-2">
                                            <button
                                                className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                                                onClick={() => setImageModalItem(item)}
                                            >
                                                Images
                                            </button>
                                        </td>
                                        <td className="p-2">{item.type}</td>
                                        <td className="p-2">{item.size}</td>
                                        <td className="p-2">{item.condition}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={onClose}
                            className="border px-3 py-1 rounded"
                        >
                            Close
                        </button>

                        <button
                            onClick={handleDecline}
                            disabled={!allUnchecked}
                            className={`px-3 py-1 rounded text-white ${allUnchecked ? "bg-red-600" : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Decline
                        </button>

                        <button
                            onClick={handleAccept}
                            className="px-3 py-1 bg-green-600 text-white rounded"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>

            {/* Image modal */}
            {imageModalItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
                    <div className="bg-white rounded-lg p-6 max-w-2xl shadow-lg">
                        {imageModalItem.front_image_url && imageModalItem.back_image_url ? (
                            <>
                                <h3 className="text-lg font-semibold mb-4">
                                    Images for {imageModalItem.type}
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="border-2 border-gray-300 rounded-lg p-3">
                                        <p className="text-sm font-medium mb-1">Front</p>
                                        <Image
                                            src={imageModalItem.front_image_url}
                                            alt="Front of item"
                                            width={1000}
                                            height={1200}
                                            className="w-full h-auto max-h-[500px] object-cover border rounded"
                                        />
                                    </div>
                                    <div className="border-2 border-gray-300 rounded-lg p-3">
                                        <p className="text-sm font-medium mb-1">Back</p>
                                        <Image
                                            src={imageModalItem.back_image_url}
                                            alt="Back of item"
                                            width={1000}
                                            height={1200}
                                            className="w-full h-auto max-h-[500px] object-cover border rounded"
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-red-600">
                                This item is missing image URLs.
                            </p>
                        )}

                        <button
                            onClick={() => setImageModalItem(null)}
                            className="mt-4 px-3 py-1 border rounded-md text-sm float-right"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
