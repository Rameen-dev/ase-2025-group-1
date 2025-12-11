"use client";
import { useState } from "react";
import React from "react";
import Image from "next/image"

//clothing item returned from the API, returns the values of the item
type ClothingItem = {
    clothing_id: number;
    type: string;
    size: string;
    condition: string;
    status: string;
    front_image_url?: string;
    back_image_url?: string;
};

//props for view donation items modal
type ViewDonationItemsModalProps = {
    isOpen: boolean; //when true modal appears on screen
    onClose: () => void; //closes the modal
    requestTitle?: string; //title of donation request
    loading: boolean; //while items are being fetched from databsae, show loading to user
    items: ClothingItem[]; //clothing items displayed on the modal
};

//modal to view images linked to items
function ItemImagesModal({
    item,
    isOpen,
    onClose,
}: {
    item: ClothingItem | null;
    isOpen: boolean;
    onClose: () => void;
}) {
    if (!isOpen || !item) return null;

    //although image URLs will always be in the database
    //this fixes an error inside next <Image /> where it wouldn't let "src"
    //store a nullable string
    if (!item.front_image_url || !item.back_image_url) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
                <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
                    <p className="text-sm text-red-600">
                        This item is missing image URLs.
                    </p>
                    <button
                        onClick={onClose}
                        className="mt-4 px-3 py-1 border rounded-md text-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
            <div className="bg-white rounded-lg p-6 max-w-2x1 shadow-lg">
                <h3 className="text-lg font-semibold mb-4">
                    Images for {item.type}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                    <div className="border-2 border-gray-300 rounded-lg p-3">
                        <p className="text-sm font-medium mb-1">Front</p>
                        <Image
                            src={item.front_image_url}
                            alt="Front of item"
                            width={1000}
                            height={1200}
                            className="w-full h-auto max-h-[500px] object-cover border rounded"
                        />
                    </div>
                    <div className="border-2 border-gray-300 rounded-lg p-3">
                        <p className="text-sm font-medium mb-1">Back</p>
                        <Image
                            src={item.back_image_url}
                            alt="Back of item"
                            width={1000}
                            height={1200}
                            className="w-full h-auto max-h-[500px] object-cover border rounded"
                        />
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="mt-4 px-3 py-1 border rounded-md text-sm float-right"
                >
                    Close
                </button>
            </div>
        </div>
    );
}



//exported modal for view donation items
export default function ViewDonationItemsModal({
    isOpen,
    onClose,
    requestTitle,
    loading,
    items,
}: ViewDonationItemsModalProps) {

    const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);

    if (!isOpen) return null; //if isOpen is false, don't show modal

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-80">
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
                        <thead className="">
                            <tr>
                                <th className="p-2 text-left">Type</th>
                                <th className="p-2 text-left">Size</th>
                                <th className="p-2 text-left">Condition</th>
                                <th className="p-2 text-left">Images</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => {
                                const isApproved = item.status === "APPROVED"
                                const isRejcted = item.status === "REJECTED"

                                const rowBg = isApproved ? "bg-green-50" : isRejcted ? "bg-red-50" : "";

                                return (
                                    <tr key={item.clothing_id} className={`border-t ${rowBg}`}>
                                        <td className="p-2">{item.type}</td>
                                        <td className="p-2">{item.size}</td>
                                        <td className="p-2">{item.condition}</td>
                                        <td className="p-2">
                                            {/* button opening images modal*/}
                                            <button
                                                onClick={() => setSelectedItem(item)}
                                                className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                                            >
                                                Review Images
                                            </button>

                                        </td>
                                    </tr>
                                );
                            })}
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
            <ItemImagesModal
                item={selectedItem}
                isOpen={selectedItem !== null}
                onClose={() => setSelectedItem(null)}
            />
        </div>
    );
}
