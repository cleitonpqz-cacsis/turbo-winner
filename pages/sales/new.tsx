import { NextPage } from "next";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Radio,
  RadioGroup,
  Stack,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Flex,
} from "@chakra-ui/react";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";

const CreateCustomer: NextPage = () => {
  // fields
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");
  const [saleDate, setSaleDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("");
  const [numberOfPayments, setNumberOfPayments] = useState(1);

  // field validation
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isServiceEmpty, setIsServiceEmpty] = useState(false);
  const [isAmountEmpty, setIsAmountEmpty] = useState(false);
  const [isSaleDateEmpty, setIsSaleDateEmpty] = useState(false);
  const [isPaymentFrequencyEmpty, setIsPaymentFrequencyEmpty] = useState(false);
  const [isPaymentMethodOnTerm, setIsPaymentMethodOnTerm] = useState(false);

  const handleNameChange = (e: BaseSyntheticEvent) => {
    setName(e.target.value);
  };

  const handleServiceChange = (e: BaseSyntheticEvent) => {
    setService(e.target.value);
  };

  const handleAmountChange = (e: BaseSyntheticEvent) => {
    setAmount(e.target.value);
  };

  const handleSaleDateChange = (date: Date) => {
    setSaleDate(date);
  };

  const handlePaymentMethodChange = (selectedPaymentMethod: string) => {
    setPaymentMethod(selectedPaymentMethod);
  };

  const handleFrequencyChange = (e: BaseSyntheticEvent) => {
    setPaymentFrequency(e.target.value);
  };

  const handleNumberOfPaymentsChange = (parcela: number) => {
    setNumberOfPayments(parcela);
  };

  const handleButtonClick = (e: BaseSyntheticEvent) => {
    setIsNameEmpty(name === "");
    setIsServiceEmpty(service === "");
    setIsAmountEmpty(amount === "");
    setIsSaleDateEmpty(saleDate === "");
    setIsPaymentFrequencyEmpty(paymentFrequency === "");
  };

  useEffect(() => {
    setIsPaymentMethodOnTerm(paymentMethod === "ON_TERM");
  }, [paymentMethod]);

  return (
    <Container>
      <FormControl isRequired isInvalid={isNameEmpty}>
        <FormLabel marginTop={2} htmlFor="name">
          Cliente
        </FormLabel>
        <Input
          id="name"
          width={400}
          placeholder="Nome do cliente"
          value={name}
          onChange={handleNameChange}
        ></Input>
        <FormErrorMessage>Preencha o nome do cliente</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={isServiceEmpty}>
        <FormLabel marginTop={2} htmlFor="service">
          Serviço
        </FormLabel>
        <Input
          id="service"
          width={400}
          placeholder="Qual o serviço realizado?"
          value={service}
          onChange={handleServiceChange}
        ></Input>
        <FormErrorMessage>Preencha o serviço realizado</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={isSaleDateEmpty}>
        <FormLabel marginTop={2} htmlFor="saleDate">
          Data
        </FormLabel>
        <Input
          as={DatePicker}
          id="saleDate"
          width={150}
          placeholder="Quando a venda foi realizada?"
          selected={saleDate}
          onChange={handleSaleDateChange}
          closeOnScroll={true}
        ></Input>
        <FormErrorMessage>Favor preencher a data da venda</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={isAmountEmpty}>
        <FormLabel marginTop={2} htmlFor="amount">
          Valor{" "}
        </FormLabel>
        <InputGroup>
          <InputLeftAddon>$</InputLeftAddon>
          <Input
            as={NumberFormat}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            id="amount"
            width={235}
            placeholder="Valor total da venda"
            value={amount}
            onChange={handleAmountChange}
          ></Input>
        </InputGroup>
        <FormErrorMessage>Favor preencher o total da venda</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel marginTop={2} htmlFor="paymentMethod">
          Forma de pagamento
        </FormLabel>
        <RadioGroup id="paymentMethod" onChange={handlePaymentMethodChange}>
          <Stack direction="row" spacing="24px">
            <Radio value="CASH_SALE">A vista</Radio>
            <Radio value="ON_TERM">A prazo</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      {isPaymentMethodOnTerm && (
        <>
          <FormControl isRequired isInvalid={isPaymentFrequencyEmpty}>
            <FormLabel marginTop={2} htmlFor="paymentFrequency">
              Qual a frequência de pagamento?
            </FormLabel>
            <Select
              id="paymentFrequency"
              width={400}
              placeholder="Escolha a frequência do pagamento"
              value={paymentFrequency}
              onChange={handleFrequencyChange}
            >
              <option>Semanal</option>
              <option>Mensal</option>
            </Select>
            <FormErrorMessage>
              Escolha a frequência de pagamento para venda a prazo
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel marginTop={2} htmlFor="parcela">
              Quantas parcelas?
            </FormLabel>
            <Flex>
              <NumberInput
                maxW="100px"
                mr="2rem"
                value={numberOfPayments}
                onChange={handleNumberOfPaymentsChange}
                max={36}
                min={1}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider
                maxWidth={265}
                id="parcela"
                flex="1"
                focusThumbOnChange={false}
                value={numberOfPayments}
                onChange={handleNumberOfPaymentsChange}
                max={36}
                min={1}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize="sm" boxSize="32px">
                  {numberOfPayments}
                </SliderThumb>
              </Slider>
            </Flex>
          </FormControl>
        </>
      )}
      <Button marginTop={2} colorScheme="blue" onClick={handleButtonClick}>
        Salvar
      </Button>
    </Container>
  );
};
export default CreateCustomer;
