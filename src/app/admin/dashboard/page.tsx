"use client";

import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import "@fontsource/kalam";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

// Tabs type
type TabName = "Home" | "Requests" | "Inventory" | "Impact";
const TABS: TabName[] = ["Home", "Requests", "Inventory", "Impact"];

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
    router.push("/"); // redirect to Landing page for Logout function.
  }

  return (
    <div className="flex min-h-screen bg-white relative">
      {/* SIDEBAR */}
      <aside className="bg-green-700 w-64 flex flex-col justify-between fixed left-0 top-0 h-screen">
        <div className="bg-white px-6 py-6">
          <h1 className="text-3xl font-[Kalam] font-bold">
            <span className="text-green-600">S</span>ustain
            <span className="text-green-600">W</span>ear
          </h1>
          <p className="text-xs text-gray-600">
            Give Today. <span className="text-green-600">Sustain Tomorrow.</span>
          </p>
        </div>

        <nav className="flex-1 flex flex-col justify-center space-y-6 text-2xl">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2 text-left transition-colors duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-white text-green-700 font-semibold rounded-l-full shadow-md"
                  : "text-white hover:bg-green-600/70"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/70 py-6 text-center text-white font-semibold">
          <div className="hover:opacity-80 cursor-pointer transition-opacity duration-150">
            Settings
          </div>
          <button
            onClick={handleSignOut}
            className="hover:opacity-80 cursor-pointer mt-2 transition-opacity duration-150"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 p-10 flex-1 bg-white min-h-screen">
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-3xl font-semibold">
              {activeTab === "Home" && "Dashboard Overview"}
              {activeTab === "Requests" && "Charity Requests"}
              {activeTab === "Inventory" && "Inventory"}
              {activeTab === "Impact" && "Impact & Reports"}
            </h2>
            <p className="text-sm text-gray-500">
              Welcome back, Admin. Manage your SustainWear from here.
            </p>
          </div>

          <div className="bg-green-100 text-green-700 p-2 rounded-full">
            <User size={26} />
          </div>
        </div>

        {activeTab === "Home" && <HomeTab />}

        {activeTab === "Requests" && (
        <RequestsTab apps={apps} loading={loading} />
        )}

        {activeTab === "Inventory" && (
          <PlaceholderTab title="Inventory" />
        )}

        {activeTab === "Impact" && (
          <PlaceholderTab title="Impact & Reports" />
        )}
      </main>
    </div>
  );
}

/* ---------- SMALL REUSABLE COMPONENTS ---------- */

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{label}</label>
      <input className="border px-2 py-1 rounded" readOnly value={value} />
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

      window.location.reload(); // can later be replaced with state update
    } catch (err) {
      alert("Error updating application");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="border rounded-lg shadow-md flex flex-col flex-1">
        <div className="bg-green-100 px-4 py-3 font-semibold text-lg border-b">
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
            <table className="w-full">
              <thead className="bg-green-50 border-b">
                <tr>
                  <th className="p-3 text-left">Organisation</th>
                  <th className="p-3 text-left">Contact Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((app) => (
                  <tr key={app.application_id} className="border-b">
                    <td className="p-3">{app.org_name}</td>
                    <td className="p-3">{app.contact_name}</td>
                    <td className="p-3">{app.contact_email}</td>
                    <td className="p-3 text-center">{app.status}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => openModal(app)}
                        className="bg-green-600 text-white px-4 py-1 rounded cursor-pointer
                                   hover:bg-green-700 transition-colors duration-200"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* MODAL, now owned by RequestsTab */}
      {modalOpen && selected && (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={closeModal}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-green-50 border-b rounded-xl">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Charity Application
              </h3>
              <p className="text-sm text-gray-600">
                {selected.org_name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 uppercase tracking-wide">
                {selected.status}
              </span>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl leading-none cursor-pointer"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Organisation" value={selected.org_name} />
              <Field label="Charity Number" value={selected.charity_number || "N/A"} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Contact Name" value={selected.contact_name} />
              <Field label="Contact Email" value={selected.contact_email} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Contact Number" value={selected.contact_number} />
              <Field label="Website" value={selected.website || "N/A"} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm">Organisation Address</label>
              <textarea
                className="border rounded px-2 py-1 text-sm bg-gray-50"
                readOnly
                rows={3}
                value={selected.org_address}
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-6 py-4 border-t bg-gray-50 rounded-xl">
            <button
              onClick={closeModal}
              className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Close
            </button>

            <div className="flex gap-3">
              <button
                disabled={saving}
                onClick={() => handleDecision("DENY")}
                className="text-sm border border-red-500 text-red-600 px-5 py-2 rounded hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                Deny
              </button>
              <button
                disabled={saving}
                onClick={() => handleDecision("APPROVE")}
                className="text-sm bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
    <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Dashboard Overview (Coming Soon)
      </h3>
      <p className="text-sm">
        Here you can later show stats like total charities, donations, and impact.
      </p>
    </div>
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
