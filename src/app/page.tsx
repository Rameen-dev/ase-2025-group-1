"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// This is the main page (Landing Page) of our SustainWear Web-application.
// Next.js treats this as the route: '/'.
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
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
          <button className="self-center w-auto px-6 py-2 bg-[#2E7D32] text-white rounded-lg font-semibold hover:bg-white hover:text-[#2E7D32] transition drop-shadow">
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

        <div
          id="donate"
          className="w-full text-white py-12 sm:py-16 md:py-20 text-center flex flex-col items-center justify-center px-4"
        >
          <h2 className="text-2xl sm:text-3xl font-medium italic mb-6 sm:mb-10 text-[#2E7D32]">
            Ready to Sustain Tomorrow?
          </h2>
          <button className="bg-[#2E7D32] px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-xl sm:text-2xl font-regular hover:bg-green-800 transition mb-6 sm:mb-10">
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
      {/* Contact Us */}
      <section id="contact" className="min-h-screen flex flex-col">
        <div className="w-full bg-white py-12 sm:py-16 md:py-20 text-center flex flex-col items-center justify-center px-4 flex-grow">
          <p className="font-medium text-2xl sm:text-3xl mb-6 sm:mb-8">
            Have any questions?{" "}
            <span className="italic text-[#2E7D32]">Contact Us</span>
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12 mt-6 sm:mt-10 w-full max-w-6xl">
            <div className="flex-1 w-full">
              <div className="space-y-4 sm:space-y-6">
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#2E7D32] text-white py-3 rounded-lg font-semibold hover:bg-[#1e5723] transition"
                >
                  Submit
                </button>
              </div>
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

        {/* FOOTER (ADDED) */}
        <footer className="w-full bg-[#E6E6E6] text-black py-10 px-6 sm:px-12 md:px-20 mt-auto">
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

            {/* Middle Links */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-[#2E7D32] transition"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("donate")}
                    className="hover:text-[#2E7D32] transition"
                  >
                    Donate
                  </button>
                </li>
              </ul>
            </div>

            {/* Right Links */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Help and Support</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-[#2E7D32] transition"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="hover:text-[#2E7D32] transition"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="hover:text-[#2E7D32] transition"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
