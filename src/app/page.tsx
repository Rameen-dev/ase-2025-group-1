// This is the homepage component of our project (http://localhost:3000)
// Because it's in the "app" folder, Next.js automatically maps this file to the "/" route.

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
          <div className="rounded-2xl border border-neutral-800 p-4">
            <span className="block text-2xl font-bold text-white">4.9★</span>
            Community rating
          </div>
        </div>
      </section>
    </main>
  );
}
