"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/UI/dashboard-layout";
import CreateDonationRequestModal from "@/components/modals/donationRequestModal";
import ViewDonationItemsModal from "@/components/modals/viewDonationRequestModal"
import { DeleteDonationRequestModal } from "@/components/modals/confirmMessageModal";
import type { DonationRequest } from "@/types/donation";
import DonorImpactCards from "@/components/donor/DonorImpactCards";


// base URL for API requests, allowing the client to switch from dev/staging/prod
// if missing, it falls back to " ", which prevents code to crash
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

// sidebar tabs
type TabName = "Home" | "Donations" | "Inventory";
const TABS: TabName[] = ["Home", "Donations", "Inventory"];

// properties required by the Donations tab/component. Includes the list of
// donation requests to display, loading state, and callbacks that the parent
// provides for handling create/delete actions.
type DonationsProps = {
  title: string;
  apps: DonationRequest[];
  loading: boolean;
  analytics: DonorAnalytics | null;
  analyticsLoading: boolean;
  onCreated: (req: DonationRequest) => void;
  onDelete: (id: number) => void;
};


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

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState<TabName>("Home"); //tracks which dashboard is currently selected, always "Home" by default
  const [apps, setApps] = useState<DonationRequest[]>([]); //holds list of donation requests fetched by the API
  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] = useState<DonorAnalytics | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  const router = useRouter();

  async function fetchWithAuth(url: string, options?: RequestInit) {
  const res = await fetch(url, { credentials: "include", ...options });

  if (res.status === 401) {
    // Kill the session properly (DB + cookie)
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });

    // Send user away
    router.push("/"); // 
    throw new Error("Unauthorised");
  }
  return res;
}

