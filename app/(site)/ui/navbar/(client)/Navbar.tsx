"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  // function getMenuClasses() {
  //   let menuClasses = [];

  //   if (isOpen) {
  //     menuClasses = [
  //       "flex",
  //       "flex-col",
  //       "absolute",
  //       "top-[200px]",
  //       "bg-gray-800",
  //       "w-full",
  //       "p-4",
  //       "left-0",
  //       "gap-10",
  //     ];
  //   } else {
  //     menuClasses = ["hidden", "md:flex"];
  //   }

  //   return menuClasses.join(" ");
  // }

  return (
    <header>
      <nav className="z-10 flex items-center justify-between flex-col md:flex-row">
        <Link href="/">
          <h1 className="text-2xl font-semibold hover:text-sandrift active:text-sandrift transition">
            evanmarshall<span className="text-sunset_orange">.</span>
            <span className="text-sandrift">dev</span>
          </h1>
        </Link>
        <div
          className={`${isOpen ? "flex" : "hidden"} flex-col md:flex md:flex-row md:items-center md:gap-5 md:text-lg md:text-gray-300`}
        >
          {/* <div className={getMenuClasses()}> */}
          {pages.map((page) => {
            return (
              <Link
                key={page._id}
                href={`/${page.slug}`}
                className={clsx(
                  "hover:underline active:underline transition px-3 py-2",
                  {
                    "text-ebony bg-wild_sand rounded":
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
        {/* Mobile menu button. */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
