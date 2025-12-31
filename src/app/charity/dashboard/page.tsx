"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/UI/dashboard-layout";
import type { DonationRequest } from "@/types/donation";
import { CharityHomeTab } from "./components/CharityHomeTab";
import { CharityDonationsTab } from "./components/CharityDonationsTab";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

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

type TabName = "Home" | "Donations" | "Inventory";
const TABS: TabName[] = ["Home", "Donations", "Inventory"];

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
          console.error(
            "Expected array from /api/charity/donations, got:",
            data
          );
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
      mainScrollable={false}
      settingsHref="/charity/settings"
    >
      {activeTab === "Home" && (
        <CharityHomeTab analytics={analytics} loading={analyticsLoading} />
      )}

      {activeTab === "Donations" && (
        <CharityDonationsTab
          apiBase={API_BASE}
          requests={requests}
          loading={loading}
          setRequests={setRequests}
        />
      )}

      {activeTab === "Inventory" && (
        <div className="border rounded-xl p-6 text-center text-gray-400">
          <h3 className="text-lg font-semibold">Inventory</h3>
          <p>Coming soon.</p>
        </div>
      )}
    </DashboardLayout>
  );
}
