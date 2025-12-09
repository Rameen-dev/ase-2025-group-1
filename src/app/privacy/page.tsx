export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold mb-6 text-[#2E7D32]">
        Privacy & Cookie Policy
      </h1>

      <p className="mb-6">
        At <strong>SustainWear</strong>, we are committed to protecting your privacy
        and ensuring that your personal data is handled securely and transparently.
        This Privacy & Cookie Policy outlines what information we collect, how we
        use it, and how you can control your personal data in accordance with the
        General Data Protection Regulation (GDPR) and UK data protection laws.
      </p>

      <hr className="my-6" />

      {/* Section 1 */}
      <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
      <p className="mb-4">We collect and process the following types of data:</p>

      <ul className="list-disc ml-6 mb-6 space-y-2">
        <li>
          <strong>Account Information:</strong> Name, email address, hashed password,
          user role (Donor, Admin, Charity).
        </li>
        <li>
          <strong>Donation Data:</strong> Clothing item details, uploaded photos,
          donation requests, charity responses, and sustainability impact metrics.
        </li>
        <li>
          <strong>Session Data:</strong> Login tokens, timestamps, device information
          (used for authentication).
        </li>
        <li>
          <strong>Usage Information:</strong> Pages visited, actions performed, and
          general analytics (only if cookie consent is granted).
        </li>
      </ul>

      {/* Section 2 */}
      <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Data</h2>
      <p className="mb-4">We use your information for the following purposes:</p>

      <ul className="list-disc ml-6 mb-6 space-y-2">
        <li>To create and manage donor, admin, and charity accounts.</li>
        <li>
          To process donation requests and support communication between donors
          and charities.
        </li>
        <li>To generate sustainability analytics for users.</li>
        <li>To maintain secure login sessions and detect fraudulent activity.</li>
        <li>
          To improve platform performance and user experience (analytics only if
          consented).
        </li>
      </ul>

      {/* Section 3 */}
      <h2 className="text-2xl font-semibold mb-3">3. Cookies We Use</h2>
      <p className="mb-4">
        Cookies are small files stored on your device that help us operate and improve
        SustainWear. We categorise cookies as follows:
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Essential Cookies</h3>
      <p className="mb-4">
        Required for the website to function. These include:
      </p>

      <ul className="list-disc ml-6 mb-6 space-y-2">
        <li>
          <strong>Session Tokens:</strong> Keeps you logged in while navigating.
        </li>
        <li>
          <strong>Security Cookies:</strong> Prevents unauthorised access and protects
          account integrity.
        </li>
        <li>
          <strong>Cookie Consent Storage:</strong> Saves your choice to accept or
          reject cookies.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Analytics Cookies (Optional)</h3>
      <p className="mb-4">
        Only activated if you click <strong>“Accept All”</strong> on our Cookie Banner.
        These cookies help us understand:
      </p>

      <ul className="list-disc ml-6 mb-6 space-y-2">
        <li>Which pages users visit most</li>
        <li>How donors interact with the donation flow</li>
        <li>Website performance and accessibility issues</li>
      </ul>

      <p className="mb-6">
        If you click <strong>“Reject”</strong>, these cookies remain disabled.
      </p>

      {/* Section 4 */}
      <h2 className="text-2xl font-semibold mb-3">4. Cookie Preferences & Toggling</h2>

      <p className="mb-6">
        Your cookie choice is stored on your device under{" "}
        <code className="bg-gray-100 px-2 py-1 rounded">cookie_consent</code>.  
        You may change this choice at any time by clearing your browser’s cookies
        or using our cookie banner when it reappears.
      </p>

      <p className="mb-6">
        When cookies are <strong>accepted</strong>, analytics scripts may run.  
        When cookies are <strong>rejected</strong>, no analytics scripts are loaded
        and tracking is completely disabled.
      </p>

      {/* Section 5 */}
      <h2 className="text-2xl font-semibold mb-3">5. Legal Basis for Processing</h2>
      <p className="mb-4">Under GDPR, SustainWear processes data based on:</p>

      <ul className="list-disc ml-6 mb-6 space-y-2">
        <li><strong>Contractual necessity</strong> – to create and manage user accounts.</li>
        <li><strong>Legitimate interest</strong> – to prevent fraud and secure the platform.</li>
        <li><strong>Consent</strong> – for analytics and optional cookies.</li>
      </ul>

      {/* Section 6 */}
      <h2 className="text-2xl font-semibold mb-3">6. Data Retention</h2>
      <p className="mb-6">
        We retain your information only as long as necessary to operate SustainWear
        and comply with legal obligations. You may request deletion of your personal
        data at any time.
      </p>

      {/* Section 7 */}
      <h2 className="text-2xl font-semibold mb-3">7. Your Rights</h2>

      <p className="mb-4">Under GDPR, you have the right to:</p>

      <ul className="list-disc ml-6 mb-6 space-y-2">
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate information</li>
        <li>Request deletion of your data ("Right to be Forgotten")</li>
        <li>Withdraw cookie consent at any time</li>
        <li>Request data portability</li>
        <li>Object to certain types of processing</li>
      </ul>

      {/* Section 8 */}
      <h2 className="text-2xl font-semibold mb-3">8. Data Security</h2>
      <p className="mb-6">
        We implement encryption, secure authentication tokens, strict access controls,
        and monitoring to protect all personal data stored in SustainWear.
      </p>

      {/* Section 9 */}
      <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>

      <p className="mb-6">
        If you have questions about this policy or wish to exercise your rights,
        please contact us at:
        <br />
        <strong>Email:</strong> support@sustainwear.org  
      </p>

      <p className="text-sm text-gray-500 mt-8">
        Last updated - {new Date().getFullYear()}
      </p>
    </main>
  );
}
