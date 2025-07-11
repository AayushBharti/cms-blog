// export const config = {
//   dataset: "production",
//   projectId: "orzazz9oK",
//   apiVersion: "2021-10-21", // Learn more: https://www.sanity.io/docs/api-versioning
//   useCdn: true,
// };

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION as string,
  // useCdn: true,
  token: process.env.SANITY_API_TOKEN as string,
};
