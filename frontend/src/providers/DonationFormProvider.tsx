import { Formik } from "formik";
import { ReactNode } from "react";
import { useDonation } from "../hooks/useDonation";
import { donationValidation } from "../validations/donationValidation";
import { CreateDonationInput } from "../services/donationsService";

export interface DonationFormProviderType {
  children: ReactNode,
  institutionId: number,
  onSubmit?: () => void
}

const DonationFormProvider = (
  { children, institutionId, onSubmit } : DonationFormProviderType
) => {
  const { create } = useDonation();

  const initialValues: CreateDonationInput = {
    institution_id: institutionId,
    value: ""
  }

  const handleSubmit = async (values: typeof initialValues) => {
    const response = await create(values);
    if (!response) onSubmit?.();
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={donationValidation}
    >{children}</Formik>
  )
}

export default DonationFormProvider;
