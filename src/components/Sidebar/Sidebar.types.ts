import { RoundingType, ShadowType, StateType, ThemeType } from "@/types";

export interface SidebarLink {
  /**
   * Display label for the link.
   */
  label: string;
  /**
   * Navigation path or URL for the link.
   * If omitted, the link may be used as a non-clickable parent for submenu items.
   */
  href?: string;
  /**
   * Optional child links to render as a collapsible submenu.
   */
  children?: SidebarLink[];
  /**
   * Optional icon to display next to the label.
   */
  icon?: React.ReactNode;
}

export interface SidebarFooterLink {
  /**
   * Display label for the footer link.
   */
  label: string;
  /**
   * Navigation path or URL for the footer link.
   */
  href: string;
  /**
   * Optional icon to display next to the label.
   */
  icon?: React.ReactNode;
}

export interface SidebarProps {
  /**
   * Array of navigation links to render in the sidebar.
   * Each link may optionally include a nested submenu.
   */
  links: SidebarLink[];

  /**
   * Map of CSS class names used to style various sidebar elements.
   * Keys should match the expected component structure (e.g., "wrapper", "list", "item").
   */
  classMap: Record<string, string>;

  /**
   * The current active path, used to highlight the active link.
   */
  currentPath: string;

  /**
   * Optional custom link component.
   * Useful for integrating with frameworks like Next.js or React Router.
   * Defaults to an HTML `<a>` element.
   */
  LinkComponent?: React.ElementType;

  /**
   * Whether to display a footer section at the bottom of the sidebar.
   * Defaults to `false`.
   */
  showFooter?: boolean;

  /**
   * Array of footer links to render when `showFooter` is `true`.
   */
  footerLinks?: SidebarFooterLink[];

  /**
   * Optional version string displayed in the sidebar footer.
   * Example: "v1.2.3"
   */
  footerVersion?: string;

  /**
   * Theme for styling.
   * Determines the base color scheme for the sidebar.
   * - "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;

  /**
   * State variant for styling.
   * Typically used to apply semantic states to the component.
   * - "success" | "error" | "warning" | "disabled" | ""
   */
  state?: StateType;

  /**
   * If true, the sidebar is styled with an outline variant.
   * Defaults to `false`.
   */
  outline?: boolean;

  /**
   * Rounding style for the sidebar container.
   * - "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;

  /**
   * Shadow style for the sidebar container.
   * - "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;

  /**
   * Additional class name(s) for applying custom styles.
   */
  className?: string;

  /**
   * Optional test ID for testing frameworks like Jest and React Testing Library.
   */
  "data-testid"?: string;

  /**
   * Accessible label for the navigation landmark.
   * Helps screen reader users understand the purpose of the sidebar.
   * Example: "Sidebar navigation"
   */
  ariaLabel?: string;
}
