// This tells Next.js that this file runs on the client (browser) side.
"use client";

import { useState } from "react";
// React-hook-form helps manage forms efficiently in React.
import { useForm, type SubmitHandler } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";
// signUpSchema defines the input validation rules (like required fields, email format, etc.)
import { signUpSchema, type SignUpInput } from "@/lib/validation";
import { Input } from "@/components/forms/input";
import { PasswordInput } from "@/components/forms/passwordInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage()
{
  const router = useRouter(); // This is used to redirect the user after signup success.

  // Here we set up the form with react-hook-form + Zod validation
  const {register, 
    handleSubmit, 
    formState: { errors },
    reset,} = useForm<SignUpInput>({ resolver: zodResolver(signUpSchema), // Here I am using the Zod schema for validation
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      marketingOptIn: false,
      termsAccepted: false,
    },
  });

  // Here we receive feedback messages from the server (API).
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false); // 👈 our own loading flag

  // This is the function that runs when a user clicks "Sign Up"
  const onSubmit: SubmitHandler<SignUpInput> = async (values) => {
    // Clear any previous messages for clean UI.
    setServerError(null);
    setServerMsg(null);
    setSubmitting(true); // ⏳ start loading


      try {
      // send signup request
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        // map backend codes -> friendly messages
        const map: Record<string, string> = {
          EMAIL_TAKEN: "That email is already registered.",
          VALIDATION_ERROR: "Please fix the highlighted fields.",
          RATE_LIMITED: "Too many attempts. Try again in a minute.",
          SERVER_ERROR: "Something went wrong.",
        };

        setServerError(map[data?.code] ?? map.SERVER_ERROR ?? "Something went wrong.");
        setSubmitting(false); // ❌ stop loading on error
        return;
      }

      // ✅ success
      setServerMsg("Account created! Check your email to verify.");

      // optional: clear form
      reset();

      // move to verification screen
      router.push(`/auth/verify?email=${encodeURIComponent(values.email)}`);

      // we'll still stop loading just in case this component stays mounted briefly
      setSubmitting(false);
    } catch (err) {
      console.error("signup error:", err);
      setServerError("Network error. Please try again.");
      setSubmitting(false); // ❌ stop loading on network fail
    }
  };

  // Page layout for Sign-Up form:
  return (
    // Logo appearing in top right of the screen, with link to home page
    <div className="flex min-h-screen">
      <Link href="/">
        <Image 
          src="/images/logo.png"
          alt="SustainWear"
          width={750}
          height={750}
          className="absolute top-6 left-6 w-64 h-auto cursor-pointer"/>
      </Link> 

      {/*The form section */}
      <main className="flex flex-col justify-center items-center mx-auto max-w-md p-6">
        <h1 className="mb-4 text-2xl font-semibold">Create your account</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
          noValidate>

          {/* First and Last name fields side by side */}
          <div className="flex gap-4">
            <Input
              label="First name"
              {...register("firstName")}
              error={errors.firstName?.message}/>
            <Input
              label="Last name"
              {...register("lastName")}
              error={errors.lastName?.message}/>
          </div>

          {/* Email and password inputs */}
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}/>
          <PasswordInput // Password field
            label="Password" 
            {...register("password")}
            error={errors.password?.message}/>
          <PasswordInput // Confirm Password field
            label="Confirm password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}/>

          {/* Checkboxes for marketing and terms */}
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("marketingOptIn")}/>Receive occasional updates
          </label> 

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("termsAccepted")} />I accept the Terms
          </label>

          {/* If user forgots to tick terms */}
          {errors.termsAccepted && (
            <span className="block text-xs text-red-600">
              {errors.termsAccepted.message}
            </span>
          )}

          {/* Server errors (For example, if an email is already taken) */}
          {serverError && (
            <p role="alert" className="text-red-600">
              {serverError}
            </p>
          )}

          {/* Success message */}
          {serverMsg && <p className="text-green-700">{serverMsg}</p>}

          {/* Submit button */}
          <button
            disabled={submitting}
            className="w-full rounded bg-green-700 py-2 border border-black text-white disabled:opacity-50 cursor-pointer hover:bg-green-800 transition-colors">
            {submitting ? "Creating..." : "Sign up"}
          </button>
        </form>

        {/* Link to login page */}
        <h1>
          Already have an account with us?{" "}
          <a href="/auth/login" className="text-blue-500 underline">Log in
          </a>
        </h1>
      </main>

      {/* Right side Image for decoration */}
      <div className="w-1/2 flex-col justify-center items-center bg-green-200">
        <Image
          src="/images/signupShapes.png"
          alt="shapes"
          width={750}
          height={750}
          className="mx-auto"
        />
        <Image
          src="/images/signupLady.png"
          alt="signupLady"
          width={750}
          height={750}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
