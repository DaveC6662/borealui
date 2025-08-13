import { RoundingType, ShadowType } from "@/types/types";
import { JSX } from "react";

/**
 * Props for the SkeletonLoader component.
 */
export interface SkeletonProps {
  /**
   * Width of the skeleton loader (e.g., "100%", "200px", or a number representing pixels).
   */
  width?: string | number;

  /**
   * Height of the skeleton loader (e.g., "100%", "50px", or a number representing pixels).
   */
  height?: string | number;

  /**
   * Rounding of the skeleton.
   * "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;

  /**
   * Shadow style for the skeleton loader.
   * "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;

  /**
   * Additional class name(s) for custom styling.
   */
  className?: string;

  /**
   * Optional test ID for testing frameworks.
   */
  "data-testid"?: string;

  /**
   * Accessibility label for screen readers.
   */
  label?: string;
}

export interface SkeletonBaseProps extends SkeletonProps {
  classMap: Record<string, string>;
}

export type ExtraProps = {
  as?: keyof JSX.IntrinsicElements;
  announce?: boolean;
  animate?: boolean;
};
