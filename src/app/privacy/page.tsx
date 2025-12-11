/* Privacy & Cookie Policy Page */ 

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PrivacyPolicyPage() {
 const router = useRouter();
  const [showFloatingBack, setShowFloatingBack] = useState(false);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  // Show a floating back button after user scrolls down
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setShowFloatingBack(true);
      } else {
        setShowFloatingBack(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 text-gray-800 leading-relaxed">

        {/* Top back button inside content column */}
        <button
          onClick={handleBack}
          className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg 
                     bg-[#2E7D32] text-white font-medium shadow-sm
                     hover:bg-green-800 transition-all cursor-pointer"
        >
          ← Back to Home
        </button>

      {/* Floating back button that appears when scrolling down */}
      {showFloatingBack && (
        <button
          onClick={handleBack}
          className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 
                     px-4 py-2 rounded-full bg-white/90 border border-gray-300 
                     text-gray-800 text-sm shadow-md backdrop-blur
                     hover:bg-[#2E7D32] hover:text-white hover:border-[#2E7D32]
                     transition-all cursor-pointer"
        >
          ← Back to Home
        </button>
      )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#2E7D32]">
          Privacy & Cookie Policy
        </h1>

        <p className="text-sm sm:text-base mb-6">
          At <strong>SustainWear</strong>, we are committed to protecting your
          privacy and ensuring that your personal data is handled securely and
          transparently. This Privacy & Cookie Policy explains what information
          we collect, how we use it, and how you can control your personal data
          in accordance with the General Data Protection Regulation (GDPR) and
          UK data protection laws.
        </p>

        <hr className="my-6 border-gray-200" />

        {/* 1. Information We Collect */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          1. Information We Collect
        </h2>
        <p className="mb-3 text-sm sm:text-base">
          We collect and process the following types of data when you use
          SustainWear:
        </p>
        <ul className="list-disc ml-5 sm:ml-6 mb-6 space-y-2 text-sm sm:text-base">
          <li>
            <strong>Account Information:</strong> Name, email address, hashed
            password, and user role (Donor, Admin, Charity).
          </li>
          <li>
            <strong>Donation Data:</strong> Clothing item details, uploaded
            photos, donation requests, charity responses, and sustainability
            impact metrics.
          </li>
          <li>
            <strong>Session Data:</strong> Login tokens, timestamps, and device
            information used for authentication and security.
          </li>
          <li>
            <strong>Usage Information:</strong> Pages visited and interactions
            with the platform (only when analytics cookies are enabled).
          </li>
        </ul>

        {/* 2. How We Use Your Data */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          2. How We Use Your Data
        </h2>
        <p className="mb-3 text-sm sm:text-base">
          We use your personal data for the following purposes:
        </p>
        <ul className="list-disc ml-5 sm:ml-6 mb-6 space-y-2 text-sm sm:text-base">
          <li>To create and manage donor, admin, and charity accounts.</li>
          <li>
            To process donation requests and support communication between
            donors and partner charities.
          </li>
          <li>
            To generate sustainability analytics (e.g. CO₂ savings and landfill
            reduction estimates).
          </li>
          <li>
            To maintain secure login sessions and protect against fraud or
            unauthorised access.
          </li>
          <li>
            To monitor performance and improve the user experience (analytics
            only if you have given consent).
          </li>
        </ul>

        {/* 3. Cookies We Use */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          3. Cookies We Use
        </h2>
        <p className="mb-4 text-sm sm:text-base">
          Cookies are small text files stored on your device. SustainWear uses
          cookies to operate core features of the platform and, if you consent,
          to understand how the site is used.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold mt-3 mb-2">
          Essential Cookies
        </h3>
        <p className="mb-3 text-sm sm:text-base">
          These cookies are required for SustainWear to function and cannot be
          turned off in our systems:
        </p>
        <ul className="list-disc ml-5 sm:ml-6 mb-6 space-y-2 text-sm sm:text-base">
          <li>
            <strong>Session Tokens:</strong> Keep you logged in while navigating
            the site.
          </li>
          <li>
            <strong>Security Cookies:</strong> Help detect and prevent
            unauthorised access or misuse.
          </li>
          <li>
            <strong>Cookie Consent:</strong> Store your{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">
              cookie_consent
            </code>{" "}
            choice so we remember whether you accepted or rejected optional
            cookies.
          </li>
        </ul>

        <h3 className="text-xl sm:text-2xl font-semibold mb-2">
          Analytics Cookies (Optional)
        </h3>
        <p className="mb-3 text-sm sm:text-base">
          Analytics cookies are only activated if you click{" "}
          <strong>“Accept All”</strong> on our cookie banner. These help us
          understand:
        </p>
        <ul className="list-disc ml-5 sm:ml-6 mb-6 space-y-2 text-sm sm:text-base">
          <li>Which pages are most frequently visited.</li>
          <li>How donors and charities interact with key workflows.</li>
          <li>
            Performance and accessibility issues that may affect the experience.
          </li>
        </ul>
        <p className="mb-6 text-sm sm:text-base">
          If you choose <strong>“Reject”</strong>, analytics cookies will not be
          set and no optional tracking will run.
        </p>

        {/* 4. Cookie Preferences & Toggling */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          4. Cookie Preferences & Toggling
        </h2>
        <p className="mb-4 text-sm sm:text-base">
          You are in control of your cookie settings:
        </p>
        <ul className="list-disc ml-5 sm:ml-6 mb-6 space-y-2 text-sm sm:text-base">
          <li>
            When you first visit SustainWear, the cookie banner allows you to
            accept or reject non-essential cookies.
          </li>
          <li>
            Your choice is stored locally under{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">
              cookie_consent
            </code>{" "}
            on your device.
          </li>
          <li>
            You can revisit and update this choice at any time using the{" "}
            <strong>“Change Cookie Preferences”</strong> link in the footer of
            the site.
          </li>
          <li>
            If you withdraw consent, analytics cookies are disabled and any
            optional tracking is stopped going forward.
          </li>
        </ul>

        {/* 5. Legal Basis */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          5. Legal Basis for Processing
        </h2>
        <p className="mb-3 text-sm sm:text-base">
          Under GDPR, SustainWear processes your personal data based on:
        </p>
        <ul className="list-disc ml-5 sm:ml-6 mb-6 space-y-2 text-sm sm:text-base">
          <li>
            <strong>Contractual necessity</strong> - to provide you with an
            account and core platform features.
          </li>
          <li>
            <strong>Legitimate interests</strong> - to secure the platform and
            prevent misuse.
          </li>
          <li>
            <strong>Consent</strong> - for analytics and any non-essential
            cookies.
          </li>
        </ul>

        {/* 6. Data Retention */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          6. Data Retention
        </h2>
        <p className="mb-6 text-sm sm:text-base">
          We retain your data only for as long as necessary to operate
          SustainWear, meet legal obligations, and resolve any disputes. You may
          request deletion of your account and associated personal data, subject
          to any legal requirements we must comply with.
        </p>

        {/* 7. Your Rights */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          7. Your Rights
        </h2>
        <p className="mb-3 text-sm sm:text-base">
          As a user, you have the following rights over your personal data:
        </p>
        <ul className="list-disc ml-5 sm:ml-6 mb-6 space-y-2 text-sm sm:text-base">
          <li>Right of access - request a copy of the data we hold about you.</li>
          <li>Right to rectification - correct inaccurate or incomplete data.</li>
          <li>
            Right to erasure - request deletion of your data (“right to be
            forgotten”).
          </li>
          <li>
            Right to withdraw consent - especially for analytics and optional
            cookies.
          </li>
          <li>
            Right to data portability - request your data in a usable format.
          </li>
          <li>
            Right to object - to certain types of processing based on legitimate
            interests.
          </li>
        </ul>

        {/* 8. Data Security */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          8. Data Security
        </h2>
        <p className="mb-6 text-sm sm:text-base">
          We use technical and organisational measures to protect your data,
          including secure authentication, hashed passwords, restricted access
          controls, and monitoring of suspicious activity. While no system can
          be completely secure, we work to keep SustainWear as safe as possible.
        </p>

        {/* 9. Contact */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">9. Contact Us</h2>
        <p className="mb-6 text-sm sm:text-base">
          If you have any questions about this policy or wish to exercise your
          data protection rights, please contact us:
          <br />
          <span className="block mt-2">
            <strong>Email: </strong>
            <a
              href="mailto:support@sustainwear.org"
              className="text-[#2E7D32] underline hover:text-green-800"
            >
              sustainwear.c@gmail.com
            </a>
          </span>
        </p>

        <p className="text-xs sm:text-sm text-gray-500 mt-8">
          Last updated: {new Date().getFullYear()}
        </p>
      </section>
    </main>
  );
}