import { ReactNode, useCallback, useEffect, useState } from "react";
import DonationContext from "../context/DonationContext";
import { Donation } from "../models/donation";
import { CreateDonationInput, donationService } from "../services/donationsService";
import { AxiosError } from "axios";

export interface DonationProviderType {
  children: ReactNode
}

const DonationProvider = ({ children }: DonationProviderType) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      const response = await donationService.getAll();
      setDonations(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Um erro desconhecido ocorreu");
    }
  }, []);

  useEffect(() => { fetch() }, [fetch]);

  const getById = useCallback(async (id: number): Promise<Donation | null> => {
    try {
      const institution = donations.find((value) => value.id === id);

      if (institution) return institution;

      const response = await donationService.getById(id);
      return response;
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError("Instituição não encontrada");
      } else {
        setError("Um erro desconhecido ocorreu");
      }

      return null;
    }
  }, [donations]);

  const create = useCallback(async (
    donation: CreateDonationInput
  ): Promise<boolean> => {
    try {
      const newDonation = await donationService.create(donation);
      setDonations(prev => [newDonation, ...prev]);
      return true;
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError("Ocorreu um erro ao fazer a doação");
      } else {
        setError("Um erro desconhecido ocorreu");
      }
      return true;
    }
  }, []);

  return (
    <DonationContext.Provider
      value={{
        loading,
        donations,
        error,
        fetch,
        getById,
        create,
      }}
    >{children}</DonationContext.Provider>
  )
}

export default DonationProvider;
