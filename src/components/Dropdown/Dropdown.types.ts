import { StateType, ThemeType } from "@/types/types";
import { ComponentType } from "react";

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
  /** Menu alignment relative to the trigger ("left" or "right"). */
  align?: "left" | "right";
  /** Custom class name for the dropdown wrapper. */
  className?: string;
  /** Custom class name for the dropdown menu. */
  menuClassName?: string;
  /** ARIA label for accessibility. */
  ariaLabel?: string;
  /** Optional theme for styling. */
  theme?: ThemeType;
  /** State of the drop down ex "success", "error", "warning*/
  state?: StateType;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
