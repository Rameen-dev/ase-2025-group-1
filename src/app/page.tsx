<<<<<<< HEAD
// This is the homepage component of our project (http://localhost:3000)
// Because it's in the "app" folder, Next.js automatically maps this file to the "/" route.

// Here we import two button componenets from the "components folder".
// These handle navigation to the Sign-up and Log-in pages.
import { SignUpButton } from "@/components/signupButton";
import { LoginButton } from "@/components/loginButton";


export default function HomePage() {
  return (
    // The whole page is wrapped in a <main> tag
    // I used Tailwind classes to make it take the full screen height,
    // with a dark background and white text for good contrast.

    // Full-height screen, dark background, white text (Tailwind classes)
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Content wrapper: centered, padded, and not too wide */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        {/* Big title */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          SustainWear
        </h1>

        {/* Short subtitle/strapline */}
        <p className="mt-4 text-neutral-300 md:text-lg">
          Donate, discover, and support sustainable fashion.
        </p>

        {/* Primary actions */}
        <div className="mt-10 flex items-center justify-center gap-4">
          {/* Link buttons just for now; later you can use <Link /> */}
          <a
            href="/donate"
            className="rounded-2xl px-5 py-3 font-semibold shadow-lg bg-emerald-500 hover:bg-emerald-600 transition"
          >
            Donate now
          </a>
          <a
            href="/explore"
            className="rounded-2xl px-5 py-3 font-semibold shadow-lg border border-neutral-700 hover:bg-neutral-900 transition"
          >
            Explore projects
          </a>
=======
import Image from "next/image";
import Link from "next/link";
// This is the main page (Landing Page) of our SustainWear Web-application.
// Next.js treats this as the route: '/'.
export default function HomePage() {
  return (
    <main className="w-full text-black text-center">
      <header className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
        <div className=" px-12 py-4 flex items-center justify-between">
          <h1 className="font-kalam mt-2 pd-4 text-5xl md:text-4xl">
            <span className="text-[#2E7D32]">S</span>ustain
            <span className="text-[#2E7D32]">W</span>ear
          </h1>
          <nav>
            <ul className="flex items-center gap-6 ">
              <ul className="flex gap-4 px-4">
                <li>About</li>
                <li>How it Works</li>
                <li>Contact</li>
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
>>>>>>> main
        </div>

        {/* Quick stats (purely visual placeholders) */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-neutral-400">
          <div className="rounded-2xl border border-neutral-800 p-4">
            <span className="block text-2xl font-bold text-white">120+</span>
            Active campaigns
          </div>
          <div className="rounded-2xl border border-neutral-800 p-4">
            <span className="block text-2xl font-bold text-white">8.5k</span>
            Donors
          </div>
          <div className="rounded-2xl border border-neutral-800 p-4">
            <span className="block text-2xl font-bold text-white">£240k</span>
            Funds raised
          </div>
<<<<<<< HEAD
          <div className="rounded-2xl border border-neutral-800 p-4">
            <span className="block text-2xl font-bold text-white">4.9★</span>
            Community rating
=======
          <div className="flex-1 bg-[#C9DECA] flex justify-center items-center py-20">
            <Image
              src="/illustrations/step2.svg"
              alt="Step 1"
              width={500}
              height={300}
              className="mx-auto"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex-1 bg-[#C9DECA] flex justify-center items-center py-20">
            <Image
              src="/illustrations/step3.svg"
              alt="Step 1"
              width={500}
              height={300}
              className="mx-auto"
            />
          </div>
          <div className="flex-1 text-center ">
            <h3 className="italic text-5xl leading-tight md:text-5xl font-regular  mb-5 text-[#2E7D32]">
              Send off your clothes{" "}
            </h3>
            <p className="text-3xl text-gray-700">
              Send your clothes to our partnered charities to give them a 2nd
              life
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex-1 text-center ">
            <h3 className="italic text-5xl leading-tight md:text-5xl font-regular  mb-5 text-[#2E7D32]">
              Track Your Impact
            </h3>
            <p className="text-3xl text-gray-700">
              Take a few pictures of your clothes so charities know the
              condition of your clothing
            </p>
          </div>
          <div className="flex-1 bg-[#C9DECA] flex justify-center items-center py-20">
            <Image
              src="/illustrations/step4.svg"
              alt="Step 1"
              width={500}
              height={300}
              className="mx-auto"
            />
          </div>
        </div>
        <div className="w-full text-white py-20 text-center flex flex-col items-center justify-center">
          <h2 className="text-3xl font-medium italic mb-10 text-[#2E7D32]">
            Ready to Sustain Tomorrow?
          </h2>
          <button className="bg-[#2E7D32] px-12 py-4 rounded-lg text-2xl  font-regular hover:bg-green-800 transition mb-10">
            Give Today
          </button>
          <p className="text-[#2E7D32] italic text-2xl font-medium mb-5">
            Are you a Charity?
          </p>
          <Link
            href="auth/charity-application"
            className="bg-[#C9DECA] rounded-lg border-2 border-[#2E7D32] font-medium text-[#2E7D32] px-8 py-4 hover:bg-[#A7C7AD] transition"
          >
            Click Here!
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section>
        <div className="flex flex-col md:flex-row items-stretch justify-center">
          <div className="flex-1 bg-[#C9DECA] flex justify-center items-center flex-col py-20">
            <p className="font-kalam text-5xl mb-10 ">
              About <span className="text-[#2E7D32]">S</span>ustain
              <span className="text-[#2E7D32]">W</span>ear
            </p>
            <div className="max-w-[600px] md:text-left space-y-6 ml-10 text-lg leading-relaxed text-gray-800">
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
          <div className="flex-1 relative min-h-[60vh] md:min-h-[500px]">
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
      <section>
        <div className="w-full bg-white py-20 text-center flex flex-col items-center justify-center">
          <p className="font-medium text-3xl">
            Have any questions?{" "}
            <span className="italic text-[#2E7D32]">Contact Us</span>
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-10 w-full max-w-6xl">
            <div className="flex-1 w-full md:w-1/2">
              {" "}
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-medium mb-2">
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
                  <label htmlFor="email" className="block font-medium mb-2">
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
                  <label htmlFor="message" className="block font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us how you'd like to get involved"
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2E7D32] text-white py-3 rounded-lg font-semibold hover:bg-[#1e5723] transition"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="flex-1 w-full md:w-1/2 flex justify-center items-center relative min-h-[400px]">
              <Image
                src="/illustrations/contact-us.svg"
                alt="About SustainWear"
                fill
                className="mx-auto ml-20"
                priority
              />
            </div>
>>>>>>> main
          </div>
        </div>
      </section>
    </main>
  );
}
