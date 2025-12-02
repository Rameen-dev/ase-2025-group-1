"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/UI/dashboard-layout";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

type TabName = "Home" | "Donations" | "Inventory";
const TABS: TabName[] = ["Home", "Donations", "Inventory"];

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
    >
      {activeTab === "Home" && <HomeTab />}

      {activeTab === "Donations" && (
        <Donations
          title="Donations"
          apps={apps}
          loading={loading}
          onCreated={(newReq) =>
            setApps((prev) => [newReq, ...prev])
          }
          onDelete={(id) =>
            setApps((prev) =>
              prev.filter((a) => a.donation_request_id !== id)
            )
          }
        />
      )}

      {activeTab === "Inventory" && (
        <PlaceholderTab title="Inventory" />
      )}
    </DashboardLayout>
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
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<DonationRequest | null>(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewRequest, setViewRequest] = useState<DonationRequest | null>(null);
  const [viewItems, setViewItems] = useState<ClothingItemView[]>([]);

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

  type ClothingItemView = {
    clothing_id: number;
    type: string;
    size: string;
    condition: string;
  };

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

  async function handleOpenView(app: DonationRequest) {
    setViewRequest(app);
    setViewOpen(true);
    setViewLoading(true);

    try {
      const res = await fetch(
        `${API_BASE}/api/donation-requests/${app.donation_request_id}/items`
      );

      if (!res.ok) throw new Error("Failed to load items");

      const data: ClothingItemView[] = await res.json();
      setViewItems(data);
    } catch (err) {
      alert("Error loading items for this request");
      setViewItems([]);
    } finally {
      setViewLoading(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!itemToDelete) return;

    try {
      const res = await fetch(
        `${API_BASE}/api/donation-requests/${itemToDelete.donation_request_id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error();

      onDelete(itemToDelete.donation_request_id); // update UI locally

      setDeleteOpen(false);
      setItemToDelete(null);
    } catch (err) {
      alert("Error deleting donation request");
    }
  }

  //In create donation request modal, when pressing "Add item" button
  //Insert new row
  function addItemRow() {
    if (items.length >= 5) return;

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


  function removeItemRow(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }
  return (
    <div className="flex flex-col h-full">

      {/* TOP HALF: TABLE */}
      <div className="h-[400px] mb-4">
        <div className="border rounded-lg shadow-md flex flex-col h-full">

          {/* HEADER WITH BUTTON */}
          <div className="bg-green-100 px-4 py-3 font-semibold text-lg border-1 flex items-center justify-between">
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
            <table className="w-full">
              <thead>
                <tr className="bg-green-50 border rounded-lg">
                  <th className="p-3 text-center">Title</th>
                  <th className="p-3 text-center">Items</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Action</th>
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
                    <tr key={app.donation_request_id} className="border">
                      <td className="p-3 text-center">{app.title}</td>
                      <td className="p-3 text-center">
                        {app._count?.clothing_items ?? 0}
                      </td>
                      <td className="p-3 text-center">{app.status}</td>

                      {/* ACTION BUTTON */}
                      <td className="p-3 text-center flex justify-center gap-2">

                        {/* VIEW button always visible */}
                        <button
                          onClick={() => handleOpenView(app)}
                          className="text-xs px-3 py-2 rounded-md border border-blue-300 text-blue-600 hover:bg-blue-50"
                        >
                          View
                        </button>

                        {/* REMOVE button only when PENDING */}
                        {app.status === "PENDING" && (
                          <button
                            onClick={() => {
                              setItemToDelete(app);
                              setDeleteOpen(true);
                            }}
                            className="text-xs px-3 py-2 rounded-md border border-red-300 text-red-600 hover:bg-red-50"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}

                {!loading && apps.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-3 text-center">
                      No donation requests yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* BOTTOM HALF: TWO BOXES */}
      <div className="flex-1 flex gap-4">

        <div className="flex flex-1 border border-blue-700 rounded-xl p-8 text-center items-center justify-center">
          *TOTAL ITEMS DONATED*
        </div>

        <div className="flex flex-1 border border-blue-700 rounded-xl p-8 text-center items-center justify-center">
          *TO BE DECIDED*
        </div>

      </div>

      {/* CREATE MODAL */}
      {
        createOpen && (
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
        )
      }

      {
        deleteOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
              <h2 className="text-lg font-semibold mb-2 text-red-600">
                Remove Donation Request
              </h2>

              <p className="text-sm text-gray-700 mb-4">
                Are you sure you want to delete{" "}
                <strong>{itemToDelete?.title}</strong>?
                <br />
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-2">
                <button
                  className="px-3 py-1 border rounded-md text-sm"
                  onClick={() => setDeleteOpen(false)}
                >
                  Cancel
                </button>

                <button
                  className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      }

      {viewOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg">
            <h2 className="text-lg font-semibold mb-3">
              Items in {viewRequest?.title}
            </h2>

            {viewLoading ? (
              <p className="text-sm text-gray-500">Loading items...</p>
            ) : viewItems.length === 0 ? (
              <p className="text-sm text-gray-500">
                No clothing items found for this request.
              </p>
            ) : (
              <table className="w-full text-sm border border-gray-200 rounded-md overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">Type</th>
                    <th className="p-2 text-left">Size</th>
                    <th className="p-2 text-left">Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {viewItems.map((item) => (
                    <tr key={item.clothing_id} className="border-t">
                      <td className="p-2">{item.type}</td>
                      <td className="p-2">{item.size}</td>
                      <td className="p-2">{item.condition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="flex justify-end mt-4">
              <button
                className="px-3 py-1 border rounded-md text-sm"
                onClick={() => setViewOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


    </div >
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
