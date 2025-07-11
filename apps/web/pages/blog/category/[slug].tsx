// apps/web/pages/category/[slug].tsx

import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { sanityClient, urlFor } from "../../../lib/sanity.client";
import { BlogCard } from "../../../components/blog/BlogCard";
import {
  allCategorySlugsQuery,
  postsByCategoryQuery,
} from "../../../lib/queries";

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await sanityClient.fetch(allCategorySlugsQuery);

  return {
    paths: slugs.map((cat: { slug: string }) => ({
      params: { slug: cat.slug },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const posts = await sanityClient.fetch(postsByCategoryQuery, { slug });

  if (!posts || posts.length === 0) {
    return { notFound: true };
  }

  const formattedPosts = posts.map((post: any) => ({
    id: post._id,
    title: post.title,
    excerpt:
      post.body?.[0]?.children?.[0]?.text ??
      "No excerpt available from Sanity content.",
    image: post.mainImage ? urlFor(post.mainImage).width(800).url() : "",
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
        : "https://tinyurl.com/2p98t7nh",
    },
  }));

  return {
    props: {
      posts: formattedPosts,
      category: slug,
    },
    revalidate: 60,
  };
};

export default function CategoryPage({
  posts,
  category,
}: {
  posts: any[];
  category: string;
}) {
  return (
    <Box as="main" py={{ base: "16", md: "24" }}>
      <Container maxW="6xl">
        <Heading mb={4}>Posts in: {category}</Heading>
        <Link href="/" passHref>
          <ChakraLink>← Back to homepage</ChakraLink>
        </Link>

        <Stack spacing={8} mt={10} shouldWrapChildren>
          <Box maxW="3xl" mx="auto">
            <Stack spacing="16">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
