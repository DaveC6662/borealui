import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";
import React from "react";

/**
 * Props for the reusable Button component.
 */
export interface ButtonProps {
  /**
   * Optional icon component to render inside the button.
   */
  icon?: React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
    focusable?: boolean;
  }>;

  /**
   * Theme style of the button
   * ('primary' | 'secondary' | 'tertiary' | 'quaternary' | 'clear').
   */
  theme?: ThemeType;

  /**
   * State of the button
   * ('success' | 'error' | 'warning' | 'disabled' | '').
   */
  state?: StateType;

  /**
   * Click event handler for the button.
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;

  /**
   * Child content to display inside the button.
   */
  children?: React.ReactNode;

  /**
   * Additional class name(s) for custom styling.
   */
  className?: string;

  /**
   * Whether the button should be disabled.
   */
  disabled?: boolean;

  /**
   * Accessible label for screen readers.
   */
  ariaLabel?: string;

  /**
   * If provided, button will render as a link pointing to this href.
   */
  href?: string;

  /**
   * If true, opens the link in a new tab (used with `href`).
   */
  isExternal?: boolean;

  /**
   * Whether to use outline styling.
   */
  outline?: boolean;

  /**
   * Rounding style for the button
   * ('none' | 'small' | 'medium' | 'large' | 'full').
   */
  rounding?: RoundingType;

  /**
   * Shadow style for the button
   * ('none' | 'light' | 'medium' | 'strong' | 'intense').
   */
  shadow?: ShadowType;

  /**
   * Size of the button
   * ('xs' | 'small' | 'medium' | 'large' | 'xl').
   */
  size?: SizeType;

  /**
   * Whether to show a loading indicator instead of the children.
   */
  loading?: boolean;

  /**
   * Whether the button should take up the full width of its container.
   */
  fullWidth?: boolean;

  /**
   * Button type for native `<button>` elements
   * ('button' | 'reset' | 'submit').
   */
  type?: "button" | "reset" | "submit";

  /**
   * Optional test ID for testing frameworks.
   */
  "data-testid"?: string;
}
