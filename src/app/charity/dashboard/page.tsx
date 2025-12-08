"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/UI/dashboard-layout";
import type { DonationRequest } from "@/types/donation";
import Image from "next/image"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

// Tabs
type TabName = "Home" | "Donations" | "Inventory";
const TABS: TabName[] = ["Home", "Donations", "Inventory"];

// Clothing item shape returned from /items route
interface ClothingItemView {
  clothing_id: number;
  type: string;
  size: string;
  condition: string;
  front_image_url?: string;
  back_image_url?: string;
}

// Main dashboard
export default function CharityDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabName>("Home");
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/donation-requests`);
        const data = await res.json();

        // Safety: only accept array results
        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          console.error("Expected array from /api/donation-requests, got:", data);
          setRequests([]);
        }
      } catch (err) {
        console.error("Error loading donation requests:", err);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <DashboardLayout
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSignOut={() => router.push("/")}
      roleLabel="Charity"
      headerTitle={activeTab}
    >
      {activeTab === "Home" && <HomeTab />}

      {activeTab === "Donations" && (
        <DonationsTab
          requests={requests}
          loading={loading}
          setRequests={setRequests}
        />
      )}

      {activeTab === "Inventory" && <PlaceholderTab title="Inventory" />}
    </DashboardLayout>
  );
}

// Home tab
function HomeTab() {
  return (
    <div className="border border-dashed rounded-xl p-6 text-center text-gray-500">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Dashboard Overview
      </h3>
      <p>Stats and analytics coming soon.</p>
    </div>
  );
}

// Donations tab
function DonationsTab({
  requests,
  loading,
  setRequests,
}: {
  requests: DonationRequest[];
  loading: boolean;
  setRequests: React.Dispatch<React.SetStateAction<DonationRequest[]>>;
}) {
  const [viewOpen, setViewOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewRequest, setViewRequest] = useState<DonationRequest | null>(null);
  const [viewItems, setViewItems] = useState<ClothingItemView[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [imageModalItem, setImageModalItem] = useState<ClothingItemView | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const allUnchecked = selectedItems.length === 0;

  // Open modal and load items for a request
  async function openView(req: DonationRequest) {
    setViewItems([]);
    setSelectedItems([]);
    setViewRequest(req);
    setViewOpen(true);
    setViewLoading(true);

    try {
      const res = await fetch(
        `${API_BASE}/api/donation-requests/${req.donation_request_id}/items`
      );
      const data = await res.json();
      setViewItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading items:", err);
      setViewItems([]);
    } finally {
      setViewLoading(false);
    }
  }

  // Accept entire request
  async function handleAccept() {
    if (!viewRequest) return;

    if (selectedItems.length === 0) {
      alert("Select at least one item to approve.");
      return;
    }

    // 1. Send approved item IDs to API
    const res = await fetch(
      `${API_BASE}/api/donation-requests/${viewRequest.donation_request_id}/accept`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemIds: selectedItems }), // send selected item IDs
      }
    );

    if (!res.ok) {
      alert("Failed to approve request.");
      return;
    }

    // 2. Update status visually in table without removing request
    setRequests(prev =>
      prev.map(r =>
        r.donation_request_id === viewRequest.donation_request_id
          ? { ...r, status: "APPROVED" }
          : r
      )
    );

    // 3. Refresh full list from server so UI stays consistent
    const refresh = await fetch(`${API_BASE}/api/donation-requests`);
    const updatedRequests = await refresh.json();
    setRequests(updatedRequests);

    // 4. Reload items so only approved ones appear when modal reopens
    const refreshedItems = await fetch(
      `${API_BASE}/api/donation-requests/${viewRequest.donation_request_id}/items`
    );
    const newItems = await refreshedItems.json();
    setViewItems(newItems);

    // 5. Close modal and notify user
    setViewOpen(false);
    alert("Request approved.");
  }

  // Decline and delete request
  async function handleDecline() {
    if (!viewRequest) return;

    const confirmDelete = confirm(
      "Are you sure? This will DELETE the entire donation request permanently."
    );
    if (!confirmDelete) return;

    const res = await fetch(
      `${API_BASE}/api/donation-requests/${viewRequest.donation_request_id}/decline`,
      { method: "POST" }
    );

    if (!res.ok) {
      alert("Failed to delete donation request.");
      return;
    }

    // Remove from local state
    setRequests((prev) =>
      prev.filter(
        (r) => r.donation_request_id !== viewRequest.donation_request_id
      )
    );

    alert("Donation request deleted.");
    setViewOpen(false);
  }


  function ItemImagesModal({
    item,
    isOpen,
    onClose,
  }: {
    item: ClothingItemView | null;
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




  return (
    <div>
      <h2 className="text-xl mb-2 font-semibold">Donation Requests</h2>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50">
            <tr>
              <th className="p-3">Title</th>
              <th>Items</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            )}

            {!loading &&
              Array.isArray(requests) &&
              requests.map((r) => (
                <tr key={r.donation_request_id} className="border">
                  <td className="p-3 text-center">{r.title}</td>
                  <td className="p-3 text-center">
                    {r._count?.ClothingItems ?? 0}
                  </td>
                  <td className="p-3 text-center text-blue-700 font-semibold">
                    {r.status}
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

            {!loading && Array.isArray(requests) && requests.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No donation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View modal */}
      {viewOpen && viewRequest && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-lg font-semibold mb-3">{viewRequest.title}</h2>

            {viewLoading ? (
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
                  {viewItems.map((item) => (
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
                          onClick={() => {
                            setImageModalItem(item);
                            setIsImageModalOpen(true);
                          }}
                        >
                          View item images
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
                onClick={() => setViewOpen(false)}
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
      )}
      <ItemImagesModal
        item={imageModalItem}
        isOpen={isImageModalOpen}
        onClose={() => {
          setIsImageModalOpen(false);
          setImageModalItem(null);
        }}
      />
    </div>
  );
}

// Inventory placeholder
function PlaceholderTab({ title }: { title: string }) {
  return (
    <div className="border rounded-xl p-6 text-center text-gray-400">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>Coming soon.</p>
    </div>
  );
}
