import { Box, Button } from "@mui/material";
import { Form } from "formik";
import CustomTextField from "./CustomTextField";

const RegisterForm = () => {
  return (
    <Form
      noValidate
      style={{ width: '100%' }}
    >
      <Box
        display="flex"
        flexDirection="column"
        py={3}
        gap={2}
      >
        <CustomTextField
          required
          name="name"
          label="Nome"
          type="text"
        />

        <CustomTextField
          required
          name="email"
          label="Email"
          type="email"
        />
        
        <CustomTextField
          required
          name="password"
          label="Senha"
          type="password"
        />
        
        <CustomTextField
          required
          name="confirmPassword"
          label="Confirme a senha"
          type="password"
        />

        <Button
          type="submit"
          variant="contained"
        >Enviar</Button>
      </Box>
    </Form>
  )
}

export default RegisterForm;
