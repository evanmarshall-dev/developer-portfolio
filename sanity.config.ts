import { structureTool } from "sanity/structure";
import { defineConfig } from "sanity";

const config = defineConfig({
  projectId: "m0llv72m",
  dataset: "production",
  title: "Developer Portfolio Studio",
  apiVersion: "2024-09-04",
  basePath: "/admin",
  plugins: [structureTool()],
});

export default config;
