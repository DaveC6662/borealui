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
  /**
   * Theme to apply for styling.
   * One of: "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;
  /**
   * Rounding style for the component.
   * One of: "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;
  /**
   * Shadow style for the component.
   * One of: "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;
  /**
   * State of the metric.
   * One of: "success" | "error" | "warning" | "disabled" | ""
   */
  state?: StateType;
  /**
   * Size of the component.
   * One of: "xs" | "small" | "medium" | "large" | "xl"
   */
  size?: SizeType;
  /**
   * Text alignment for content.
   * One of: "left" | "center" | "right"
   */
  align?: "left" | "center" | "right";
  /** Optional additional CSS class names for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

export interface BaseMetricBoxProps extends MetricBoxProps {
  classMap: Record<string, string>;
}
