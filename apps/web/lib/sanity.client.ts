import { createClient } from "next-sanity";
// import { createPreviewSubscriptionHook, createCurrentUserHook } from 'next-sanity'
import createImageUrlBuilder from "@sanity/image-url";
import { config } from "./sanity.config";

// Standard client for fetching
export const sanityClient = createClient(config);

// Image builder
export const urlFor = (source: any) =>
  createImageUrlBuilder(config).image(source);
// console.log(config);

// Live preview hook (for useSWR)
// export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Logged-in Sanity user (if needed)
// export const useCurrentUser = createCurrentUserHook(config)
// Helper
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

export const getClient = (preview = false) =>
  preview ? previewClient : sanityClient;
