import React from "react";
import type { MouseEvent } from "react";
import { SizeType, ThemeType } from "@/types/types";

/**
 * Props for the IconButton component.
 */
export interface IconButtonProps {
  /** Icon component to render inside the button. */
  icon: React.ComponentType;
  /** Theme style of the button (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** Optional href to turn the button into a link. */
  href?: string;
  /** If true, opens the link in a new tab (used with `href`). */
  isExternal?: boolean;
  /** Click event handler. */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** Custom class name for additional styling. */
  className?: string;
  /** Title attribute (tooltip text). */
  title?: string;
  /** Whether the button should be disabled. */
  disabled?: boolean;
  /** Accessible label for screen readers. */
  ariaLabel?: string;
  /** Whether to show a loading spinner instead of the icon. */
  loading?: boolean;
  /** Whether the button should use an outline style. */
  outline?: boolean;
  /** Size of the button (e.g., "small", "medium", "large"). */
  size?: SizeType;
  /** Tooltip text (not rendered automatically—use `title` for built-in browser tooltip). */
  tooltip?: string;
  /** Native button type. */
  type?: "button" | "reset" | "submit";
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}