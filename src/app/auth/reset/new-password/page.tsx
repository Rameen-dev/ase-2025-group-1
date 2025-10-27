"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function NewPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState<"error" | "success" | "">("");
  const [loading, setLoading] = useState(false);

  // simple helper: must be 8+ chars, 1 upper, 1 lower, 1 number, 1 special
  function passwordStrongEnough(pw: string) {
    return (
      pw.length >= 8 &&
      /[A-Z]/.test(pw) && // at least one uppercase
      /[a-z]/.test(pw) && // at least one lowercase
      /[0-9]/.test(pw) && // at least one digit
      /[^A-Za-z0-9]/.test(pw) // at least one special char
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatusMsg("");
    setStatusType("");
    setLoading(true);

    // local validation
    if (!passwordStrongEnough(password)) {
      setStatusMsg(
        "Password must be at least 8 characters and include: 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
      setStatusType("error");
      setLoading(false);
      return;
    }

    if (password !== confirm) {
      setStatusMsg("Passwords do not match.");
      setStatusType("error");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          newPassword: password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatusMsg(data.message || "Could not reset password.");
        setStatusType("error");
        setLoading(false);
        return;
      }

      // ✅ success: show green success message, then redirect to login
      setStatusMsg("Password changed successfully. You can now log in.");
      setStatusType("success");

      // if you have any auth cookies/session for reset, you could clear here
      // await fetch("/api/auth/logout", { method: "POST" });

      // redirect to login
      router.push("/auth/login");
    } catch (err) {
      console.error(err);
      setStatusMsg("Network error, try again.");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Set a new password
        </h1>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Choose a strong password for{" "}
          <span className="font-medium text-gray-900 break-all">{email}</span>.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800">
              New Password
            </label>
            <input
              type="password"
              required
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <p className="text-[11px] text-gray-500 leading-snug">
              Must include: uppercase, lowercase, number, special character.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800">
              Confirm Password
            </label>
            <input
              type="password"
              required
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {statusMsg && (
            <p
              className={`text-xs text-center font-medium ${
                statusType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {statusMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black py-3 text-white text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save new password"}
          </button>
        </form>
      </div>
    </main>
  );
}
