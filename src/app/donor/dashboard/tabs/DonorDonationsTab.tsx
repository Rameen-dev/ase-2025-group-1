"use client";

import React, { useState } from "react";
import type { DonationRequest } from "@/types/donation";
import CreateDonationRequestModal from "@/components/modals/donationRequestModal";
import ViewDonationItemsModal from "@/components/modals/viewDonationRequestModal";
import { DeleteDonationRequestModal } from "@/components/modals/confirmMessageModal";

type DonorAnalytics = {
  totals: {
    totalRequests: number;
    totalItems: number;
    completedDonations: number;
    acceptanceRate: number;
    statusCounts: { PENDING: number; APPROVED: number; REJECTED: number };
  };
  topTypes: { type: string; count: number }[];
  recentEvents: {
    event_id: number;
    event_type: string;
    created_on: string;
    donation_request_id: number | null;
    metadata: any;
  }[];
};

type ClothingItemView = {
  clothing_id: number;
  type: string;
  size: string;
  status: string;
  condition: string;
};

type Props = {
  title: string;
  apps: DonationRequest[];
  loading: boolean;
  analytics: DonorAnalytics | null;
  analyticsLoading: boolean;
  apiBase: string;
  onCreated: (req: DonationRequest) => void;
  onDelete: (id: number) => void;
};

export const DonorDonationsTab: React.FC<Props> = ({
  title,
  apps,
  loading,
  apiBase,
  onCreated,
  onDelete,
}) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<DonationRequest | null>(
    null
  );

  const [viewOpen, setViewOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewRequest, setViewRequest] = useState<DonationRequest | null>(null);
  const [viewItems, setViewItems] = useState<ClothingItemView[]>([]);

  const [createOpen, setCreateOpen] = useState(false);

  async function handleOpenView(app: DonationRequest) {
    setViewRequest(app);
    setViewOpen(true);
    setViewLoading(true);

    try {
      const res = await fetch(
        `${apiBase}/api/donation-requests/${app.donation_request_id}/items`
      );

      if (!res.ok) throw new Error("Failed to load items");

      const data: ClothingItemView[] = await res.json();
      setViewItems(data);
    } finally {
      setViewLoading(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!itemToDelete) return;

    try {
      const res = await fetch(
        `${apiBase}/api/donation-requests/${itemToDelete.donation_request_id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error();

      onDelete(itemToDelete.donation_request_id);
      setDeleteOpen(false);
      setItemToDelete(null);
    } catch {
      alert("Error deleting donation request");
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Requests table */}
      <div className="h-full mb-4">
        <div className="border rounded-lg shadow-md flex flex-col h-full bg-white">
          <div className="bg-green-100 px-4 py-3 font-semibold text-lg flex items-center justify-between">
            <span>{title}</span>
            <button
              onClick={() => setCreateOpen(true)}
              className="text-sm px-3 py-1 rounded-md bg-green-700 text-white hover:bg-green-800"
            >
              + New Request
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-50 border rounded-lg">
                  <th className="p-3 text-center">Title</th>
                  <th className="p-3 text-center">Items</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Created</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={5} className="p-3 text-center">
                      Loading...
                    </td>
                  </tr>
                )}

                {!loading &&
                  apps.map((app) => {
                    const isApproved = app.status === "APPROVED";
                    const isRejected = app.status === "REJECTED";

                    const rowBg = isApproved
                      ? "bg-green-50"
                      : isRejected
                        ? "bg-red-50"
                        : "";
                    const statusText = isApproved
                      ? "text-green-700 font-semibold"
                      : isRejected
                        ? "text-red-600 font-semibold"
                        : "text-gray-700";

                    return (
                      <tr
                        key={app.donation_request_id}
                        className={`border ${rowBg} ${statusText}`}
                      >
                        <td className="p-3 text-center text-base md:text-lg text-black font-bold">
                          {app.title}
                        </td>
                        <td className="p-3 text-center">
                          {app._count?.ClothingItems ?? 0}
                        </td>
                        <td className="p-3 text-center">{app.status}</td>
                        <td className="p-3 text-center">{app.createdAgo}</td>
                        <td className="p-3 text-center flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenView(app)}
                            className="text-xs px-3 py-2 rounded-md border border-blue-300 text-blue-600 hover:bg-blue-50"
                          >
                            View
                          </button>

                          {app.status === "PENDING" && (
                            <button
                              onClick={() => {
                                setItemToDelete(app);
                                setDeleteOpen(true);
                              }}
                              className="text-xs px-3 py-2 rounded-md border border-red-300 text-red-600 hover:bg-red-50"
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                {!loading && apps.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-3 text-center">
                      No donation requests yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateDonationRequestModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(req) => onCreated(req)}
      />

      <ViewDonationItemsModal
        isOpen={viewOpen}
        onClose={() => setViewOpen(false)}
        requestTitle={viewRequest?.title}
        loading={viewLoading}
        items={viewItems}
      />

      <DeleteDonationRequestModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={itemToDelete?.title}
      />
    </div>
  );
};
