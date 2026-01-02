"use client";

import React, { useState } from "react";
import type { DonationRequest } from "@/types/donation";
import CharityViewDonationRequest from "@/components/charity/donations/charityViewDonationRequestModal";
import CharityDonationHistoryModal from "@/components/charity/donations/charityDonationHistoryModal";
import ViewDonationItemsModal from "@/components/modals/viewDonationRequestModal";

type ClothingItem = {
  clothing_id: number;
  type: string;
  size: string;
  condition: string;
  status: string;
  front_image_url?: string;
  back_image_url?: string;
};

type Props = {
  apiBase: string;
  requests: DonationRequest[];
  loading: boolean;
  setRequests: React.Dispatch<React.SetStateAction<DonationRequest[]>>;
};

export const CharityDonationsTab: React.FC<Props> = ({
  apiBase,
  requests,
  loading,
  setRequests,
}) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [viewRequest, setViewRequest] = useState<DonationRequest | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  const [itemsModalOpen, setItemsModalOpen] = useState(false);
  const [itemsModalLoading, setItemsModalLoading] = useState(false);
  const [itemsModalItems, setItemsModalItems] = useState<ClothingItem[]>([]);
  const [itemsModalTitle, setItemsModalTitle] = useState<string | undefined>();

  async function handleHistoryView(req: DonationRequest) {
    setItemsModalTitle(req.title);
    setItemsModalOpen(true);
    setItemsModalLoading(true);
    setItemsModalItems([]);

    const url = `${apiBase}/api/charity/donations/${req.donation_request_id}/items`;
    console.log("CHARITY HISTORY ITEMS URL:", url);

    try {
      const res = await fetch(url, {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      setItemsModalItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading items for history request:", err);
      setItemsModalItems([]);
    } finally {
      setItemsModalLoading(false);
    }
  }

  const pendingRequests = requests.filter((r) => r.status === "PENDING");

  function openView(req: DonationRequest) {
    setViewRequest(req);
    setViewOpen(true);
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Donation Requests</h2>

        <button
          onClick={() => setHistoryOpen(true)}
          className="text-sm px-3 py-1 rounded-md bg-green-700 text-white hover:bg-green-800"
        >
          View donation history
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden h-[calc(100vh-220px)] flex flex-col bg-white">
        <table className="w-full text-sm table-fixed">
          <colgroup>
            <col className="w-1/4" />
            <col className="w-1/6" />
            <col className="w-1/6" />
            <col className="w-1/6" />
          </colgroup>
          <thead className="bg-green-50">
            <tr>
              <th className="p-3">Title</th>
              <th>Items</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>

        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm table-fixed">
            <colgroup>
              <col className="w-1/4" />
              <col className="w-1/6" />
              <col className="w-1/6" />
              <col className="w-1/6" />
            </colgroup>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading &&
                Array.isArray(pendingRequests) &&
                pendingRequests.map((r) => (
                  <tr key={r.donation_request_id} className="border">
                    <td className="p-3 text-center text-base md:text-lg text-black font-bold">
                      {r.title}
                    </td>
                    <td className="p-3 text-center">
                      {r._count?.ClothingItems ?? 0}
                    </td>
                    <td className="p-3 text-center text-blue-700 font-semibold">
                      {r.createdAgo}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => openView(r)}
                        className="px-3 py-1 text-xs border rounded-md text-blue-600 hover:bg-blue-50"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}

              {!loading && pendingRequests.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    No donation requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CharityViewDonationRequest
        isOpen={viewOpen}
        request={viewRequest}
        onClose={() => {
          setViewOpen(false);
          setViewRequest(null);
        }}
        setRequests={setRequests}
      />

      <CharityDonationHistoryModal
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        requests={requests}
        onViewRequest={handleHistoryView}
      />

      <ViewDonationItemsModal
        isOpen={itemsModalOpen}
        onClose={() => setItemsModalOpen(false)}
        requestTitle={itemsModalTitle}
        loading={itemsModalLoading}
        items={itemsModalItems}
      />
    </div>
  );
};
