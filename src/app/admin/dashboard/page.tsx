"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/UI/dashboard-layout";
import UsersTab from "./components/UsersTab";
import ImpactTab from "./components/ImpactTab";
import InventoryTab from "./components/InventoryTab";
import { AccountSettings } from "@/components/settings/AccountSettings";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

// Tabs type – now includes Settings
type TabName =
  | "Home"
  | "Requests"
  | "Users"
  | "Inventory"
  | "Impact"
  | "Settings";
const TABS: TabName[] = [
  "Home",
  "Requests",
  "Users",
  "Inventory",
  "Impact",
  "Settings",
];

// Prisma model types
type CharityStatus = "PENDING" | "APPROVED" | "REJECTED";

interface CharityApplication {
  application_id: number;
  org_name: string;
  contact_name: string;
  contact_email: string;
  contact_number: string;
  website: string;
  org_address: string;
  charity_number: string | null;
  status: CharityStatus;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabName>("Home");
  const [apps, setApps] = useState<CharityApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Load applications
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/charity-applications`, {
          credentials: "include",
          cache: "no-store",
        });
        const data = await res.json();
        setApps(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading charity applications:", err);
        setApps([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function handleSignOut() {
    router.push("/");
  }

  // Dynamic header title based on active tab
  const headerTitle =
    activeTab === "Home"
      ? "Dashboard Overview"
      : activeTab === "Requests"
        ? "Charity Requests"
        : activeTab === "Users"
          ? "User Management"
          : activeTab === "Inventory"
            ? "Inventory"
            : activeTab === "Impact"
              ? "Impact & Reports"
              : "Settings";

  return (
    <DashboardLayout
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSignOut={handleSignOut}
      roleLabel="Admin"
      headerTitle={headerTitle}
      mainScrollable={true}
    >
      <div className="h-full min-h-0 overflow-y-auto pr-1">
        {activeTab === "Home" && <HomeTab />}

        {activeTab === "Requests" && (
          <RequestsTab apps={apps} loading={loading} />
        )}

        {activeTab === "Users" && <UsersTab />}

        {activeTab === "Inventory" && <InventoryTab />}

        {activeTab === "Impact" && <ImpactTab />}

        {activeTab === "Settings" && <AccountSettings />}
      </div>
    </DashboardLayout>
  );
}

/* ---------- SMALL REUSABLE COMPONENTS ---------- */

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-sm">{label}</label>
      <input
        className="border px-2 py-1 rounded text-sm"
        readOnly
        value={value}
      />
    </div>
  );
}

function RequestsTab({
  apps,
  loading,
}: {
  apps: CharityApplication[];
  loading: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<CharityApplication | null>(null);
  const [saving, setSaving] = useState(false);
  const isLocked = selected?.status !== "PENDING";

  function openModal(app: CharityApplication) {
    setSelected(app);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelected(null);
  }

  async function handleDecision(action: "APPROVE" | "DENY") {
    if (!selected) return;

    try {
      setSaving(true);

      const res = await fetch(
        `${API_BASE}/api/charity-applications/${selected.application_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ action }),
        }
      );

      if (!res.ok) throw new Error();

      // simple refresh to reflect latest status
      window.location.reload();
    } catch (err) {
      alert("Error updating application");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="border rounded-lg shadow-md flex flex-col flex-1 overflow-hidden">
        <div className="bg-green-100 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-base sm:text-lg border-b">
          Charity Application Requests
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="py-20 text-center text-gray-500">Loading…</div>
          ) : apps.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              No applications found yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-green-50 border-b">
                  <tr>
                    <th className="p-3 text-left text-sm">Organisation</th>
                    <th className="p-3 text-left text-sm">Contact</th>
                    <th className="p-3 text-left text-sm">Email</th>
                    <th className="p-3 text-center text-sm">Status</th>
                    <th className="p-3 text-center text-sm">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {apps.map((a) => (
                    <tr key={a.application_id} className="border-b">
                      <td className="p-3 text-sm">{a.org_name}</td>
                      <td className="p-3 text-sm">{a.contact_name}</td>
                      <td className="p-3 text-sm break-all">
                        {a.contact_email}
                      </td>
                      <td className="p-3 text-center text-sm">{a.status}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => openModal(a)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && selected && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeModal}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl border max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between px-6 py-4 bg-green-50 border-b rounded-t-xl">
                <div>
                  <h3 className="text-lg font-semibold">Charity Application</h3>
                  <p className="text-sm text-gray-600">{selected.org_name}</p>
                </div>

                <button
                  onClick={closeModal}
                  className="text-2xl text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-4 text-sm">
                <Field label="Organisation" value={selected.org_name} />
                <Field
                  label="Charity Number"
                  value={selected.charity_number || "N/A"}
                />
                <Field label="Contact" value={selected.contact_name} />
                <Field label="Email" value={selected.contact_email} />
                <Field label="Phone" value={selected.contact_number} />
                <Field label="Website" value={selected.website || "N/A"} />
                <Field label="Address" value={selected.org_address} />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t bg-gray-50 px-6 py-4 rounded-b-xl">
                <span className="text-sm text-gray-600">
                  Current status:{" "}
                  <span className="font-semibold">{selected.status}</span>
                </span>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    disabled={saving || isLocked}
                    onClick={() => handleDecision("DENY")}
                    className="text-sm border border-red-500 text-red-600 px-5 py-2 rounded hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto"
                  >
                    Deny
                  </button>
                  <button
                    disabled={saving || isLocked}
                    onClick={() => handleDecision("APPROVE")}
                    className="text-sm bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Home tab (read-only dashboard)
function HomeTab() {
  const [data, setData] = useState<{
    totalDonations: number;
    actionRequired: {
      pendingApplications: number;
      pendingRequests: number;
      unverifiedUsers: number;
    };
    recentActivity: {
      event_id: number;
      event_type: string;
      actor_type: string;
      created_on: string;
    }[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadDashboard() {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch("/api/admin/dashboard", { cache: "no-store" });
      if (!res.ok) {
        setError(`Dashboard request failed (${res.status})`);
        setData(null);
        return;
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("dashboard load failed:", err);
      setError("Could not load dashboard data.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  if (error) {
    return (
      <div className="space-y-3">
        <div>{error}</div>
        <button
          onClick={loadDashboard}
          className="border rounded px-3 py-2 text-sm"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!data) return <div>No dashboard data.</div>;

  const nothingUrgent =
    data.actionRequired.pendingApplications === 0 &&
    data.actionRequired.pendingRequests === 0 &&
    data.actionRequired.unverifiedUsers === 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={loadDashboard}
          className="border rounded px-3 py-2 text-sm"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total donations" value={data.totalDonations} />
        <Card title="Pending applications" value={data.actionRequired.pendingApplications} />
        <Card title="Pending requests" value={data.actionRequired.pendingRequests} />
        <Card title="Unverified users" value={data.actionRequired.unverifiedUsers} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Action required</h2>

          {nothingUrgent ? (
            <p className="text-sm text-gray-600">Nothing urgent.</p>
          ) : (
            <ul className="space-y-2">
              {data.actionRequired.pendingApplications > 0 && (
                <li className="flex justify-between border p-2 rounded">
                  <span>Pending charity applications</span>
                  <span>{data.actionRequired.pendingApplications}</span>
                </li>
              )}
              {data.actionRequired.pendingRequests > 0 && (
                <li className="flex justify-between border p-2 rounded">
                  <span>Pending donation requests</span>
                  <span>{data.actionRequired.pendingRequests}</span>
                </li>
              )}
              {data.actionRequired.unverifiedUsers > 0 && (
                <li className="flex justify-between border p-2 rounded">
                  <span>Unverified users</span>
                  <span>{data.actionRequired.unverifiedUsers}</span>
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Recent activity</h2>

          {data.recentActivity.length === 0 ? (
            <p className="text-sm text-gray-600">No recent activity.</p>
          ) : (
            <ul className="space-y-2">
              {data.recentActivity.map((e) => (
                <li key={e.event_id} className="border p-2 rounded">
                  <div className="font-medium">{e.event_type}</div>
                  <div className="text-sm text-gray-600">
                    {e.actor_type} • {new Date(e.created_on).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}
