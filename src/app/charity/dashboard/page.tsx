"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/UI/dashboard-layout";
import type { DonationRequest } from "@/types/donation";
import { CharityInventoryTab } from "./components/CharityInventoryTab";
import { CharityHomeTab } from "./components/CharityHomeTab";
import { CharityDonationsTab } from "./components/CharityDonationsTab";
import { AccountSettings } from "@/components/settings/AccountSettings";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

// Tabs now include Settings
type TabName = "Home" | "Donations" | "Inventory" | "Settings";
const TABS: TabName[] = ["Home", "Donations", "Inventory", "Settings"];

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
          : "Settings";

  return (
    <DashboardLayout
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSignOut={handleSignOut}
      roleLabel="Charity"
      headerTitle={headerTitle}
      mainScrollable={false}
    >
      {activeTab === "Home" && (
        <CharityHomeTab analytics={analytics} loading={analyticsLoading} />
      )}

      {activeTab === "Donations" && (
        <CharityDonationsTab
          requests={requests}
          loading={loading}
          setRequests={setRequests}
          apiBase={API_BASE}
        />
      )}

      {activeTab === "Inventory" && <CharityInventoryTab />}

      {activeTab === "Settings" && <AccountSettings />}
    </DashboardLayout>
  );
}
