"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/UI/dashboard-layout";
import type { DonationRequest } from "@/types/donation";
import CharityViewDonationRequest from "@/components/modals/charityViewDonationRequestModal";


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
  const [viewRequest, setViewRequest] = useState<DonationRequest | null>(null);


  // Open modal and load items for a request
  function openView(req: DonationRequest) {
    setViewRequest(req);
    setViewOpen(true);
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

      <CharityViewDonationRequest
        isOpen={viewOpen}
        request={viewRequest}
        onClose={() => {
          setViewOpen(false);
          setViewRequest(null);
        }}
        setRequests={setRequests}
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
