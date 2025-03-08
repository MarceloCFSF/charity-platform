import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoginFormProvider } from "../providers/LoginFormProvider";
import LoginForm from "../components/LoginForm";
import { Alert, Box, Container, Typography } from "@mui/material";

const Login = () => {
  const { isAuthenticated, error } = useAuth();

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography
          variant="h2"
          gutterBottom
        >Login</Typography>

        <LoginFormProvider>
          <LoginForm />
        </LoginFormProvider>

        {error && <Alert
          severity="error"
        >{error}</Alert>}
      </Box>
    </Container>
  )
}

export default Login;
