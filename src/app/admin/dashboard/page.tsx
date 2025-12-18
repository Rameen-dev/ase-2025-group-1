"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/UI/dashboard-layout";
import UsersTab from "./components/UsersTab";
import ImpactTab from "./components/ImpactTab";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

// Tabs type
type TabName = "Home" | "Requests" | "Users" | "Inventory" | "Impact";
const TABS: TabName[] = ["Home", "Requests", "Users", "Inventory", "Impact"];

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
        const res = await fetch(`${API_BASE}/api/charity-applications`);
        const data = await res.json();
        setApps(data);
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
            : "Impact & Reports";

  return (
    <DashboardLayout
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSignOut={handleSignOut}
      roleLabel="Admin"
      headerTitle={headerTitle}
    >
      {/* ADMIN ONLY: allow scrolling inside dashboard content */}
      <div className="h-full min-h-0 overflow-y-auto pr-1">
        {activeTab === "Home" && <HomeTab />}

        {activeTab === "Requests" && (
          <RequestsTab apps={apps} loading={loading} />
        )}

        {activeTab === "Users" && <UsersTab />}

        {activeTab === "Inventory" && <PlaceholderTab title="Inventory" />}

        {activeTab === "Impact" && <ImpactTab />}
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
          body: JSON.stringify({ action }),
        }
      );

      if (!res.ok) throw new Error();

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
                    <th className="p-2 sm:p-3 text-left text-sm">
                      Organisation
                    </th>
                    <th className="p-2 sm:p-3 text-left text-sm">
                      Contact Name
                    </th>
                    <th className="p-2 sm:p-3 text-left text-sm">Email</th>
                    <th className="p-2 sm:p-3 text-center text-sm">Status</th>
                    <th className="p-2 sm:p-3 text-center text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.map((app) => (
                    <tr key={app.application_id} className="border-b">
                      <td className="p-2 sm:p-3 text-sm">{app.org_name}</td>
                      <td className="p-2 sm:p-3 text-sm">{app.contact_name}</td>
                      <td className="p-2 sm:p-3 text-sm break-all">
                        {app.contact_email}
                      </td>
                      <td className="p-2 sm:p-3 text-center text-sm">
                        {app.status}
                      </td>
                      <td className="p-2 sm:p-3 text-center">
                        <button
                          onClick={() => openModal(app)}
                          className="bg-green-600 text-white px-3 sm:px-4 py-1 rounded cursor-pointer text-sm
                                     hover:bg-green-700 transition-colors duration-200"
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
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl border border-gray-100 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-green-50 border-b rounded-t-xl">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Charity Application
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {selected.org_name}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xs px-2 sm:px-3 py-1 rounded-full bg-gray-100 text-gray-700 uppercase tracking-wide">
                    {selected.status}
                  </span>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <Field label="Organisation" value={selected.org_name} />
                  <Field
                    label="Charity Number"
                    value={selected.charity_number || "N/A"}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <Field label="Contact Name" value={selected.contact_name} />
                  <Field label="Contact Email" value={selected.contact_email} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <Field
                    label="Contact Number"
                    value={selected.contact_number}
                  />
                  <Field label="Website" value={selected.website || "N/A"} />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-sm">
                    Organisation Address
                  </label>
                  <textarea
                    className="border rounded px-2 py-1 text-sm bg-gray-50"
                    readOnly
                    rows={3}
                    value={selected.org_address}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t bg-gray-50 rounded-b-xl">
                <button
                  onClick={closeModal}
                  className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer text-center sm:text-left"
                >
                  Close
                </button>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    disabled={saving || isLocked}
                    onClick={() => handleDecision("DENY")}
                    className="text-sm border border-red-500 text-red-600 px-5 py-2 rounded 
                    hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto"
                  >
                    Deny
                  </button>
                  <button
                    disabled={saving || isLocked}
                    onClick={() => handleDecision("APPROVE")}
                    className="text-sm bg-green-600 text-white px-5 py-2 rounded 
                    hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto"
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

function HomeTab() {
  return (
    <div className="border border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center text-gray-500">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
        Dashboard Overview (Coming Soon)
      </h3>
      <p className="text-xs sm:text-sm">
        Here you can later show stats like total charities, donations, and
        impact.
      </p>
    </div>
  );
}

function PlaceholderTab({ title }: { title: string }) {
  return (
    <div className="border border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center text-gray-500">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm">
        This section is not built yet. You can describe what will go here in
        your documentation.
      </p>
    </div>
  );
}
