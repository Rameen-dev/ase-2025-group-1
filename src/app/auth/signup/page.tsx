"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"; // <- bring SubmitHandler for strong typing
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpInput } from "@/lib/validation";
import { Input } from "@/components/forms/input";
import { PasswordInput } from "@/components/forms/passwordInput";
import Image from "@images/logo.png";
import { logDOM } from "@testing-library/react";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
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

    setServerMsg("Account created! Check your email to verify.");
    reset(); // clear the form after success
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-full h-96 bg-[url('/your-image.jpg')] bg-cover bg-center bg-no-repeat"></div>

      <div className="w-1/2 flex items-center justify-center">
        <main className="mx-auto max-w-md p-6">
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
              className="w-full rounded bg-green-700 py-2 text-white disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Sign up"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
