import "@/app/globals.css";
import { roboto_mono } from "@/app/(site)/ui/fonts";
import Link from "next/link";
import { getPages } from "@/sanity/sanity-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "evanmarshall.dev | %s",
    default: "evanmarshall.dev",
  },
  description:
    "Contact me today to discuss how I can get your business online and working for you.",
  keywords: ["Web Developer", "Website", "Nova Scotia", "Web Design"],
  authors: [
    { name: "Evan Marshall", url: "https://github.com/evanmarshall-dev" },
  ],
  creator: "Evan Marshall",
  metadataBase: new URL("https://evanmarshall.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "evanmarshall.dev",
    description:
      "Contact me today to discuss how I can get your business online and working for you.",
    url: "https://evanmarshall.dev",
    // images: [
    //   {
    //     url: "https://nextjs.org/og.png", // Must be an absolute URL
    //     width: 800,
    //     height: 600,
    //   },
    //   {
    //     url: "https://nextjs.org/og-alt.png", // Must be an absolute URL
    //     width: 1800,
    //     height: 1600,
    //     alt: "My custom alt",
    //   },
    // ],
    locale: "en_CA",
    type: "website",
  },
  robots: {
    index: true,
    // follow: true,
    // nocache: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "evanmarshall.dev",
    description:
      "Contact me today to discuss how I can get your business online and working for you.",
    // siteId: "1467726470533754880",
    // creator: "@nextjs",
    // creatorId: "1467726470533754880",
    // images: ["https://nextjs.org/og.png"], // Must be an absolute URL
  },
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
      <body>
        {/* <main className={`${noto_sans_mono.className} max-w-4xl mx-auto py-10`}> */}
        {/* Apply below if using Tailwind and then update Tailwind config to extend the correct font family. */}
        <main
          className={`${roboto_mono.variable} font-mono max-w-4xl mx-auto py-10 antialiased`}
        >
          <header className="flex items-center justify-between">
            <Link
              className="text-lg font-bold hover:text-sandrift transition"
              href="/"
            >
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
