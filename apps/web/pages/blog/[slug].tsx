import {
  AspectRatio,
  Box,
  Container,
  Heading,
  Image,
  Skeleton,
  Text,
  Link as ChakraLink,
  HStack,
  Avatar,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "../../lib/sanity.client";
import { groq } from "next-sanity";
import { postBySlugQuery } from "../../lib/queries";

export const getStaticPaths: GetStaticPaths = async () => {
  const pathsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`;
  const slugs: string[] = await sanityClient.fetch(pathsQuery);

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const post = await sanityClient.fetch(postBySlugQuery, { slug });

  if (!post) return { notFound: true };

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export default function BlogPost({ post }: { post: any }) {
  return (
    <Box as="main" py={{ base: "16", md: "24" }}>
      <Container maxW="6xl">
        <Box>
          {/* Main Blog Image */}
          {post.mainImage?.asset?.url && (
            <AspectRatio ratio={16 / 9} mb={6}>
              <Image
                src={post.mainImage.asset.url}
                objectFit="cover"
                objectPosition="center"
                fallback={<Skeleton />}
                alt={post.mainImage.alt || post.title}
                borderRadius="xl"
              />
            </AspectRatio>
          )}

          {/* Title + Metadata */}
          <Box mb={6}>
            <Heading mb={2}>{post.title}</Heading>

            <HStack mb={2}>
              {post.author?.image && (
                <Avatar
                  name={post.author.name}
                  src={post.author.image.asset?.url}
                  size="sm"
                />
              )}
              <Text fontSize="sm" color="gray.500">
                By {post.author?.name}
              </Text>
              {post.publishedAt && (
                <Text fontSize="sm" color="gray.400">
                  •{" "}
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              )}
            </HStack>

            {/* Categories */}
            {post.categories?.length > 0 && (
              <Wrap mt={2}>
                {post.categories.map((cat: any) => (
                  <WrapItem key={cat.slug?.current}>
                    <Link href={`/blog/category/${cat.slug?.current}`} passHref>
                      <ChakraLink fontSize="sm" color="blue.400">
                        #{cat.title}
                      </ChakraLink>
                    </Link>
                  </WrapItem>
                ))}
              </Wrap>
            )}

            {/* Back link */}
            <Link href="/blog" passHref>
              <ChakraLink mt={4} display="inline-block">
                ← Back to blog
              </ChakraLink>
            </Link>
          </Box>

          {/* Body */}
          <Box>
            <PortableText value={post.body} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
