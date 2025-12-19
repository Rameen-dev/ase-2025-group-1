/** @jest-environment node */


// This unit test is for our confirm route.ts (API)
// We want to test the route logic without touching the real database and without doing real password hashing and comparing
// Hence why we mock Prisma and bcrypt


// Here we first mock Prisma which replaces the real Prisma import. This mock must appear before we import the route
// because when the route imports prisma, we want it to receive this fake prisma, not the real one connected to a database.

// This line tells jest, Whenever the code imports "@/lib/prisma", 
// don't use the real file, use this mock (fake) version instead
jest.mock("@/lib/prisma", () => ({
    // Here is what the mocked Prisma module should look like
    prisma: {
    user: {
        // We create two mock function which does nothing by default but allows us to control what it returns
        findUnique: jest.fn(),
        update: jest.fn(),
    },
    },
}));

// This line tells jest, Whenever the code imports "bcrypt", 
// don't use the real file, use this mock (fake) version instead
jest.mock("bcrypt", () => ({
    // Here we mock the bcrypt.compare function and bcrypt.hash
    compare: jest.fn(),
    hash: jest.fn(),
}));

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

// Now we import the real POST handler after mocks are set up
import { POST } from "@/app/api/auth/reset/confirm/route";

// Here we create a fake NextRequest object with a json function
function makeRequest(body: any) {
    return {
        // When the route calls await request.json() it will get our test data
        json: async () => body,
    } as any;
}

// Our related group tests are defined below
describe("POST /api/auth/reset/confirm", () => {
    beforeEach(() => {
        // Here we simply reset mock history every test so the tests don't affect each other
        jest.clearAllMocks();
    });

    // TEST 1 - Invalid Email
    test("This should return 400 status when input is invalid (Invalid email for this test)", async () => {
        // Here we build a request with an invalid input (Email) and expect the route's zod validation to reject it.
        const request = makeRequest({
            email: "invalid email", // Invalid email format
            newPassword: "Reefat1!",
        });
        // Here we call the route handler, which runs the real code in route.ts
        const response = await POST(request);
        // Here we check for the status code (400 = Bad request)
        expect(response.status).toBe(400);

        // The route returns JSON via NextResponse.json which works in a node environment, returning the body object
        const data = await response.json();
        // The success (outcome) should be a boolean, either true or false.
        expect(typeof data.success).toBe("boolean");

        // The message explaining the validation issue should be a string.
        expect(typeof data.message).toBe("string");
    });

    // TEST 2 - Weak Password
    test("This should return 400 status when password fails the strongPasswordSchema (Meaning that it is too weak)", async () => {
        
        // Here we build a request with a weak password according to our zod schema rules.
        const request = makeRequest({
            email: "test@example.com",
            newPassword: "weak", // Too short/ Missing number/ Missing special character/ Missing capital letter
        });

        const response = await POST(request);
        expect(response.status).toBe(400);
        
        const data = await response.json();
        expect(data.success).toBe(false);
        expect(typeof data.message).toBe("string");
    });

    // TEST 3 - User does not exist
    test("This should return 400 status with a neutral message when a user does not exist (User hasn't signed up)", async () => {
        
        // Here we force prisma.user.findUnique to return null
        // Here we force findUnique to return null in order to simulate "The email provided is not registered in the system."
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        
        // Here we create a real HTTP request object where the email is valid as well as the password
        // This is important because we want the request to pass validation in order to reach the business-logic area
        const request = makeRequest({
            email: "missing@example.com",
            newPassword: "Password123!",
        });

        const response = await POST(request);
        expect(response.status).toBe(400);

        const data = await response.json();
        expect(data.success).toBe(false);
        // Our security behaviour falls here. It prevents attackers from discovering which emails are registered (email enumeration).
        expect(data.message).toBe("Unable to reset password.");
    });
    // TEST 4 - Prevent password reuse
    test("This should return 400 status if new password matches old password (This prevents reuse of old passwords)", async () => {
        
        // Here we create a fake user object in our mock database
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({
            user_id: 123,
            password_hash: "$342$3253224OLD_HASH",
        });

        // Here we force the Bcrypt compare true in order to simulate password reuse.
        // If bcrypt.compare returns true, this means the new password is the same as the old password.
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);

        // Here we create a request with the same password
        const request = makeRequest({
            email: "test@example.com",
            newPassword: "Password123!",
        });

        // Here we call our API route
        const response = await POST(request);

        expect(response.status).toBe(400);
        const data = await response.json();

        // The success should be false, since the backend should reject this
        expect(data.success).toBe(false);

        // This ensures that password reuse is blocked
        expect(data.message).toBe("New password cannot be the same as your current password.");
        
        // This line ensures the backend does not update the user's password for if the new password is to be the same as the old one.
        expect(prisma.user.update).not.toHaveBeenCalled();
    });

    // TEST 5 - Successful password update
    test("This should return 200 status and update a password when input is valid", async () => {
        // Here we once again mock the database to return a fake user
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({
            user_id: 123,
            password_hash: "$342$3253224OLD_HASH",
        });

        // We mock bcrypt.compare to return false
        // This means the new password does not match the old password
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        // Here we mock bcrypt.hash to return a fake new hash
        // This pretends bcrypt successfully hashed the new password
        (bcrypt.hash as jest.Mock).mockResolvedValue("$342$3253224OLD_HASH");

        // Here we mock prisma update to simulate a successful database update
        (prisma.user.update as jest.Mock).mockResolvedValue({
            user_id: 123,
        });

        // Here we create a fake request
        const request = makeRequest({
            email: "test@example.com",
            newPassword: "Password123!",
        });

        // The API logic runs here, it finds the user, checks the old password, hashes the new password and updates the database
        const response = await POST(request);

        // We expect a 200 status response since new password is different from the old, meaning a successful password change
        expect(response.status).toBe(200);

        // Here we check the json response, ensuring the API returns the correct success message
        const data = await response.json();
        expect(data.success).toBe(true);
        expect(data.message).toBe("Password updated successfully.");

        // Here we ensure prisma.update was called correctly
        expect(prisma.user.update).toHaveBeenCalledWith({
            where: { user_id: 123 },
            data: { password_hash: "$342$3253224OLD_HASH"},
        })
    });

    // TEST 6 - Catch block unexpected error
    test("This test returns 500 status when an unexpected error happens", async () => {
        
        const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
        // Here we force the database to throw an error
        (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error("Database down"));

        // Here we make a valid-looking request for the Database so it gets far enough to hit prisma
        const request = makeRequest({
            email: "test@example.com",
            newPassword: "Password123!",
        });

        const response = await POST(request);
        expect(response.status).toBe(500);

        const data = await response.json();
        expect(data.success).toBe(false);
        expect(data.message).toBe("Something went wrong.");

        consoleSpy.mockRestore();
    });
});