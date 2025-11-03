// app/auth/signup/page.tsx
// This file renders the "Create Account" page and handles the signup form.
// We use a React Hook Form (RHF) + Zod for validation and call our /api/signup route on submit

"use client";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpInput } from "@/lib/validation"; // Zod schema and validation check for Signup
import { Input } from "@/components/forms/input"; // Our reusable Input (Forwards ref)
import { PasswordInput } from "@/components/forms/passwordInput"; // Our reusable password input (forwards ref)
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

/** Our React Hook Form setup
 * Resolver - Connects Zod to RHF so Zod errors become RHF field errors.
 * DefaultValues:  Initial values for all fields (helps with controlled inputs).
 * Mode - reValidateMode: When to validate (on blur, then change after that).
 */

export default function SignUpPage() {
  const router = useRouter();

  const {
    register, // Here we register "fieldName" and wire an input to RHF
    handleSubmit, // This wraps our onSubmit. Only calls it if the form is valid.
    formState: { errors }, // Zod/RHF Messages appear here (e.g., errors.email?.message)
    reset, // Clear the form after successful Signup
    setError, // To push server-side field errors into RHF (e.g., "email already in use")
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
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

  // UI Flags/ messages owned by the component (not RHF) 
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<React.ReactNode | null>(null);

  /** onSubmit runs ONLY if RHF+Zod say the form is valid
   * We post to /api/signup and then:
   * - If the API returns field errors, we direct them into RHF with setError so they render under the inputs.
   * - If the API returns a general error (code), we show it above the form.
   * - On success, show a message and send the user to /auth/verify
   */

  const onSubmit: SubmitHandler<SignUpInput> = async (values) => {
    // Here we clear any previous messages
    setServerError(null);
    setServerMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      // Try to parse JSON even on error to read { code, fieldErrors }
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // 1) Field-level errors from server (e.g., { fieldErrors: { email: "Email already in use" } })
        if (data?.fieldErrors) {
          Object.entries(data.fieldErrors).forEach(([name, message]) => {
            setError(name as keyof SignUpInput, { type: "server", message: String(message) });
          });
        }

        // 2) General server code (shown above the form)
        if (data?.code && !data?.fieldErrors) {
          const map: Record<string, React.ReactNode> = {
            EMAIL_TAKEN: "That email is already registered.",
            VALIDATION_ERROR: "Please fix the highlighted fields.",
            RATE_LIMITED: "Too many attempts. Try again in a minute.",
            SERVER_ERROR: "Something went wrong.",
          };
          setServerError(map[data.code] ?? "Unexpected error occurred.");
        }

        setSubmitting(false);
        return; // Don't run success logic.
      }

      // Successful signup: We tell the user and redirect them to email verification screen.
      setServerMsg("Account created! Check your email to verify.");
      reset();
      router.push(`/auth/verify?email=${encodeURIComponent(values.email)}`);
      setSubmitting(false);
    } catch {
      // Network or unexpected client error
      setServerError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  // Page layout for Sign-Up form:
  return (
    // Logo appearing in top right of the screen, with link to home page
    <div className="relative flex min-h-screen">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="SustainWear"
          width={600}
          height={600}
          className="absolute top-6 left-1/2 -translate-x-1/2 md:left-30 w-48 md:h-auto cursor-pointer"
        />
      </Link>

      {/*The form section */}
      <main className="flex flex-col justify-center items-center mx-auto max-w-md pt-25 p-6">
        <h1 className="mb-4 text-2xl font-semibold">Create your account</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
          noValidate
        >
          {/* First and Last name fields side by side */}
          <div className="flex gap-4">
            <Input
              label="First name"
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <Input
              label="Last name"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
          </div>

          {/* Email and password inputs */}
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <PasswordInput // Password field
            label="Password"
            {...register("password")}
            error={errors.password?.message}
          />
          <PasswordInput // Confirm Password field
            label="Confirm password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          {/* Checkboxes for marketing and terms */}
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("marketingOptIn")} />
            Receive occasional updates
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("termsAccepted")} />I accept the
            Terms
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
            className="w-full rounded bg-green-700 py-2 border border-black text-white disabled:opacity-50 cursor-pointer hover:bg-green-800 transition-colors"
          >
            {submitting ? "Creating..." : "Sign up"}
          </button>
        </form>

        {/* Link to login page */}
        <h1>
          Already have an account with us?{" "}
          <a
            href="/auth/login"
            className="text-blue-500 underline hover:text-blue-800"
          >
            Login
          </a>
        </h1>
      </main>

      {/* Right side Image for decoration */}
      <div className="hidden md:flex md:w-1/2 md:flex-col md:justify-center md:items-center md:bg-green-100">
        <Image
          src="/images/signupShapes.png"
          alt="shapes"
          width={750}
          height={750}
          className="w-auto h-100 object-contain"
        />
        <Image
          src="\illustrations\undraw_window-shopping_9l2k.svg"
          alt="signupLady"
          width={500}
          height={500}
          className="w-auto h-100 object-contain"
        />
      </div>
    </div>
  );
}
