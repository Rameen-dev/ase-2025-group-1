"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/UI/dashboard-layout";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

type CharitySettings = {
  orgName: string;
  address: string;
  email: string;
  receiveEmails: boolean;
};

type TabName = "Home" | "Donations" | "Inventory";
const TABS: TabName[] = ["Home", "Donations", "Inventory"];

export default function CharitySettingsPage() {
  const router = useRouter();

  const [data, setData] = useState<CharitySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdError, setPwdError] = useState<string | null>(null);
  const [pwdSuccess, setPwdSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE}/api/settings/me`, {
          credentials: "include",
        });

        if (!res.ok) {
          console.warn("Settings API missing — using defaults (charity)");
          setData({
            orgName: "",
            address: "",
            email: "charity@sustainwear.org",
            receiveEmails: true,
          });
          return;
        }

        const body = await res.json();

        setData({
          orgName: body.orgName ?? body.name ?? "",
          address: body.address ?? "",
          email: body.email ?? "",
          receiveEmails: body.receiveEmails ?? true,
        });
      } catch (err) {
        console.error(err);
        setError("Could not load settings");
        setData({
          orgName: "",
          address: "",
          email: "charity@sustainwear.org",
          receiveEmails: true,
        });
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const res = await fetch(`${API_BASE}/api/settings/me`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Save failed");

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();

    try {
      setPwdSaving(true);
      setPwdError(null);
      setPwdSuccess(false);

      const res = await fetch(`${API_BASE}/api/settings/password`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const body = await res.json();

      if (!res.ok) {
        setPwdError(body?.error || "Failed to change password");
        return;
      }

      setPwdSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setPwdError("Failed to change password");
    } finally {
      setPwdSaving(false);
    }
  }

  function handleTabChange(_tab: TabName) {
    router.push("/charity/dashboard");
  }

  function handleSignOut() {
    router.push("/");
  }

  return (
    <DashboardLayout
      tabs={TABS}
      activeTab={"Home"}
      onTabChange={handleTabChange}
      onSignOut={handleSignOut}
      roleLabel="Charity"
      headerTitle="Settings"
      mainScrollable={true}
      settingsHref="/charity/settings"
    >
      <div className="w-full h-full overflow-y-auto">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 md:px-0 pb-10">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">
            Charity Settings
          </h1>

          {loading && <p className="text-gray-500">Loading…</p>}

          {error && (
            <p className="text-red-700 bg-red-50 border border-red-200 p-3 rounded mb-4">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-700 bg-green-50 border border-green-200 p-3 rounded mb-4">
              Settings saved successfully
            </p>
          )}

          {!loading && data && (
            <>
              <form onSubmit={handleSave} className="space-y-6 mb-8">
                {/* ORG PROFILE CARD */}
                <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
                  <h2 className="font-semibold text-lg mb-2">
                    Organisation Profile
                  </h2>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Organisation name
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      value={data.orgName}
                      onChange={(e) =>
                        setData({ ...data, orgName: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Organisation address
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      value={data.address}
                      onChange={(e) =>
                        setData({ ...data, address: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Contact email
                    </label>
                    <input
                      type="email"
                      className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100"
                      value={data.email}
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Charity login email cannot be changed here.
                    </p>
                  </div>
                </div>

                {/* NOTIFICATIONS CARD */}
                <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
                  <h2 className="font-semibold text-lg mb-2">Notifications</h2>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.receiveEmails}
                      onChange={(e) =>
                        setData({
                          ...data,
                          receiveEmails: e.target.checked,
                        })
                      }
                    />
                    <span className="text-sm">
                      Receive email updates about new donation requests and
                      inventory
                    </span>
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 disabled:opacity-50"
                  >
                    {saving ? "Saving…" : "Save changes"}
                  </button>
                </div>
              </form>

              {/* PASSWORD CHANGE CARD */}
              <form
                onSubmit={handleChangePassword}
                className="bg-white border rounded-xl p-6 shadow-sm space-y-4"
              >
                <h2 className="font-semibold text-lg mb-2">Change Password</h2>

                {pwdError && (
                  <p className="text-red-700 bg-red-50 border border-red-200 p-2 rounded text-sm">
                    {pwdError}
                  </p>
                )}

                {pwdSuccess && (
                  <p className="text-green-700 bg-green-50 border border-green-200 p-2 rounded text-sm">
                    Password changed successfully
                  </p>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Current password
                    </label>
                    <input
                      type="password"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      New password
                    </label>
                    <input
                      type="password"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 8 characters.
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={pwdSaving}
                    className="px-6 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 disabled:opacity-50"
                  >
                    {pwdSaving ? "Changing…" : "Change password"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
