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
}