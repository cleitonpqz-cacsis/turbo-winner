import { useColorModeValue, Center } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Center
      marginTop={"auto"}
      as="footer"
      bg={useColorModeValue("white", "gray.800")}
      p={{ base: 3, md: 6 }}
    >
      <a
        href="https://machadomultiservices.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Copyright @ Machado Multiservices
      </a>
    </Center>
  );
}
