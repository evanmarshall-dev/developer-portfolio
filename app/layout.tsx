import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "evanmarshall.dev",
  description:
    "Contact me today to discuss how I can get your business online and working for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-4xl mx-auto py-10`}>
        <header>
          <Link
            className="text-transparent bg-clip-text bg-gradient-to-r to-orange-500 from-indigo-500 text-lg font-bold"
            href="/"
          >
            evanmarshall.dev
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
