"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { DashboardLayout } from "@/components/UI/dashboard-layout";

// Shared type
import type { DonationRequest } from "@/types/donation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

/* Tabs */
type TabName = "Home" | "Donations" | "Inventory";
const TABS: TabName[] = ["Home", "Donations", "Inventory"];

/* Clothing item type including images */
interface ClothingItemView {
  clothing_id: number;
  type: string;
  size: string;
  condition: string;
  front_image_url: string;
  back_image_url: string;
}

/* MAIN DASHBOARD */
export default function CharityDashboard() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabName>("Home");
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRequests() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/donation-requests`);
        const data = await res.json();
        setRequests(data);
      } finally {
        setLoading(false);
      }
    }
    loadRequests();
  }, []);

  function handleSignOut() {
    router.push("/");
  }

  const headerTitle = {
    Home: "Dashboard Overview",
    Donations: "Donations",
    Inventory: "Inventory",
  }[activeTab];

  return (
    <DashboardLayout
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSignOut={handleSignOut}
      roleLabel="Charity"
      headerTitle={headerTitle}
    >
      {activeTab === "Home" && <HomeTab />}
      {activeTab === "Donations" && (
        <DonationsTab
          requests={requests}
          loading={loading}
          onDelete={(id) =>
            setRequests((prev) =>
              prev.filter((r) => r.donation_request_id !== id)
            )
          }
        />
      )}
      {activeTab === "Inventory" && <PlaceholderTab title="Inventory" />}
    </DashboardLayout>
  );
}

/* HOME TAB */
function HomeTab() {
  return (
    <div className="h-1/2">
      <div className="border border-dashed h-full border-gray-300 rounded-xl p-8 text-center text-gray-500">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Dashboard Overview (Coming Soon)
        </h3>
        <p className="text-sm">
          Stats will appear here: total donations, accepted items, etc.
        </p>
      </div>
    </div>
  );
}

/* DONATIONS TAB */
function DonationsTab({
  requests,
  loading,
  onDelete,
}: {
  requests: DonationRequest[];
  loading: boolean;
  onDelete: (id: number) => void;
}) {
  const [viewOpen, setViewOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);

  const [viewRequest, setViewRequest] = useState<DonationRequest | null>(null);
  const [viewItems, setViewItems] = useState<ClothingItemView[]>([]);

  /* OPEN REQUEST MODAL — view images */
  async function openViewModal(req: DonationRequest) {
    setViewRequest(req);
    setViewOpen(true);
    setViewLoading(true);

    try {
      const res = await fetch(
        `${API_BASE}/api/donation-requests/${req.donation_request_id}/items`
      );
      const data = await res.json();
      setViewItems(data);
    } catch {
      alert("Failed to load items.");
    } finally {
      setViewLoading(false);
    }
  }

  /* ACCEPT ENTIRE REQUEST */
  async function handleAccept() {
    if (!viewRequest) return;
    await fetch(
      `${API_BASE}/api/donation-requests/${viewRequest.donation_request_id}/accept`,
      { method: "POST" }
    );
    alert("Request accepted — items added to charity inventory");
    setViewOpen(false);
  }

  /* DECLINE REQUEST */
  async function handleDecline() {
    if (!viewRequest) return;
    await fetch(
      `${API_BASE}/api/donation-requests/${viewRequest.donation_request_id}/decline`,
      { method: "POST" }
    );
    alert("Request declined");
    onDelete(viewRequest.donation_request_id);
    setViewOpen(false);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Requests Table */}
      <div className="h-[400px] mb-4">
        <div className="border rounded-lg shadow-md flex flex-col h-full">
          <div className="bg-green-100 p-3 text-lg font-semibold">
            Donation Requests
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead className="bg-green-50">
                <tr>
                  <th className="p-3 text-center">Title</th>
                  <th className="p-3 text-center">Items</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Action</th>
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
                  requests.map((req) => (
                    <tr key={req.donation_request_id} className="border">
                      <td className="p-3 text-center">{req.title}</td>
                      <td className="p-3 text-center">
                        {req._count?.clothing_items ?? 0}
                      </td>
                      <td className="p-3 text-center">{req.status}</td>

                      <td className="p-3 text-center">
                        <button
                          onClick={() => openViewModal(req)}
                          className="text-xs px-3 py-2 border border-blue-400 text-blue-600 rounded-md hover:bg-blue-50"
                        >
                          Open Request
                        </button>
                      </td>
                    </tr>
                  ))}

                {!loading && requests.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center p-4">
                      No donation requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* VIEW REQUEST MODAL WITH IMAGES */}
      {viewOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-lg font-semibold mb-3">
              Items in {viewRequest?.title}
            </h2>

            {viewLoading ? (
              <p>Loading...</p>
            ) : (
              <table className="w-full text-sm border rounded-md overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2">Type</th>
                    <th className="p-2">Size</th>
                    <th className="p-2">Condition</th>
                    <th className="p-2">Images</th>
                  </tr>
                </thead>

                <tbody>
                  {viewItems.map((item) => (
                    <tr key={item.clothing_id} className="border-t">
                      <td className="p-2">{item.type}</td>
                      <td className="p-2">{item.size}</td>
                      <td className="p-2">{item.condition}</td>
                      <td className="p-2 flex gap-2">
                        <img src={item.front_image_url} className="h-20 w-20 object-cover rounded border" />
                        <img src={item.back_image_url} className="h-20 w-20 object-cover rounded border" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* ACTIONS */}
            <div className="flex justify-between mt-5">
              <button
                onClick={() => setViewOpen(false)}
                className="px-3 py-1 rounded-md border text-sm"
              >
                Close
              </button>

              {viewRequest?.status === "PENDING" && (
                <div className="flex gap-2">
                  <button
                    onClick={handleDecline}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                  >
                    Decline Request
                  </button>

                  <button
                    onClick={handleAccept}
                    className="px-3 py-1 bg-green-700 text-white rounded-md hover:bg-green-800 text-sm"
                  >
                    Accept Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* PLACEHOLDER */
function PlaceholderTab({ title }: { title: string }) {
  return (
    <div className="border border-dashed rounded-xl p-8 text-center text-gray-500">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p>Coming soon.</p>
    </div>
  );
}
