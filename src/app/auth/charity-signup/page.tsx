"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/forms/input";
import { PasswordInput } from "@/components/forms/passwordInput";

export default function CharitySignupPage() {
  // Get URL parameters (charity name and email from the application)
  const searchParams = useSearchParams();

  // Pre-filled data from the charity application
  const [charityData, setCharityData] = useState({
    charityName: "",
    email: "",
  });

  // Form data for password fields
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  // Extract charity info from URL parameters when component loads
  useEffect(() => {
    const name = searchParams.get("charityName") || "";
    const email = searchParams.get("email") || "";

    setCharityData({
      charityName: decodeURIComponent(name),
      email: decodeURIComponent(email),
    });
  }, [searchParams]);

  // Handle password input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Validate passwords match
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch("/api/charity-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          charityName: charityData.charityName,
          email: charityData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      // Redirect to login or dashboard after successful signup
      // router.push("/auth/login");
      alert("Account created successfully!");
    } catch (error) {
      console.error("Signup error:", error);
      alert("There was an error creating your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* Info Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
          <p className="text-blue-800 text-sm">
            ℹ️ Your charity information has been pre-filled and cannot be
            changed. If you need to update it, please contact support.
          </p>
        </div>

        {/* Form */}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              isSubmitting || !charityData.charityName || !charityData.email
            }
            className={`w-full py-3 rounded-lg font-semibold transition ${
              isSubmitting || !charityData.charityName || !charityData.email
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#2E7D32] text-white hover:bg-green-800"
            }`}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

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
