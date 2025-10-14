"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkBase =
    "block px-3 py-2 rounded-md text-sm font-medium transition hover:bg-gray-100";
  const active = "bg-white text-gray-900";
  const inactive = "text-gray-700";

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold tracking-tight">
            SustainWear
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`${linkBase} ${
                  pathname === l.href ? active : inactive
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* Auth buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm border bg-green-300 rounded-md hover:bg-green-400 transition"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm border bg-green-300 rounded-md hover:bg-green-400 transition"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2
             hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {/* Icon changes when open */}
            <svg
              className={`h-6 w-6 ${open ? "hidden" : "block"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className={`h-6 w-6 ${open ? "block" : "hidden"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`
          md:hidden overflow-hidden border-t border-gray-200
          transition-[max-height,opacity] duration-300 ease-out
          ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 py-3 space-y-1 bg-white">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block ${linkBase} ${
                pathname === l.href ? active : inactive
              }`}
            >
              {l.label}
            </Link>
          ))}

          <div className="mt-2 grid grid-cols-2 gap-2">
            <Link
              href="/login"
              className="w-full text-center px-4 py-2 text-sm rounded-md
               bg-green-300 text-black hover:bg-green-400 transition"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="w-full text-center px-4 py-2 text-sm rounded-md
               bg-green-300 text-black hover:bg-green-400 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
