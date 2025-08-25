import { RoundingType, ShadowType, StateType, ThemeType } from "@/types/types";
import { ComponentType } from "react";
import { IconButtonProps } from "../IconButton/IconButton.types";

/**
 * Defines a single item in the dropdown menu.
 */
interface DropdownItem {
  /** Display text for the menu item. */
  label: string;
  /** Optional click handler (ignored if `href` is provided). */
  onClick?: () => void;
  /** Optional icon shown beside the label. */
  icon?: React.ReactNode;
  /** Optional href to make the item behave as a link. */
  href?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * Props for the Dropdown component.
 */
export interface DropdownProps {
  /** Icon component used for the trigger button. */
  triggerIcon: ComponentType<{ className?: string }>;

  /** Array of items to render in the dropdown menu. */
  items: DropdownItem[];

  /**
   * Menu alignment relative to the trigger
   * ('left' | 'right').
   */
  align?: "left" | "right";

  /** Custom class name for the dropdown wrapper. */
  className?: string;

  /** Custom class name for the dropdown menu. */
  menuClassName?: string;

  /**
   * Rounding of the toggle button
   * ('none' | 'small' | 'medium' | 'large' | 'full').
   */
  toggleRounding?: RoundingType;

  /**
   * Rounding of the dropdown menu
   * ('none' | 'small' | 'medium' | 'large' | 'full').
   */
  menuRounding?: RoundingType;

  /**
   * Shadow style for the toggle button
   * ('none' | 'light' | 'medium' | 'strong' | 'intense').
   */
  toggleShadow?: ShadowType;

  /**
   * Shadow style for the dropdown menu
   * ('none' | 'light' | 'medium' | 'strong' | 'intense').
   */
  menuShadow?: ShadowType;

  /** Whether to use the outline style on the toggle button. */
  toggleOutline?: boolean;

  /** ARIA label for accessibility. */
  ariaLabel?: string;

  /**
   * Theme for styling
   * ('primary' | 'secondary' | 'tertiary' | 'quaternary' | 'clear').
   */
  theme?: ThemeType;

  /**
   * State of the dropdown
   * ('success' | 'error' | 'warning' | 'disabled' | '').
   */
  state?: StateType;

  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

export type IconButtonLikeRef = HTMLButtonElement | HTMLAnchorElement;

export type IconButtonComponent = React.ForwardRefExoticComponent<
  IconButtonProps & React.RefAttributes<IconButtonLikeRef>
>;

export interface BaseDropdownProps extends DropdownProps {
  IconButton: IconButtonComponent;
  classMap: Record<string, string>;
}
