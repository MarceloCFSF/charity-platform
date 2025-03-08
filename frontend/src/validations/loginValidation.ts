import { object, string } from "yup";

export const loginValidation = object({
  email: string()
    .email("Digite um e-mail válido")
    .required("E-mail é obrigatório"),
  password: string()
    .required("Senha é obrigatória"),
})
