import { ColorScheme } from "../types/types";
import { ReactNode } from "react";

export interface ThemeProviderProps {
  children: ReactNode;
  customSchemes?: ColorScheme[];
}

export interface ThemeContextType {
  selectedScheme: number;
  setSelectedScheme: React.Dispatch<React.SetStateAction<number>>;
}
