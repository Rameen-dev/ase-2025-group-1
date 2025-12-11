"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RequestPasswordResetPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    try {
      // call our API to generate & "send" the 6-digit code
      const res = await fetch("/api/auth/reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        // e.g. missing email, rate limited, etc.
        setStatusMsg(data.message || "Something went wrong.");
        setLoading(false);
        return;
      }

      // success:
      // - backend either created a code + logged email send
      // - or pretended (if email doesn't exist) for security
      // now send user to the 6-digit verification page
      router.push(`/auth/reset/verify?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error(err);
      setStatusMsg("Network error, try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Forgot your password?
        </h1>

        <p className="mt-2 text-sm text-gray-600 text-center">
          Enter the email linked to your account.
          We’ll send you a 6-digit reset code.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-800"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              required
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {statusMsg && (
            <p className="text-xs text-center text-gray-700">{statusMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-green-700 py-3 text-white text-sm font-medium hover:bg-green-900 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending code..." : "Send reset code"}
          </button>
        </form>
      </div>
    </main>
  );
}
