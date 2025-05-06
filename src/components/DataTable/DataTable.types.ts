import React from "react";
import { ThemeType } from "@/types/types";

/**
 * Column definition for the DataTable.
 */
export interface Column<T> {
  /** Key of the field in the data object. */
  key: keyof T;
  /** Label to display in the table header. */
  label: string;
  /** Whether the column is sortable. */
  sortable?: boolean;
  /** Optional custom render function for the cell. */
  render?: (value: unknown, row: T) => React.ReactNode;
}

/**
 * Props for the DataTable component.
 */
export interface DataTableProps<T> {
  /** Array of column definitions. */
  columns: Column<T>[];
  /** Array of row data objects. */
  data: T[];
  /** Optional callback when a row is clicked. */
  onRowClick?: (row: T) => void;
  /** Optional class name for the table wrapper. */
  className?: string;
  /** Theme used for styling the table. */
  theme?: ThemeType;
  /** Whether to use outline styling. */
  outline?: boolean;
  /** Whether to use striped row styling. */
  striped?: boolean;
  /** Default key to sort by on initial render. */
  defaultSortKey?: keyof T;
  /** Default sort order (ascending or descending). */
  defaultSortOrder?: "asc" | "desc";
  /** Function to derive a unique key for each row. */
  rowKey?: (row: T) => string | number;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

export interface DataTableBaseProps<T> extends DataTableProps<T> {
  classMap: Record<string, string>;
}
