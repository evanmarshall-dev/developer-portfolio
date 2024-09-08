import { getProject } from "@/sanity/sanity-utils";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

type Props = {
  params: { project: string };
};

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project = await getProject(slug);

  return (
    // Delete class for main since it is defined in layout.tsx.
    // ? <main className="max-w-4xl mx-auto py-20">
    <section className="py-20">
      <header className="flex items-center justify-between">
        <h1 className="bg-gradient-to-r from-slate-300 via-emerald-300 to-lime-500 bg-clip-text text-transparent text-5xl font-extrabold drop-shadow">
          {project.name}
        </h1>
        <Link
          href={project.url}
          title="View Project"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-100 rounded-lg text-gray-500 font-bold py-3 px-4 whitespace-nowrap hover:bg-pink-500 hover:text-pink-100 transition"
        >
          View Project
        </Link>
      </header>
      <div className="text-lg text-gray-300 mt-5">
        <PortableText value={project.content} />
      </div>
      {/* TODO: Pull in img alt in sanity-utils.ts and we will replace the below
      project.name with it. */}
      <Image
        src={project.image}
        alt={project.name}
        width={1920}
        height={1080}
        className="mt-10 border-2 border-gray-200 object-cover rounded-xl"
      />
    </section>
  );
}
