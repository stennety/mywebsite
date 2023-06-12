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
            name: "layout",
            label: "Layout",
            required: true,
            options: [
              {
                value: 'post',
                label: 'Post',
              }]
          },
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
            "label": "Categories",
            options: [
              {
                value: 'About ben',
                label: 'About Ben',
              },
              {
                value: 'Announcement',
                label: 'Announcement',
              },
              {
                value: 'Community',
                label: 'Community',
              },
              {
                value: 'Conferences',
                label: 'Conferences',
              },              {
                value: 'How to',
                label: 'How to',
              },              {
                value: 'Quality',
                label: 'Quality',
              },              {
                value: 'Tester of The Day',
                label: 'Tester of The Day',
              },              {
                value: 'Testing',
                label: 'Testing',
              },
              {
                value: 'Testing for Developers',
                label: 'Testing for Developers',
              }
            ]
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
