import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";
import { ButtonProps } from "../Button/Button.types";
import { IconButtonProps } from "../IconButton/IconButton.types";

/**
 * Props for the Pager (pagination) component.
 */
export interface PaginationProps {
  /** Total number of items to paginate through. */
  totalItems: number;
  /** Number of items to display per page. */
  itemsPerPage: number;
  /** The currently active page (1-indexed). */
  currentPage: number;
  /** Callback function invoked when a page change occurs. */
  onPageChange: (page: number) => void;
  /** Enables server side control of the paging. */
  serverControlled?: boolean;
  /** Optional extra class name(s) for custom styling. */
  className?: string;
  /**
   * Optional size modifier for pagination buttons.
   * One of: "xs" | "small" | "medium" | "large" | "xl"
   */
  size?: SizeType;
  /**
   * Optional theme to apply for pagination.
   * One of: "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;
  /**
   * Optional state of the component for feedback styling.
   * One of: "success" | "error" | "warning" | "disabled" | ""
   */
  state?: StateType;
  /**
   * Rounding of the controls.
   * One of: "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;
  /**
   * Shadow of the controls.
   * One of: "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

export interface BasePagerProps extends PaginationProps {
  Button: React.ComponentType<ButtonProps>;
  IconButton: React.ComponentType<IconButtonProps>;
  classMap: Record<string, string>;
}
