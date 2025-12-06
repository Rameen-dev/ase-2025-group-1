import React, { ComponentProps } from "react";
import clsx from "clsx";

type Props = ComponentProps<"input"> & { label: string; error?: string };

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, id, /* REMOVE name here */ ...props }, ref) => {
    const inputId = id ?? (props.name as string | undefined);   // use name from props
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <label htmlFor={inputId} className="block">
        <span className="mb-1 block text-sm">{label}</span>
        <input
          ref={ref}
          id={inputId}
          /** ✅ keep the name on the element */
          name={props.name}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={clsx(
            "w-full rounded border p-2 outline-none",
            error ? "border-red-500" : "border-gray-300",
            className
          )}
          {...props}   // includes onChange, onBlur from register()
        />
        {error && (
          <span id={errorId} className="mt-1 block text-xs text-red-600">
            {error}
          </span>
        )}
      </label>
    );
  }
);
Input.displayName = "Input";
