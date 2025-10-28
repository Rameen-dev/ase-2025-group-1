import "./globals.css";
import { Krub, Kalam } from "next/font/google";

const krub = Krub({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-krub",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-kalam",
});

export const metadata = {
  title: "SustainWear",
  description: "Sustainable fashion platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${krub.variable} ${kalam.variable}`}>
      <body className="font-sans text-black bg-white">{children}</body>
    </html>
  );
}
