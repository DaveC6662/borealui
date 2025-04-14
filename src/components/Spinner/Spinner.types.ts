import { ThemeType } from "@/types/types";

/**
 * Props for the Spinner component.
 */
export interface SpinnerProps {
  /** The theme color of the spinner (e.g., primary, secondary). */
  theme?: ThemeType;
  /** The size of the spinner (in pixels). */
  size?: number;
  /** Additional class names for styling customization. */
  className?: string;
  /** Test ID for testing frameworks (e.g., for use with Jest or Cypress). */
  "data-testid"?: string;
  /** Optional label for screen readers. Describes the loading state. */
  label?: string;
}