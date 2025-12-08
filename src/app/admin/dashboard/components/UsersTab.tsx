import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import UserDetailsModal from "./UserDetailsModal";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_verified: boolean;
  created_on: string;
  userType: "user" | "charity";
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}

export default function UsersTab() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUserType, setSelectedUserType] = useState<"user" | "charity">(
    "user"
  );

  // Fetch users whenever filters change
  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          search,
          role: roleFilter,
          page: currentPage.toString(),
        });

        const res = await fetch(`${API_BASE}/api/users?${params}`);
        const data = await res.json();

        setUsers(data.users || []);
        setPagination(data.pagination);
      } catch (err) {
        console.error("Error loading users:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, [search, roleFilter, currentPage]);

  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1); // Reset to first page on search
  }

  function handleRoleChange(value: string) {
    setRoleFilter(value);
    setCurrentPage(1); // Reset to first page on filter
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openUserDetails(userId: number, userType: "user" | "charity") {
    setSelectedUserId(userId);
    setSelectedUserType(userType);
  }

  function closeUserDetails() {
    setSelectedUserId(null);
    setSelectedUserType("user");
  }

  return (
    <>
      <div className="border rounded-lg shadow-md flex flex-col overflow-hidden">
        {/* Header with filters */}
        <div className="bg-green-100 px-3 sm:px-4 py-3 border-b">
          <h3 className="font-semibold text-base sm:text-lg mb-3">
            User Accounts
          </h3>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="donor">Donors</option>
              <option value="charity">Charities</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="py-20 text-center text-gray-500">
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-400 text-lg mb-2">No users found</p>
              <p className="text-gray-500 text-sm">
                {search || roleFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "No users have registered yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-green-50 border-b">
                  <tr>
                    <th className="p-2 sm:p-3 text-left text-sm font-semibold">
                      User ID
                    </th>
                    <th className="p-2 sm:p-3 text-left text-sm font-semibold">
                      Full Name
                    </th>
                    <th className="p-2 sm:p-3 text-left text-sm font-semibold">
                      Email Address
                    </th>
                    <th className="p-2 sm:p-3 text-left text-sm font-semibold">
                      Role
                    </th>
                    <th className="p-2 sm:p-3 text-center text-sm font-semibold">
                      Status
                    </th>
                    <th className="p-2 sm:p-3 text-center text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={`${user.userType}-${user.user_id}`}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-2 sm:p-3 text-sm font-mono">
                        {user.user_id}
                      </td>
                      <td className="p-2 sm:p-3 text-sm">
                        {user.first_name} {user.last_name}
                      </td>
                      <td className="p-2 sm:p-3 text-sm break-all">
                        {user.email}
                      </td>
                      <td className="p-2 sm:p-3 text-sm">
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="p-2 sm:p-3 text-center text-sm">
                        {user.is_verified ? (
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            Verified
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            Unverified
                          </span>
                        )}
                      </td>
                      <td className="p-2 sm:p-3 text-center">
                        <button
                          onClick={() =>
                            openUserDetails(user.user_id, user.userType)
                          }
                          className="bg-green-600 text-white px-3 sm:px-4 py-1 rounded text-sm hover:bg-green-700 transition-colors duration-200 cursor-pointer"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="border-t bg-gray-50 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-600">
              Showing {users.length} of {pagination.totalCount} users
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
              >
                Previous
              </button>

              {/* Page numbers */}
              <div className="flex gap-1">
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((page) => {
                  // Show first, last, current, and adjacent pages
                  if (
                    page === 1 ||
                    page === pagination.totalPages ||
                    Math.abs(page - currentPage) <= 1
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 border rounded text-sm cursor-pointer ${
                          page === currentPage
                            ? "bg-green-600 text-white border-green-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2 py-1 text-sm">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUserId && (
        <UserDetailsModal
          userId={selectedUserId}
          userType={selectedUserType}
          onClose={closeUserDetails}
        />
      )}
    </>
  );
}
