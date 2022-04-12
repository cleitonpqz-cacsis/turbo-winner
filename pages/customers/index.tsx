import type { NextPage } from "next";
import { Button, Container, Heading } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Link from "next/link";
import { connectToDatabase } from "../../util/mongodb";

const Customers: NextPage = ({ customers }) => {
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
          {customers.map((customer) => (
            <Tr key={customer._id}>
              <Td>{customer.name}</Td>
              <Td>{customer.phoneNumber}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export const getServerSideProps = async () => {
  const { db } = await connectToDatabase();
  const customers = await db
    .collection("customers")
    .find({})
    .sort({ metacritic: -1 })
    .toArray();

  return { props: { customers: JSON.parse(JSON.stringify(customers)) } };
};
export default Customers;
