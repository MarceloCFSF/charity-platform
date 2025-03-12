import { number, object } from "yup";

export const donationValidation = object({
  institution_id: number()
    .required("É necessário definir a instituição a qual a doação será feita"),
  value: number()
    .min(5, "A doação deve ser de no mínimo R$ 5,00")
    .required("Valor da doação é obrigatório")
});
