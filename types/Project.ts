import { PortableTextBlock } from "next-sanity";

export type Project = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: string;
  image: string;
  url: string;
  // Sanity stores content in rich text blocks.
  content: PortableTextBlock[];
};
