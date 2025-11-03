// app/auth/signup/page.tsx
"use client";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpInput } from "@/lib/validation";
import { Input } from "@/components/forms/input";
import { PasswordInput } from "@/components/forms/passwordInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,                           // ✅ NEW
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

  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<React.ReactNode | null>(null);

  const onSubmit: SubmitHandler<SignUpInput> = async (values) => {
    setServerError(null);
    setServerMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // ✅ NEW: show field errors under inputs
        if (data?.fieldErrors) {
          Object.entries(data.fieldErrors).forEach(([name, message]) => {
            setError(name as keyof SignUpInput, { type: "server", message: String(message) });
          });
        }

        // Optional generic message
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
        return;
      }

      setServerMsg("Account created! Check your email to verify.");
      reset();
      router.push(`/auth/verify?email=${encodeURIComponent(values.email)}`);
      setSubmitting(false);
    } catch {
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
