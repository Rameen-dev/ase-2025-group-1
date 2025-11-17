"use client"

import Link from "next/link";


export default function ApplicationSuccessful() {
    return (
        <main>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
                {/* Logo */}
                <div className="w-full max-w-6xl flex items-center justify-between mb-10">
                    <Link href="/">
                        <h1 className="font-kalam mt-2 pd-4 text-5xl md:text-4xl cursor-pointer hover:opacity-80 transition">
                            <span className="text-[#2E7D32]">S</span>ustain
                            <span className="text-[#2E7D32]">W</span>ear
                        </h1>
                    </Link>
                    <Link
                        href="/"
                        className="text-gray-600 hover:text-[#2E7D32] transition"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {/* Main Form Container */}
                <div className="w-full max-w-4xl bg-white shadow-md rounded-xl p-10">
                    <h1 className="font-kalam text-5xl font-regular mb-2 text-center">
                        Thank you for choosing <span className="text-[#2E7D32]">S</span>ustain<span className="text-[#2E7D32]">W</span>ear.
                    </h1>
                    <p className="text-gray-600 text-center mb-8 italic text-xl">
                        Your application is currently under review.
                    </p >
                    <p className="text-gray-600 text-center mb-8 italic text-xl">
                        Go back to {" "}
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-[#2E7D32] transition"
                        >
                            home page
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}