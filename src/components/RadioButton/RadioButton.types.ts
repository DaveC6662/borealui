import { ThemeType } from "@/types/types";

/**
 * Props for the RadioButton component.
 */
export interface RadioButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /** The label text displayed next to the radio button. */
  label: string;
  /** The value associated with this radio button. */
  value: string;
  /** Whether this radio button is currently checked. */
  checked: boolean;
  /** Callback triggered when the radio button's value changes. */
  onChange: (value: string) => void;
  /** Theme applied for styling (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** Whether the radio button is disabled. */
  disabled?: boolean;
  /** Additional CSS class names for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}