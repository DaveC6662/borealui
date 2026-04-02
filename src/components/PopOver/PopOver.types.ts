import React from "react";
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

  /** Accessible label for the trigger button. */
  triggerAriaLabel?: string;

  /** Accessible label for the popover content region. */
  "aria-label"?: string;

  /** Associates the popover content with an external label element ID. */
  "aria-labelledby"?: string;

  /** Associates the popover content with an external description element ID. */
  "aria-describedby"?: string;

  /** Whether the popover should be announced as modal when role is dialog. */
  "aria-modal"?: boolean;

  /** Accessible label for the trigger button when expanded/collapsed state needs custom wording. */
  triggerTitle?: string;

  /** Disables interaction with the trigger and popover. */
  disabled?: boolean;

  /** Optional ID for the popover content element. */
  id?: string;
}

export interface BasePopoverProps extends PopoverProps {
  classMap: Record<string, string>;

  /**
   * Semantic role applied to the popover container.
   * "tooltip" is best for purely descriptive hover/focus content,
   * "dialog" for interactive floating panels,
   * "menu" for action lists.
   */
  role?: "dialog" | "tooltip" | "menu";
}
