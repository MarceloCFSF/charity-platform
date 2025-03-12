import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoginFormProvider } from "../providers/LoginFormProvider";
import LoginForm from "../components/LoginForm";
import { Alert, Box, Container, Link, Typography } from "@mui/material";

const Login = () => {
  const { isAuthenticated, error } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} />;
  }

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h2">Login</Typography>

        <LoginFormProvider>
          <LoginForm />
        </LoginFormProvider>
        
        {error && <Alert
          severity="error"
          sx={{ mb: 5 }}
        >{error}</Alert>}

        <Typography variant="body1">
          Não possui cadastro? Cadastre-se <Link href="/register">aqui</Link>.
        </Typography>
      </Box>
    </Container>
  )
}

export default Login;
