import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "tno2uelo",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2023-11-17", // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;
