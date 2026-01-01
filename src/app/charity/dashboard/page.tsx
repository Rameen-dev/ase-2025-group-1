"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/UI/dashboard-layout";
import type { DonationRequest } from "@/types/donation";
import { CharityInventoryTab } from "./tabs/CharityInventoryTab";
import { CharityHomeTab } from "./tabs/CharityHomeTab";
import { CharityDonationsTab } from "./tabs/CharityDonationsTab";
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

      //bug fix where charity analytics API sometimes returns non-JSON errors
      //read as plain text first to handle non-JSON errors
      const text = await res.text();

      //try parse plain text as JSON
      let json: any = null;
      try {
        //if text is non-null parse it as JSON
        json = text ? JSON.parse(text) : null;
        //if text is empty, json remains null
      } catch {
        console.error("Charity analytics returned NON-JSON response", {
          status: res.status,
          bodyPreview: text.slice(0, 300),
        });
        //bail out on JSON parse error
        setAnalytics(null);
        return;
      }

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
