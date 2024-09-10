import { getPages } from "@/sanity/sanity-utils";
import Link from "next/link";

export async function Navbar() {
  const pages = await getPages();

  return (
    <header>
      <nav className="flex items-center justify-between">
        <Link
          className="text-2xl font-bold hover:text-sandrift transition"
          href="/"
        >
          evanmarshall<span className="text-sunset_orange">.</span>
          <span className="text-sandrift">dev</span>
        </Link>
        <div className="flex items-center gap-5 text-md text-gray-300">
          {pages.map((page) => (
            <Link
              key={page._id}
              href={`/${page.slug}`}
              className="hover:text-sandrift hover:underline"
            >
              {page.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
