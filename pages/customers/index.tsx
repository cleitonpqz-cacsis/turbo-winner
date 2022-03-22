import type { NextPage } from "next";
import { Button, Container, Heading } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Link from "next/link";

const Customers: NextPage = () => {
  return (
    <Container>
      <Heading>Clientes</Heading>
      <Link href="/customers/new">
        <Button colorScheme="blue" marginBottom="10px" float="right">
          Novo cliente
        </Button>
      </Link>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Telefone</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>José Manoel</Td>
            <Td>(000) 000-0000</Td>
          </Tr>
          <Tr>
            <Td></Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>
    </Container>
  );
};

export default Customers;
