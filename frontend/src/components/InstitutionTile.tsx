import { Box, Button, Paper, Typography } from "@mui/material";
import { Institution } from "../models/institution"
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useNavigate } from "react-router-dom";

export interface InstitutionTileType {
  institution: Institution;
}

const InstitutionTile = ({ institution }: InstitutionTileType) => {
  const navigate = useNavigate();
  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const handleNavigation = () => {
    navigate(`/institution/${institution.id}`);
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
        cursor: "pointer",
      }}
    >
      <Box>
        <Typography variant="h6">{institution.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {truncateText(institution.description, 100)}
        </Typography>
      </Box>
      <Button
        startIcon={<VolunteerActivismIcon />}
        sx={{ minWidth: "unset" }}
      >Doar</Button>
    </Paper>
  )
} 

export default InstitutionTile;
