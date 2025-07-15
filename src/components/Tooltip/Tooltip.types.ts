import { RoundingType, ShadowType, StateType, ThemeType } from "@/types/types";
import { ReactNode, HTMLAttributes } from "react";

/**
 * Props for the Tooltip component.
 */
export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content text displayed inside the tooltip.
   */
  content: string;

  /**
   * The position of the tooltip relative to the target element.
   * "top" | "bottom" | "left" | "right"
   */
  position?: "top" | "bottom" | "left" | "right";

  /**
   * Theme style of the tooltip.
   * "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;

  /**
   * State of the tooltip for visual feedback.
   * "success" | "error" | "warning" | "disabled" | ""
   */
  state?: StateType;

  /**
   * Rounding style of the tooltip.
   * "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;

  /**
   * Shadow style of the tooltip.
   * "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;

  /**
   * The element that triggers the tooltip (required).
   */
  children: ReactNode;

  /**
   * Optional test ID for testing frameworks.
   */
  "data-testid"?: string;
}
