import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";

/**
 * Props for the Slider component.
 */
export interface SliderProps {
  /** The current numeric value of the slider. */
  value: number;

  /**
   * Callback invoked when the slider value changes.
   * Receives the change event from the input element.
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Callback invoked when the slider value changes.
   */
  onValueChange?: (value: number) => void;

  /** The minimum value of the slider. */
  min?: number;

  /** The maximum value of the slider. */
  max?: number;

  /** Increment step for the slider. */
  step?: number;

  /** Optional label displayed above or beside the slider. */
  label?: string;

  /** If true, the current slider value is displayed alongside the slider. */
  showValue?: boolean;

  /**
   * Size variant for the slider.
   * One of: "xs" | "small" | "medium" | "large" | "xl"
   */
  size?: SizeType;

  /**
   * Theme variant for styling.
   * One of: "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;

  /**
   * State of the slider.
   * One of: "success" | "error" | "warning" | "disabled" | ""
   */
  state?: StateType;

  /**
   * Controls the rounding of the component.
   * One of: "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;

  /**
   * If true, the slider is disabled and cannot be interacted with.
   */
  disabled?: boolean;

  /**
   * Controls the shadow of the component.
   * One of: "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;

  /** Additional CSS class names for custom styling. */
  className?: string;

  /** Accessible label for the slider if label is not provided. */
  "aria-label"?: string;

  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
