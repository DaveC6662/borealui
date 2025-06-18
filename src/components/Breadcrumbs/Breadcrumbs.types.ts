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
   * disables interaction and styles as disabled.
   */
  disabled?: boolean;

  /**
   * Optional custom separator node between breadcrumb items.
   * Defaults to a right chevron icon.
   */
  separator?: React.ReactNode;

  /**
   * Theme style to apply to the breadcrumbs (e.g., "primary", "secondary").
   */
  theme?: ThemeType;

  /** Rounding style to apply to the breadcrumbs*/
  rounding?: RoundingType;

  /** Shadow style to apply to the breadcrumbs*/
  shadow?: ShadowType;

  /**
   * State of the breadcrumbs (e.g., "success", "error", "warning").
   * Used for visual feedback.
   */
  state?: StateType;

  /**
   * Size of the breadcrumbs (e.g., "small", "medium", "large").
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
