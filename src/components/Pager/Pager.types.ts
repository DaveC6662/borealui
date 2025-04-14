import { SizeType, ThemeType } from "@/types/types";

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
  /** Optional extra class name(s) for custom styling. */
  className?: string;
  /** Optional size modifier for buttons ("small", "medium", etc.). */
  size?: SizeType;
  /** Optional theme to apply (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}