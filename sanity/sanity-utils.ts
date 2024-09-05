import { Project } from "@/types/Project";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";

// Returns an array for Project.
export async function getProjects(): Promise<Project[]> {
  // Use query language GROQ to grab the created projects from studio.
  // ? const client = createClient({
  //   // Pass in a config so that we can use next-sanity package to create a client that can read from our content link or studio.
  //   // This config will only read from our content whereas the sanity config was to generate our sanity studio. You only need projectId, dataset, and apiVersion
  //   ? projectId: "m0llv72m",
  //   ? dataset: "production",
  //   ? apiVersion: "2024-09-04",
  // ? });

  // This needs to be a return so we can grab our data.
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content
    }`
  );
}

// Returns a single Project.
export async function getProject(slug: string): Promise<Project> {
  // ? const client = createClient({
  //   ? projectId: "m0llv72m",
  //   ? dataset: "production",
  //   ? apiVersion: "2024-09-04",
  // ? });

  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content
    }`,
    // ? { slug: slug }
    { slug }
  );
}
