"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"; // <- bring SubmitHandler for strong typing
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpInput } from "@/lib/validation";
import { Input } from "@/components/forms/input";
import { PasswordInput } from "@/components/forms/passwordInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";   // ✅ add this


export default function SignUpPage() 
{
  const router = useRouter();                   // ✅ add this
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
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

  const [serverError, setServerError] = useState<string | null>(null);
  const [serverMsg, setServerMsg] = useState<string | null>(null);
  const onSubmit: SubmitHandler<SignUpInput> = async (values) => {
    setServerError(null);
    setServerMsg(null);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok) {
      const map: Record<string, string> = {
        EMAIL_TAKEN: "That email is already registered.",
        VALIDATION_ERROR: "Please fix the highlighted fields.",
        RATE_LIMITED: "Too many attempts. Try again in a minute.",
        SERVER_ERROR: "Something went wrong.",
      };
      setServerError(map[data?.code] ?? map.SERVER_ERROR);
      return;
    }
    router.push(`/auth/verify?email=${encodeURIComponent(values.email)}`);


    setServerMsg("Account created! Check your email to verify.");
    reset(); // clear the form after success

    
  };

  return (
    <div className="flex min-h-screen">
      <Link href="/">
        <Image //Logo appearing in top right of the screen, with link to home page
          src="/images/logo.png"
          alt="SustainWear"
          width={750}
          height={750}
          className="absolute top-6 left-6 w-64 h-auto cursor-pointer"
        />
      </Link>

      <main className="flex flex-col justify-center items-center mx-auto max-w-md p-6">
        <h1 className="mb-4 text-2xl font-semibold">Create your account</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3"
          noValidate
        >
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
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <PasswordInput
            label="Password"
            {...register("password")}
            error={errors.password?.message}
          />
          <PasswordInput
            label="Confirm password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("marketingOptIn")} /> Receive
            occasional updates
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("termsAccepted")} /> I accept
            the Terms
          </label>
          {errors.termsAccepted && (
            <span className="block text-xs text-red-600">
              {errors.termsAccepted.message}
            </span>
          )}

          {serverError && (
            <p role="alert" className="text-red-600">
              {serverError}
            </p>
          )}
          {serverMsg && <p className="text-green-700">{serverMsg}</p>}

          <button
            disabled={isSubmitting}
            className="w-full rounded bg-green-700 py-2 border-1 border-black text-white disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Sign up"}
          </button>
        </form>
        <h1>
          Already have an account with us?{" "}
          <a href="/auth/login" className="text-blue-500 underline">
            Log in
          </a>
        </h1>
      </main>

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
