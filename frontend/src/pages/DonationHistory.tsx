import { Box, CircularProgress, Grid2, Typography } from "@mui/material";
import { useInstitution } from "../hooks/useInstitution";
import { useDonation } from "../hooks/useDonation";
import DonationTile from "../components/DonationTile";

const DonationHistory = () => {
  const { loading: loadingInst } = useInstitution();
  const {loading, donations} = useDonation();

  if (loadingInst || loading) return (
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
      >Histórico de doações</Typography>

      <Grid2 container spacing={2}>
        {donations.map((donation, index) => ( 
          <Grid2 
            key={`institution_${index}`}
            size={{xs: 12, sm: 6, md: 4}}
          >
            <DonationTile
              key={`institution_${index}`}
              donation={donation}
            />
          </Grid2>
         ))}
      </Grid2>
    </Box>
  )
}

export default DonationHistory;