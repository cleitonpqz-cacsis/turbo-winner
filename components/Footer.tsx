import styles from "../styles/Home.module.css";
import { useColorModeValue, Box } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      className={styles.footer}
      as="footer"
      bg={useColorModeValue("white", "gray.800")}
    >
      <a
        href="https://machadomultiservices.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Copyright @ Machado Multiservices
      </a>
    </Box>
  );
}
