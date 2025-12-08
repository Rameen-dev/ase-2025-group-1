import React, { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

interface UserDetails {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_verified: boolean;
  created_on: string;
  updated_on: string;
  donations_count: number;
  approved_applications_count: number;
  reviewed_applications_count: number;
  charity: {
    charity_id: number;
    name: string;
    verified: boolean;
    created_on: string;
    phone?: string;
    address?: string;
    website?: string;
  } | null;
}

interface UserDetailsModalProps {
  userId: number;
  userType: "user" | "charity";
  onClose: () => void;
}

export default function UserDetailsModal({
  userId,
  userType,
  onClose,
}: UserDetailsModalProps) {
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadDetails() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(
          `${API_BASE}/api/users/${userId}?userType=${userType}`
        );

        if (!res.ok) throw new Error();

        const data = await res.json();
        setDetails(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [userId, userType]);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-green-50 border-b rounded-t-xl">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                User Details
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {details
                  ? `${details.first_name} ${details.last_name}`
                  : "Loading..."}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 py-4 sm:py-5">
            {loading && (
              <div className="py-12 text-center text-gray-500">
                Loading user details...
              </div>
            )}

            {error && (
              <div className="py-12 text-center text-red-500">
                Failed to load user details. Please try again.
              </div>
            )}

            {!loading && !error && details && (
              <div className="space-y-5">
                {/* Basic Info */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-3">
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">User ID:</span>
                      <p className="font-medium">{details.user_id}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <p className="font-medium break-all">{details.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Full Name:</span>
                      <p className="font-medium">
                        {details.first_name} {details.last_name}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Role:</span>
                      <p className="font-medium capitalize">{details.role}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Account Status:</span>
                      <p className="font-medium">
                        {details.is_verified ? (
                          <span className="text-green-600">Verified</span>
                        ) : (
                          <span className="text-yellow-600">Unverified</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Date Created:</span>
                      <p className="font-medium">
                        {new Date(details.created_on).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Donor Stats */}
                {details.role.toLowerCase() === "donor" && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-3">
                      Donor Statistics
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <span className="text-gray-600">Total Donations:</span>
                        <p className="font-semibold text-lg text-green-700">
                          {details.donations_count}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin Stats */}
                {details.role.toLowerCase() === "admin" && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-3">
                      Admin Activity
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <span className="text-gray-600">
                          Applications Reviewed:
                        </span>
                        <p className="font-semibold text-lg text-blue-700">
                          {details.reviewed_applications_count}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <span className="text-gray-600">
                          Applications Approved:
                        </span>
                        <p className="font-semibold text-lg text-purple-700">
                          {details.approved_applications_count}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Charity Info */}
                {details.charity && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-3">
                      {details.role === "charity"
                        ? "Charity Information"
                        : "Associated Charity"}
                    </h4>
                    <div className="bg-orange-50 p-4 rounded-lg space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">
                          Organisation Name:
                        </span>
                        <p className="font-medium">{details.charity.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Charity Status:</span>
                        <p className="font-medium">
                          {details.charity.verified ? (
                            <span className="text-green-600">Verified</span>
                          ) : (
                            <span className="text-yellow-600">
                              Pending Verification
                            </span>
                          )}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Charity Created:</span>
                        <p className="font-medium">
                          {new Date(
                            details.charity.created_on
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      {details.charity.phone && (
                        <div>
                          <span className="text-gray-600">Phone:</span>
                          <p className="font-medium">{details.charity.phone}</p>
                        </div>
                      )}
                      {details.charity.website && (
                        <div>
                          <span className="text-gray-600">Website:</span>
                          <p className="font-medium break-all">
                            {details.charity.website}
                          </p>
                        </div>
                      )}
                      {details.charity.address && (
                        <div>
                          <span className="text-gray-600">Address:</span>
                          <p className="font-medium">
                            {details.charity.address}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end px-4 sm:px-6 py-3 sm:py-4 border-t bg-gray-50 rounded-b-xl">
            <button
              onClick={onClose}
              className="text-sm bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
