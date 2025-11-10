"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CharityApplicationPage() {
  const [formData, setFormData] = useState({
    charityName: "",
    charityWebsite: "",
    registrationNumber: "",
    contactEmail: "",
    contactNumber: "",
    charityAddress: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Take it away Bogdan
      const response = await fetch("/api/charity-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      const result = await response.json();

      setSubmitStatus({
        type: "success",
        message:
          "Application submitted successfully! We'll review your application and get back to you soon.",
      });

      // Reset form after successful submission
      setFormData({
        charityName: "",
        charityWebsite: "",
        registrationNumber: "",
        contactEmail: "",
        contactNumber: "",
        charityAddress: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "There was an error submitting your application. Please try again.",
      });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
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

          {/* Status Messages */}
          {submitStatus.type && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-300"
                  : "bg-red-100 text-red-800 border border-red-300"
              }`}
            >
              {submitStatus.message}
            </div>
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
                  <input
                    type="text"
                    name="charityName"
                    value={formData.charityName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter charity name"
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
                className={`bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition ${
                  isSubmitting
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
