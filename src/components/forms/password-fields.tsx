"use client";

import { useState } from "react";

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
};

export function PasswordField({
  id,
  label,
  value,
  onChange,
  required,
  error,
  className,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Label */}
      <label
        htmlFor={id}
        className="text-gray-900 font-medium mb-2"
      >
        {label}
      </label>

      {/* Input wrapper so we can position the toggle button */}
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          required={required}
          value={value}
          onChange={onChange}
          className={`border border-gray-400 rounded-md px-3 py-2 pr-16 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700 ${className ?? ""}`}
        />

        {/* Show / Hide toggle */}
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          aria-label={show ? "Hide password" : "Show password"}
          aria-pressed={show}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-xs
            font-medium
            text-gray-600
            hover:text-gray-900
            underline
          "
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      {/* Optional error message (for signup validation) */}
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
