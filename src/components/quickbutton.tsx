"use client";
import Link from "next/link";

export function SignUpButton() {
  return (
    <Link
      href="/auth/signup"
      className="inline-block rounded bg-black px-4 py-2 text-white font-medium hover:bg-gray-800 transition"
    >
      Sign Up
    </Link>
  );
}
