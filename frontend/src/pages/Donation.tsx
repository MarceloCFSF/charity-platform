import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useInstitution } from "../hooks/useInstitution";
import { useCallback, useEffect, useState } from "react";
import { Institution } from "../models/institution";
import DonationFormProvider from "../providers/DonationFormProvider";
import DonationForm from "../components/DonationForm";
import { useAuth } from "../hooks/useAuth";

const Donation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
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

  const handleSubmit = () => navigate('/');

  return (
    <Box>
      <Typography variant="h6">
        <strong>{user?.name}</strong>,{' '}
        agradecemos seu interesse em fazer um doação para instituição{' '}
        <strong>{institution.name}</strong> .
        Para continuar, por favor, preencha o formulário abaixo:
      </Typography>

      <Typography
        variant="h3"
        textAlign="center"
        mt={5}
      >Formulário de Doação</Typography>

      <DonationFormProvider
        institutionId={institution.id}
        onSubmit={handleSubmit}
      >
        <DonationForm />
      </DonationFormProvider>
    </Box>
  )
}

export default Donation;