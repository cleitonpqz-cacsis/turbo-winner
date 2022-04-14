import type { NextPage } from "next";
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Link from "next/link";
import { format } from "date-fns";
import { connectToDatabase } from "../../util/mongodb";
import { friendlyFrequency } from "../../util/app";
import NumberFormat from "react-number-format";

interface Props {
  invoices: Invoice[];
}

const Invoices: NextPage<Props> = ({ invoices }) => {
  return (
    <Box>
      <Flex>
        <Heading>Vendas</Heading>
        <Spacer />
        <Link href="/invoices/new" passHref>
          <Button colorScheme="blue">Lançar venda</Button>
        </Link>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Data da venda</Th>
            <Th>Cliente</Th>
            <Th>Descrição</Th>
            <Th>Primeiro vencimento</Th>
            <Th>Frequência</Th>
            <Th>Total</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {invoices.map((invoice) => (
            <Tr key={invoice._id}>
              <Td>{format(new Date(invoice.createdAt!), "MM/dd/yyyy")}</Td>
              <Td>{invoice.customer?.name}</Td>
              <Td>{invoice.item}</Td>
              <Td>{format(new Date(invoice.dueDate!), "MM/dd/yyyy")}</Td>
              <Td>{friendlyFrequency(invoice.paymentFrequency)}</Td>
              <Td>
                <NumberFormat
                  thousandSeparator
                  value={invoice.totalAmount}
                  prefix="$"
                />
              </Td>
              <Td>
                <Link href={`/invoices/${invoice._id}/payments`} passHref>
                  <Button colorScheme="teal" size="xs">
                    Extrato
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export const getServerSideProps = async () => {
  const { db } = await connectToDatabase();
  const collection = db.collection("invoices");

  const pipeline = [
    { $addFields: { object_customer_id: { $toObjectId: "$customer_id" } } },
    {
      $lookup: {
        from: "customers",
        localField: "object_customer_id",
        foreignField: "_id",
        as: "customer",
      },
    },
    { $unwind: "$customer" },
  ];

  const invoices = await collection
    .aggregate(pipeline)
    .sort({ createdAt: -1 })
    .toArray();

  return { props: { invoices: JSON.parse(JSON.stringify(invoices)) } };
};
export default Invoices;
