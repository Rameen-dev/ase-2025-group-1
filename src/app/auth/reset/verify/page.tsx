"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export default function VerifyResetCodePage() {
  // we'll store 6 separate digits
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  // refs so we can move focus automatically
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  function handleChange(index: number, value: string) {
    // accept only 0-9
    const digit = value.replace(/[^0-9]/g, "").slice(0, 1);

    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    // auto jump to next box if we typed a digit and we're not on last box
    if (digit && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    // handle Backspace: if current is empty, go to previous
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }

    // handle ArrowLeft / ArrowRight for nice UX
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    if (e.key === "ArrowRight" && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const finalCode = code.join(""); // "123456"

    // TODO: send finalCode to /api/auth/reset/verify or whatever route we build later
    console.log("Submitted reset code:", finalCode);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Verify your email
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              We’ve sent a 6-digit code to your email.
              <br />
              Enter it below to continue resetting your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
            {/* 6 digit inputs */}
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

            {/* Error / helper text placeholder */}
            <p className="text-xs text-gray-500 text-center">
              Didn’t get a code?{" "}
              <button
                type="button"
                className="text-black font-medium hover:underline"
                onClick={() => {
                  // TODO: trigger resend API
                  console.log("Resend code");
                }}
              >
                Resend code
              </button>
            </p>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full rounded-md bg-black py-3 text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              Continue
            </button>
          </form>

          {/* Footer link back to login */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <span className="mr-1">Remembered it?</span>
            <Link
              href="/auth/login"
              className="text-black font-medium hover:underline"
            >
              Go back to login
            </Link>
          </div>
        </div>

        {/* tiny legal / brand / etc */}
        <p className="text-center text-[11px] text-gray-400 mt-6">
          For security, this code will expire soon.
        </p>
      </div>
    </main>
  );
}
