"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyResetCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  function handleChange(index: number, value: string) {
    const digit = value.replace(/[^0-9]/g, "").slice(0, 1);

    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    if (digit && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    if (e.key === "ArrowRight" && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatusMsg("");
    setLoading(true);

    const finalCode = code.join("");

    if (finalCode.length !== 6) {
      setStatusMsg("Please enter the 6-digit code.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: finalCode,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatusMsg(data.message || "Invalid or expired code.");
        setLoading(false);
        return;
      }

      // success -> go to new password page
      router.push(`/auth/reset/new-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error(err);
      setStatusMsg("Network error, try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Check your email
          </h1>

        <p className="mt-2 text-sm text-gray-600">
          We’ve sent a 6-digit code to{" "}
          <span className="font-medium text-gray-900 break-all">
            {email || "your email"}
          </span>. Enter it below to continue.
        </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <div className="flex justify-between gap-2">
            {code.map((val, i) => (
              <input
                key={i}
                ref={inputRefs[i]}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={val}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-14 rounded-lg border border-gray-300 bg-white text-center text-xl font-semibold text-gray-900 focus:border-black focus:ring-2 focus:ring-black/20 outline-none"
              />
            ))}
          </div>

          {statusMsg && (
            <p className="text-xs text-center text-red-600">{statusMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black py-3 text-white text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Checking..." : "Continue"}
          </button>
        </form>
      </div>
    </main>
  );
}
