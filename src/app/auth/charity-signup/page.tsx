"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/forms/input";
import { PasswordInput } from "@/components/forms/passwordInput";

export default function CharitySignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || "";

  // Prefilled charity data from the backend (via token)
  const [charityData, setCharityData] = useState({
    charityName: "",
    email: "",
  });

  // Password form state
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

useEffect(() => {
  if (!token) {
    setLinkError("This signup link is invalid.");
    setLoading(false);
    return;
  }

  const loadCharityData = async () => {
    try {
        const res = await fetch("/api/charity-applications/complete-signup/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      // ✅ If the route 404s or errors, don't try to parse JSON
      if (!res.ok) {
        const text = await res.text(); // HTML / error body
        console.error(
          "Validate API error:",
          res.status,
          res.statusText,
          text.slice(0, 200)
        );
        setLinkError("This signup link is invalid or has expired.");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (!data.valid) {
        setLinkError(
          data.message || "This signup link is invalid or has expired."
        );
        setLoading(false);
        return;
      }

      setCharityData({
        charityName: data.charity.name,
        email: data.charity.email,
      });
      setLoading(false);
    } catch (err) {
      console.error("Validate token error:", err);
      setLinkError("There was a problem validating your link.");
      setLoading(false);
    }
  };

  loadCharityData();
}, [token]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validatePasswords = () => {
    const newErrors: typeof errors = {};

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) return;
    if (!token) {
      setLinkError("Missing signup token.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/charity-applications/complete-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to complete signup");
      }

      // Success – you can redirect to login
      // or show a success state then redirect
      alert("Your account has been created successfully.");
      router.push("/auth/login");
    } catch (err) {
      console.error("Complete signup error:", err);
      alert(
        "There was an error completing your signup. Your link may have expired."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormDisabled =
    loading || !!linkError || !charityData.charityName || !charityData.email;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8F8F8] text-black p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <h1 className="font-kalam text-4xl cursor-pointer hover:opacity-80 transition">
              <span className="text-[#2E7D32]">S</span>ustain
              <span className="text-[#2E7D32]">W</span>ear
            </h1>
          </Link>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Charity Account Registration
        </h2>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Complete your registration to start managing donations
        </p>

        {/* Link / token errors */}
        {linkError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <p className="text-red-800 text-sm">
              ⚠️ {linkError}
            </p>
          </div>
        )}

        {!linkError && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <p className="text-blue-800 text-sm">
              ℹ️ Your charity information has been pre-filled and cannot be
              changed. If you need to update it, please contact support.
            </p>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <p className="text-center text-gray-500 text-sm">
            Validating your signup link...
          </p>
        ) : !linkError ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Pre-filled Charity Name (Disabled) */}
            <div>
              <Input
                label="Charity Name"
                name="charityName"
                value={charityData.charityName}
                disabled
                className="bg-gray-100 text-gray-600 cursor-not-allowed"
                placeholder="Loading..."
              />
              <p className="text-xs text-gray-500 mt-1">
                This field is pre-filled from your application
              </p>
            </div>

            {/* Pre-filled Email (Disabled) */}
            <div>
              <Input
                label="Charity Email"
                name="email"
                type="email"
                value={charityData.email}
                disabled
                className="bg-gray-100 text-gray-600 cursor-not-allowed"
                placeholder="Loading..."
              />
              <p className="text-xs text-gray-500 mt-1">
                This field is pre-filled from your application
              </p>
            </div>

            {/* Password */}
            <PasswordInput
              label="Password *"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              placeholder="Enter password (min. 8 characters)"
            />

            {/* Confirm Password */}
            <PasswordInput
              label="Confirm Password *"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              placeholder="Confirm password"
            />

            <button
              type="submit"
              disabled={isSubmitting || isFormDisabled}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                isSubmitting || isFormDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#2E7D32] text-white hover:bg-green-800"
              }`}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        ) : null}

        {/* Login Link */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#2E7D32] font-medium hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </main>
  );
}
