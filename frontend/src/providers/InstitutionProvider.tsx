import { ReactNode, useCallback, useEffect, useState } from "react"
import InstitutionContext from "../context/InstitutionContext"
import { Institution } from "../models/institution";
import { institutionService } from "../services/institutionsService";
import { AxiosError } from "axios";

export interface InstitutionProviderType {
  children: ReactNode
}

export const InstitutionProvider = ({ children }: InstitutionProviderType) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [error, setError] = useState<string | null>(null);
  console.log('render');

  const fetch = useCallback(async () => {
    try {
      const response = await institutionService.getAll();
      setInstitutions(response);
      setLoading(false);
    } catch (error) {
      console.log(error);

      setError("Um erro desconhecido ocorreu");
    }
  }, []);

  useEffect(() => { fetch() }, [fetch]);

  const getById = useCallback(async (id: number): Promise<Institution | null> => {
    try {
      const response = await institutionService.getById(id);
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
  }, []);

  return (
    <InstitutionContext.Provider
      value={{
        loading,
        institutions,
        error,
        fetch,
        getById
      }}
    >{children}</InstitutionContext.Provider>
  )
}
