import { Donation } from "../models/donation";
import api from "./api"

export interface CreateDonationInput extends Omit<Donation, 'id' | 'value'> {
  value: string
}

export const donationService = {
  getAll: async (): Promise<Donation[]> => {
    const response = await api.get('/donations');
    return response.data;
  },

  getById: async (id: number): Promise<Donation> => {
    const response = await api.get(`/donations/${id}`);
    return response.data;
  },

  create: async (donation: CreateDonationInput) => {
    const response = await api.post("/donations", donation);
    return response.data;
  }
}