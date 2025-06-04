import { SizeType, StateType, ThemeType } from "@/types/types";
import React from "react";

/**
 * Props for the reusable Button component.
 */
export interface ButtonProps {
  /** Optional icon component to render inside the button. */
  icon?: React.ElementType;
  /** Theme style of the button (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** State of the button (e.g., "success", "error", "warning"). */
  state?: StateType;
  /** Click event handler for the button. */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Child content to display inside the button. */
  children?: React.ReactNode;
  /** Additional class name(s) for custom styling. */
  className?: string;
  /** Whether the button should be disabled. */
  disabled?: boolean;
  /** Accessible label for screen readers. */
  ariaLabel?: string;
  /** If provided, button will render as a link pointing to this href. */
  href?: string;
  /** If true, opens the link in a new tab (used with `href`). */
  isExternal?: boolean;
  /** Whether to use outline styling. */
  outline?: boolean;
  /** Size of the button (e.g., "small", "medium", "large"). */
  size?: SizeType;
  /** Whether to show a loading indicator instead of the children. */
  loading?: boolean;
  /** Whether the button should take up the full width of its container. */
  fullWidth?: boolean;
  /** Button type for native `<button>` elements. */
  type?: "button" | "reset" | "submit";
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
