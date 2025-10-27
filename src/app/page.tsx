import { SignUpButton } from "@/components/signupButton";
import { LoginButton } from "@/components/loginButton";


export default function HomePage() {
  return (
    <nav className="flex justify-end p-4">
      <LoginButton />
      <SignUpButton />
    </nav>
  );
}
