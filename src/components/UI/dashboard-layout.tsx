"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type DashboardLayoutProps<T extends string> = {
  tabs: T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  onSignOut: () => void;
  roleLabel: string;
  headerTitle: string;
  children: React.ReactNode;
};

export function DashboardLayout<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  onSignOut,
  roleLabel,
  headerTitle,
  children,
}: DashboardLayoutProps<T>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  function openLogoutModal() {
    setLogoutModalOpen(true);
  }

  function closeLogoutModal() {
    if (!isSigningOut) setLogoutModalOpen(false);
  }

  async function confirmSignOut() {
    try {
      setIsSigningOut(true);
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } finally {
      setIsSigningOut(false);
      setLogoutModalOpen(false);
    }
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden relative">
      {/* Mobile menu button */}
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
        <div className="w-5 h-0.5 bg-black mb-1" />
        <div className="w-5 h-0.5 bg-black mb-1" />
        <div className="w-5 h-0.5 bg-black" />
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          bg-green-700 w-64 flex flex-col justify-between
          fixed inset-y-0 left-0
          transform transition-transform duration-200 z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/*  UPDATED LOGO */}
        <div className="relative bg-white px-6 py-6">
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity block"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div className="font-kalam text-4xl md:text-5xl leading-none">
              <span className="text-[#2E7D32]">S</span>ustain
              <span className="text-[#2E7D32]">W</span>ear
            </div>
            <p className="text-xs md:text-sm italic mt-1">
              <span className="text-black">Give Today.</span>{" "}
              <span className="text-[#2E7D32]">Sustain</span>
              <span className="text-black"> Tomorrow.</span>
            </p>
          </Link>
        </div>

        {/* NAV */}
        <nav className="flex-1 flex flex-col justify-center space-y-6 text-2xl overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                onTabChange(tab);
                setIsSidebarOpen(false);
              }}
              className={`px-8 py-2 text-left transition-colors duration-200 cursor-pointer ${activeTab === tab
                  ? "bg-white text-green-700 font-semibold rounded-l-full shadow-md"
                  : "text-white hover:bg-green-600/70"
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="border-t border-white/70 py-6 text-center text-white font-semibold">
          <div className="hover:opacity-80 cursor-pointer transition-opacity duration-150">
            Settings
          </div>
          <button
            onClick={openLogoutModal}
            className="hover:opacity-80 cursor-pointer mt-2 transition-opacity duration-150"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-white md:ml-64 overflow-hidden min-h-0 flex flex-col p-4 md:p-10 pt-16 md:pt-10">
        {/* Header */}
        <div className="shrink-0 flex justify-between mb-6">
          <div>
            <h2 className="text-3xl font-semibold">{headerTitle}</h2>
            <p className="text-sm text-gray-500">
              Welcome back, {roleLabel}. Manage your SustainWear from here.
            </p>
          </div>
          <div className="bg-green-100 text-green-700 p-2 rounded-full" />
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden">
          {children}
        </div>
      </main>

      {/* LOGOUT MODAL */}
      {logoutModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => !isSigningOut && setLogoutModalOpen(false)}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
              <div className="px-5 py-4 border-b bg-green-50 rounded-t-xl">
                <h3 className="text-lg font-semibold text-gray-900">
                  Confirm logout
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  You are about to log out of your SustainWear account.
                </p>
              </div>

              <div className="px-5 py-4 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
                <button
                  disabled={isSigningOut}
                  onClick={closeLogoutModal}
                  className="text-sm px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  disabled={isSigningOut}
                  onClick={confirmSignOut}
                  className="text-sm px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                >
                  {isSigningOut ? "Logging out…" : "Log Out"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
