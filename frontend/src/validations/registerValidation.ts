import { object, ref, string } from "yup";

export const registerValidation = object({
  name: string()
    .required("Nome é obrigatório"),
  email: string()
    .email("Digite um email valido")
    .required("Email é obrigatório"),
  password: string()
    .required("Senha é obrigatório"),
  confirmPassword: string()
    .oneOf(
      [ref('password'), ''],
      "Senhas devem ser iguais"
    )
    .required('Confirmação de senha é obrigatório')
})