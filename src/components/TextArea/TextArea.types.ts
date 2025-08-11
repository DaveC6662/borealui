import { RoundingType, ShadowType, StateType, ThemeType } from "@/types/types";
import { TextareaHTMLAttributes, ComponentType } from "react";

/**
 * Props for the TextArea component.
 */
export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Optional icon to display alongside the textarea. Accepts a React component.
   */
  icon?: ComponentType;

  /**
   * Placeholder text for the textarea. Defaults to "Enter text".
   */
  placeholder?: string;

  /**
   * Additional custom CSS class name(s) to apply to the container.
   */
  className?: string;

  /**
   * If true, renders the textarea as read-only.
   */
  readOnly?: boolean;

  /**
   * Enables or disables autocomplete on the textarea ("on" or "off").
   */
  autocomplete?: boolean;

  /**
   * Accessible label for the textarea. Defaults to the placeholder text if not provided.
   */
  ariaLabel?: string;

  /**
   * Accessible description for the textarea, rendered as visually hidden text.
   */
  ariaDescription?: string;

  /**
   * Theme used for styling.
   * "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;

  /**
   * State of the text area (for feedback/validation).
   * "success" | "error" | "warning" | "disabled" | ""
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
   * If true, the textarea is styled with an outline.
   */
  outline?: boolean;

  /**
   * If true, the textarea is disabled.
   */
  disabled?: boolean;

  /**
   * If false, the textarea is not resizable.
   */
  resizable?: boolean;

  /**
   * Optional height for the textarea. Can be a CSS value (e.g., "100px") or a number (interpreted as pixels).
   */
  height?: string | number;

  /**
   * Optional test ID for testing frameworks. Defaults to "text-area".
   */
  "data-testid"?: string;
}
