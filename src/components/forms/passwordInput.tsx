"use client";
import { useState } from "react";
import { Input } from "./input";

export function PasswordInput(
  props: Omit<Parameters<typeof Input>[0], "type">
) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input {...props} type={show ? "text" : "password"} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-2 top-8 text-sm underline"
        aria-pressed={show}
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}
