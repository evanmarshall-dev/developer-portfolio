import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "next-sanity";
import { Metadata } from "next";

// TODO: Figure out how to dynamically generate title metadata based on Sanity.io title field.
export const metadata: Metadata = {
  title: "Pages",
};

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const page = await getPage(params.slug);

  return (
    <section className="py-20">
      <header>
        <h1 className="bg-gradient-to-r from-slate-300 via-emerald-300 to-lime-500 bg-clip-text text-transparent text-5xl font-extrabold drop-shadow">
          {page.title}
        </h1>
      </header>
      <div className="text-lg text-gray-300 mt-10">
        <PortableText value={page.content} />
      </div>
    </section>
  );
}
