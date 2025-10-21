import { z } from "zod"; //library, making input validation easy and quick

export const signUpSchema = z.object({
  firstName: z.string().trim().min(1, "Required"),
  middleName: z.string().trim().optional().or(z.literal("")),
  lastName: z.string().trim().min(1, "Required"),
  email: z.string().trim().toLowerCase().email("Invalid email"),
  phone: z.string().trim().optional().or(z.literal("")),
  password: z.string().min(8, "Min 8 characters"),
  marketingOptIn: z.boolean().default(false),
  termsAccepted: z.boolean().refine(Boolean, "You must accept the terms"),
});
export type SignUpInput = z.infer<typeof signUpSchema>;
