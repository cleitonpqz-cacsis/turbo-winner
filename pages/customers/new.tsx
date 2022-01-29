import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { BaseSyntheticEvent, useState } from "react";
import InputMask from "react-input-mask";

const CreateCustomer: NextPage = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneEmpty, setIsPhoneEmpty] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState(false);

  const handleNameChange = (e: BaseSyntheticEvent) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e: BaseSyntheticEvent) => {
    setPhoneNumber(e.target.value);
  };

  const handleButtonClick = (e: BaseSyntheticEvent) => {
    setIsNameEmpty(name === "");
    setIsPhoneEmpty(phoneNumber === "");
  };
  return (
    <Container>
      <FormControl isRequired isInvalid={isNameEmpty}>
        <FormLabel marginTop={2} htmlFor="name">
          Nome
        </FormLabel>
        <Input
          width={400}
          id="name"
          placeholder="Preencha com o nome completo do cliente"
          autoComplete="off"
          value={name}
          onChange={handleNameChange}
        ></Input>
        <FormErrorMessage>Preencha o nome</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={isPhoneEmpty}>
        <FormLabel marginTop={2} htmlFor="phoneNumber">
          Telefone
        </FormLabel>
        <Input
          width={400}
          as={InputMask}
          mask="(999) 999 9999"
          id="phoneNumber"
          placeholder="Preencha com o número do cliente"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        ></Input>
        <FormErrorMessage>Preencha o número de telefone</FormErrorMessage>
      </FormControl>
      <Button marginTop={2} colorScheme="blue" onClick={handleButtonClick}>
        Criar
      </Button>
    </Container>
  );
};

export default CreateCustomer;
