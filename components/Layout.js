import Head from "next/head";
import { Box } from '@chakra-ui/react'
import NavBar from "./NavBar.tsx"
import Footer from "./Footer.tsx"

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>Machado Multiservices Contract Managment</title>
                <meta name="description" content="Contract management" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar/>
            <Box minH={500}>{ children }</Box>
            <Footer/>
        </>
    )
}