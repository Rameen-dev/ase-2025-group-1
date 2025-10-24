"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("login attempt:", { email, password });
    // later: POST /api/login
  }

  return (
    <main className="min-h-screen flex bg-white border border-black">
      {/* LEFT SIDE */}
      <section className="w-full md:w-1/2 flex flex-col p-8 md:p-12">
        {/* Brand / Logo */}
        <header className="mb-10">
          <h1 className="text-3xl font-semibold leading-tight text-gray-900 font-serif">
            <span className="text-green-800 italic">Sustain</span>
            <span className="text-gray-900 italic">Wear</span>
          </h1>
          <p className="text-sm text-gray-800 leading-snug">
            <span className="block">
              Give Today.<span className="text-green-800 font-medium">Sustain</span> Tomorrow.
            </span>
          </p>
        </header>

        {/* Welcome copy */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-700">
            Please enter your <span className="text-green-800 font-medium">SW</span> account details
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-sm space-y-5">
          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-900 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-900 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            className="w-fit bg-green-800 text-white font-medium px-6 py-2 rounded-md border border-black shadow-[0_2px_0_0_rgba(0,0,0,1)] hover:bg-green-700 active:translate-y-[1px] active:shadow-none transition"
          >
            Sign In
          </button>
        </form>

        {/* Links under form */}
        <div className="max-w-sm mt-8 text-[15px] leading-relaxed text-gray-800 space-y-4">
          <p>
            Don’t have a <span className="text-green-800 font-medium">SW</span> account?{" "}
            <a
              href="/auth/signup"
              className="text-green-800 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>

          <p>
            Forgotten your Password?{" "}
            <a
              href="#"
              className="text-green-800 font-medium hover:underline"
            >
              Click Here
            </a>
          </p>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="hidden md:flex w-1/2 bg-[#d8e5d3] border-l border-black items-center justify-center relative">
        <div className="flex flex-col items-center text-center p-8">
          {/* Illustration container / placeholder */}
          <div className="w-[320px] h-[240px] bg-white/60 border border-green-800 rounded-md flex items-center justify-center text-green-800 text-sm">
            Illustration / SVG goes here
          </div>

          {/* Extra floating icons row could go here later */}
          {/* We can absolutely layer icons with absolute positioning */}
        </div>
      </section>
    </main>
  );
}
