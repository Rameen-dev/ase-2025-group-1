"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/UI/dashboard-layout";
import type { DonationRequest } from "@/types/donation";

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

    const res = await fetch(
      `${API_BASE}/api/donation-requests/${viewRequest.donation_request_id}/accept`,
      { method: "POST" }
    );

    if (!res.ok) {
      alert("Failed to approve request");
      return;
    }

    // Update status in local state
    setRequests((prev) =>
      prev.map((r) =>
        r.donation_request_id === viewRequest.donation_request_id
          ? { ...r, status: "APPROVED" }
          : r
      )
    );

    alert("Request approved successfully.");
    setViewOpen(false);
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
                    {r._count?.clothing_items ?? 0}
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
                    <th className="p-2">Pick</th>
                    <th>Images</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Condition</th>
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
                      <td className="p-2 flex gap-2">
                        <img
                          src={item.front_image_url ?? ""}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <img
                          src={item.back_image_url ?? ""}
                          className="w-12 h-12 object-cover rounded"
                        />
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
                className={`px-3 py-1 rounded text-white ${
                  allUnchecked ? "bg-red-600" : "bg-gray-400 cursor-not-allowed"
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
