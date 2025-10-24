"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // add router for redirect if you want later

const BOXES = 4;

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email") ?? "";

  const [code, setCode] = useState<string[]>(Array(BOXES).fill(""));
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [serverErr, setServerErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  function onChange(value: string, i: number) {
    if (!/^\d?$/.test(value)) return;
    const next = [...code];
    next[i] = value;
    setCode(next);
    if (value && i < BOXES - 1) inputsRef.current[i + 1]?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>, i: number) {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  }

  function onPaste(e: React.ClipboardEvent<HTMLDivElement>) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, BOXES);
    if (!text) return;
    const next = Array(BOXES).fill("");
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setCode(next);
    inputsRef.current[Math.min(text.length, BOXES) - 1]?.focus();
    e.preventDefault();
  }

  // 🔥 THIS is now the real verify call
  async function handleContinue() {
    setServerErr(null);
    setServerMsg(null);

    const otp = code.join(""); // "1234"
    if (otp.length !== BOXES) {
      setServerErr("Please enter the full code.");
      return;
    }

    if (!email) {
      setServerErr("Missing email in URL.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        // handle known codes from the backend
        const map: Record<string, string> = {
          INVALID_REQUEST: "Invalid request.",
          INVALID_CODE: "That code is incorrect.",
          EXPIRED_CODE: "That code is expired. Request a new one.",
          SERVER_ERROR: "Server error. Try again.",
        };

        setServerErr(map[data?.code] ?? "Verification failed.");
        setSubmitting(false);
        return;
      }

    if (data.code === "ALREADY_VERIFIED" || data.code === "VERIFIED") {
      setServerMsg("Your email is verified ✅");

      // small UX: wait a moment so they see the tick, then go
      setTimeout(() => {
        router.push("/donor/dashboard");
      }, 1200);
    }


    } catch (err) {
      console.error(err);
      setServerErr("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleResend() {
    // future step: call /api/resend-otp
    console.log("Resend clicked for:", email);
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* ... header etc. (keep your current JSX) ... */}

      <section className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-xl w-full text-center" onPaste={onPaste}>
          <h2 className="text-4xl font-semibold mb-1">Verify Your Email</h2>
          <p className="text-green-800 mb-4">
            Enter the verification code we sent to{" "}
            <span className="font-medium">{email || "your email"}</span>
          </p>

          {/* show status / errors */}
          {serverErr && (
            <p className="text-red-600 text-sm mb-4">{serverErr}</p>
          )}
          {serverMsg && (
            <p className="text-green-700 text-sm mb-4">{serverMsg}</p>
          )}

          {/* OTP inputs */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {Array.from({ length: BOXES }).map((_, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                inputMode="numeric"
                maxLength={1}
                aria-label={`Digit ${i + 1}`}
                className="w-16 h-16 text-2xl text-center border rounded-lg outline-none focus:ring-2 focus:ring-green-800"
                value={code[i]}
                onChange={(e) => onChange(e.target.value, i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              />
            ))}
          </div>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            disabled={submitting}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-700 text-white w-56 mx-auto disabled:opacity-50"
          >
            {submitting ? "Verifying..." : "Continue"}
          </button>

          {/* Resend link */}
          <p className="mt-6 text-sm">
            Didn’t receive your code?{" "}
            <button
              className="text-green-700 underline"
              onClick={handleResend}
              disabled={submitting}
            >
              Click here to send another
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
