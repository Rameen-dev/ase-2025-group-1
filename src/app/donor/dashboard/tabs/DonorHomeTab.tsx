"use client";

import React from "react";
import DonorImpactCards from "@/components/donor/DonorImpactCards";

type DonorAnalytics = {
  totals: {
    totalRequests: number;
    totalItems: number;
    completedDonations: number;
    acceptanceRate: number;
    statusCounts: { PENDING: number; APPROVED: number; REJECTED: number };
  };
  topTypes: { type: string; count: number }[];
  recentEvents: {
    event_id: number;
    event_type: string;
    created_on: string;
    donation_request_id: number | null;
    metadata: any;
  }[];
};

type Props = {
  analytics: DonorAnalytics | null;
  loading: boolean;
};

function formatEventLabel(eventType: string) {
  switch (eventType) {
    case "REQUEST_CREATED":
      return "You created a donation request";
    case "REQUEST_APPROVED":
      return "A charity accepted your donation";
    case "REQUEST_REJECTED":
      return "A charity declined your donation request";
    default:
      return eventType.replaceAll("_", " ");
  }
}

export const DonorHomeTab: React.FC<Props> = ({ analytics, loading }) => {
  return (
    <div className="h-full space-y-6">
      {/* Impact summary */}
      <div className="border border-gray-200 rounded-xl p-8 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Your Sustainability Impact
        </h3>
        <DonorImpactCards />
      </div>

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row gap-6 md:h-[400px]">
        {/* Recent activity */}
        <div className="md:w-1/2 border border-gray-200 rounded-xl p-8 bg-white flex flex-col h-[320px] md:h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>

          {loading && <p className="text-gray-500">Loading activity...</p>}

          {!loading && (!analytics || analytics.recentEvents.length === 0) && (
            <p className="text-gray-500">No activity yet.</p>
          )}

          {!loading && analytics && analytics.recentEvents.length > 0 && (
            <div className="space-y-3 overflow-y-auto flex-1 pr-2">
              {analytics.recentEvents.map((e) => (
                <div
                  key={e.event_id}
                  className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm font-semibold text-gray-800">
                    {formatEventLabel(e.event_type)}
                    {e.donation_request_id
                      ? ` — Request #${e.donation_request_id}`
                      : ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(e.created_on).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="md:w-1/2 border border-gray-200 rounded-xl p-8 bg-white h-[320px] md:h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Your Donation Stats
          </h3>

          {loading && <p className="text-gray-500">Loading stats...</p>}

          {!loading && analytics && (
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                Total Requests: <b>{analytics.totals.totalRequests}</b>
              </p>
              <p>
                Total Items: <b>{analytics.totals.totalItems}</b>
              </p>
              <p>
                Acceptance Rate: <b>{analytics.totals.acceptanceRate}%</b>
              </p>
              <p>
                Completed Donations:{" "}
                <b>{analytics.totals.completedDonations}</b>
              </p>
            </div>
          )}

          {!loading && !analytics && (
            <p className="text-gray-500">No analytics data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
