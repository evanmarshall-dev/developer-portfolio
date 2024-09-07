import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import { getPages } from "@/sanity/sanity-utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "evanmarshall.dev",
  description:
    "Contact me today to discuss how I can get your business online and working for you.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get all of our pages here.
  const pages = await getPages();

  return (
    <html lang="en">
      <body className={`${inter.className} max-w-4xl mx-auto py-10`}>
        <header className="flex items-center justify-between">
          <Link
            className="text-transparent bg-clip-text bg-gradient-to-r to-orange-500 from-indigo-500 text-lg font-bold"
            href="/"
          >
            evanmarshall.dev
          </Link>
          <div className="flex items-center gap-5 text-sm text-gray-300">
            {pages.map((page) => (
              <Link
                key={page._id}
                href={`/${page.slug}`}
                className="hover:underline"
              >
                {page.title}
              </Link>
            ))}
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
