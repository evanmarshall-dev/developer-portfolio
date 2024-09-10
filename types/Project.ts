import { PortableTextBlock } from "next-sanity";

export type Project = {
  _id: string;
  _createdAt: Date;
  name: string;
  nickname: string;
  slug: string;
  // image: string;
  image: {
    url: string;
    alt: string;
  };
  url: string;
  // Sanity stores content in rich text blocks.
  content: PortableTextBlock[];
};
