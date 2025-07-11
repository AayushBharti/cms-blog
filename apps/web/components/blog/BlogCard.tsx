import {
  AspectRatio,
  Avatar,
  Box,
  Heading,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

export type BlogCardPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  slug: string;
  publishedAt: string;
  author: {
    name: string;
    avatarUrl: string;
  };
};

export const BlogCard = ({ post }: { post: BlogCardPost }) => {
  return (
    <Link href={`/blog/${post.slug}`} passHref>
      <Box as="a" transition="transform 0.2s" display="block">
        <Stack spacing="6">
          <AspectRatio ratio={16 / 9} overflow="hidden" borderRadius="xl">
            <Image
              src={post.image}
              objectPosition="top"
              objectFit="cover"
              fallback={<Skeleton />}
              alt={post.title}
              _hover={{
                textDecoration: "none",
                transform: "scale(1.05)",
              }}
              transition="all 0.2s ease-in-out"
            />
          </AspectRatio>
          <Stack spacing="3">
            <Stack spacing="1">
              <Text fontSize="sm" fontWeight="semibold" color="blue.400">
                {post.category}
              </Text>
              <Heading
                size="xs"
                fontWeight="semibold"
                fontSize={{ base: "xl", lg: "2xl" }}
                lineHeight={{ base: "1.5", lg: "2rem" }}
              >
                {post.title}
              </Heading>
            </Stack>
            <Text color="gray.600">{post.excerpt}</Text>
          </Stack>
          <HStack spacing="3">
            <Avatar
              size="md"
              name={post.author.name}
              src={post.author.avatarUrl}
            />
            <Box lineHeight="1.25rem">
              <Text fontSize="sm" color="gray.800">
                {post.author.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {post.publishedAt}
              </Text>
            </Box>
          </HStack>
        </Stack>
      </Box>
    </Link>
  );
};
