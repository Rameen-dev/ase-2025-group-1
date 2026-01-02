"use client";

import React from "react";
import CharityImpactCards from "@/components/charity/CharityImpactCards";

type CharityAnalytics = {
  totals: {
    pendingRequests: number;
    reviewedRequests: number;
    acceptedDonations: number;
    acceptedItems: number;
    rejectedItems: number;
  };
  recentEvents: {
    event_id: number;
    event_type: string;
    created_on: string;
    donation_request_id: number | null;
    donation_id: number | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: any;
  }[];
};

type Props = {
  analytics: CharityAnalytics | null;
  loading: boolean;
};

function formatEventLabel(eventType: string) {
  switch (eventType) {
    case "REQUEST_CREATED":
      return "A donation request was created";
    case "REQUEST_APPROVED":
      return "You accepted a donation request";
    case "REQUEST_REJECTED":
      return "You declined a donation request";
    case "DONATION_CREATED":
      return "A donation was created";
    default:
      return eventType.replaceAll("_", " ");
  }
}

export const CharityHomeTab: React.FC<Props> = ({ analytics, loading }) => {
  return (
    <div className="h-full space-y-6">
      {/* Impact summary */}
      <div className="border border-gray-200 rounded-xl p-8 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Your Sustainability Impact
        </h3>
        <CharityImpactCards />
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
                    {e.donation_id ? ` — Donation #${e.donation_id}` : ""}
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
            Charity Overview
          </h3>

          {loading && <p className="text-gray-500">Loading stats...</p>}

          {!loading && analytics && (
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                Pending Requests: <b>{analytics.totals.pendingRequests}</b>
              </p>
              <p>
                Reviewed Requests: <b>{analytics.totals.reviewedRequests}</b>
              </p>
              <p>
                Accepted Donations: <b>{analytics.totals.acceptedDonations}</b>
              </p>
              <p>
                Accepted Items: <b>{analytics.totals.acceptedItems}</b>
              </p>
              <p>
                Rejected Items: <b>{analytics.totals.rejectedItems}</b>
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
