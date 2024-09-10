"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

interface Page {
  _id: string;
  slug: string;
  title: string;
}

interface NavbarProps {
  pages: Page[];
}

export default function Navbar({ pages }: NavbarProps) {
  // const pages = await getPages();
  const pathname = usePathname();

  return (
    <header>
      <nav className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-semibold hover:text-sandrift active:text-sandrift transition">
            evanmarshall<span className="text-sunset_orange">.</span>
            <span className="text-sandrift">dev</span>
          </h1>
        </Link>
        <div className="flex items-center gap-5 text-lg text-gray-300">
          {pages.map((page) => {
            return (
              <Link
                key={page._id}
                href={`/${page.slug}`}
                className={clsx(
                  "hover:text-sandrift hover:underline active:text-sandrift active:underline transition px-3 py-2",
                  {
                    "text-sandrift bg-wild_sand rounded":
                      pathname === `/${page.slug}`,
                  }
                )}
                // className="hover:text-sandrift hover:underline active:text-sandrift active:underline transition"
              >
                {page.title}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-5 text-lg text-gray-300">
          {/* Next Link is only needed for internal linking. */}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:me@evanmarshall.dev"
            className="hover:text-sandrift hover:bg-wild_sand active:text-sandrift active:bg-wild_sand bg-sandrift px-3 py-2 rounded transition"
          >
            Email Me
          </a>
        </div>
      </nav>
    </header>
  );
}
