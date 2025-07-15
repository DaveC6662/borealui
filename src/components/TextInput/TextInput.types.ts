import { RoundingType, ShadowType, StateType, ThemeType } from "@/types/types";
import { ComponentType, InputHTMLAttributes } from "react";

/**
 * Props for the TextInput component.
 */
export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional icon component to display on the left side of the input.
   */
  icon?: ComponentType;

  /**
   * If true, the input is for password data and will include a password visibility toggle.
   */
  password?: boolean;

  /**
   * Additional CSS class names for custom styling.
   */
  className?: string;

  /**
   * If true, the input is rendered in read-only mode.
   */
  readOnly?: boolean;

  /**
   * Accessible label for the input (overrides placeholder when provided).
   */
  ariaLabel?: string;

  /**
   * Description to be read by screen readers, rendered as a visually hidden text.
   */
  ariaDescription?: string;

  /**
   * Theme used for styling.
   * "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;

  /**
   * State of the input.
   * "success" | "error" | "warning" | "disabled" | ""
   * "success" (valid input), "error" (invalid input), "warning" (check input).
   */
  state?: StateType;

  /**
   * Rounding of the component.
   * "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;

  /**
   * Shadow of the component.
   * "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;

  /**
   * If true, the input is outlined instead of filled.
   */
  outline?: boolean;

  /**
   * Controls whether autocomplete is enabled.
   * Pass `true` to enable ("on") or `false` to disable ("off")
   */
  autocomplete?: boolean;

  /**
   * Optional test ID for testing frameworks.
   */
  "data-testid"?: string;
}
