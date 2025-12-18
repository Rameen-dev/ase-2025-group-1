import { signUpSchema } from "@/lib/validation";
import { sign } from "crypto";

describe("signUpSchema", () => {
    test("This test is for accepting valid sign-up details", () => {
        const result = signUpSchema.safeParse({
            firstName: "Rameen",
            lastName: "Burdabar",
            email: "test@example.com",
            password: "Password123!",
            confirmPassword: "Password123!",
            marketingOptIn: false,
            termsAccepted: true,
        });
        expect(result.success).toBe(true);
    });

    test("This test will reject when confirmPassword does not match password", () => {
        const result = signUpSchema.safeParse({
            firstName: "Rameen",
            lastName: "Burdabar",
            email: "test@example.com",
            password: "Reefat1!",
            confirmPassword: "Reefat!!", // Mismatch on purpose for test
            marketingOptIn: false,
            termsAccepted: true,
        });
        expect(result.success).toBe(false);
    });

    test("This test should reject signup validation for if the Terms Accepted is left false (Not ticked)", () => {
        const result = signUpSchema.safeParse({
            firstName: "Rameen",
            lastName: "Burdabar",
            email: "test@example.com",
            password: "Reefat1!",
            confirmPassword: "Reefat1!",
            marketingOptIn: false,
            termsAccepted: false,
        });
        expect(result.success).toBe(false);
    });

    test("This test will normalise an email address by trimming and converting it to lowercase", () => {
        const result = signUpSchema.safeParse({
            firstName: "Rameen",
            lastName: "Burdabar",
            email: " TEST@EXAMPLE.COM ",
            password: "Reefat1!",
            confirmPassword: "Reefat1!",
            marketingOptIn: false,
            termsAccepted: true,
        });
        expect(result.success).toBe(true);
    });
});