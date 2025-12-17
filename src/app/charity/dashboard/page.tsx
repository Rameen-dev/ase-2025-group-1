"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/UI/dashboard-layout";
import type { DonationRequest } from "@/types/donation";
import CharityViewDonationRequest from "@/components/modals/charityViewDonationRequestModal";
import CharityDonationHistoryModal from "@/components/modals/charityDonationHistoryModal";
import ViewDonationItemsModal from "@/components/modals/viewDonationRequestModal";
import CharityImpactCards from "@/components/charity/CharityImpactCards";


type ClothingItem = {
  clothing_id: number;
  type: string;
  size: string;
  condition: string;
  status: string;
  front_image_url?: string;
  back_image_url?: string;
};

type CharityAnalytics = {
  totals: {
    pendingRequests: number;
    reviewedRequests: number;
    acceptedDonations: number;
    acceptedItems: number;
    rejectedItems: number;
  };
  recentEvents: {
    event_id: number;
    event_type: string;
    created_on: string;
    donation_request_id: number | null;
    donation_id: number | null;
    metadata: any;
  }[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

// Tabs
type TabName = "Home" | "Donations" | "Inventory";
const TABS: TabName[] = ["Home", "Donations", "Inventory"];

// Main dashboard
export default function CharityDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabName>("Home");
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<CharityAnalytics | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

async function refreshCharityAnalytics() {
  try {
    setAnalyticsLoading(true);

    const res = await fetch(`${API_BASE}/api/charity/analytics`, {
      credentials: "include",
      cache: "no-store",
    });

    const json = await res.json();

    if (!res.ok) {
      console.error("Failed to fetch charity analytics:", json);
      setAnalytics(null);
      return;
    }

    setAnalytics(json);
  } catch (err) {
    console.error("Error loading charity analytics:", err);
    setAnalytics(null);
  } finally {
    setAnalyticsLoading(false);
  }
}

  useEffect(() => {
    refreshCharityAnalytics();
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/charity/donations`, {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();

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
    {activeTab === "Home" && (
      <HomeTab analytics={analytics} loading={analyticsLoading} />
    )}

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
function HomeTab({
  analytics,
  loading,
}: {
  analytics: CharityAnalytics | null;
  loading: boolean;
}) {
  return (
    <div className="h-1/2 space-y-6">
      {/* TOP: Charity sustainability impact */}
      <div className="border h-full border-gray-200 rounded-xl p-8 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Your Sustainability Impact
        </h3>

        {/* Reuses the same impact logic pattern as donor, but charity-based */}
        <CharityImpactCards />
      </div>

      {/* BOTTOM ROW */}
      <div className="relative flex h-full gap-6">
        {/* Left: Recent charity activity */}
        <div className="w-1/2 border border-gray-200 rounded-xl p-8 bg-white">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>

          {loading && <p className="text-gray-500">Loading activity...</p>}

          {!loading && (!analytics || analytics.recentEvents.length === 0) && (
            <p className="text-gray-500">No activity yet.</p>
          )}

          {!loading && analytics && analytics.recentEvents.length > 0 && (
            <div className="space-y-3">
              {analytics.recentEvents.map((e) => (
                <div key={e.event_id} className="border rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-800">
                    {e.event_type.replaceAll("_", " ")}
                    {e.donation_request_id
                      ? ` — Request #${e.donation_request_id}`
                      : ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(e.created_on).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Charity stats */}
        <div className="w-1/2 border border-gray-200 rounded-xl p-8 bg-white">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Charity Overview
          </h3>

          {loading && <p className="text-gray-500">Loading stats...</p>}

          {!loading && analytics && (
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                Pending Requests:{" "}
                <b>{analytics.totals.pendingRequests}</b>
              </p>
              <p>
                Reviewed Requests:{" "}
                <b>{analytics.totals.reviewedRequests}</b>
              </p>
              <p>
                Accepted Donations:{" "}
                <b>{analytics.totals.acceptedDonations}</b>
              </p>
              <p>
                Accepted Items:{" "}
                <b>{analytics.totals.acceptedItems}</b>
              </p>
              <p>
                Rejected Items:{" "}
                <b>{analytics.totals.rejectedItems}</b>
              </p>
            </div>
          )}

          {!loading && !analytics && (
            <p className="text-gray-500">No analytics data available.</p>
          )}
        </div>
      </div>
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

    try {
      const res = await fetch(`${API_BASE}/api/charity/donations`, {
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

  const pendingRequests = requests.filter(
    (r) => r.status === "PENDING"
  );


  // Open modal and load items for a request
  function openView(req: DonationRequest) {
    setViewRequest(req);
    setViewOpen(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Donation Requests</h2>

        <button
          onClick={() => setHistoryOpen(true)}
          className="text-sm px-3 py-1 rounded-md bg-green-700 text-white hover:bg-green-800"
        >
          View donation history
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden h-[calc(100vh-180px)] flex flex-col">
        <table className="w-full text-sm table-fixed">

          {/* colgroup to make columns align with the headers */}
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
                    <td className="p-3 text-center text-xl text-black font-bold">{r.title}</td>
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

              {!loading && Array.isArray(pendingRequests) && requests.length === 0 && (
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
}
// Inventory placeholder
function PlaceholderTab({ title }: { title: string }) {
  return (
    <div className="border rounded-xl p-6 text-center text-gray-400">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>Coming soon.</p>
    </div>
  );
};
