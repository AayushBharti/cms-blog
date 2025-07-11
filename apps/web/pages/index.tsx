import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Index() {
  return (
    <Box as="main" py={{ base: "16", md: "24" }}>
      <Container maxW="6xl">
        <Heading mb={2}>CMS Blog</Heading>

        <Stack mt={4}>
          <Link href="/blog" passHref>
            <ChakraLink textDecoration="underline">Blog list page</ChakraLink>
          </Link>
          <Link href="/blog/women-in-tech" passHref>
            <ChakraLink textDecoration="underline">Blog single page</ChakraLink>
          </Link>
          <Link href="/blog/category" passHref>
            <ChakraLink textDecoration="underline">
              Blog categories page
            </ChakraLink>
          </Link>
          <Link href="/blog/category/research" passHref>
            <ChakraLink textDecoration="underline">
              Research (list of category blog posts tagged with
              &apos;Research&apos;)
            </ChakraLink>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
