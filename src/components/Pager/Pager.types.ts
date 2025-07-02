import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";

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
  /** Enables server side control of the paging */
  serverControlled?: boolean;
  /** Optional extra class name(s) for custom styling. */
  className?: string;
  /** Optional size modifier for buttons ("small", "medium", etc.). */
  size?: SizeType;
  /** Optional theme to apply (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** Optional state of the component (e.g., "success", "error", "warning"). */
  state?: StateType;
  /** Rounding of the controls */
  rounding?: RoundingType;
  /** Shadow of the controls */
  shadow?: ShadowType;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
