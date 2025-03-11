import { Outlet } from "react-router-dom";
import { InstitutionProvider } from "../providers/InstitutionProvider";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { Box } from "@mui/material";

const DefaultLayout = () => {
  return (
    <InstitutionProvider>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <ResponsiveAppBar/>
        <Box flex={1} display="flex" flexDirection="column" px={5} py={5} >
          <Outlet />
        </Box>
      </Box>
    </InstitutionProvider>
  );
};

export default DefaultLayout;
