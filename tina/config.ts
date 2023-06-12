import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
const clientId = process.env.TINA_PUBLIC_CLIENT_ID || null;
const token = process.env.TINA_TOKEN || null;

export default defineConfig({
  branch,
  token: token, // generated on app.tina.io,
  clientId: clientId, // generated on app.tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "./",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "./",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "_posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            "name": "date",
            "label": "Date"
          },
          {
            "type": "string",
            "name": "categories",
            "label": "Categories"
          },
          {
            "type": "string",
            "name": "tags",
            "label": "Tags",
            "list": true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
