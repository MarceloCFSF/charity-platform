import { Formik } from "formik";
import { useAuth } from "../hooks/useAuth";
import { LoginRequest } from "../services/authService";
import { loginValidation } from "../validations/loginValidation";

export interface LoginFormProviderType {
  onSubmit?: () => void;
  children: React.ReactNode;
}

export const LoginFormProvider = ({ children }: LoginFormProviderType) => {
  const { login } = useAuth();

  const initialValues: LoginRequest = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    login(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginValidation}
    >{children}</Formik>
  )
}
