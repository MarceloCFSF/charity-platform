import { Form, useFormikContext } from "formik";
import CurrencyField from "./CurrencyField";
import { Alert, Box, Button, Container } from "@mui/material";
import { useDonation } from "../hooks/useDonation";

const DonationForm = () => {
  const { error } = useDonation();
  const { isSubmitting } = useFormikContext();

  return (
    <Container maxWidth="xs">
      <Form
        noValidate
        style={{ width: "100%" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          py={5}
          gap={2}
        >
          <CurrencyField
            required
            name="value"
            label="Valor"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
          >Entrar</Button>

        </Box>

        {error && <Alert
          severity="error"
          sx={{ mb: 5 }}
        >{error}</Alert>}
      </Form>
    </Container>
  )
}

export default DonationForm;
