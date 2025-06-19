import { RoundingType, ShadowType, ThemeType } from "@/types/types";

/**
 * Describes a single navigation item for the NavBar component.
 */
export interface NavItem {
  /** Icon component or element to be displayed for the nav item. */
  icon: React.ReactNode;
  /** Text label for the nav item. */
  label: string;
  /** URL path where the nav item links. */
  path: string;
}

/**
 * Props for the reusable NavBar component.
 */
export interface NavBarProps {
  /** Array of navigation items to render in the NavBar. */
  items: NavItem[];
  /** Optional theme class names to apply to the NavBar. */
  theme?: ThemeType;
  /** Optional rounding to apply to the NavBar. */
  rounding?: RoundingType;
  /** Optional shadow to apply to the NavBar. */
  shadow?: ShadowType;
}
