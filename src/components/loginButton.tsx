"use client";
import Link from "next/link";

export function LoginButton() {
  return (
    <Link
      href="/auth/login"
      className="inline-block rounded bg-gray-900 px-4 py-2 text-white font-medium hover:bg-gray-800 transition">
      Log In
    </Link>
  );
}
