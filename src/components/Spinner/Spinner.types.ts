import { ShadowType, StateType, ThemeType } from "@/types/types";

/**
 * Props for the Spinner component.
 */
export interface SpinnerProps {
  /**
   * The theme color of the spinner.
   * One of: "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;

  /**
   * The state of the spinner.
   * One of: "success" | "error" | "warning" | "disabled" | ""
   */
  state?: StateType;

  /**
   * The size of the spinner (in pixels).
   */
  size?: number;

  /**
   * Shadow style for the spinner.
   * One of: "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;

  /**
   * Additional class names for styling customization.
   */
  className?: string;

  /**
   * Test ID for testing frameworks (e.g., for use with Jest or Cypress).
   */
  "data-testid"?: string;

  /**
   * Optional label for screen readers. Describes the loading state.
   */
  label?: string;
}
