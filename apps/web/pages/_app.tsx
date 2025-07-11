import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
