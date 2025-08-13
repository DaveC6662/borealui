import React from "react";
import type { MouseEvent } from "react";
import {
  InteractiveProps,
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";

/**
 * Props for the IconButton component.
 */
export interface IconButtonProps extends InteractiveProps {
  /**
   * Icon component to render inside the button.
   * Should be a React component, e.g., from `react-icons`.
   */
  icon?: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
    focusable?: boolean;
  }>;

  /**
   * Theme style of the button.
   * One of: "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;

  /**
   * State of the button.
   * One of: "success" | "error" | "warning" | "disabled" | ""
   */
  state?: StateType;

  /**
   * Rounding style of the button.
   * One of: "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;

  /**
   * Shadow style of the button.
   * One of: "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;

  /** Optional href to turn the button into a link. */
  href?: string;

  /** If true, opens the link in a new tab (used with `href`). */
  isExternal?: boolean;

  /** Custom class name for additional styling. */
  className?: string;

  /** Title attribute (native browser tooltip text). */
  title?: string;

  /** Whether the button should be disabled. */
  disabled?: boolean;

  /** Accessible label for screen readers. */
  ariaLabel?: string;

  /** Whether to show a loading spinner instead of the icon. */
  loading?: boolean;

  /** Whether the button should use an outline style. */
  outline?: boolean;

  /**
   * Size of the button.
   * One of: "xs" | "small" | "medium" | "large" | "xl"
   */
  size?: SizeType;

  /**
   * Tooltip text (not rendered automatically—use `title` for built-in browser tooltip).
   */
  tooltip?: string;

  /**
   * Native button type.
   * One of: "button" | "reset" | "submit"
   */
  type?: "button" | "reset" | "submit";

  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

export interface IconButtonBaseProps extends IconButtonProps {
  classMap: Record<string, string>;
  LinkComponent?: React.ElementType;
}
