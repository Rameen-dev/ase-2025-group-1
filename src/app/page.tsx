// Here we import two button componenets from the "components folder".
// These handle navigation to the Sign-up and Log-in pages.
import { SignUpButton } from "@/components/signupButton";
import { LoginButton } from "@/components/loginButton";

// This is the main page (homepage) of your web app.
// Next.js treats this as the route: '/'.
export default function HomePage() {
  return (
    <nav className="flex justify-end p-4">
      <LoginButton />
      <SignUpButton />
    </nav>
  );
}
