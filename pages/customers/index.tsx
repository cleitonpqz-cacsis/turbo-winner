import type { NextPage } from "next";
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Link from "next/link";
import { connectToDatabase } from "../../util/mongodb";

interface Props {
  customers: Customer[];
}

const Customers: NextPage<Props> = ({ customers }) => {
  return (
    <Box>
      <Flex>
        <Heading>Clientes</Heading>
        <Spacer />
        <Link href="/customers/new" passHref>
          <Button colorScheme="blue">Novo cliente</Button>
        </Link>
      </Flex>
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
    </Box>
  );
};

export const getServerSideProps = async () => {
  const { db } = await connectToDatabase();
  const customers = await db
    .collection("customers")
    .find({})
    .sort({ name: 1 })
    .toArray();

  return { props: { customers: JSON.parse(JSON.stringify(customers)) } };
};
export default Customers;
