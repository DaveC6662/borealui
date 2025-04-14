import { ThemeType } from "@/types/types";
import { ComponentType, InputHTMLAttributes } from "react";

/**
 * Props for the TextInput component.
 */
export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Optional icon component to display on the left side of the input. */
  icon?: ComponentType;
  /** If true, the input is for password data and will include a password visibility toggle. */
  password?: boolean;
  /** Additional CSS class names for custom styling. */
  className?: string;
  /** If true, the input is rendered in read-only mode. */
  readOnly?: boolean;
  /** Accessible label for the input (overrides placeholder when provided). */
  ariaLabel?: string;
  /** Description to be read by screen readers, rendered as a visually hidden text. */
  ariaDescription?: string;
  /** Theme used for styling (e.g., "primary", "secondary"). Defaults to "primary". */
  theme?: ThemeType;
  /**
   * Controls whether autocomplete is enabled.
   * Pass `true` to enable ("on") or `false` to disable ("off").
   * Defaults to false (autocomplete is off).
   */
  autocomplete?: boolean;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
