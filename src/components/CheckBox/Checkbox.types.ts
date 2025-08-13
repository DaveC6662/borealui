import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";
import { InputHTMLAttributes } from "react";

/**
 * Props for the Checkbox component.
 */
export interface CheckBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
  /** Label text displayed beside the checkbox. */
  label?: string;

  /** Checked state of the checkbox. */
  checked: boolean;

  /** Callback when the checkbox value changes. */
  onChange: (checked: boolean) => void;

  /** Whether the checkbox is in an indeterminate (mixed) state. */
  indeterminate?: boolean;

  /**
   * Optional theme to style the checkbox
   * ('primary' | 'secondary' | 'tertiary' | 'quaternary' | 'clear').
   */
  theme?: ThemeType;

  /**
   * State of the checkbox
   * ('success' | 'error' | 'warning' | 'disabled' | '').
   */
  state?: StateType;

  /**
   * Controls the rounding of the checkbox
   * ('none' | 'small' | 'medium' | 'large' | 'full').
   */
  rounding?: RoundingType;

  /**
   * Size of the checkbox
   * ('xs' | 'small' | 'medium' | 'large' | 'xl').
   */
  size?: SizeType;

  /**
   * Controls the shadow of the checkbox
   * ('none' | 'light' | 'medium' | 'strong' | 'intense').
   */
  shadow?: ShadowType;

  /** Whether the checkbox is disabled. */
  disabled?: boolean;

  /** Custom class name for additional styling. */
  className?: string;

  /**
   * Position of the label relative to the checkbox
   * ('left' | 'right').
   */
  labelPosition?: "left" | "right";

  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

export interface CheckboxBaseProps extends CheckBoxProps {
  classMap: Record<string, string>;
}
