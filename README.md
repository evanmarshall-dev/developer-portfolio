# Business Developer Portfolio Website

## By Evan Marshall | Web Developer

### Sanity.io and Sanity Studio

#### Sanity Config (`sanity.config.ts`)

Two important aspects of the config are the **dataset** and **projectId**. ProjectId is brought over to the Next.js app you are connecting so that it knows what sanity project to look at and which dataset to pull from.

#### Schemas (`/schemaTypes/index.ts`)

This is where we tell our studio what to look like or what fields to have.

#### Content Link

Is where all of the studio data lives within a cloud. All of this happens within **datasets**. Datasets are a collection of JSON documents that can be of different types and have references to each other. As we start adding schemas and inputting content we will be able to see the raw JSON of our data.

#### Sanity.io Management Dashboard (`manage.sanity.io`)

This is where we can select our studio, see things such as the projectId, invite project members (by email address and assigned role/access level), and API.

##### API

When we deploy our app with Next.js we will have to add [Next.js Local](http://localhost:3000) to the list of CORS origins, which currently contains [Sanity Studio Local](http://localhost:3333) (local studio). This allows Next.js to see the entire dataset of the project and all of it's data.

#### GROQ

Used to query content. It is Sanity's open source query language. You can also use **GraphQL**. The **Vision** menu at the top of the studio is our playground for the studio. You can write the query in the query dialog box, click _fetch_ and it will display what we will get back with that query within the _results_ dialog box.

GROQ allows you to fetch any collection of JSON documents and allows you to filter down to exactly what you need by their properties and value. It also allows you to reform/reshape that data using projections and functions.

#### Configure Sanity Studio in Next.js

1. Install `npm install sanity next-sanity`.
2. Go to `sanity.config.ts` and import config from sanity.
3. Use the `defineConfig` function, assign to variable config, and pass in an object.
4. Inside the `defineConfig` object we need to pass in the projectId (from local studio setup), dataset (convenient if you had multiple datasets such as one for development and one for production), title, api version (today's date), base path (URL where we want Sanity studio to live and create route for it within Next.js app folder), plugins (structureTool).
5. Create the catch all route under `/app/admin/[[...index]]/page.tsx` so that all routes under admin go to `page.tsx`.
6. Inside `page.tsx` we want to export default AdminPage component and return `<NextStudio config={config} />` NextStudio with config equal to the config we just created in `sanity.config.ts`.
7. Next.js auto moves all routes under app to the server side. Therefore we need to add `"use-client"`.

#### Add Content Types on Sanity Studio

- Create a new folder at the app root called `sanity`. Within this folder create another folder (`schemas`) with `project-schema.ts` file within.
- Define project schema (name, title and type). Good practice is to define name as singular and title (Title shows in studio) as plural.
- Define a fields array which contains a bunch of objects which correspond to a field within the schema.
- Drop schema into the Sanity config so we can show schema type in our Studio.
- Refactor code in sanity config by creating a barrel file within `/sanity/schemas/index.ts` containing the code below. Each time we add a new schema we add to this `index.ts` barrel file and import into the sanity config file instead of having a new import for each schema.

Complete schema and config code:

```javascript
// @/sanity/schemas/index.ts
import project from "./project-schema";

const schemas = [project];

export default schemas;
```

```javascript
// @/sanity/schemas/project-schema.ts
const project = {
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      // Allows us to get this value from the above name field.
      options: { source: "name" },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      // Hotspot allows zooming on the image.
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    {
      name: "url",
      title: "URL",
      type: "url",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      // Array with of type of block creates a rich text field (RTF).
      of: [{ type: "block" }],
    },
  ],
};

export default project;
```

```javascript
// @/sanity.config.ts
import { structureTool } from "sanity/structure";
import { defineConfig } from "sanity";
// ? import project from "./sanity/schemas/project-schema";
import schemas from "./sanity/schemas";

const config = defineConfig({
  projectId: "m0llv72m",
  dataset: "production",
  title: "Developer Portfolio Studio",
  apiVersion: "2024-09-04",
  basePath: "/admin",
  plugins: [structureTool()],
  // ? schema: { types: [project] },
  // Refactor to allow for barrel file for all schemas.
  schema: { types: schemas },
});

export default config;
```

#### Creating Projects

##### Sanity Studio

- In Sanity Studio, we click Projects, and click new.
- Fill out the corresponding fields (All pulling from the project schema file).
- Once filled out you click publish.

##### Next.js App Sanity Folder

- Now to pull this data into our app we first create a `sanity-utils.ts` file inside the `sanity` folder. This file will contain all of the functions to be used to grab data.
  - In this file we import `createClient` from the `next-sanity` package. We create an async function `getProjects` where we create the client using data similar to `sanity.config.ts`. With this client being created we can read data from our studio.
  - We then perform a `client.fetch()` which is where we write our GROQ query.
    - Within the groq query we start with an asterisks which grabs everything in our dataset, filter down what we want to query for (i.e. []), and then we open up a projection (i.e. {}).
    - Inside the square brackets we set type to projects to pull all our projects.
    - Inside curly brackets we pull id, createdAt, name, and slug (Which is special case because we have a schema type of slug, so we rename slug.current to just slug from now on), image (Also a special case, where we pull the image.asset reference down to the URL and rename it to just image), url, and content.

##### Next.js App Folder

- Go to `@/app/page.tsx` and pull in the project info for the homepage.
  - First, we import `getProjects` from `sanity-utils.ts`.
  - We no longer need to do this by `getStaticProps` and `getStaticPaths` with Next.js 14. We now only have to call an await function on getProjects and change the homepage function to `async`.
  - When can now map over projects with key of `_id` and call fields such as `project.name`.
  - This all happens serverside since all routes within app are defaulted to serverside.

Completed sanity-utils and page.tsx code:

```jsx
// @/sanity/sanity-utils.ts
import { createClient, groq } from "next-sanity";

export async function getProjects() {
  // Use query language GROQ to grab the created projects from studio.
  const client = createClient({
    // Pass in a config so that we can use next-sanity package to create a client that can read from our content link or studio.
    // This config will only read from our content whereas the sanity config was to generate our sanity studio. You only need projectId, dataset, and apiVersion
    projectId: "m0llv72m",
    dataset: "production",
    apiVersion: "2024-09-04",
  });

  // This needs to be a return so we can grab our data.
  return client.fetch(
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
```

```jsx
// @/app/page.tsx
// import Image from "next/image";
// Import getProjects from sanity-utils.
import { getProjects } from "@/sanity/sanity-utils";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="antialiased mb-4 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        evanmarshall.
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-orange-500 from-indigo-500">
          dev
        </span>
      </h1>
      {/* <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}

      {/* Map over Sanity Projects */}
      <div>
        {projects.map((project) => (
          <div key={project._id}>{project.name}</div>
        ))}
      </div>
    </main>
  );
}
```

#### Fix Typescript Type for `project`

- Create a new folder in the root directory called `types`, which contains `Project.ts`.
  - Within this file we need to provide everything we have defined in our Sanity schema.
- Back in page.tsx we can add to the map: `{projects.map((project: Project))}` and import Project type.
- **OR** you can add Project as an array of objects to the initial const projects / getProjects function.
- **OR** you can add a promise to the `getProjects` function within `sanity-utils.ts`. Since we are doing it inside of our call, anywhere we call `getProjects` (i.e. homepage `page.tsx`) we will see that it returns a `Promise` which gives an array of projects.
  - This is the recommended way to do it because you keep all of your types in Sanity utils and your main React component don't show types but they are typed.

Final code for `Project.ts` and `sanity-utils.ts`:

```jsx
//@/types/Project.ts
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
```

```jsx
// @/sanity/sanity-utils.ts
import { Project } from "@/types/Project";
import { createClient, groq } from "next-sanity";

export async function getProjects(): Promise<Project[]> {
  // Use query language GROQ to grab the created projects from studio.
  const client = createClient({
    // Pass in a config so that we can use next-sanity package to create a client that can read from our content link or studio.
    // This config will only read from our content whereas the sanity config was to generate our sanity studio. You only need projectId, dataset, and apiVersion
    projectId: "m0llv72m",
    dataset: "production",
    apiVersion: "2024-09-04",
  });

  // This needs to be a return so we can grab our data.
  return client.fetch(
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
```

#### Creating Projects Pages Dynamically

Within the app directory (dir) you will create `@/projects/[project]/page.tsx` where `[project]` is the dynamic part of the route so when we pass in the slug that will be passed in as the project.

In previous versions of Next.js you used to have to get static paths and static props for dynamic routes, but since Next.js 13 you only need to pass in params, which we get directly from the route and Next.js will pass it in.

`params.project` is used because of the filename `[project]`. We then assign await `getProject(slug)` to a variable called project, similar to how we called `getProjects()` in `@/app/page.tsx` right inside of the component. Now we can start using the project within the return body.

Now we need to fix the errors. First add async to the component function (fxn) to remove await error. Then we need to fix the type error on params by adding a `type Props` object assigning project to type of string then adding `: Props` after the params argument in the component. Lastly, we can fix the `getProject` error, by adding info to the `sanity-utils.ts` file.

In the Sanity utils file we create another async function called `getProject` where we pass in slug which is a string type. We return a promise like we did in `getProjects` for a `<Project>`. This generates an error for returning an empty promise, which we fix that by copying the above client and groq query, but change type in the groq query to `project` and `slug.current == $slug`. This as is will return an array of Projects so we want to specify to only fetch the first one.

**An overview**: Find any project where the slug equals the slug I am passing in and only give me that one back. We pass in the slug after the query by adding `{slug: slug}` which can be shorthand as just `slug`.

**Important Note**: We do not have to write the const client each time. It can be moved out of the utils file. We can create a `client-config.ts` within the sanity folder (Different from sanity config, which is for the studio, whereas this one is for the client). We add an object to the config variable and add in the config info from the Sanity utils file. We can go back to the utils file, remove the `const client` and add `createClient(clientConfig)` to the return statement with the import from `client-config.ts`.

Now we go back to the dynamic `~/[project]/page.tsx` and add the import for `getProject` from Sanity utils.

Now anytime we click one of the projects it will dynamically create the page slug based on name of the project. This is all rendering on the server so we are sending less JS to render the project page on the browser.

Final code for projects `page.tsx`, `sanity-utils.ts`, and `client-config.ts`:

```jsx
// @/projects/[project]/page.tsx
import { getProject } from "@/sanity/sanity-utils";

type Props = {
  params: { project: string };
};

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project = await getProject(slug);

  return <div>{project.name}</div>;
}
```

```jsx
// @/sanity/sanity-utils.ts
import { Project } from "@/types/Project";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";

// ... OTHER CODE HERE ...

// Returns a single Project.
export async function getProject(slug: string): Promise<Project> {
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
```

```jsx
// @/sanity/config/client-config.ts
const config = {
  projectId: "m0llv72m",
  dataset: "production",
  apiVersion: "2024-09-04",
};

export default config;
```
