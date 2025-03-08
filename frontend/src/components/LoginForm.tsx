import { Form, useFormikContext } from "formik"
import CustomTextField from "./CustomTextField"
import { Box, Button } from "@mui/material";

const LoginForm = () => {
  const { isSubmitting } = useFormikContext();

  return (
    <Form 
      noValidate
      style={{width: "100%"}}
    >
      <Box 
        display="flex"
        flexDirection="column"
        py={5}
        gap={2}
      >
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

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="contained"
        >Entrar</Button>
      </Box>
    </Form>
  )
}

export default LoginForm;
