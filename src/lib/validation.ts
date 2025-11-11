import { z } from "zod";

// Zod schema describing the shape and rules for the signup form

// This schema defines all the fields that appear in your signup form.
// Each field includes its own rules: Minimum length, Valid email format, etc.
// When the user submits the form, Zod automatically checks if their input matches these rules.

export const signUpSchema = z
  .object({
    // First name: Must be a non-empty string with at least 1 character after trimming spaces.
    firstName: z.string().trim().min(1, "Required"),
    // Last name: Same rule as first name.
    lastName: z.string().trim().min(1, "Required"),
    // Converts email to lowercase, removes extra spaces and checks if it's a valid email format.
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email"),
    // Password must meet all requirements below:
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long") // Must be 8 characters long,
      .regex(/[A-Z]/, "Must contain at least one uppercase letter") // One Uppercase letter,
      .regex(/[a-z]/, "Must contain at least one lowercase letter") // One lowercase letter,
      .regex(/[0-9]/, "Must contain at least one number") // One number,
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"), // One special character.

    // This field will later be compared with 'Password'.
    confirmPassword: z.string(),
    // Marketing Opt In:
    // This us a checkbox (True or false); will default to false if user doesn't tick it.
    marketingOptIn: z.boolean().default(false),
    // This is another checkbox that MUST be true for the form to submit successfully.
    termsAccepted: z
      .boolean()
      .refine((v) => v === true, "You must accept the terms"),
  })

  // cross-field rule: password === confirmPassword
  // Zod here looks at both password fields together and ensures confirm password matches exactly what was typed in 'password'.
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });


export const charityApplicationSchema = z
  .object({
    charityName: z.string().trim().min(1, "Required"),
    charityWebsite: z.string().url("Enter valid URL"),
    registrationNumber: z
      .number()
      .min(1, "Enter a valid registration number"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email"),
    phoneNumber: z
      .string()
      .trim()
      .regex(/^[+\d\s()-]{7,20}$/, "Invalid phone number format"),
    address: z.string().trim().min(1, "Address is required"),
  })

// This creates a TS type that matches the schema above
export type SignUpInput = z.infer<typeof signUpSchema>;
export type CharityApplication = z.infer<typeof charityApplicationSchema>