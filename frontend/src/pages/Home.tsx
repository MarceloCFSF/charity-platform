import { Box, CircularProgress, Grid2, Typography } from "@mui/material";
import { useInstitution } from "../hooks/useInstitution";
import InstitutionTile from "../components/InstitutionTile";

const Home = () => {
  const { loading, institutions } = useInstitution();

  if (loading) return (
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={60} />
    </Box>
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
      gap={10}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "clamp(2rem, 5vw, 6rem)" }}
      >Instituições</Typography>

      <Grid2 container spacing={2} width="100%">
        {institutions.map((institution, index) => ( 
          <Grid2 
            key={`institution_${index}`}
            size={{xs: 12, sm: 6, md: 4}}
          >
            <InstitutionTile institution={institution} />
          </Grid2>
         ))}
      </Grid2>
    </Box>
  )
}

export default Home;