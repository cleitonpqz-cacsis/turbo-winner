import Head from "next/head";
import { Box, Center } from "@chakra-ui/react";
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
      <Center>
        <Box width="6xl">
          <NavBar />
          <Box minH={570} mt={5}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Center>
    </>
  );
}
