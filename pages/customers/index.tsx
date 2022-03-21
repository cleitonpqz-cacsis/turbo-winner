import type { NextPage } from "next";
import { Button, Container } from "@chakra-ui/react";
import Link from "next/link";

const Customers: NextPage = () => {
  return (
    <Container>
      <Link href="/customers/new">
        <Button colorScheme="blue" marginTop="10px">
          Novo cliente
        </Button>
      </Link>
    </Container>
  );
};

export default Customers;
