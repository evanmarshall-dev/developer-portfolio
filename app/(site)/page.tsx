// Import getProjects from sanity-utils.
import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
// ? import { Project } from "@/types/Project";

export default async function Home() {
  const projects = await getProjects();
  // Option #1 for adding project types.
  // ? const projects: Project[] = await getProjects();

  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="antialiased mb-4 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        evanmarshall.
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-orange-500 from-indigo-500">
          dev
        </span>
      </h1>
      <h2 className="text-4xl font-extrabold dark:text-gray-400">
        My Projects
      </h2>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Map over Sanity Projects */}
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project._id}
            className="border-2 border-gray-500 rounded-lg p-1 text-center hover:scale-105 hover:border-blue-500 transition"
          >
            {/* If project.image exist then lets show image. */}
            {project.image && (
              <Image
                className="object-cover rounded-lg border border-gray-500"
                src={project.image.url}
                alt={project.image.alt}
                width={450}
                height={200}
              />
            )}
            <div className="mt-2 font-extrabold bg-gradient-to-r from-slate-300 via-emerald-300 to-lime-500 bg-clip-text text-transparent">
              {project.name}
            </div>
            {/* <div>{project.slug}</div> */}
          </Link>
        ))}
      </div>
      {/* Option #2 for adding project types. */}
      {/* {projects.map((project: Project) => (
          <div key={project._id}>{project.name}</div>
        ))} */}
    </section>
  );
}
