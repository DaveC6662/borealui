import {
  RoundingType,
  ShadowType,
  StateType,
  ThemeType,
  TitlePositionType,
} from "@/types/types";
import { ComponentType, InputHTMLAttributes } from "react";
import { IconButtonProps } from "../IconButton/IconButton.types";

/**
 * Props for the TextInput component.
 */
export interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  /**
   * Called when the input value changes.
   * Receives the current string value.
   */
  onChange?: (value: string) => void;

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
   * Optional visible label/title for the input.
   */
  title?: string;

  /**
   * Position of the title/label.
   * - "top": label above input
   * - "inline": label inside container (left)
   * - "floating": material-style floating label
   */
  titlePosition?: TitlePositionType;

  /**
   * Maximum length of the input.
   */
  maxLength?: number;

  /**
   * Optional test ID for testing frameworks.
   */
  "data-testid"?: string;
}

export interface TextInputBaseProps extends TextInputProps {
  classMap: Record<string, string>;
  IconButton: React.FC<IconButtonProps>;
}
