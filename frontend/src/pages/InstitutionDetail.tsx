import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useInstitution } from "../hooks/useInstitution";
import { useCallback, useEffect, useState } from "react";
import { Institution } from "../models/institution";

const InstitutionDetail = () => {
  const { id } = useParams();
  const { getById } = useInstitution();
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const getInstitution = useCallback(async () => {
    try {
      const institution = await getById(parseInt(id!));
      setInstitution(institution);
      setLoading(false);
    } catch (error: unknown) {
      console.error(error);
      setInstitution(null);
    }
  }, [id, getById])

  useEffect(() => { getInstitution() }, [getInstitution])
  
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

  if (id === undefined || institution === null) return (
    <Typography>Error</Typography>
  );

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{ fontSize: "clamp(3rem, 5vw, 6rem)" }}
      >{institution.name}</Typography>
      <Typography variant="h5" mt={5}>
        {institution.description}
      </Typography>
    </Box>
  )
}

export default InstitutionDetail;
