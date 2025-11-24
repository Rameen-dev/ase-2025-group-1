"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type TabName = "Home" | "Donations" | "Inventory" | "Impact";
const TABS: TabName[] = ["Home", "Donations", "Inventory", "Impact"];

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState<TabName>("Home");
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  const router = useRouter();




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
      <main className="ml-64 p-10 flex-1 bg-white min-h-screen">
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-3xl font-semibold">
              {activeTab === "Home" && "Dashboard Overview"}
              {activeTab === "Donations" && "Charity Requests"}
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
          <Donations title="Donations" />
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

function Donations({ title }: { title: string }) {
  return (

    <h1> Donation page</h1>
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
