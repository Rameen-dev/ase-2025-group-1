import React, { useEffect, useState } from "react";
import { Edit2, Save, X as XIcon, Trash2 } from "lucide-react";

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

interface EditableFields {
  first_name: string;
  last_name: string;
  email: string;
  is_verified: boolean;
  phone?: string;
  address?: string;
  website?: string;
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
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedFields, setEditedFields] = useState<EditableFields>({
    first_name: "",
    last_name: "",
    email: "",
    is_verified: false,
    phone: "",
    address: "",
    website: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

        // Initialize editable fields
        setEditedFields({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          is_verified: data.is_verified,
          phone: data.charity?.phone || "",
          address: data.charity?.address || "",
          website: data.charity?.website || "",
        });
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [userId, userType]);

  function handleEditToggle() {
    if (isEditing) {
      // Cancel editing - reset fields
      if (details) {
        setEditedFields({
          first_name: details.first_name,
          last_name: details.last_name,
          email: details.email,
          is_verified: details.is_verified,
          phone: details.charity?.phone || "",
          address: details.charity?.address || "",
          website: details.charity?.website || "",
        });
      }
    }
    setIsEditing(!isEditing);
  }

  async function handleSave() {
    try {
      setIsSaving(true);
      const res = await fetch(
        `${API_BASE}/api/users/${userId}?userType=${userType}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedFields),
        }
      );

      if (!res.ok) throw new Error();

      const result = await res.json();

      // Reload details
      const detailsRes = await fetch(
        `${API_BASE}/api/users/${userId}?userType=${userType}`
      );
      const updatedData = await detailsRes.json();
      setDetails(updatedData);

      setIsEditing(false);
      alert("User updated successfully!");
    } catch (err) {
      alert("Failed to update user. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const res = await fetch(
        `${API_BASE}/api/users/${userId}?userType=${userType}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error();

      const result = await res.json();

      alert(result.message);
      window.location.reload(); // Refresh the page to update the list
    } catch (err) {
      alert("Failed to delete user. Please try again.");
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  function handleFieldChange(
    field: keyof EditableFields,
    value: string | boolean
  ) {
    setEditedFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

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
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 cursor-pointer"
                  title="Edit user"
                >
                  <Edit2 size={16} />
                  <span className="hidden sm:inline">Edit</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-1 text-sm bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 disabled:opacity-50 cursor-pointer"
                  >
                    <Save size={16} />
                    <span className="hidden sm:inline">
                      {isSaving ? "Saving..." : "Save"}
                    </span>
                  </button>
                  <button
                    onClick={handleEditToggle}
                    disabled={isSaving}
                    className="flex items-center gap-1 text-sm border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
                  >
                    <XIcon size={16} />
                    <span className="hidden sm:inline">Cancel</span>
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none cursor-pointer ml-2"
                aria-label="Close"
              >
                ×
              </button>
            </div>
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
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedFields.email}
                          onChange={(e) =>
                            handleFieldChange("email", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                        />
                      ) : (
                        <p className="font-medium break-all">{details.email}</p>
                      )}
                    </div>
                    <div>
                      <span className="text-gray-600">
                        {details.role === "charity"
                          ? "Organisation Name:"
                          : "First Name:"}
                      </span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedFields.first_name}
                          onChange={(e) =>
                            handleFieldChange("first_name", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                        />
                      ) : (
                        <p className="font-medium">{details.first_name}</p>
                      )}
                    </div>
                    {details.role !== "charity" && (
                      <div>
                        <span className="text-gray-600">Last Name:</span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedFields.last_name}
                            onChange={(e) =>
                              handleFieldChange("last_name", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                          />
                        ) : (
                          <p className="font-medium">{details.last_name}</p>
                        )}
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600">Role:</span>
                      <p className="font-medium capitalize">{details.role}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Account Status:</span>
                      {isEditing ? (
                        <select
                          value={editedFields.is_verified ? "true" : "false"}
                          onChange={(e) =>
                            handleFieldChange(
                              "is_verified",
                              e.target.value === "true"
                            )
                          }
                          className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                        >
                          <option value="true">Verified</option>
                          <option value="false">Unverified</option>
                        </select>
                      ) : (
                        <p className="font-medium">
                          {details.is_verified ? (
                            <span className="text-green-600">Verified</span>
                          ) : (
                            <span className="text-yellow-600">Unverified</span>
                          )}
                        </p>
                      )}
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
                          {isEditing && details.role === "charity" ? (
                            <input
                              type="text"
                              value={editedFields.phone}
                              onChange={(e) =>
                                handleFieldChange("phone", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                            />
                          ) : (
                            <p className="font-medium">
                              {details.charity.phone}
                            </p>
                          )}
                        </div>
                      )}
                      {(details.charity.website ||
                        (isEditing && details.role === "charity")) && (
                        <div>
                          <span className="text-gray-600">Website:</span>
                          {isEditing && details.role === "charity" ? (
                            <input
                              type="text"
                              value={editedFields.website}
                              onChange={(e) =>
                                handleFieldChange("website", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                            />
                          ) : (
                            <p className="font-medium break-all">
                              {details.charity.website}
                            </p>
                          )}
                        </div>
                      )}
                      {details.charity.address && (
                        <div>
                          <span className="text-gray-600">Address:</span>
                          {isEditing && details.role === "charity" ? (
                            <textarea
                              value={editedFields.address}
                              onChange={(e) =>
                                handleFieldChange("address", e.target.value)
                              }
                              className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                              rows={2}
                            />
                          ) : (
                            <p className="font-medium">
                              {details.charity.address}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t bg-gray-50 rounded-b-xl">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isDeleting}
              className="flex items-center justify-center gap-2 text-sm bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 disabled:opacity-50 cursor-pointer"
            >
              <Trash2 size={16} />
              Delete User
            </button>
            <button
              onClick={onClose}
              className="text-sm bg-gray-600 text-white px-5 py-2 rounded hover:bg-gray-700 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && details && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => !isDeleting && setShowDeleteConfirm(false)}
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <Trash2 className="text-red-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete User
                </h3>
              </div>

              <p className="text-gray-600 mb-4">
                Are you sure you want to delete{" "}
                <strong>
                  {details.first_name} {details.last_name}
                </strong>
                ?
              </p>

              {(details.donations_count > 0 ||
                details.approved_applications_count > 0 ||
                details.reviewed_applications_count > 0) && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-800 font-medium mb-2">
                    ⚠️ Warning: This user has related records
                  </p>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {details.donations_count > 0 && (
                      <li>• {details.donations_count} donation(s)</li>
                    )}
                    {details.approved_applications_count > 0 && (
                      <li>
                        • {details.approved_applications_count} approved
                        application(s)
                      </li>
                    )}
                    {details.reviewed_applications_count > 0 && (
                      <li>
                        • {details.reviewed_applications_count} reviewed
                        application(s)
                      </li>
                    )}
                  </ul>
                  <p className="text-sm text-yellow-700 mt-2">
                    These records will also be deleted. This action cannot be
                    undone.
                  </p>
                </div>
              )}

              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. The user and all their data will
                be permanently removed.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
