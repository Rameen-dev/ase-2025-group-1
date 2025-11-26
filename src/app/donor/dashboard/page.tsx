"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

type TabName = "Home" | "Donations" | "Inventory" | "Impact";
const TABS: TabName[] = ["Home", "Donations", "Inventory", "Impact"];

type DonationRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

type ClothingType = "JACKET" | "PANTS" | "SHIRT" | "SHOES" | "OTHER";
type ClothingSize = "XS" | "S" | "M" | "L" | "XL";
type ClothingCondition = "NEW" | "GOOD" | "WORN";

type ClothingItemRow = {
  id: number;
  type: ClothingType;
  size: ClothingSize;
  condition: ClothingCondition;
};

interface DonationRequest {
  donation_request_id: number;
  title: string;
  status: DonationRequestStatus;
  _count: {
    clothing_items: number;
  };
}

type DonationsProps = {
  title: string;
  apps: DonationRequest[];
  loading: boolean;
  onCreated: (req: DonationRequest) => void;
  onDelete: (id: number) => void;
};

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState<TabName>("Home");
  const [apps, setApps] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/donation-requests`);
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
    <div className="flex h-screen bg-white overflow-hidden relative">
      {/* SIDEBAR */}
      <button
        className={`
    md:hidden
    fixed top-4 left-4 z-50
    p-2 rounded-md border border-gray-300 bg-white
    transform transition-transform duration-200
    ${isSidebarOpen ? "translate-x-64" : "translate-x-0"}
  `}
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {/* Simple hamburger icon */}
        <div className="w-5 h-0.5 bg-black mb-1" />
        <div className="w-5 h-0.5 bg-black mb-1" />
        <div className="w-5 h-0.5 bg-black" />
      </button>

      <aside
        className={`
    bg-green-700 w-64 flex flex-col justify-between
    fixed inset-y-0 left-0
    transform transition-transform duration-200 z-40
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
      >
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
              onClick={() => { setActiveTab(tab); setIsSidebarOpen(false); }}
              className={`px-8 py-2 text-left transition-colors duration-200 cursor-pointer ${activeTab === tab
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
      <main className="flex-1 bg-white md:ml-64 p-4 md:p-10 overflow-y-auto mt-10 md:mt-0">
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-3xl font-semibold">
              {activeTab === "Home" && "Dashboard Overview"}
              {activeTab === "Donations" && "Donations"}
              {activeTab === "Inventory" && "Inventory"}
              {activeTab === "Impact" && "Impact & Reports"}
            </h2>
            <p className="text-sm text-gray-500">
              Welcome back, Donor. Manage your SustainWear from here.
            </p>
          </div>

          <div className="bg-green-100 text-green-700 p-2 rounded-full">

          </div>
        </div>

        {activeTab === "Home" && <HomeTab />}

        {activeTab === "Donations" && (
          <Donations
            title="Donations"
            apps={apps}
            loading={loading}
            onCreated={(newReq) =>
              setApps((prev) => [newReq, ...prev]) // add new one at top
            }
            onDelete={(id) =>
              setApps(prev => prev.filter(a => a.donation_request_id !== id))
            }
          />
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

function HomeTab() {
  return (
    <div className="h-1/2">
      <div className="border border-dashed h-full border-gray-300 rounded-xl p-8 text-center text-gray-500">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Dashboard Overview (Coming Soon)
        </h3>
        <p className="text-sm">
          Here you can later show stats like total charities, donations, and impact.
        </p>
      </div>

      <div className="relative flex h-full">
        <div className="w-1/2 border border-dashed border-red-300  rounded-xl p-8 text-center text-gray-500">

        </div>

        <div className="w-full border border-dashed border-red-300  rounded-xl p-8 text-center text-gray-500">

        </div>


      </div>
    </div>

  );
}

function Donations({ title, apps, loading, onCreated, onDelete }: DonationsProps) {         // existing (view)
  const [selected, setSelected] = useState<DonationRequest | null>(null);
  const isLocked = selected?.status !== "PENDING";

  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);

  const [items, setItems] = useState<ClothingItemRow[]>([
    {
      id: Date.now(),
      type: "JACKET",
      size: "M",
      condition: "GOOD",
    },
  ]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    if (items.length === 0) return;

    try {
      setCreating(true);

      const res = await fetch(`${API_BASE}/api/donation-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          items: items.map(({ id, ...rest }) => rest), // strip frontend-only id
        }),
      });

      if (!res.ok) throw new Error("Failed to create");

      const created: DonationRequest = await res.json();

      onCreated(created); // updates the Donation Requests table (title, status)

      // reset form
      setNewTitle("");
      setItems([
        {
          id: Date.now(),
          type: "JACKET",
          size: "M",
          condition: "GOOD",
        },
      ]);
      setCreateOpen(false);
    } catch (err) {
      alert("Error creating donation request");
    } finally {
      setCreating(false);
    }
  }

  async function handleRemove(app: DonationRequest) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this donation request?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${API_BASE}/api/donation-requests/${app.donation_request_id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete");

      onDelete(app.donation_request_id); // update UI
    } catch (err) {
      alert("Error deleting donation request");
    }
  }

  function addItemRow() {
    setItems(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(), // just to make id unique
        type: "JACKET",
        size: "M",
        condition: "GOOD",
      },
    ]);
  }

  function removeItemRow(id: number) {
    setItems(prev => prev.filter(item => item.id !== id));
  }

  function updateItem(
    id: number,
    field: "type" | "size" | "condition",
    value: string
  ) {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }

  return (
    <div className="border rounded-lg shadow-md flex flex-col flex-1">
      {/* HEADER WITH BUTTON */}
      <div className="bg-green-100 px-4 py-3 font-semibold text-lg border-b flex items-center justify-between">
        <span>{title}</span>
        <button
          onClick={() => setCreateOpen(true)}
          className="text-sm px-3 py-1 rounded-md bg-green-700 text-white hover:bg-green-800"
        >
          + New Request
        </button>
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border border-amber-600 border-dashed">
          <thead>
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-center">Items</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-right">Action</th>
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
              apps.map((app) => (
                <tr key={app.donation_request_id}>
                  <td className="p-3">{app.title}</td>
                  <td className="p-3 text-center">{app._count?.clothing_items ?? 0} </td>
                  <td className="p-3 text-center">{app.status}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleRemove(app)}
                      className="text-xs px-3 py-2 rounded-md border border-red-300 text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

            {!loading && apps.length === 0 && (
              <tr>
                <td colSpan={3} className="p-3 text-center">
                  No donation requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE MODAL */}
      {createOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">
              Create Donation Request
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              {/* TITLE - full width */}
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  placeholder="e.g. Winter jackets for kids"
                />
              </div>

              {/* ITEMS */}
              <div className="mt-2">
                <label className="block text-sm mb-2">Items</label>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row gap-4 items-end"
                    >
                      {/* Type */}
                      <div className="flex-1">
                        <label className="block text-xs mb-1">Type</label>
                        <select
                          value={item.type}
                          onChange={(e) =>
                            updateItem(item.id, "type", e.target.value)
                          }
                          className="border rounded-md px-3 py-2 text-sm bg-white"
                        >
                          <option value="JACKET">Jacket</option>
                          <option value="PANTS">Pants</option>
                          <option value="SHIRT">Shirt</option>
                          <option value="SHOES">Shoes</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>

                      {/* Size */}
                      <div className="flex-1">
                        <label className="block text-xs mb-1">Size</label>
                        <select
                          value={item.size}
                          onChange={(e) =>
                            updateItem(item.id, "size", e.target.value)
                          }
                          className="border rounded-md px-3 py-2 text-sm bg-white"
                        >
                          <option value="XS">XS</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                        </select>
                      </div>

                      {/* Condition */}
                      <div className="flex-1">
                        <label className="block text-xs mb-1">Condition</label>
                        <select
                          value={item.condition}
                          onChange={(e) =>
                            updateItem(item.id, "condition", e.target.value)
                          }
                          className="border rounded-md px-3 py-2 text-sm bg-white"
                        >
                          <option value="NEW">New</option>
                          <option value="GOOD">Good</option>
                          <option value="WORN">Worn</option>
                        </select>
                      </div>

                      {/* Remove button on same row */}
                      <button
                        type="button"
                        onClick={() => removeItemRow(item.id)}
                        className="text-xs px-3 py-2 rounded-md border border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add item button */}
                <button
                  type="button"
                  onClick={addItemRow}
                  className="mt-3 text-sm px-3 py-1 rounded-md border border-dashed border-gray-400 hover:bg-gray-50"
                >
                  + Add item
                </button>
              </div>

              {/* Footer buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateOpen(false)}
                  className="px-3 py-1 text-sm rounded-md border"
                  disabled={creating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-sm rounded-md bg-green-700 text-white disabled:opacity-60"
                  disabled={creating}
                >
                  {creating ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
