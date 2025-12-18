"use client";

import Image from "next/image";
import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ImpactPreview from "@/components/impactPreview";

const CookieBanner: React.FC<{ forceOpen?: boolean }> = ({ forceOpen }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const storedPrefs = localStorage.getItem("cookie_preferences");
    if (storedPrefs) {
      try {
        const parsed = JSON.parse(storedPrefs);
        if (typeof parsed.analytics === "boolean") {
          setAnalyticsEnabled(parsed.analytics);
        }
      } catch {
        // ignore parse errors
      }
    }

    const consent = localStorage.getItem("cookie_consent");

    // If forceOpen is true (user clicked "Change Cookie Preferences"),
    // always show the banner regardless of previous choice.
    if (forceOpen) {
      setShowBanner(true);
      return;
    }

    if (!consent) setShowBanner(true);
  }, [forceOpen]);

  // Listen for the custom event from the footer
  useEffect(() => {
    const handler = () => setShowBanner(true);
    window.addEventListener("open-cookie-settings", handler);
    return () => window.removeEventListener("open-cookie-settings", handler);
  }, []);

  const acceptAll = () => {
    setAnalyticsEnabled(true);
    localStorage.setItem("cookie_consent", "accepted");
    localStorage.setItem(
      "cookie_preferences",
      JSON.stringify({ analytics: true })
    );
    setShowBanner(false);
    // TODO: initialise analytics here if you add it later
  };

  const rejectAll = () => {
    setAnalyticsEnabled(false);
    localStorage.setItem("cookie_consent", "rejected");
    localStorage.setItem(
      "cookie_preferences",
      JSON.stringify({ analytics: false })
    );
    setShowBanner(false);
    // TODO: ensure analytics is NOT loaded
  };

  const savePreferences = () => {
    localStorage.setItem("cookie_consent", "custom");
    localStorage.setItem(
      "cookie_preferences",
      JSON.stringify({ analytics: analyticsEnabled })
    );
    setShowBanner(false);
    // TODO: conditionally (de)activate analytics based on analyticsEnabled
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 flex items-end md:items-center justify-center bg-black/30 backdrop-blur-sm z-[999]">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-[90%] max-w-lg p-6 md:p-7 mx-auto animate-fadeIn">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
          We value your privacy
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          SustainWear uses cookies to operate the site and, with your consent,
          to understand how our platform is used so we can improve it. You can
          choose which optional cookies to allow. See our{" "}
          <a
            href="/privacy"
            className="text-[#2E7D32] underline hover:text-green-800"
          >
            Privacy & Cookie Policy
          </a>
          .
        </p>

        {/* Toggles section */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
          {/* Essential cookies - always on */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Essential cookies
              </p>
              <p className="text-xs text-gray-600">
                Required for login, security, and saving your cookie choices.
                These are always enabled.
              </p>
            </div>
            <span className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
              Always on
            </span>
          </div>

          {/* Analytics cookies - user can toggle */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Analytics cookies
              </p>
              <p className="text-xs text-gray-600">
                Help us understand how SustainWear is used so we can improve
                accessibility, performance, and sustainability features.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAnalyticsEnabled((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                analyticsEnabled ? "bg-[#2E7D32]" : "bg-gray-300"
              }`}
              aria-pressed={analyticsEnabled}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  analyticsEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mt-3 md:justify-end">
          <button
            onClick={rejectAll}
            className="px-5 py-2.5 text-sm border rounded-lg border-gray-300 hover:bg-gray-100 transition cursor-pointer"
          >
            Reject all
          </button>

          <button
            onClick={savePreferences}
            className="px-5 py-2.5 text-sm border rounded-lg border-gray-300 hover:bg-gray-100 transition cursor-pointer"
          >
            Save preferences
          </button>

          <button
            onClick={acceptAll}
            className="px-5 py-2.5 text-sm bg-[#2E7D32] text-white rounded-lg hover:bg-green-800 transition shadow-md cursor-pointer"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
};

// This is the main page (Landing Page) of our SustainWear Web-application.
// Next.js treats this as the route: '/'.
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setStatusType(null);

    if (!name || !email || !message) {
      setStatusType("error");
      setStatusMessage("Please fill in all fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatusType("success");
      setStatusMessage(
        "Thank you for getting in touch. We've received your message and will respond by email."
      );
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatusType("error");
      setStatusMessage(
        "Sorry, something went wrong sending your message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <main className="w-full text-black text-center">
      <header className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
        <div className="px-4 sm:px-8 md:px-12 py-4 flex items-center justify-between">
          <h1 className="font-kalam mt-2 text-3xl sm:text-4xl md:text-5xl">
            <span className="text-[#2E7D32]">S</span>ustain
            <span className="text-[#2E7D32]">W</span>ear
          </h1>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#2E7D32] p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <ul className="flex gap-4 px-4">
                <li
                  className="cursor-pointer hover:text-[#2E7D32] transition"
                  onClick={() => scrollToSection("how-it-works")}
                >
                  How it Works
                </li>
                <li
                  className="cursor-pointer hover:text-[#2E7D32] transition"
                  onClick={() => scrollToSection("about")}
                >
                  About
                </li>
                <li
                  className="cursor-pointer hover:text-[#2E7D32] transition"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact
                </li>
              </ul>
              <li>
                <Link href="/auth/login" className="text-black hover:underline">
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/signup"
                  className="font-sans bg-[#2E7D32] text-white px-4 py-2 rounded hover:bg-green-800 transition inline-block"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <ul className="flex flex-col py-4">
              <li
                className="px-6 py-3 hover:bg-gray-50 cursor-pointer transition"
                onClick={() => scrollToSection("about")}
              >
                About
              </li>
              <li
                className="px-6 py-3 hover:bg-gray-50 cursor-pointer transition"
                onClick={() => scrollToSection("how-it-works")}
              >
                How it Works
              </li>
              <li
                className="px-6 py-3 hover:bg-gray-50 cursor-pointer transition"
                onClick={() => scrollToSection("contact")}
              >
                Contact
              </li>
              <li className="px-6 py-3 hover:bg-gray-50">
                <Link href="/auth/login" className="text-black hover:underline">
                  Log In
                </Link>
              </li>
              <li className="px-6 py-3">
                <Link
                  href="/auth/signup"
                  className="font-sans bg-[#2E7D32] text-white px-4 py-2 rounded hover:bg-green-800 transition inline-block"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-[#2E7D32] to-[#C9DECA] pt-24 px-4 sm:px-8 md:px-40"
      >
        <div className="flex-1 flex justify-center md:justify-end mb-8 md:mb-0">
          <Image
            src="/illustrations/hero.svg"
            alt="Welcome"
            width={700}
            height={0}
            className="w-full max-w-md md:max-w-none md:-translate-x-10"
            priority
          />
        </div>
        <div className="flex-1 flex flex-col md:self-center text-center space-y-4 sm:space-y-6">
          <div className="flex justify-center">
            <h1 className="italic text-3xl sm:text-4xl md:text-5xl leading-tight font-medium md:text-left mb-5">
              Give Today. <br /> <span className="text-[#2E7D32]">Sustain</span>{" "}
              Tomorrow.
            </h1>
          </div>

          <p className="font-medium text-base sm:text-lg md:text-xl px-4 md:px-0">
            A streamlined platform that makes{" "}
            <span className="text-[#2E7D32]">Sustaining Tommorow</span>{" "}
            <br className="hidden sm:block" />
            easier than ever through smarter clothing donations.
          </p>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="self-center w-auto px-6 py-2 bg-[#2E7D32] text-white rounded-lg font-semibold hover:bg-white hover:text-[#2E7D32] transition drop-shadow cursor-pointer"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="bg-[#F8F8F8] text-black">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex-1 bg-[#C9DECA] flex justify-center items-center py-12 sm:py-16 md:py-20 px-4">
            <Image
              src="/illustrations/step1.svg"
              alt="Step 1"
              width={500}
              height={300}
              className="w-full max-w-xs sm:max-w-md"
            />
          </div>
          <div className="flex-1 flex items-center justify-center text-center py-12 sm:py-16 md:py-20 px-4">
            <div className="max-w-md">
              <h3 className="italic text-2xl sm:text-3xl md:text-3xl lg:text-4xl leading-tight font-regular mb-3 sm:mb-5 text-[#2E7D32]">
                Take some Pictures
              </h3>
              <p className="text-lg sm:text-xl md:text-xl text-gray-700">
                Take a few pictures of your clothes so charities know the
                condition of your clothing
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex-1 flex items-center justify-center text-center py-12 sm:py-16 md:py-20 px-4 order-2 md:order-1">
            <div className="max-w-md">
              <h3 className="italic text-2xl sm:text-3xl md:text-3xl lg:text-4xl leading-tight font-regular mb-3 sm:mb-5 text-[#2E7D32]">
                Upload your Clothes{" "}
              </h3>
              <p className="text-lg sm:text-xl md:text-xl text-gray-700">
                Fill in details and upload all important information of your
                clothes
              </p>
            </div>
          </div>
          <div className="flex-1 bg-[#C9DECA] flex justify-center items-center py-12 sm:py-16 md:py-20 px-4 order-1 md:order-2">
            <Image
              src="/illustrations/step2.svg"
              alt="Step 2"
              width={500}
              height={300}
              className="w-full max-w-xs sm:max-w-md"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex-1 bg-[#C9DECA] flex justify-center items-center py-12 sm:py-16 md:py-20 px-4">
            <Image
              src="/illustrations/step3.svg"
              alt="Step 3"
              width={500}
              height={300}
              className="w-full max-w-xs sm:max-w-md"
            />
          </div>
          <div className="flex-1 flex items-center justify-center text-center py-12 sm:py-16 md:py-20 px-4">
            <div className="max-w-md">
              <h3 className="italic text-2xl sm:text-3xl md:text-3xl lg:text-4xl leading-tight font-regular mb-3 sm:mb-5 text-[#2E7D32]">
                Send off your clothes{" "}
              </h3>
              <p className="text-lg sm:text-xl md:text-xl text-gray-700">
                Send your clothes to our partnered charities to give them a 2nd
                life
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex-1 flex items-center justify-center text-center py-12 sm:py-16 md:py-20 px-4 order-2 md:order-1">
            <div className="max-w-md">
              <h3 className="italic text-2xl sm:text-3xl md:text-3xl lg:text-4xl leading-tight font-regular mb-3 sm:mb-5 text-[#2E7D32]">
                Track Your Impact
              </h3>
              <p className="text-lg sm:text-xl md:text-xl text-gray-700">
                Take a few pictures of your clothes so charities know the
                condition of your clothing
              </p>
            </div>
          </div>
          <div className="flex-1 bg-[#C9DECA] flex justify-center items-center py-12 sm:py-16 md:py-20 px-4 order-1 md:order-2">
            <Image
              src="/illustrations/step4.svg"
              alt="Step 4"
              width={500}
              height={300}
              className="w-full max-w-xs sm:max-w-md"
            />
          </div>
        </div>

        {/* Live Impact Preview */}
        <section className="min-h-screen flex flex-col justify-center bg-white px-4 sm:px-8 md:px-20 py-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium italic mb-10 text-[#2E7D32]">
            Live Impact Preview
          </h2>
          <ImpactPreview totalItems={1240} />

          <p className="text-sm text-gray-500 mt-10 text-center max-w-2xl mx-auto">
            Impact values are estimates based on average clothing weights and
            conversion factors. Figures shown are for demonstration purposes.
          </p>
        </section>

        <div
          id="donate"
          className="w-full text-white py-12 sm:py-16 md:py-20 text-center flex flex-col items-center justify-center px-4"
        >
          <h2 className="text-2xl sm:text-3xl font-medium italic mb-6 sm:mb-10 text-[#2E7D32]">
            Ready to Sustain Tomorrow?
          </h2>
          <button className="bg-[#2E7D32] px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-xl sm:text-2xl font-regular hover:bg-green-800 transition mb-6 sm:mb-10 cursor-pointer">
            Give Today
          </button>
          <p className="text-[#2E7D32] italic text-xl sm:text-2xl font-medium mb-3 sm:mb-5">
            Are you a Charity?
          </p>
          <Link
            href="auth/charity-application"
            className="bg-[#C9DECA] rounded-lg border-2 border-[#2E7D32] font-medium text-[#2E7D32] px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#A7C7AD] transition"
          >
            Click Here!
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="flex flex-col md:flex-row items-stretch justify-center">
          <div className="flex-1 bg-[#C9DECA] flex justify-center items-center flex-col py-12 sm:py-16 md:py-20 px-4 sm:px-8">
            <p className="font-kalam text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-10">
              About <span className="text-[#2E7D32]">S</span>ustain
              <span className="text-[#2E7D32]">W</span>ear
            </p>
            <div className="max-w-[600px] text-left space-y-4 sm:space-y-6 text-base sm:text-lg leading-relaxed text-gray-800 px-4">
              <p>
                SustainWear is a smart clothing donation platform that connects
                donors and charities to make giving back simpler, smarter, and
                more sustainable. We help reduce textile waste while empowering
                communities to reuse and redistribute clothing responsibly.
              </p>

              <p>
                Through our easy-to-use platform, donors can log clothing
                donations, upload photos, and track the positive impact of their
                contributions — from CO₂ saved to communities supported.
              </p>

              <p>
                Charities can manage inventories, categorise items, and connect
                directly with those who care about making a difference.
              </p>
            </div>
          </div>
          <div className="flex-1 relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
            <Image
              src="/illustrations/eye-pic.jpg"
              alt="About SustainWear"
              fill
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="min-h-screen flex flex-col">
        <div className="w-full bg-white py-12 sm:py-16 md:py-20 text-center flex flex-col items-center justify-center px-4 flex-grow">
          <p className="font-medium text-2xl sm:text-3xl mb-6 sm:mb-8">
            Have any questions?{" "}
            <span className="italic text-[#2E7D32]">Contact Us</span>
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 mt-6 sm:mt-10 w-full max-w-6xl">
            <div className="flex-1 w-full">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-medium mb-2 text-left"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="e.g, John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-medium mb-2 text-left"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="youremail@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-medium mb-2 text-left"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us how you'd like to get involved"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>

                {statusMessage && (
                  <p
                    className={`text-sm text-left ${
                      statusType === "success"
                        ? "text-green-700"
                        : "text-red-600"
                    }`}
                  >
                    {statusMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2E7D32] text-white py-3 rounded-lg font-semibold hover:bg-[#1e5723] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>
              </form>
            </div>

            <div className="flex-1 w-full hidden md:flex justify-center items-center relative min-h-[400px]">
              <Image
                src="/illustrations/contact-us.svg"
                alt="About SustainWear"
                fill
                className="mx-auto ml-20"
                priority
              />
            </div>
          </div>
        </div>

        {/*  FOOTER UPDATED */}
        <footer className="w-full bg-[#E6E6E6] text-black py-10 px-6 sm:px-12 md:px-20 mt-auto pb-28 md:pb-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
            {/* Left Section */}
            <div className="flex-1 text-left">
              <button
                onClick={() => scrollToSection("hero")}
                className="font-kalam text-3xl mb-4"
              >
                <span className="text-[#2E7D32]">S</span>ustain
                <span className="text-[#2E7D32]">W</span>ear
              </button>
              <p className="max-w-sm text-gray-700">
                A streamlined platform that makes{" "}
                <span className="text-[#2E7D32]">Sustaining Tomorrow</span>{" "}
                easier than ever through smarter clothing donations
              </p>
            </div>

            {/* On mobile: 2 columns (Quick Links | Help & Support) */}
            {/*  On md+: behaves like your original layout */}
            <div className="grid grid-cols-2 gap-10 md:flex md:gap-16 md:items-start">
              {/* Quick Links */}
              <div className="text-left">
                <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => scrollToSection("about")}
                      className="hover:text-[#2E7D32] transition cursor-pointer"
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("donate")}
                      className="hover:text-[#2E7D32] transition cursor-pointer"
                    >
                      Donate
                    </button>
                  </li>
                </ul>
              </div>

              {/* Help and Support */}
              <div className="text-left">
                <h3 className="font-semibold text-lg mb-3">Help and Support</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="hover:text-[#2E7D32] transition cursor-pointer"
                    >
                      Contact Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection("how-it-works")}
                      className="hover:text-[#2E7D32] transition cursor-pointer"
                    >
                      How It Works
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/privacy")}
                      className="hover:text-[#2E7D32] transition cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </section>

      {/* Keep chat widget OUTSIDE footer so it doesn't affect layout */}
      <ChatWidget />

      <CookieBanner />
    </main>
  );
}
