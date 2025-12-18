// This Unit Test is for our shared password rules.
// This test ensures that our password policy stays consistent across our 

// 1. - Sign-up
// 2. - Password Reset

import { strongPasswordSchema } from "@/lib/validation";

describe("strongPasswordSchema", () => {
    test("Accepts a strong password that meets all the rules.", () => {
        // The safeParse() returns { success: true, data: } if its valid
        const result = strongPasswordSchema.safeParse("Reefat1!");

        expect(result.success).toBe(true);
    });
        // Here
    test("Should Reject if password is shorter than 8 characters", () => {
        const result = strongPasswordSchema.safeParse("Re1!");

        expect(result.success).toBe(false);
    });

    test("Should Reject if password is missing an uppercase letter", () => {
        const result = strongPasswordSchema.safeParse("reefat1!");

        expect(result.success).toBe(false);
    })

    test("Should reject is password is missing a lowercase letter", () => {
        const result = strongPasswordSchema.safeParse("REEFAT1!");

        expect(result.success).toBe(false); 
    });

    test("Should reject is password is missing a number", () => {
        const result = strongPasswordSchema.safeParse("Reefat!!");

        expect(result.success).toBe(false);
    });

    test("Should reject if password is missing a special character", () => {
        const result = strongPasswordSchema.safeParse("Reefat12");
        
        expect(result.success).toBe(false);
    });
});