"use client";

import { useRouter } from "next/navigation";

export default function DonorDashboardPage() {
  const router = useRouter();

  function handleSignOut() {
    // in the future you’ll clear auth tokens here
    router.push("/"); // redirect to signup page
  }

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Top-right sign out */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSignOut}
            className="text-sm text-green-700 font-medium hover:underline"
          >
            Sign Out
          </button>
        </div>

        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Donor Dashboard
        </h1>

        <p className="text-gray-600 mb-6">
          You're in. Your account is active.
        </p>

        <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
          <p className="text-lg font-medium text-gray-900 mb-2">
            Coming soon 🚀
          </p>
          <p className="text-sm text-gray-600">
            Here you'll be able to:
          </p>
          <ul className="text-sm text-gray-700 mt-2 space-y-1 text-left list-disc list-inside">
            <li>View your donation activity</li>
            <li>See requests from charities</li>
            <li>Manage your profile</li>
          </ul>

          <p className="text-xs text-gray-400 mt-6">
            (Prototype build - ASE Group 1)
          </p>
        </div>
      </div>
    </main>
  );
}
