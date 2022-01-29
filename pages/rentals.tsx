import {
  Container,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { NextPage } from "next";

const rentals = [
  {
    id: "1",
    vehicle: {
      model: "Civic",
      manufacturer: "Honda",
      color: "Red",
      year: 2019,
    },
    customer: {
      name: "Bill",
    },
    started_at: "2022-01-12T14:41:00.263Z",
  },
  {
    id: "2",
    vehicle: {
      model: "Corolla Altis Hybrid",
      manufacturer: "Toyota",
      color: "Blue",
      year: 2022,
    },
    customer: {
      name: "Donald",
    },
    started_at: "2022-01-01T14:41:00.263Z",
  },
];

const Rentals: NextPage = () => {
  return (
    <Container>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Vehicle</Th>
            <Th>Customer</Th>
            <Th>Started At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rentals.map((rental) => (
            <Tr key={rental.id}>
              <Td>
                {rental.vehicle.manufacturer} {rental.vehicle.model}{" "}
                {rental.vehicle.year}
              </Td>
              <Td>{rental.customer.name}</Td>
              <Td>{new Date(rental.started_at).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Rentals;
