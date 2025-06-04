import { SizeType, StateType, ThemeType } from "@/types/types";

/**
 * Props for the CircularProgress component.
 */
export interface CircularProgressProps {
  /** Current rating value to be visualized (e.g., 75). */
  rating: number;
  /** Minimum value for the range (default: 0). */
  min?: number;
  /** Maximum value for the range (default: 100). */
  max?: number;
  /** Accessible label and tooltip title for the component. */
  label?: string;
  /** Whether to show raw rating (e.g., "75/100") instead of percent. */
  showRaw?: boolean;
  /** Size of the component ("small", "medium", "large"). */
  size?: SizeType;
  /** Optional theme for the component. */
  theme?: ThemeType;
  /** State of progress ("success", "error") */
  state?: StateType;
  /** Optional class name for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
