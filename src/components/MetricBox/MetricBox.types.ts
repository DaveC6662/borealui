import { IconType } from "react-icons";
import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";

/**
 * Props for the MetricBox component.
 */
export interface MetricBoxProps {
  /** Title of the metric. */
  title: string;
  /** The primary value of the metric, e.g., a number or a string. */
  value: string | number;
  /** Optional icon to visually represent the metric (from react-icons, for example). */
  icon?: IconType;
  /** Optional subtext providing additional context for the metric. */
  subtext?: string;
  /** Optional outline style for the component (default: false). */
  outline?: boolean;
  /** Theme to apply for styling (e.g., "primary", "secondary", etc.). */
  theme?: ThemeType;
  /** Rounding style for the component (e.g., "none", "small", "medium", "large"). */
  rounding?: RoundingType;
  /** Shadow style for the component (e.g., "none", "small", "medium", "large"). */
  shadow?: ShadowType;
  /** State of the metric (e.g., "success", "error", "warning"). */
  state?: StateType;
  /** Size of the component (e.g., "small", "medium", "large"). */
  size?: SizeType;
  /** Text alignment for content: "left", "center", or "right". */
  align?: "left" | "center" | "right";
  /** Optional additional CSS class names for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
