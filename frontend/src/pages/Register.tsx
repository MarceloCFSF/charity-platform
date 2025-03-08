import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import { Alert, Box, Container, Link, Typography } from "@mui/material";
import { RegisterFormProvider } from "../providers/RegisterFormProvider";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  const { isAuthenticated, error } = useAuth();

  if (isAuthenticated) return <Navigate to="/" />

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h2">Cadastro</Typography>

        <RegisterFormProvider>
          <RegisterForm />
        </RegisterFormProvider>

        {error && <Alert
          severity="error"
          sx={{ mb: 5 }}
        >{error}</Alert>}

        <Typography variant="body1">
          Já possui um cadastro? Faça login <Link href="/login">aqui</Link>.
        </Typography>
      </Box>
    </Container>
  )
}

export default Register;
