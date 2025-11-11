"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { charityApplicationSchema, type CharityApplication } from "@/lib/validation";
import { Input } from "@/components/forms/input";

import Link from "next/link";

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
            setError(name as keyof CharityApplication, { type: "server", message: String(message) }); // Send any errors into React Hook Form. setError is a special RHF Function that manually tells RHF that a specific input has an error.
          });
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

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Left Side - Charity Information */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-medium text-green-700 mb-4">
                Charity Information
              </h2>

              <div className="flex flex-col gap-4">
                <div>
                  <Input
                    label="Charity Name"
                    {...register("charityName")}
                    error={errors.charityName?.message}
                  />
                </div>

                <div>
                  <Input
                    label="Charity Website"
                    {...register("charityWebsite")}
                    error={errors.charityWebsite?.message}
                  />
                </div>

                <div>
                  <Input
                    label="Registration Number"
                    {...register("registrationNumber")}
                    error={errors.registrationNumber?.message}
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
                  <Input
                    label="Charity email"
                    {...register("email")}
                    error={errors.email?.message}
                  />
                </div>

                <div>
                  <Input
                    label="Contact number"
                    {...register("phoneNumber")}
                    error={errors.phoneNumber?.message}
                  />
                </div>

                <div>
                  <Input
                    label="Charity address"
                    {...register("address")}
                    error={errors.address?.message}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button - Spans full width */}
            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                disabled={submitting}
                className="w-full rounded bg-green-700 py-2 border border-black text-white disabled:opacity-50 cursor-pointer hover:bg-green-900 transition-colors"
              >
                {submitting ? "Sending application" : "Apply"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
