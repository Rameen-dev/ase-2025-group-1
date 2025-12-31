"use client";

import React, { useEffect, useState } from "react";

type ProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  address?: string; // used for charities, harmless for other roles
  role?: string; // optional display only
};

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function AccountSettings() {
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [profile, setProfile] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    role: "",
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  // Load current settings from the backend
  useEffect(() => {
    async function load() {
      try {
        setLoadingProfile(true);
        setProfileError(null);

        const res = await fetch("/api/settings/me", {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          setProfileError(body?.error ?? "Failed to load settings");
          return;
        }

        const body = await res.json();

        setProfile({
          firstName: body.firstName ?? "",
          lastName: body.lastName ?? "",
          email: body.email ?? "",
          address: body.address ?? "",
          role: body.role ?? "",
        });
      } catch (err) {
        console.error("Error loading settings:", err);
        setProfileError("Failed to load settings");
      } finally {
        setLoadingProfile(false);
      }
    }

    load();
  }, []);

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveMessage(null);
    setProfileError(null);

    try {
      const res = await fetch("/api/settings/me", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const body = await res.json().catch(() => null);

      if (!res.ok) {
        setProfileError(body?.error ?? "Failed to save settings");
        return;
      }

      setSaveMessage("Settings updated successfully.");
    } catch (err) {
      console.error("Error saving settings:", err);
      setProfileError("Failed to save settings");
    }
  }

  async function handlePasswordSave(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMessage(null);

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      setPasswordMessage("Please fill in all password fields.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }

    try {
      setPasswordSaving(true);

      const res = await fetch("/api/settings/password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const body = await res.json().catch(() => null);

      if (!res.ok) {
        setPasswordMessage(body?.error ?? "Failed to update password");
        return;
      }

      setPasswordMessage("Password updated successfully.");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Error updating password:", err);
      setPasswordMessage("Failed to update password");
    } finally {
      setPasswordSaving(false);
    }
  }

  return (
    <div className="h-full w-full flex justify-center overflow-y-auto">
      <div className="w-full max-w-3xl mx-auto space-y-8 py-2 sm:py-0">
        {/* Profile section */}
        <section className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Account details
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Update your personal information. Email may be used for
            notifications.
          </p>

          {loadingProfile ? (
            <p className="text-sm text-gray-500">Loading settings…</p>
          ) : profileError ? (
            <p className="text-sm text-red-600">{profileError}</p>
          ) : (
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    First name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={profile.firstName}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={profile.lastName}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Address (used by charities) */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Address (for charities)
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={profile.address ?? ""}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Optional role display */}
              {profile.role && (
                <p className="text-xs text-gray-500">
                  Role:{" "}
                  <span className="font-medium uppercase">{profile.role}</span>
                </p>
              )}

              {/* Feedback */}
              {saveMessage && (
                <p className="text-xs sm:text-sm text-green-700">
                  {saveMessage}
                </p>
              )}
              {profileError && (
                <p className="text-xs sm:text-sm text-red-600">
                  {profileError}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-green-700 text-white text-sm hover:bg-green-800"
                >
                  Save changes
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Password section */}
        <section className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Change password
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Update your password. You&apos;ll use this next time you sign in.
          </p>

          <form onSubmit={handlePasswordSave} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Current password
              </label>
              <input
                type="password"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  New password
                </label>
                <input
                  type="password"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Confirm new password
                </label>
                <input
                  type="password"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {passwordMessage && (
              <p className="text-xs sm:text-sm text-gray-700">
                {passwordMessage}
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={passwordSaving}
                className="inline-flex items-center px-4 py-2 rounded-md bg-green-700 text-white text-sm hover:bg-green-800 disabled:opacity-60"
              >
                {passwordSaving ? "Updating…" : "Update password"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
