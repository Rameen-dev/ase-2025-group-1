// Importing tools from React Testing Library
// - render() lets us "render" a React component in a test environment
// - screen gives us access to query functions (like getByRole, getByText, etc.)
import { render, screen } from "@testing-library/react";

// Import the HomePage component that we want to test
import HomePage from "@/app/page";

// "describe" groups related tests together, here all tests are for HomePage
describe("HomePage", () => {
  
  // First test: check that the heading "SustainWear" appears
  it("renders the SustainWear heading", () => {
    // Step 1: Render the HomePage component
    render(<HomePage />);
    
    // Step 2: Look for a heading element with the text "SustainWear" (case-insensitive with /i)
    // Step 3: Assert (expect) that it is present in the document
    expect(
      screen.getByRole("heading", { name: /SustainWear/i })
    ).toBeInTheDocument();
  });

  // Second test: check that both buttons/links ("Donate now" and "Explore projects") appear
  it("renders Donate and Explore links", () => {
    render(<HomePage />);
    
    // Look for the link with text "Donate now"
    expect(
      screen.getByRole("link", { name: /Donate now/i })
    ).toBeInTheDocument();

    // Look for the link with text "Explore projects"
    expect(
      screen.getByRole("link", { name: /Explore projects/i })
    ).toBeInTheDocument();
  });
});
