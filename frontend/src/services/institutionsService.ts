import { Institution } from "../models/institution"
import api from "./api"

export const institutionService = {
  getAll: async (): Promise<Institution[]> => {
    const response = await api.get('/institutions');
    return response.data;
  },

  getById: async (id: number): Promise<Institution> => {
    const response = await api.get(`/institutions/${id}`);
    return response.data;
  }
}