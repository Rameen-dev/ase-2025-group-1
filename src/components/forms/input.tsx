import { ComponentProps } from "react";
import clsx from "clsx";

type Props = ComponentProps<"input"> & { label: string; error?: string };
export function Input({ label, error, className, ...props }: Props) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm">{label}</span>
      <input
        {...props}
        className={clsx(
          "w-full rounded border p-2 outline-none",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
      />
      {error && (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      )}
    </label>
  );
}
