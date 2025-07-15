import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";

/**
 * A breadcrumb item used to define a single step in the navigation path.
 */
export interface Breadcrumb {
  /**
   * The display label for the breadcrumb.
   */
  label: string;

  /**
   * Optional URL the breadcrumb should link to.
   * If not provided, it is rendered as plain text.
   */
  href?: string;
}

/**
 * Props for the Breadcrumbs component.
 */
export interface BreadcrumbsProps {
  /**
   * An array of breadcrumb items.
   */
  items: Breadcrumb[];

  /**
   * Disables interaction and styles as disabled.
   */
  disabled?: boolean;

  /**
   * Optional custom separator node between breadcrumb items.
   * Defaults to a right chevron icon.
   */
  separator?: React.ReactNode;

  /**
   * Theme style to apply to the breadcrumbs
   * ('primary' | 'secondary' | 'tertiary' | 'quaternary' | 'clear').
   */
  theme?: ThemeType;

  /**
   * Rounding style to apply to the breadcrumbs
   * ('none' | 'small' | 'medium' | 'large' | 'full').
   */
  rounding?: RoundingType;

  /**
   * Shadow style to apply to the breadcrumbs
   * ('none' | 'light' | 'medium' | 'strong' | 'intense').
   */
  shadow?: ShadowType;

  /**
   * State of the breadcrumbs
   * ('success' | 'error' | 'warning' | 'disabled' | '').
   * Used for visual feedback.
   */
  state?: StateType;

  /**
   * Size of the breadcrumbs
   * ('xs' | 'small' | 'medium' | 'large' | 'xl').
   */
  size?: SizeType;

  /**
   * Additional class name for custom styling.
   */
  className?: string;

  /**
   * Whether to use the outline style.
   */
  outline?: boolean;

  /**
   * Maximum number of visible items before collapsing into an ellipsis.
   */
  maxVisible?: number;
}

/**
 * Label used to represent collapsed breadcrumb items.
 */
export const ELLIPSIS_LABEL = "…";
