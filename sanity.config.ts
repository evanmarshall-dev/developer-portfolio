import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
// ? import project from "./sanity/schemas/project-schema";
import schemas from "./sanity/schemas";

const config = defineConfig({
  projectId: "m0llv72m",
  dataset: "production",
  title: "Developer Portfolio Studio",
  apiVersion: "2024-09-04",
  basePath: "/admin",
  plugins: [structureTool(), visionTool()],
  // ? schema: { types: [project] },
  // Refactor to allow for barrel file for all schemas.
  schema: { types: schemas },
});

export default config;
