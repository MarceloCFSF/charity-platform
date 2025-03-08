import { ReactNode } from "react"
import { User } from "../models/user"
import { useAuth } from "../hooks/useAuth"
import { Formik } from "formik"
import { registerValidation } from "../validations/registerValidation"

export interface RegisterFormRequest extends Omit<User, 'id'> {
  confirmPassword: string
}

export interface RegisterFormProviderType {
  children: ReactNode
}

export const RegisterFormProvider = ({ children }: RegisterFormProviderType) => {
  const { register } = useAuth();

  const initialValues: RegisterFormRequest = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const handleSubmit = (values: typeof initialValues) => {
    register(values); 
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerValidation}
    >{children}</Formik>
  )
}
