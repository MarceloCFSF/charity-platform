import { Box, Button, Paper, Typography } from "@mui/material";
import { Institution } from "../models/institution"
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useNavigate } from "react-router-dom";
import { Donation } from "../models/donation";
import { useCallback, useEffect, useState } from "react";
import { useInstitution } from "../hooks/useInstitution";

export interface DonationTileType {
  donation: Donation;
}

const DonationTile = ({ donation }: DonationTileType) => {
  const navigate = useNavigate();
  const { getById } = useInstitution();

  const [institution, setInstitution] = useState<Institution | null>(null);
  
  const getInstitution = useCallback(async () => {
    const institution = await getById(donation.institution_id);
    setInstitution(institution);
  }, [donation, getById])

  useEffect(() => { getInstitution() }, [getInstitution])

  const handleNavigation = () => {
    navigate(`/institution/${institution?.id}`);
  };

  const formatToBRL = (value: number): string => {
    const formatted = Number(value)
      .toFixed(2)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `R$ ${formatted}`;
  };

  return (
    <Paper
      elevation={3}
      onClick={handleNavigation}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        cursor: "pointervalue.toFixed",
      }}
    >
      <Box>
        <Typography variant="h6">{institution?.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Valor:</strong>{' '}
          {formatToBRL(donation.value)}
        </Typography>
      </Box>
      <Button
        startIcon={<VolunteerActivismIcon />}
        href={`/donation/${institution?.id}`}
        sx={{ minWidth: "unset" }}
        onClick={(event) => event.stopPropagation()}
      >Doar <br /> Novamente</Button>
    </Paper>
  )
} 

export default DonationTile;
