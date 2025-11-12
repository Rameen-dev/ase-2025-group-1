"use client";

import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import "@fontsource/kalam";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/api";

interface CharityRequest {
  id: string;
  charityName: string;
  applicationId: string;
  date: string;
  status: string;

  // Add the missing modal fields
  charityNumber?: string;
  contactEmail?: string;
  contactNumber?: string;
  charityUrl?: string;
  charityAddress?: string;
}

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("Home");
  const [requests, setRequests] = useState<CharityRequest[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<CharityRequest | null>(null);

  const updateStatus = (id: string, newStatus: string) => {
  setRequests((prev) =>
    prev.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    )
  );
  setModalOpen(false);
};

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`${API_BASE}/charity-requests`);
        if (!res.ok) throw new Error();
        setRequests(await res.json());
      } catch {
        setRequests([
          {
            id: "3429583",
            charityName: "Ossy’s Shoulder",
            applicationId: "3429583",
            date: "9/11/2025",
            status: "Pending",
          },
        ]);
      }
    };
    fetchRequests();
  }, []);

  const tabs = ["Home", "Requests", "Inventory", "Impact"];

  return (
    <div className="flex min-h-screen bg-white relative">

      {/* SIDEBAR */}
<aside className="bg-green-700 w-64 flex flex-col justify-between fixed left-0 top-0 h-screen">

  {/* Logo */}
  <div className="bg-white w-full px-6 py-6">
    <h1 className="text-3xl font-[Kalam] font-bold select-none">
      <span className="text-green-600">S</span>ustain
      <span className="text-green-600">W</span>ear
    </h1>
    <p className="text-xs text-gray-600 mt-1">
      Give Today. <span className="text-green-600">Sustain</span><span className="text-xs text-gray-600 mt-1"> Tomorrow.</span>
    </p>
  </div>

  {/* Navigation - vertically centered */}
<nav className="flex-1 flex flex-col justify-center space-y-6 text-2xl">

  {["Home", "Requests", "Inventory", "Impact"].map((tab) => {
    const active = selectedTab === tab;
    return (
      <button
        key={tab}
        onClick={() => setSelectedTab(tab)}
        className={`
          w-full text-left px-8 py-2 transition-all
          ${active 
            ? "bg-white text-green-700 rounded-l-full font-semibold" 
            : "text-white font-normal"
          }
        `}
      >
        {tab}
      </button>
    );
  })}

</nav>


  {/* Settings / Logout */}
  <div className="pt-6 border-t border-white/70 flex flex-col items-center gap-3 text-center text-lg font-semibold text-white pb-6">
    <button className="hover:text-green-200 transition">Settings</button>
    <button className="hover:text-green-200 transition">Log Out</button>
  </div>

</aside>




      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10 bg-white flex flex-col min-h-screen">
        

        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-semibold">Welcome Back, Admin!</h2>
          <div className="bg-green-100 text-green-700 p-2 rounded-full">
            <User size={26} />
          </div>
        </div>

        {/* TABLE CONTAINER (fills screen height) */}
        <div className="border rounded-lg shadow-md flex flex-col flex-1">
          <div className="bg-green-100 px-4 py-3 text-lg font-semibold border-b">
            Charity Application Requests
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse">
              <thead className="bg-green-50 border-b">
                <tr>
                  <th className="p-3 text-left">Charity Name</th>
                  <th className="p-3">Application ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-20 text-gray-500">
                      No Requests Found
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req.id} className="border-b hover:bg-green-50">
                      <td className="p-3">{req.charityName}</td>
                      <td className="p-3 text-center">{req.applicationId}</td>
                      <td className="p-3 text-center">{req.date}</td>
                      <td className="p-3 text-center">{req.status}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => {
                            setSelected(req);
                            setModalOpen(true);
                          }}
                          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-green-700 text-white text-center py-3 font-semibold cursor-pointer hover:bg-green-800">
            View All Donations Requests
          </div>
        </div>
      </main>

      {/* MODAL */}
{modalOpen && selected && (
  <>
    <div
      className="fixed inset-0 bg-black/40 z-40"
      onClick={() => setModalOpen(false)}
    />

    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-[650px] overflow-hidden">

        {/* Header */}
        <div className="bg-green-100 text-center py-3 border-b text-lg font-semibold">
          Charity Application
        </div>

        {/* Form Content */}
        <div className="p-6 grid grid-cols-2 gap-6 text-sm">

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Charity Name</label>
            <input
              className="border px-2 py-1 rounded"
              value={selected?.charityName ?? ""}
              readOnly
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Contact Email</label>
            <input
              className="border px-2 py-1 rounded"
              value={selected?.contactEmail ?? ""}
              readOnly
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Charity Number</label>
            <input
              className="border px-2 py-1 rounded"
              value={selected?.charityNumber ?? ""}
              readOnly
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Contact Number</label>
            <input
              className="border px-2 py-1 rounded"
              value={selected?.contactNumber ?? ""}
              readOnly
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Charity URL</label>
            <input
              className="border px-2 py-1 rounded"
              value={selected?.charityUrl ?? ""}
              readOnly
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Charity Address</label>
            <input
              className="border px-2 py-1 rounded bg-red-50"
              value={selected?.charityAddress ?? ""}
              readOnly
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-10 py-6">
          <button
            onClick={() => updateStatus(selected.id, "Approved")}
            className="bg-green-600 text-white px-10 py-2 rounded hover:bg-green-700"
          >
            Approve
          </button>

          <button
            onClick={() => updateStatus(selected.id, "Denied")}
            className="bg-red-600 text-white px-10 py-2 rounded hover:bg-red-700"
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
