/**
 * ---------------------------------------------------------------------
 * ThemeContext.types.ts
 * ---------------------------------------------------------------------
 * Type definitions for the ThemeProvider and ThemeContext used
 * in the Boreal UI theming system.
 */

import { ColorScheme } from "../types/types";
import { ReactNode } from "react";

/**
 * Props for the `<ThemeProvider>` component.
 *
 * @property {ReactNode} children - The wrapped application or subtree.
 * @property {ColorScheme[]} [customSchemes] - Optional array of custom color schemes
 *                                             to be registered at runtime.
 *
 * @example
 * <ThemeProvider customSchemes={[customTheme]}>
 *   <App />
 * </ThemeProvider>
 */
export interface ThemeProviderProps {
  children: ReactNode;
  customSchemes?: ColorScheme[];
}

/**
 * Context value provided by the ThemeProvider.
 *
 * @property {number} selectedScheme - Index of the currently active color scheme.
 * @property {Dispatch<SetStateAction<number>>} setSelectedScheme - Function to update the selected scheme index.
 *
 * @example
 * const { selectedScheme, setSelectedScheme } = useContext(ThemeContext);
 */
export interface ThemeContextType {
  selectedScheme: number;
  setSelectedScheme: React.Dispatch<React.SetStateAction<number>>;
}

export type ThemeInitScriptProps = {
  storageKeyScheme?: string;
  storageKeyVars?: string;
  dataAttr?: string;
  readyAttr?: string;
};
