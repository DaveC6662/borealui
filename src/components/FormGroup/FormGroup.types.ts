import { SizeType } from "@/types/types";
import { ReactElement } from "react";

/**
 * Props for the FormGroup component.
 */
export interface FormGroupProps {
  /** Label for the input field. */
  label?: string;

  /** Optional helper text displayed below the input. */
  description?: string;

  /** Optional error message shown in red below the input. */
  error?: string;

  /** The form element or component (input, textarea, etc.). */
  children: ReactElement | ReactElement[];

  /** Unique ID for the input and label association. */
  id?: string;

  /** Whether the field is required (adds asterisk). */
  required?: boolean;

  /** Additional class names for styling. */
  className?: string;

  /**
   * Layout style for label and input.
   * "vertical" (default) or "horizontal"
   */
  layout?: "vertical" | "horizontal";

  /** If true, visually hides the label but keeps it accessible. */
  hideLabel?: boolean;

  /**
   * Spacing size between each input in the form group.
   * ('xs' | 'small' | 'medium' | 'large' | 'xl')
   */
  spacing?: SizeType;

  /** Optional controller element (e.g., button, icon) beside input. */
  controller?: React.ReactNode;

  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

export interface BaseFormGroupProps extends FormGroupProps {
  classMap: Record<string, string>;
}
