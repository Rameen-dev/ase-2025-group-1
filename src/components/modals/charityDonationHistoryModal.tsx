"use client";

import React from "react";
import type { DonationRequest } from "@/types/donation";

interface CharityDonationHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    requests: DonationRequest[];
}

export default function CharityDonationHistoryModal({
    isOpen,
    onClose,
    requests,
}: CharityDonationHistoryModalProps) {
    if (!isOpen) return null;

    // Only approved / rejected requests
    const historyRequests = requests.filter(
        (r) => r.status === "APPROVED" || r.status === "REJECTED"
    );

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h2 className="text-lg font-semibold">Donation Requests History</h2>
                    <button
                        onClick={onClose}
                        className="text-sm px-2 py-1 rounded hover:bg-gray-100"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {historyRequests.length === 0 ? (
                        <div className="p-4 text-sm text-gray-500 text-center">
                            No approved or rejected donation requests yet.
                        </div>
                    ) : (
                        <table className="w-full text-sm table-fixed">
                            <colgroup>
                                <col className="w-2/5" />
                                <col className="w-1/5" />
                                <col className="w-1/5" />
                                <col className="w-1/5" />
                            </colgroup>
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-3 text-left">Title</th>
                                    <th className="p-3 text-center">Items</th>
                                    <th className="p-3 text-center">Status</th>
                                    <th className="p-3 text-center">Request ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyRequests.map((r) => {
                                    const statusClasses =
                                        r.status === "APPROVED"
                                            ? "text-green-700 font-semibold"
                                            : "text-red-600 font-semibold";

                                    return (
                                        <tr key={r.donation_request_id} className="border-t">
                                            <td className="p-3 truncate">{r.title}</td>
                                            <td className="p-3 text-center">
                                                {r._count?.ClothingItems ?? 0}
                                            </td>
                                            <td className={`p-3 text-center ${statusClasses}`}>
                                                {r.status}
                                            </td>
                                            <td className="p-3 text-center text-gray-500 text-xs">
                                                {r.donation_request_id}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 text-sm rounded-md border hover:bg-gray-50"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
