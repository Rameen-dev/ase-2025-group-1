"use client";

import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import "@fontsource/kalam";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

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
  const [activeTab, setActiveTab] = useState("Requests");
  const [apps, setApps] = useState<CharityApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<CharityApplication | null>(null);
  const [saving, setSaving] = useState(false);

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

  function openModal(app: CharityApplication) {
    setSelected(app);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelected(null);
  }

  // APPROVE or DENY
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

      window.location.reload(); // reload after DB update
    } catch (err) {
      alert("Error updating application");
    } finally {
      setSaving(false);
    }
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
          {["Home", "Requests", "Inventory", "Impact"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2 text-left ${
                activeTab === tab
                  ? "bg-white text-green-700 font-semibold rounded-l-full"
                  : "text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/70 py-6 text-center text-white font-semibold">
          <div className="hover:opacity-80 cursor-pointer">Settings</div>
          <div className="hover:opacity-80 cursor-pointer mt-2">Log Out</div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 p-10 flex-1 bg-white min-h-screen">
        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-semibold">Welcome Back, Admin!</h2>
          <div className="bg-green-100 text-green-700 p-2 rounded-full">
            <User size={26} />
          </div>
        </div>

        {/* REQUESTS PAGE */}
        <div className="border rounded-lg shadow-md flex flex-col flex-1">
          <div className="bg-green-100 px-4 py-3 font-semibold text-lg border-b">
            Charity Application Requests
          </div>

          <div className="flex-1 overflow-auto">
            {loading ? (
              <div className="py-20 text-center text-gray-500">Loading…</div>
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
                          className="bg-green-600 text-white px-4 py-1 rounded"
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
      </main>

      {/* MODAL */}
      {modalOpen && selected && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeModal}
          />{" "}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-2xl w-[650px]">
              <div className="bg-green-100 py-3 text-center font-semibold border-b">
                Charity Application
              </div>

              <div className="grid grid-cols-2 gap-6 p-6 text-sm">
                <Field label="Organisation" value={selected.org_name} />
                <Field label="Contact Name" value={selected.contact_name} />
                <Field label="Contact Email" value={selected.contact_email} />
                <Field label="Contact Number" value={selected.contact_number} />
                <Field label="Charity Number" value={selected.charity_number || ""} />
                <Field label="Website" value={selected.website} />

                <div className="col-span-2">
                  <label className="font-semibold">Organisation Address</label>
                  <textarea
                    className="border w-full rounded px-2 py-1"
                    readOnly
                    value={selected.org_address}
                  />
                </div>
              </div>

              <div className="flex justify-center gap-10 py-6 border-t">
                <button
                  disabled={saving}
                  onClick={() => handleDecision("APPROVE")}
                  className="bg-green-600 text-white px-10 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  disabled={saving}
                  onClick={() => handleDecision("DENY")}
                  className="bg-red-600 text-white px-10 py-2 rounded"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Small reusable field component
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold">{label}</label>
      <input className="border px-2 py-1 rounded" readOnly value={value} />
    </div>
  );
}
