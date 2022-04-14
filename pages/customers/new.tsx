import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import useFetch from "use-http";

interface CustomerInput {
  name: string;
  phoneNumber: string;
}

const CreateCustomer: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerInput>();

  const { post, response } = useFetch();

  const toast = useToast();

  const router = useRouter();

  const onSubmit: SubmitHandler<CustomerInput> = async (
    data: CustomerInput
  ) => {
    const result = await post("/api/customers", data);
    if (response.ok) {
      router.push("/customers");
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
      <Heading>Novo cliente</Heading>
      <VStack spacing={5}>
        <FormControl isRequired isInvalid={!!errors?.name?.message}>
          <FormLabel htmlFor="name">Nome</FormLabel>
          <Input
            width={400}
            placeholder="Nome completo do cliente"
            autoComplete="off"
            {...register("name", { required: "Nome deve ser preenchido" })}
          />
          <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors?.phoneNumber?.message}>
          <FormLabel htmlFor="phoneNumber">Telefone</FormLabel>
          <Input
            width={400}
            as={InputMask}
            mask="(999) 999 9999"
            placeholder="Preencha com o número do cliente"
            {...register("phoneNumber", {
              required: "Número de telefone deve ser preenchido",
            })}
          />
          <FormErrorMessage>{errors?.phoneNumber?.message}</FormErrorMessage>
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

export default CreateCustomer;
