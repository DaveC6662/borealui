import { RoundingType, ShadowType, StateType, ThemeType } from "@/types/types";

/**
 * Props for the Popover component.
 */
export interface PopoverProps {
  /** Trigger element that toggles the popover's visibility. */
  trigger: React.ReactNode;
  /** Content to be displayed inside the popover. */
  content: React.ReactNode;
  /**
   * Placement of the popover relative to the trigger element.
   * One of: "top" | "bottom" | "left" | "right"
   */
  placement?: "top" | "bottom" | "left" | "right";
  /**
   * Theme for the popover styling.
   * One of: "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;
  /**
   * State of the popover, for feedback styling.
   * One of: "success" | "error" | "warning" | "disabled" | ""
   */
  state?: StateType;
  /**
   * Rounding of the popover content.
   * One of: "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;
  /**
   * Shadow of the popover content.
   * One of: "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;
  /** Optional additional class name(s) for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

export interface BasePopoverProps extends PopoverProps {
  classMap: Record<string, string>;
  role?: "dialog" | "tooltip" | "menu";
}
