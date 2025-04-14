import { ThemeType } from "@/types/types";
import { InputHTMLAttributes } from "react";

/**
 * Props for the Checkbox component.
 */
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /** Label text displayed beside the checkbox. */
  label?: string;
  /** Checked state of the checkbox. */
  checked: boolean;
  /** Callback when the checkbox value changes. */
  onChange: (checked: boolean) => void;
  /** Whether the checkbox is in an indeterminate (mixed) state. */
  indeterminate?: boolean;
  /** Optional theme to style the checkbox (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** Whether the checkbox is disabled. */
  disabled?: boolean;
  /** Custom class name for additional styling. */
  className?: string;
  /** Position of the label relative to the checkbox. */
  labelPosition?: "left" | "right";
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
