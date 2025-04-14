import { ThemeType } from "@/types/types";

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
   * Possible values: "top", "bottom", "left", "right".
   */
  placement?: "top" | "bottom" | "left" | "right";
  /** Optional theme for the popover styling. */
  theme?: ThemeType;
  /** Optional additional class name(s) for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}