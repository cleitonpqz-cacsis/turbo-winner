import { NextPage } from "next";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
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
  Flex,
  Heading,
  VStack,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import useFetch from "use-http";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../util/mongodb";

interface CreateInvoiceInput {
  customer_id: string;
  item: string;
  totalAmount: string;
  dueDate: Date;
  paymentFrequency: string;
  numberOfPayments: number;
}

const CreateInvoice: NextPage = ({ customers }) => {
  const { post, response } = useFetch();
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateInvoiceInput>();

  const onSubmit: SubmitHandler<CreateInvoiceInput> = async (
    invoice: CreateInvoiceInput
  ) => {
    const result = await post("/api/invoices", {
      ...invoice,
      totalAmount: parseFloat(invoice.totalAmount.replace(/,/g, "")),
    });
    if (response.ok) {
      router.push("/invoices");
    } else if (response.status === 409) {
      toast({
        title: "Erro ao criar um novo cliente",
        description: result.error,
        isClosable: true,
        status: "warning",
        position: "top-right",
      });
    }
  };

  return (
    <Box width="xl">
      <Heading>Nova venda</Heading>
      <VStack spacing={5}>
        <FormControl isRequired isInvalid={!!errors.customer_id?.message}>
          <FormLabel htmlFor="customer_id">Cliente</FormLabel>
          <Controller
            control={control}
            name="customer_id"
            rules={{ required: "Selecione um cliente" }}
            render={({ field: { onChange } }) => (
              <AutoComplete
                openOnFocus
                onChange={onChange}
                onSelectOption={(item) => console.log(item)}
              >
                <AutoCompleteInput variant="filled" />
                <AutoCompleteList>
                  {customers.map((customer) => (
                    <AutoCompleteItem
                      key={customer._id}
                      label={customer.name}
                      value={customer._id}
                    >
                      {customer.name}
                    </AutoCompleteItem>
                  ))}
                </AutoCompleteList>
              </AutoComplete>
            )}
          />

          <FormHelperText>Digite o nome do cliente</FormHelperText>
          <FormErrorMessage>{errors.customer_id?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors?.item?.message}>
          <FormLabel htmlFor="item">Item</FormLabel>
          <Input
            width={400}
            placeholder="Nome ou descrição do produto ou serviço"
            {...register("item", {
              required:
                "O serviço realizado ou produto vendido deve ser informado",
            })}
          />
          <FormErrorMessage>{errors?.item?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors?.dueDate?.message}>
          <FormLabel htmlFor="saleDate">Primeira data de pagamento</FormLabel>
          <Controller
            control={control}
            name="dueDate"
            defaultValue={new Date()}
            rules={{ required: "Informe a data do primeiro vencimento" }}
            render={({ field }) => (
              <Input
                as={DatePicker}
                width={150}
                selected={field.value}
                closeOnScroll={true}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
          <FormErrorMessage>{errors?.dueDate?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.totalAmount?.message}>
          <FormLabel htmlFor="totalAmount">Valor total da venda</FormLabel>
          <InputGroup>
            <InputLeftAddon>$</InputLeftAddon>
            <Controller
              control={control}
              name="totalAmount"
              rules={{ required: "Informe o valor total da venda" }}
              render={({ field }) => (
                <Input
                  as={NumberFormat}
                  thousandSeparator={true}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  width={235}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
          </InputGroup>
          <FormErrorMessage>{errors.totalAmount?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.numberOfPayments?.message}>
          <FormLabel htmlFor="parcela">
            Informe a quantidade de parcelas
          </FormLabel>
          <Controller
            control={control}
            name="numberOfPayments"
            defaultValue={1}
            rules={{
              required: "A quantidade de parcelas deve ser preenchida",
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <Flex>
                  <NumberInput
                    maxW="100px"
                    mr="2rem"
                    value={value}
                    onChange={onChange}
                    max={80}
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
                    value={value}
                    onChange={onChange}
                    max={80}
                    min={1}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb fontSize="sm" boxSize="32px">
                      {value}
                    </SliderThumb>
                  </Slider>
                </Flex>
                <FormErrorMessage>
                  {errors.numberOfPayments?.message}
                </FormErrorMessage>
              </>
            )}
          />
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.paymentFrequency?.message}>
          <FormLabel htmlFor="paymentFrequency">
            Qual a frequência de pagamento?
          </FormLabel>
          <Select
            id="paymentFrequency"
            width={400}
            placeholder="Escolha uma opção"
            {...register("paymentFrequency", {
              required: "Informe a frenquência de pagamento",
            })}
          >
            <option value="WEEKLY">Semanal</option>
            <option value="MONTHLY">Mensal</option>
          </Select>
          <FormErrorMessage>
            {errors.paymentFrequency?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
            Salvar
          </Button>
        </FormControl>
      </VStack>
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

  return {
    props: {
      customers: JSON.parse(JSON.stringify(customers)),
    },
  };
};

export default CreateInvoice;