// Loads the donor analytics from /api/donor/analytics.
async function refreshAnalytics() {
  try {
    // Turn on loading state
    setAnalyticsLoading(true);

    // Fetch analytics securely (includes cookie and handles 401)
    const res = await fetchWithAuth(`${API_BASE}/api/donor/analytics`, {
      // no-store forces fresh data each time (important for live dashboards)
      cache: "no-store",
    });

    // If server returns a non-200 status, we treat it as a failure
    if (!res.ok) {
      console.error("Failed to fetch donor analytics:", res.status);
      setAnalytics(null); // clear analytics so UI can show fallback message
      return;
    }
    const json = await res.json();

    // Save into state, react rerenders the dashboard automatically
    setAnalytics(json);
  } catch (err) {
    // This catches network issues
    console.error("Error loading donor analytics:", err);
    setAnalytics(null);
  } finally {
    // Always stop loading state whether success or fail
    setAnalyticsLoading(false);
  }
}


  //fetch all donation requests
  useEffect(() => {
    async function load() {
      try {
        setLoading(true); //while fetching show loading state
        const res = await fetchWithAuth(`${API_BASE}/api/donation-requests`, {
          cache: "no-store",
        });

        if (!res.ok) {
          console.error("Failed to fetch donation requests: ", res.status);
          setApps([]);
          return;
        }

        const data = await res.json();

        if (!Array.isArray(data)) {

          console.error("Expected array of donation requests, got:", data);
          setApps([]);
          return;
        }
        setApps(data); //stores fetched donation requests in "apps"
      } catch (err) {
        console.error("Error loading donation requests:", err);
        setApps([]);
      } finally {
        setLoading(false); //stop loading state
      }
    }
    load();
  }, []);

  useEffect(() => {
  refreshAnalytics();
}, []);

  function handleSignOut() {
    router.push("/"); // redirect user to landing page when logging out
  }

  //sets title of the header bar based on active tab
  const headerTitle = activeTab === "Home" ? "Dashboard Overview" : activeTab === "Donations" ? "Donations"
    : activeTab === "Inventory" ? "Inventory"
      : "Impact & Reports";

  return (
    //dashboard lauout component inside components/UI
    <DashboardLayout
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSignOut={handleSignOut}
      roleLabel="Donor"
      headerTitle={headerTitle}
    >
    {activeTab === "Home" && (
      <HomeTab analytics={analytics} loading={analyticsLoading} />
    )}

      {activeTab === "Donations" && (
      <Donations
        title="Donations"
        apps={apps}
        loading={loading}
        analytics={analytics}
        analyticsLoading={analyticsLoading}
        onCreated={(newReq) => {
          // 1) Update donation requests immediately
          setApps((prev) => [newReq, ...prev]);

          // 2) Refresh analytics so Recent Activity updates
          refreshAnalytics();
        }}
        onDelete={(id) => {
          // 1) Update donation requests immediately
          setApps((prev) =>
            prev.filter((a) => a.donation_request_id !== id)
          );

          // 2) Refresh analytics
          refreshAnalytics();
        }}
      />

      )}

      {activeTab === "Inventory" && (
        <PlaceholderTab title="Inventory" />
      )}
    </DashboardLayout>
  );
}
function HomeTab({
  analytics,
  loading,
}: {
  analytics: DonorAnalytics | null;
  loading: boolean;
}) {
  return (
    <div className="h-1/2 space-y-6">
      {/* TOP: Donor impact summary */}
      <div className="border h-full border-gray-200 rounded-xl p-8 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Your Sustainability Impact
        </h3>
        <DonorImpactCards />
      </div>

      {/* BOTTOM ROW */}
      <div className="relative flex h-full gap-6">
        {/* Left: Recent activity */}
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
                    {formatEventLabel(e.event_type)}
                    {e.donation_request_id ? ` — Request #${e.donation_request_id}` : ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(e.created_on).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Quick stats */}
        <div className="w-1/2 border border-gray-200 rounded-xl p-8 bg-white">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Your Donation Stats
          </h3>

          {loading && <p className="text-gray-500">Loading stats...</p>}

          {!loading && analytics && (
            <div className="space-y-3 text-sm text-gray-700">
              <p>Total Requests: <b>{analytics.totals.totalRequests}</b></p>
              <p>Total Items: <b>{analytics.totals.totalItems}</b></p>
              <p>Acceptance Rate: <b>{analytics.totals.acceptanceRate}%</b></p>
              <p>Completed Donations: <b>{analytics.totals.completedDonations}</b></p>
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

function formatEventLabel(eventType: string) {
  switch (eventType) {
    case "REQUEST_CREATED":
      return "You created a donation request";

    case "REQUEST_APPROVED":
      return "A charity accepted your donation";

    case "REQUEST_REJECTED":
      return "A charity declined your donation request";

    default:
      return eventType.replaceAll("_", " ");
  }
}

function Donations({ title, apps, loading, analytics, analyticsLoading, onCreated, onDelete }: DonationsProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<DonationRequest | null>(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewRequest, setViewRequest] = useState<DonationRequest | null>(null);
  const [viewItems, setViewItems] = useState<ClothingItemView[]>([]);

  const [createOpen, setCreateOpen] = useState(false);

  type ClothingItemView = {
    clothing_id: number;
    type: string;
    size: string;
    status: string;
    condition: string;
  };


  async function handleOpenView(app: DonationRequest) {
    setViewRequest(app);
    setViewOpen(true);
    setViewLoading(true);

    try {
      const res = await fetch(
        `${API_BASE}/api/donation-requests/${app.donation_request_id}/items`
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
        `${API_BASE}/api/donation-requests/${itemToDelete.donation_request_id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error();

      onDelete(itemToDelete.donation_request_id); // update UI locally

      setDeleteOpen(false);
      setItemToDelete(null);
    } catch (err) {
      alert("Error deleting donation request");
    }
  }

  return (
    <div className="flex flex-col h-full">

      {/* top row of the table */}
      <div className="h-[400px] mb-4">
        <div className="border rounded-lg shadow-md flex flex-col h-full">
          <div className="bg-green-100 px-4 py-3 font-semibold text-lg border-1 flex items-center justify-between">
            <span>{title}</span>
            <button
              onClick={() => setCreateOpen(true)}
              className="text-sm px-3 py-1 rounded-md bg-green-700 text-white hover:bg-green-800"
            >
              + New Request
            </button>
          </div>

          {/* donation reqeusts table */}
          <div className="flex-1 overflow-auto">
            <div>

              <table className="w-full">
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
                      <td colSpan={4} className="p-3 text-center">
                        Loading...
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    apps.map((app) => {
                      const isApproved = app.status === "APPROVED";
                      const isRejected = app.status === "REJECTED";

                      const rowBg = isApproved ? "bg-green-50" : isRejected ? "bg-red-50" : "";
                      const statusText = isApproved ? "text-green-700 font-semibold" : isRejected ? "text-red-600 font-semibold" : "text-gray-700";

                      return (
                        <tr key={app.donation_request_id} className={`border ${rowBg} ${statusText}`}>
                          <td className="p-3 text-center text-xl text-black font-bold">{app.title}</td>
                          <td className="p-3 text-center">
                            {app._count?.ClothingItems ?? 0}
                          </td>
                          <td className="p-3 text-center">{app.status}</td>
                          <td className="p-3 text-center">{app.createdAgo}</td>
                          <td className="p-3 text-center flex justify-center gap-2">

                            {/* view button to display items in the donation */}
                            <button
                              onClick={() => handleOpenView(app)}
                              className="text-xs px-3 py-2 rounded-md border border-blue-300 text-blue-600 hover:bg-blue-50"
                            >
                              View
                            </button>

                            {/* if donation request is in pending, display a remove button
                            when donation request is accepted, remove button doesn't show*/}
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
                    })
                  }

                  {!loading && apps.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-3 text-center">
                        No donation requests yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* bottom half of the dashboard */}
      <div className="flex-1 flex gap-4">

        <div className="flex flex-1 border border-blue-700 rounded-xl p-8 text-center items-center justify-center">
          *TOTAL ITEMS DONATED*
        </div>

        <div className="flex flex-1 border border-blue-700 rounded-xl p-8 text-center items-center justify-center">
          *TO BE DECIDED*
        </div>

      </div>

      {/* create donation request modal */}
      <CreateDonationRequestModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(req) => onCreated(req)}
      />

      {/* displays items of a donation request */}
      <ViewDonationItemsModal
        isOpen={viewOpen}
        onClose={() => setViewOpen(false)}
        requestTitle={viewRequest?.title}
        loading={viewLoading}
        items={viewItems}
      />

      {/* confirm delete donation message */}
      <DeleteDonationRequestModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={itemToDelete?.title}
      />
    </div >
  );
}

function PlaceholderTab({ title }: { title: string }) {
  return (
    <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-sm">
        This section is not built yet. You can describe what will go here in your documentation.
      </p>
    </div>
  );
}
