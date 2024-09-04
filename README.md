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
6. Inside `page.tsx` we want to export default AdminPage component and return `<NextStudio cconfig={config} />` NextStudio with config equal to the config we just created in `sanity.config.ts`.
7. Next.js auto moves all routes under app to the server side. Therefore we need to add `"use-client"`.
