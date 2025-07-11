import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { GetStaticProps } from "next";
import { sanityClient } from "../../../lib/sanity.client";
import { allCategorySlugsQuery } from "../../../lib/queries";

type Category = {
  title: string;
  description?: string;
  slug: string;
};

export default function CategoryIndex({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Box as="main" py={{ base: "16", md: "24" }}>
      <Container maxW="5xl">
        <Box mb={8}>
          <Heading mb={2}>All Categories</Heading>
          <Text color="gray.600">Browse blog posts by category</Text>
        </Box>

        <Stack spacing={8}>
          {categories.map((category) => (
            <Box key={category.slug} p={4} borderWidth={1} borderRadius="md">
              <Link href={`/blog/category/${category.slug}`} passHref>
                <ChakraLink fontSize="xl" fontWeight="bold" color="blue.500">
                  {category.title}
                </ChakraLink>
              </Link>
              {category.description && (
                <Text mt={2} color="gray.600">
                  {category.description}
                </Text>
              )}
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const categories: Category[] = await sanityClient.fetch(
    allCategorySlugsQuery
  );

  return {
    props: {
      categories,
    },
    revalidate: 60,
  };
};
