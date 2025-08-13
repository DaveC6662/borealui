import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";

/**
 * Props for the ProgressBar component.
 */
export interface ProgressBarProps {
  /**
   * Percentage of progress (0 to 100). Ignored if `indeterminate` is true.
   */
  progress?: number;

  /**
   * Theme for styling the progress bar.
   * One of: "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;

  /**
   * State of the progress bar.
   * One of: "success" | "error" | "warning" | "disabled" | ""
   */
  state?: StateType;

  /**
   * Size of the progress bar.
   * One of: "xs" | "small" | "medium" | "large" | "xl"
   */
  size?: SizeType;

  /**
   * Rounding to apply to the progress bar.
   * One of: "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;

  /**
   * Shadow to apply to the progress bar.
   * One of: "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;

  /**
   * If true, applies an animated effect to the progress bar.
   */
  animated?: boolean;

  /**
   * Accessible label for the progress bar.
   */
  ariaLabel?: string;

  /**
   * If true, the progress bar shows an indeterminate animation.
   * When true, the progress prop is ignored.
   */
  indeterminate?: boolean;

  /**
   * Optional additional class name(s) for custom styling.
   */
  className?: string;

  /**
   * Optional test ID for testing purposes.
   */
  "data-testid"?: string;
}

export interface BaseProgressBarProps extends ProgressBarProps {
  classMap: Record<string, string>;
}
