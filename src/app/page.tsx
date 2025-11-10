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
        </div>
      </header>
      {/* Hero Section Wallahi */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-[#2E7D32] to-[#C9DECA] pt-24 px-8 md:px-40">
        <div className="flex-1 flex justify-center md:justify-end ">
          <Image
            src="/illustrations/hero.svg"
            alt="Welcome"
            width={700}
            height={0}
            className="mx-auto md:-translate-x-10"
            priority
          />
        </div>
        <div className="flex-1 flex flex-col md:self-center text-center  space-y-6">
          <div className="flex justify-center">
            <h1 className=" italic text-5xl leading-tight md:text-5xl font-medium md:text-left mb-5">
              Give Today. <br /> <span className="text-[#2E7D32]">Sustain</span>{" "}
              Tomorrow.
            </h1>
          </div>

          <p className="font-medium md:text-xl">
            A streamlined platform that makes{" "}
            <span className="text-[#2E7D32]">Sustaining Tommorow</span> <br />
            easier than ever through smarter clothing donations.
          </p>
          <button className="self-center w-auto px-6 py-2 bg-[#2E7D32] text-white rounded-lg font-semibold hover:bg-white hover:text-[#2E7D32] transition drop-shadow">
            Learn More
          </button>
        </div>
      </section>

      {/* How it works Section */}
      <section className=" bg-[#F8F8F8] text-black ">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex-1 bg-[#C9DECA] flex justify-center items-center py-20">
            <Image
              src="/illustrations/step1.svg"
              alt="Step 1"
              width={500}
              height={300}
              className="mx-auto"
            />
          </div>
          <div className="flex-1 text-center ">
            <h3 className="italic text-5xl leading-tight md:text-5xl font-regular  mb-5 text-[#2E7D32]">
              Take some Pictures
            </h3>
            <p className="text-3xl text-gray-700">
              Take a few pictures of your clothes so charities know the
              condition of your clothing
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex-1 text-center ">
            <h3 className="italic text-5xl leading-tight md:text-5xl font-regular  mb-5 text-[#2E7D32]">
              Upload your Clothes{" "}
            </h3>
            <p className="text-3xl text-gray-700">
              Fill in details and upload all important information of your
              clothes
            </p>
          </div>
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
            href="charity-application"
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
          </div>
        </div>
      </section>
    </main>
  );
}
