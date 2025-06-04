import { SizeType, StateType, ThemeType } from "@/types/types";

/**
 * Props for the ProgressBar component.
 */
export interface ProgressBarProps {
  /**
   * Percentage of progress (0 to 100). Ignored if `indeterminate` is true.
   * @default 0
   */
  progress?: number;
  /**
   * Theme for styling the progress bar (e.g., "primary", "secondary").
   * @default "primary"
   */
  theme?: ThemeType;
  /**
   * State of the progress bar (e.g., "success", "warning", "danger").
   * @default "primary"
   */
  state?: StateType;
  /**
   * Size of the progress bar (e.g., "small", "medium", "large").
   * @default "medium"
   */
  size?: SizeType;
  /**
   * If true, applies an animated effect to the progress bar.
   * @default true
   */
  animated?: boolean;
  /**
   * Accessible label for the progress bar.
   * @default "Progress"
   */
  ariaLabel?: string;
  /**
   * If true, the progress bar shows an indeterminate animation.
   * When true, the progress prop is ignored.
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Optional additional class name(s) for custom styling.
   */
  className?: string;
  /**
   * Optional test ID for testing purposes.
   * @default "progressbar"
   */
  "data-testid"?: string;
}
