import React, { ComponentProps, useState } from "react";
import clsx from "clsx";

type Props = ComponentProps<"input"> & { label: string; error?: string };

export const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, id, /* REMOVE name here */ ...props }, ref) => {
    const [show, setShow] = useState(false);
    const inputId = id ?? (props.name as string | undefined);
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <label htmlFor={inputId} className="block">
        <span className="mb-1 block text-sm">{label}</span>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            /** ✅ keep the name on the element */
            name={props.name}
            type={show ? "text" : "password"}
            aria-invalid={!!error}
            aria-describedby={errorId}
            className={clsx(
              "w-full rounded border p-2 pr-12 outline-none",
              error ? "border-red-500" : "border-gray-300",
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShow(v => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm underline"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
        {error && (
          <span id={errorId} className="mt-1 block text-xs text-red-600">
            {error}
          </span>
        )}
      </label>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
