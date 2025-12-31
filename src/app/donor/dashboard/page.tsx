"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/UI/dashboard-layout";
import type { DonationRequest } from "@/types/donation";
import DonorImpactCards from "@/components/donor/DonorImpactCards";
import { DonorHomeTab } from "./components/DonorHomeTab";
import { DonorDonationsTab } from "./components/DonorDonationsTab";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

// Sidebar tabs for donor
type TabName = "Home" | "Donations" | "Inventory";
const TABS: TabName[] = ["Home", "Donations", "Inventory"];

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
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabName>("Home");
  const [apps, setApps] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] = useState<DonorAnalytics | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  async function fetchWithAuth(url: string, options?: RequestInit) {
    const res = await fetch(url, { credentials: "include", ...options });

    if (res.status === 401) {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/");
      throw new Error("Unauthorised");
    }

    return res;
  }

  async function refreshAnalytics() {
    try {
      setAnalyticsLoading(true);

      const res = await fetchWithAuth(`${API_BASE}/api/donor/analytics`, {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Failed to fetch donor analytics:", res.status);
        setAnalytics(null);
        return;
      }

      const json = await res.json();
      setAnalytics(json);
    } catch (err) {
      console.error("Error loading donor analytics:", err);
      setAnalytics(null);
    } finally {
      setAnalyticsLoading(false);
    }
  }

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
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

        setApps(data);
      } catch (err) {
        console.error("Error loading donation requests:", err);
        setApps([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  useEffect(() => {
    refreshAnalytics();
  }, []);

  function handleSignOut() {
    router.push("/");
  }

  const headerTitle =
    activeTab === "Home"
      ? "Dashboard Overview"
      : activeTab === "Donations"
        ? "Donations"
        : activeTab === "Inventory"
          ? "Inventory"
          : "Impact & Reports";

  return (
    <DashboardLayout
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSignOut={handleSignOut}
      roleLabel="Donor"
      headerTitle={headerTitle}
      mainScrollable={false}
      settingsHref="/donor/settings"
    >
      {activeTab === "Home" && (
        <DonorHomeTab analytics={analytics} loading={analyticsLoading} />
      )}

      {activeTab === "Donations" && (
        <DonorDonationsTab
          title="Donations"
          apps={apps}
          loading={loading}
          analytics={analytics}
          analyticsLoading={analyticsLoading}
          apiBase={API_BASE}
          onCreated={(newReq) => {
            setApps((prev) => [newReq, ...prev]);
            refreshAnalytics();
          }}
          onDelete={(id) => {
            setApps((prev) => prev.filter((a) => a.donation_request_id !== id));
            refreshAnalytics();
          }}
        />
      )}

      {activeTab === "Inventory" && (
        <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Inventory
          </h3>
          <p className="text-sm">
            This section is not built yet. You can describe what will go here in
            your documentation.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
