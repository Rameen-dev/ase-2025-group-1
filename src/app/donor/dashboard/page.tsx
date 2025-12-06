"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/UI/dashboard-layout";
import CreateDonationRequestModal from "@/components/modals/donationRequestModal";
import ViewDonationItemsModal from "@/components/modals/viewDonationRequestModal"
import DeleteDonationRequestModal from "@/components/modals/donationDeleteMessageModal";

// base URL for API requests, allowing the client to switch from dev/staging/prod
// if missing, it falls back to " ", which prevents code to crash
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

// sidebar tabs
type TabName = "Home" | "Donations" | "Inventory";
const TABS: TabName[] = ["Home", "Donations", "Inventory"];

// status of donation request (Default: Pending)
type DonationRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

// defines the structure of a donation request returned by the API.
// the backend also includes `_count.clothingItems`, which tells us how many
// clothing items are linked to this request so the dashboard can display it.
interface DonationRequest {
  donation_request_id: number;
  title: string;
  status: DonationRequestStatus;
  _count: {
    ClothingItems: number;
  };
}

// properties required by the Donations tab/component. Includes the list of
// donation requests to display, loading state, and callbacks that the parent
// provides for handling create/delete actions.
type DonationsProps = {
  title: string;
  apps: DonationRequest[];
  loading: boolean;
  onCreated: (req: DonationRequest) => void;
  onDelete: (id: number) => void;
};

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState<TabName>("Home"); //tracks which dashboard is currently selected, always "Home" by default
  const [apps, setApps] = useState<DonationRequest[]>([]); //holds list of donation requests fetched by the API
  const [loading, setLoading] = useState(true);


  const router = useRouter();

  //fetch all donation requests
  useEffect(() => {
    async function load() {
      try {
        setLoading(true); //while fetching show loading state
        const res = await fetch(`${API_BASE}/api/donation-requests`);

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
        setApps(data); //stores fetched donation requests in "apps"
      } catch (err) {
        console.error("Error loading donation requests:", err);
        setApps([]);
      } finally {
        setLoading(false); //stop loading state
      }
    }
    load();
  }, []);

  function handleSignOut() {
    router.push("/"); // redirect user to landing page when logging out
  }

  //sets title of the header bar based on active tab
  const headerTitle =
    activeTab === "Home"
      ? "Dashboard Overview"
      : activeTab === "Donations"
        ? "Donations"
        : activeTab === "Inventory"
          ? "Inventory"
          : "Impact & Reports";

  return (
    //dashboard lauout component inside components/UI
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

  type ClothingItemView = {
    clothing_id: number;
    type: string;
    size: string;
    condition: string;
  };


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

  return (
    <div className="flex flex-col h-full">

      {/* top row of the table */}
      <div className="h-[400px] mb-4">
        <div className="border rounded-lg shadow-md flex flex-col h-full">
          <div className="bg-green-100 px-4 py-3 font-semibold text-lg border-1 flex items-center justify-between">
            <span>{title}</span>
            <button
              onClick={() => setCreateOpen(true)}
              className="text-sm px-3 py-1 rounded-md bg-green-700 text-white hover:bg-green-800"
            >
              + New Request
            </button>
          </div>

          {/* donation reqeusts table */}
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
                        {app._count?.ClothingItems ?? 0}
                      </td>
                      <td className="p-3 text-center">{app.status}</td>
                      <td className="p-3 text-center flex justify-center gap-2">

                        {/* view button to display items in the donation */}
                        <button
                          onClick={() => handleOpenView(app)}
                          className="text-xs px-3 py-2 rounded-md border border-blue-300 text-blue-600 hover:bg-blue-50"
                        >
                          View
                        </button>

                        {/* if donation request is in pending, display a remove button
                            when donation request is accepted, remove button doesn't show*/}
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

      {/* bottom half of the dashboard */}
      <div className="flex-1 flex gap-4">

        <div className="flex flex-1 border border-blue-700 rounded-xl p-8 text-center items-center justify-center">
          *TOTAL ITEMS DONATED*
        </div>

        <div className="flex flex-1 border border-blue-700 rounded-xl p-8 text-center items-center justify-center">
          *TO BE DECIDED*
        </div>

      </div>

      {/* create donation request modal */}
      <CreateDonationRequestModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(req) => onCreated(req)}
      />

      {/* displays items of a donation request */}
      <ViewDonationItemsModal
        isOpen={viewOpen}
        onClose={() => setViewOpen(false)}
        requestTitle={viewRequest?.title}
        loading={viewLoading}
        items={viewItems}
      />

      {/* confirm delete donation message */}
      <DeleteDonationRequestModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={itemToDelete?.title}
      />
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
