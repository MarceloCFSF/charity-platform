import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { logout } = useAuth();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap={10}
    >
      <Typography variant="h1">Home</Typography>

      <Button 
        variant="contained"
        onClick={() => logout()}
      >Sair</Button>
    </Box>
  )
}

export default Home;