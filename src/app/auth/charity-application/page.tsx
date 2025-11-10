"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { charityApplicationSchema, type CharityApplication } from "@/lib/validation";
import { Input } from "@/components/forms/input";

import Link from "next/link";
import { nullable } from "zod";

export default function CharityApplicationPage() {
  const {
    register, // Here we register "fieldName" and wire an input to RHF
    handleSubmit, // This wraps our onSubmit. Only calls it if the form is valid.
    formState: { errors }, // Zod/RHF Messages appear here (e.g., errors.email?.message)
    reset, // Clear the form after successful Signup
    setError, // To push server-side field errors into RHF (e.g., "email already in use")
  } = useForm<CharityApplication>({
    resolver: zodResolver(charityApplicationSchema),
    mode: "onBlur", // First show an error when you leave a field, then once an error is visible, re-validate as you type to clear it quickly.
    reValidateMode: "onChange",
    defaultValues: {
      charityName: "",
      charityWebsite: "",
      registrationNumber: null,
      email: "",
      phoneNumber: "",
      address: "",
    },
  });

  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<React.ReactNode | null>(null);

  const onSubmit: SubmitHandler<CharityApplication> = async (values) => {
    // Here we clear any previous messages
    setServerError(null);
    setServerMsg(null);
    setSubmitting(true);

    // Send the form to our API route.
    try {
      const res = await fetch("/api/charity-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      // Try to parse JSON even on error to read { code, fieldErrors }
      // If it fails, just use an empty object {} instead of crashing.
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // 1) Field-level errors from server (e.g., { fieldErrors: { email: "Email already in use" } })
        // This logic uses the parsed object to decide what kind of error it was.
        if (data?.fieldErrors) { // Here we check if there are any field errors, otherwise skip this.
          Object.entries(data.fieldErrors).forEach(([name, message]) => { // Here we turn the fieldErrors object into a list of pairs.
            setError(name as keyof SignUpInput, { type: "server", message: String(message) }); // Send any errors into React Hook Form. setError is a special RHF Function that manually tells RHF that a specific input has an error.
          });
        }

        // 2) General server code (shown above the form)
        if (data?.code && !data?.fieldErrors) { // Here we check if there's a general code
          // Below is a map of known codes to friendly messages
          const map: Record<string, React.ReactNode> = { // This tells TypeScript, this object maps string keys, like "EMAIL_TAKEN" to React-friendly text or JSX.
            EMAIL_TAKEN: "That email is already registered.",
            VALIDATION_ERROR: "Please fix the highlighted fields.",
            RATE_LIMITED: "Too many attempts. Try again in a minute.",
            SERVER_ERROR: "Something went wrong.",
          };
          setServerError(map[data.code] ?? "Unexpected error occurred."); // Here we look up data.code in the map. 
          // If it can't find a match (data.code isn't in the map), we use the default message of "Unexpected error occurred."
        }

        setSubmitting(false);
        return; // Don't run success logic
      }

      // Successful signup: We tell the user and redirect them to email verification screen
      setServerMsg("Account created! Check your email to verify.");
      reset();
      // encodeURIComponent() ensures special characters like "@" are safe in URLs. For example, "r.burdabar@gmail.com", the "@" will be encoded 

      setSubmitting(false);
    } catch { // This catch part runs only if something goes wrong in the try block. 
      // For example, the network is down (No internet).
      setServerError("Network error. Please try again."); // 
      setSubmitting(false);
    }
  };



  return (
    <main>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
        {/* Logo */}
        <div className="w-full max-w-6xl flex items-center justify-between mb-10">
          <Link href="/">
            <h1 className="font-kalam mt-2 pd-4 text-5xl md:text-4xl cursor-pointer hover:opacity-80 transition">
              <span className="text-[#2E7D32]">S</span>ustain
              <span className="text-[#2E7D32]">W</span>ear
            </h1>
          </Link>
          <Link
            href="/"
            className="text-gray-600 hover:text-[#2E7D32] transition"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Main Form Container */}
        <div className="w-full max-w-4xl bg-white shadow-md rounded-xl p-10">
          <h1 className="font-kalam text-5xl font-regular mb-2 text-center">
            Become a <span className="text-[#2E7D32]">SW</span> Partner
          </h1>
          <p className="text-gray-600 text-center mb-8 italic">
            Fill in the application form to become a Charity on the{" "}
            <span className="text-[#2E7D32]">SustainWear</span> platform
          </p>

          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Left Side - Charity Information */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-medium text-green-700 mb-4">
                Charity Information
              </h2>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Charity Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    label="Charity Name"
                    {...register("org_name")}
                    error={errors.charityName?.message}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Charity Website <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    name="charityWebsite"
                    value={formData.charityWebsite}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. https://charity.org"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Registration Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. 12345678"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Contact Details */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-medium text-green-700 mb-4">
                Contact Details
              </h2>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Contact Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. contact@charity.org"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. +44 123 456 789"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Charity Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="charityAddress"
                    value={formData.charityAddress}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Street, City, Postcode"
                    rows={3}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Submit Button - Spans full width */}
            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition ${isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-700"
                  }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
