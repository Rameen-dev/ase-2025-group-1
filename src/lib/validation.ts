import { z } from "zod"; //library, making input validation easy and quick

export const signUpSchema = z
  .object({
    firstName: z.string().trim().min(1, "Required"),
    lastName: z.string().trim().min(1, "Required"),
    email: z.string().trim().toLowerCase().email("Invalid email"),
    password: z.string().min(8, "Min 8 characters"),
    confirmPassword: z.string(),
    marketingOptIn: z.boolean().default(false),
    termsAccepted: z.boolean().refine(Boolean, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
export type SignUpInput = z.infer<typeof signUpSchema>;
