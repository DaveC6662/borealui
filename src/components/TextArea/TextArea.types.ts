import { StateType, ThemeType } from "@/types/types";
import { TextareaHTMLAttributes, ComponentType } from "react";

/**
 * Props for the TextArea component.
 */
export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Optional icon to display alongside the textarea. Accepts a React component. */
  icon?: ComponentType;
  /** Placeholder text for the textarea. Defaults to "Enter text". */
  placeholder?: string;
  /** Additional custom CSS class name(s) to apply to the container. */
  className?: string;
  /** If true, renders the textarea as read-only. */
  readOnly?: boolean;
  /** Enables or disables autocomplete on the textarea ("on" or "off"). Defaults to "off". */
  autoComplete?: "on" | "off";
  /** Accessible label for the textarea. Defaults to the placeholder text if not provided. */
  ariaLabel?: string;
  /** Accessible description for the textarea, rendered as visually hidden text. */
  ariaDescription?: string;
  /** Theme used for styling (e.g., "primary", "secondary"). Defaults to "primary". */
  theme?: ThemeType;
  /** State of the text area ex "success", "error", "warning" */
  state?: StateType;
  /** If true, the textarea is styled with an outline. */
  outline?: boolean;
  /** If true, the textarea is disabled. */
  disabled?: boolean;
  /** Optional height for the textarea. Can be a CSS value or a number (interpreted as pixels). */
  height?: string | number;
  /** Optional test ID for testing frameworks. Defaults to "text-area". */
  "data-testid"?: string;
}
