import { SizeType } from "@/types/types";

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
    children: React.ReactNode;
    /** Unique ID for the input and label association. */
    id?: string;
    /** Whether the field is required (adds asterisk). */
    required?: boolean;
    /** Additional class names for styling. */
    className?: string;
    /** Layout style: vertical (default) or horizontal. */
    layout?: "vertical" | "horizontal";
    /** If true, visually hides the label but keeps it accessible. */
    hideLabel?: boolean;
    /** Spacing size around the form group (e.g., "sm", "md", "lg"). */
    spacing?: SizeType;
    /** Optional controller element (e.g., button, icon) beside input. */
    controller?: React.ReactNode;
    /** Optional test ID for testing frameworks. */
    "data-testid"?: string;
  }