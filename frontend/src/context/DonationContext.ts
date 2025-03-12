import { createContext } from "react";
import { Donation } from "../models/donation";
import { CreateDonationInput } from "../services/donationsService";

export interface DonationContextType {
  loading: boolean,
  donations: Donation[],
  error: string | null,
  fetch: () => void,
  getById: (id: number) => Promise<Donation | null>,
  create: (donation: CreateDonationInput) => Promise<boolean>
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export default DonationContext;