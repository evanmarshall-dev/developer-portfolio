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
      name: "nickname",
      title: "Nickname",
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
