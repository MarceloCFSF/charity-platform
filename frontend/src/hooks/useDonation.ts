import { useContext } from "react";
import DonationContext from "../context/DonationContext";

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) throw new Error("useDonation must be used within an DonationProvider");
  return context;
}
