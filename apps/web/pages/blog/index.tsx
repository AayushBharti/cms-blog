import {
  Box,
  Container,
  Stack,
  Heading,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { BlogCard, BlogCardPost } from "../../components/blog/BlogCard";
import { sanityClient, urlFor } from "../../lib/sanity.client";
import { allPostsQuery } from "../../lib/queries";
import type { GetStaticProps } from "next";

// Define how raw Sanity data looks
type SanityPost = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: any;
  body?: any;
  author?: {
    name: string;
    image?: any;
  };
  categories?: { title: string }[];
};

export default function Blog({ posts }: { posts: BlogCardPost[] }) {
  return (
    <Box as="main" py={{ base: "16", md: "24" }}>
      <Container maxW="6xl">
        <Box mb={8}>
          <Heading mb={2}>All Blog Posts</Heading>
          <Link href="/" passHref>
            <ChakraLink>← Back to homepage</ChakraLink>
          </Link>
          <Text mt={4} color="gray.600">
            Discover the latest posts below
          </Text>
        </Box>

        <Stack spacing={12} maxW="3xl" mx="auto">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// Get blog posts from Sanity and normalize them
export const getStaticProps: GetStaticProps = async () => {
  const posts: SanityPost[] = await sanityClient.fetch(allPostsQuery);

  const formattedPosts: BlogCardPost[] = posts.map((post: SanityPost) => ({
    id: post._id,
    title: post.title,
    excerpt:
      post.body?.[0]?.children?.[0]?.text ??
      "No excerpt available from Sanity content.",
    image: post.mainImage
      ? urlFor(post.mainImage).width(800).height(450).url()
      : "",
    category: post.categories?.[0]?.title ?? "Uncategorized",
    publishedAt: new Date(post.publishedAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    slug: post.slug.current,
    author: {
      name: post.author?.name ?? "Unknown",
      avatarUrl: post.author?.image
        ? urlFor(post.author.image).width(64).height(64).url()
        : "",
    },
  }));

  return {
    props: { posts: formattedPosts },
    revalidate: 60, // ISR: Rebuild every 60 seconds
  };
};
