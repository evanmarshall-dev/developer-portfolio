import type { Metadata } from "next";
import { Noto_Sans_Mono, Roboto_Mono } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import { getPages } from "@/sanity/sanity-utils";
// Could also import a local font.
// ? import localFont from "next/font/local";

const noto_sans_mono = Noto_Sans_Mono({
  subsets: ["latin"],
  // Add below property if using Tailwind.
  variable: "--font-noto_sans_mono",
});
const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto_mono",
});
// This is how you would apply it as a variable.
// ? const roboto = localFont({
//   ? src: [
//     ? {
//       ? path: "./Roboto-Regular.woff2",
//       ? weight: "400",
//       ? style: "normal",
//     ? },
//     ? {
//       ? path: "./Roboto-Italic.woff2",
//       ? weight: "400",
//       ? style: "italic",
//     ? },
//     ? {
//       ? path: "./Roboto-Bold.woff2",
//       ? weight: "700",
//       ? style: "normal",
//     ? },
//     ? {
//       ? path: "./Roboto-BoldItalic.woff2",
//       ? weight: "700",
//       ? style: "italic",
//     ? },
//   ? ],
// ? });

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
      <body className="bg-ebony text-wild_sand">
        {/* <main className={`${noto_sans_mono.className} max-w-4xl mx-auto py-10`}> */}
        {/* Apply below if using Tailwind and then update Tailwind config to extend the correct font family. */}
        <main
          className={`${roboto_mono.variable} font-mono max-w-4xl mx-auto py-10`}
        >
          <header className="flex items-center justify-between">
            <Link className="text-lg font-bold" href="/">
              evanmarshall<span className="text-sunset_orange">.</span>
              <span className="text-sandrift">dev</span>
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
        </main>
      </body>
    </html>
  );
}
