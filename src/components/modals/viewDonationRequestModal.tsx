"use client";

import React from "react";

//clothing item returned from the API, returns the values of the item
type ClothingItem = {
    clothing_id: number;
    type: string;
    size: string;
    condition: string;
    front_image_url?: string | null;
    back_image_url?: string | null;
};

//props for view donation items modal
type ViewDonationItemsModalProps = {
    isOpen: boolean; //when true modal appears on screen
    onClose: () => void; //closes the modal
    requestTitle?: string; //title of donation request
    loading: boolean; //while items are being fetched from databsae, show loading to user
    items: ClothingItem[]; //clothing items displayed on the modal
};

//exported modal for view donation items
export default function ViewDonationItemsModal({
    isOpen,
    onClose,
    requestTitle,
    loading,
    items,
}: ViewDonationItemsModalProps) {
    if (!isOpen) return null; //if isOpen is false, don't show modal

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg">
                <h2 className="text-lg font-semibold mb-3">
                    Items in {requestTitle ?? "request"}
                </h2>

                {loading ? (
                    <p className="text-sm text-gray-500">Loading items...</p>
                ) : items.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No clothing items found for this request.
                    </p>
                ) : (
                    <table className="w-full text-sm border border-gray-200 rounded-md overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-2 text-left">Type</th>
                                <th className="p-2 text-left">Size</th>
                                <th className="p-2 text-left">Condition</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.clothing_id} className="border-t">
                                    <td className="p-2">{item.type}</td>
                                    <td className="p-2">{item.size}</td>
                                    <td className="p-2">{item.condition}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="flex justify-end mt-4">
                    <button
                        className="px-3 py-1 border rounded-md text-sm"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
