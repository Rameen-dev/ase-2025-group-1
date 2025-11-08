"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Handle form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // Call backend API route
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();


      // ❌ Request failed (e.g. wrong login, not verified, server error, etc.)
      if (!res.ok) {
        // 1. not verified case
        if (data.code === "NOT_VERIFIED") {
          // show message above form
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

        // 2. invalid login (bad password / no such user)
        if (data.code === "INVALID_LOGIN") {
          setErrorMsg("Invalid email or password.");
          setLoading(false);
          return;
        }

        // 3. fallback / server error
        setErrorMsg(data.message || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // ✅ Success path
      // data.success === true, code === "LOGIN_OK"
      sessionStorage.setItem("loggedIn", "true");

      //based on role, take user to appropriate dashboard
      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      }
      else if (data.user.role === "donor") {
        router.push("/donor/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex bg-white border border-black">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="SustainWear"
          width={600}
          height={600}
          className="absolute top-6 left-1/2 -translate-x-1/2 md:left-30 w-48 md:h-auto cursor-pointer"
        />
      </Link>

      {/* LEFT SIDE */}
      <section className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 pt-6">
        {/* constrain + center like signup */}
        <div className="flex flex-col justify-center items-center w-2/3 mx-auto max-w-md">
          {/* Title (match signup) */}
          <h2 className="mb-4 text-2xl font-semibold">Sign in</h2>

          {/* Error message */}
          {errorMsg && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Form (match spacing) */}
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

            {/* Submit (full-width like signup) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-green-700 py-2 border border-black text-white disabled:opacity-50 cursor-pointer hover:bg-green-800 transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Links under form (match signup link style) */}
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
      {/* RIGHT SIDE (keep whatever images/decoration you already had) */}
      {/* <section className="hidden md:flex w-1/2 ..."> ... </section> */}
    </main>
  );
}
