import { render, screen } from "@testing-library/react";
import SignUpPage from "@/app/auth/signup/page";

describe("SignUpPage", () => {
  test("renders the signup button", () => {
    render(<SignUpPage />);
    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toBeInTheDocument();
  });
});
