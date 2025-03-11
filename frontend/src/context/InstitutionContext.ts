import { createContext } from "react";
import { Institution } from "../models/institution";

export interface InstitutionContextType {
  loading: boolean,
  institutions: Institution[],
  error: string | null,
  fetch: () => void,
  getById: (id: number) => Promise<Institution | null>
}

const InstitutionContext = createContext<InstitutionContextType | undefined>(undefined);

export default InstitutionContext;