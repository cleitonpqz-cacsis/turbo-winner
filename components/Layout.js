import Head from "next/head";
import { Box, Flex, Stack } from "@chakra-ui/react";
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Machado Multiservices Contract Managment</title>
        <meta name="description" content="Contract management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction={"column"}>
        <NavBar />
        <Stack
          as={Box}
          h={"100vh"}
          spacing={{ base: 8, md: 14 }}
          p={{ base: 3, md: 6 }}
        >
          {children}
        </Stack>
        <Footer />
      </Flex>
    </>
  );
}
