"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter(); // lets us navigate after login

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // NEW: account type state
  // "user"  = donor/admin (User table)
  // "charity" = charities (Charities table)
  const [accountType, setAccountType] = useState<"user" | "charity">("user");

  // Handle form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // Decide which backend route to call based on account type
      const endpoint =
        accountType === "charity" ? "/api/auth/charity-login" : "/api/login";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      // ---------------------------
      // ERROR HANDLING (both types)
      // ---------------------------
      if (!res.ok) {
        // Shared invalid login case: wrong email/password
        if (data.code === "INVALID_LOGIN") {
          setErrorMsg("Invalid email or password.");
          setLoading(false);
          return;
        }

        // Only for normal users (donor/admin) - NOT_VERIFIED
        if (data.code === "NOT_VERIFIED") {
          setErrorMsg(
            "Your email is not verified yet. We've sent you a new code."
          );

          // send them to /auth/verify with their email in the query
          router.push(
            `/auth/verify?email=${encodeURIComponent(data.email ?? email)}`
          );

          setLoading(false);
          return;
        }

        // Only for charity logins – examples from charity-login route
        if (data.code === "NO_PASSWORD_SET") {
          setErrorMsg(
            "Your charity has not completed signup yet. Please use your invite link to set a password."
          );
          setLoading(false);
          return;
        }

        if (data.code === "CHARITY_NOT_VERIFIED") {
          setErrorMsg(
            "Your charity account is not fully verified yet. Please contact SustainWear support."
          );
          setLoading(false);
          return;
        }

        // Fallback / server error
        setErrorMsg(data.message || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // ---------------------------
      // SUCCESS HANDLING
      // ---------------------------
      if (accountType === "charity") {
        // We just called /api/auth/charity-login
        if (data.code === "CHARITY_LOGIN_OK") {
          router.push("/charity/dashboard");
          return;
        }

        // Safety fallback: unexpected success format
        console.warn("Unexpected charity login response:", data);
        setErrorMsg("Unexpected response. Please try again.");
        setLoading(false);
        return;
      } else {
        // accountType === "user"
        // We just called /api/login (User table)
        if (data.code === "LOGIN_OK" && data.user) {
          // Normalise role in case DB stores "ADMIN"/"DONOR"
          const role = (data.user.role || "").toLowerCase();

          if (role === "admin") {
            router.push("/admin/dashboard");
          } else if (role === "donor") {
            router.push("/donor/dashboard");
          } else {
            // Unknown role: just send to home for now
            router.push("/");
          }
          return;
        }

        console.warn("Unexpected user login response:", data);
        setErrorMsg("Unexpected response. Please try again.");
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex bg-white border border-black">
      <Link
        href="/"
        className="absolute top-6 left-7 z-10 hover:opacity-80 transition-opacity"
      >
        <div className="font-kalam text-4xl md:text-5xl">
          <span className="text-[#2E7D32]">S</span>ustain
          <span className="text-[#2E7D32]">W</span>ear
        </div>
        <p className="text-xs md:text-lg italic mt-1">
          <span className="text-black">Give Today.</span>
          <span className="text-[#2E7D32]">Sustain</span>
          <span className="text-black"> Tomorrow.</span>
        </p>
      </Link>

      {/* LEFT SIDE */}
      <section className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 pt-6">
        <div className="flex flex-col justify-center items-center w-2/3 mx-auto max-w-md">
          <h2 className="mb-4 text-2xl font-semibold">Sign in</h2>

          {/* Error message */}
          {errorMsg && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          {/* NEW: Account type toggle */}
          <div className="mb-4 w-full">
            <p className="text-sm mb-2 font-medium">Sign in as:</p>
            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="accountType"
                  value="user"
                  checked={accountType === "user"}
                  onChange={() => setAccountType("user")}
                />
                Donor / Admin
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="accountType"
                  value="charity"
                  checked={accountType === "charity"}
                  onChange={() => setAccountType("charity")}
                />
                Charity
              </label>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="w-full space-y-3">
            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-400 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-green-700 py-2 border border-black text-white disabled:opacity-50 cursor-pointer hover:bg-green-800 transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Links under form */}
          <p className="mt-4 text-sm">
            Don’t have an account?{" "}
            <a
              href="/auth/signup"
              className="text-blue-500 underline hover:text-blue-800"
            >
              Create one
            </a>
          </p>

          <p className="text-sm">
            Forgot your password?{" "}
            <a
              href="/auth/reset/request"
              className="text-blue-500 underline hover:text-blue-800"
            >
              Reset it
            </a>
          </p>
        </div>
      </section>

      {/* Right side image */}
      <div className="hidden md:flex md:w-1/2 md:flex-col md:justify-center md:items-center md:bg-green-100">
        <Image
          src="/images/signupShapes.png"
          alt="shapes"
          width={750}
          height={750}
          className="w-auto h-100 object-contain"
        />
        <Image
          src="\illustrations\undraw_web-shopping_xd5k.svg"
          alt="signupLady"
          width={500}
          height={500}
          className="w-auto h-100 object-contain"
        />
      </div>
    </main>
  );
}
