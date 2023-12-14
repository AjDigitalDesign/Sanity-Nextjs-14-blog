import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "u3wokp6q",
  dataset: "production",
  apiVersion: "2023-12-14",
  useCdn: true,
});
