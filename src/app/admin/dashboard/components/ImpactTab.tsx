import React, { useEffect, useState } from "react";
import { Leaf, TrendingUp, Users, Building2 } from "lucide-react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

interface PlatformStats {
  totalCO2: number;
  totalItems: number;
  totalDonors: number;
  totalCharities: number;
  chartData: {
    id: number;
    name: string;
    co2: number;
    type: string;
  }[];
}

interface Donor {
  user_id: number;
  name: string;
  email: string;
  co2_saved: number;
  items_donated: number;
}

interface Charity {
  charity_id: number;
  name: string;
  email: string;
  co2_saved: number;
  items_received: number;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}

export default function ImpactTab() {
  const [platformStats, setPlatformStats] = useState<PlatformStats | null>(
    null
  );
  const [donors, setDonors] = useState<Donor[]>([]);
  const [charities, setCharities] = useState<Charity[]>([]);
  const [donorPage, setDonorPage] = useState(1);
  const [charityPage, setCharityPage] = useState(1);
  const [donorPagination, setDonorPagination] = useState<PaginationInfo | null>(
    null
  );
  const [charityPagination, setCharityPagination] =
    useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch platform stats
  useEffect(() => {
    async function loadPlatformStats() {
      try {
        const res = await fetch(`${API_BASE}/api/impact/platform`);
        if (!res.ok) {
          console.error("Platform stats error:", res.status, res.statusText);
          return;
        }
        const data = await res.json();
        console.log("Platform stats loaded:", data);
        setPlatformStats(data);
      } catch (err) {
        console.error("Error loading platform stats:", err);
      }
    }
    loadPlatformStats();
  }, []);

  // Fetch donors
  useEffect(() => {
    async function loadDonors() {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASE}/api/impact/donors?page=${donorPage}`
        );
        if (!res.ok) {
          console.error("Donors error:", res.status, res.statusText);
          return;
        }
        const data = await res.json();
        console.log("Donors loaded:", data);
        setDonors(data.donors || []);
        setDonorPagination(data.pagination);
      } catch (err) {
        console.error("Error loading donors:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDonors();
  }, [donorPage]);

  // Fetch charities
  useEffect(() => {
    async function loadCharities() {
      try {
        const res = await fetch(
          `${API_BASE}/api/impact/charities?page=${charityPage}`
        );
        const data = await res.json();
        setCharities(data.charities || []);
        setCharityPagination(data.pagination);
      } catch (err) {
        console.error("Error loading charities:", err);
      }
    }
    loadCharities();
  }, [charityPage]);

  // Prepare chart data
  const chartData = platformStats
    ? {
        labels: platformStats.chartData.map((item) => item.name),
        datasets: [
          {
            data: platformStats.chartData.map((item) => item.co2),
            backgroundColor: platformStats.chartData.map((item) => {
              if (item.type === "donor") return "#10b981"; // green
              if (item.type === "charity") return "#3b82f6"; // blue
              return "#9ca3af"; // gray for others
            }),
            borderWidth: 2,
            borderColor: "#fff",
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the default legend completely
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} kg CO₂ (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* No Data State */}
      {platformStats && platformStats.totalCO2 === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <Leaf className="mx-auto text-yellow-600 mb-3" size={48} />
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            No Impact Data Available Yet
          </h3>
          <p className="text-yellow-700 text-sm">
            Impact data will appear once donations with clothing items are made.
            Make sure ClothingItems have a donation_id set when donations are
            accepted.
          </p>
        </div>
      )}

      {/* Platform Overview */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="text-green-600" size={24} />
          Platform Impact Overview
        </h3>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="text-green-600" size={20} />
              <span className="text-sm text-gray-600">Total CO₂ Saved</span>
            </div>
            <p className="text-2xl font-bold text-green-700">
              {platformStats
                ? `${platformStats.totalCO2.toLocaleString()} kg`
                : "Loading..."}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="text-blue-600" size={20} />
              <span className="text-sm text-gray-600">Items Donated</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">
              {platformStats
                ? platformStats.totalItems.toLocaleString()
                : "Loading..."}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-purple-600" size={20} />
              <span className="text-sm text-gray-600">Active Donors</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">
              {platformStats
                ? platformStats.totalDonors.toLocaleString()
                : "Loading..."}
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="text-orange-600" size={20} />
              <span className="text-sm text-gray-600">Active Charities</span>
            </div>
            <p className="text-2xl font-bold text-orange-700">
              {platformStats
                ? platformStats.totalCharities.toLocaleString()
                : "Loading..."}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h4 className="font-semibold mb-4 text-center">
            Top Contributors Distribution
          </h4>
          {!platformStats ? (
            <div className="flex items-center justify-center h-64 text-gray-400">
              Loading chart data...
            </div>
          ) : platformStats.chartData.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-400">
              No data available for chart
            </div>
          ) : (
            <>
              <div
                className="w-full max-w-md mx-auto"
                style={{ height: "300px" }}
              >
                {chartData && (
                  <Doughnut data={chartData} options={chartOptions} />
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Donor Leaderboard */}
      <div className="border rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-100 px-4 py-3 border-b">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Users className="text-green-600" size={20} />
            Donor Impact Leaderboard
          </h3>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-12 text-center text-gray-500">
              Loading donors...
            </div>
          ) : donors.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              No donor data available
            </div>
          ) : (
            <table className="w-full min-w-[640px]">
              <thead className="bg-green-50 border-b">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold">Rank</th>
                  <th className="p-3 text-left text-sm font-semibold">Name</th>
                  <th className="p-3 text-left text-sm font-semibold">Email</th>
                  <th className="p-3 text-right text-sm font-semibold">
                    Items Donated
                  </th>
                  <th className="p-3 text-right text-sm font-semibold">
                    CO₂ Saved (kg)
                  </th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, index) => (
                  <tr key={donor.user_id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm">
                      <span className="font-semibold text-green-600">
                        #{(donorPage - 1) * 10 + index + 1}
                      </span>
                    </td>
                    <td className="p-3 text-sm font-medium">{donor.name}</td>
                    <td className="p-3 text-sm text-gray-600">{donor.email}</td>
                    <td className="p-3 text-sm text-right">
                      {donor.items_donated}
                    </td>
                    <td className="p-3 text-sm text-right font-semibold text-green-700">
                      {donor.co2_saved.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {donorPagination && donorPagination.totalPages > 1 && (
          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t">
            <p className="text-sm text-gray-600">
              Page {donorPagination.currentPage} of {donorPagination.totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDonorPage((p) => p - 1)}
                disabled={donorPage === 1}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => setDonorPage((p) => p + 1)}
                disabled={donorPage === donorPagination.totalPages}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Charity Leaderboard */}
      <div className="border rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-100 px-4 py-3 border-b">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Building2 className="text-blue-600" size={20} />
            Charity Impact Leaderboard
          </h3>
        </div>

        <div className="overflow-x-auto">
          {charities.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              No charity data available
            </div>
          ) : (
            <table className="w-full min-w-[640px]">
              <thead className="bg-blue-50 border-b">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold">Rank</th>
                  <th className="p-3 text-left text-sm font-semibold">
                    Organisation
                  </th>
                  <th className="p-3 text-left text-sm font-semibold">Email</th>
                  <th className="p-3 text-right text-sm font-semibold">
                    Items Received
                  </th>
                  <th className="p-3 text-right text-sm font-semibold">
                    CO₂ Impact (kg)
                  </th>
                </tr>
              </thead>
              <tbody>
                {charities.map((charity, index) => (
                  <tr
                    key={charity.charity_id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3 text-sm">
                      <span className="font-semibold text-blue-600">
                        #{(charityPage - 1) * 10 + index + 1}
                      </span>
                    </td>
                    <td className="p-3 text-sm font-medium">{charity.name}</td>
                    <td className="p-3 text-sm text-gray-600">
                      {charity.email}
                    </td>
                    <td className="p-3 text-sm text-right">
                      {charity.items_received}
                    </td>
                    <td className="p-3 text-sm text-right font-semibold text-blue-700">
                      {charity.co2_saved.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {charityPagination && charityPagination.totalPages > 1 && (
          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t">
            <p className="text-sm text-gray-600">
              Page {charityPagination.currentPage} of{" "}
              {charityPagination.totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCharityPage((p) => p - 1)}
                disabled={charityPage === 1}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => setCharityPage((p) => p + 1)}
                disabled={charityPage === charityPagination.totalPages}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
