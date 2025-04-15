"use client";

import { useState, useMemo, JSX } from "react";
import styles from "./DataTable.module.scss";
import { combineClassNames } from "@/utils/classNames";
import { DataTableProps } from "../DataTable.types";

/**
 * A reusable, generic, sortable data table with optional row click handling and custom rendering.
 *
 * @template T - The type of each data row object.
 * @param {DataTableProps<T>} props - Props to configure the table.
 * @returns {JSX.Element} Rendered table.
 */
function DataTable<T extends object>({
  columns,
  data,
  onRowClick,
  className = "",
  theme = "primary",
  striped = true,
  defaultSortKey,
  defaultSortOrder = "asc",
  rowKey,
  "data-testid": testId = "data-table",
}: DataTableProps<T>): JSX.Element {
  const [sortKey, setSortKey] = useState<keyof T | undefined>(defaultSortKey);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSortOrder);

  /**
   * Returns a sorted version of the data based on `sortKey` and `sortOrder`.
   */
  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (valA === valB) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;

      const isNumA = !isNaN(Number(valA));
      const isNumB = !isNaN(Number(valB));

      if (isNumA && isNumB) {
        return sortOrder === "asc" ? +valA - +valB : +valB - +valA;
      }

      return sortOrder === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortKey, sortOrder]);

  /**
   * Handles header click for sorting.
   * Toggles sort direction or sets new sort key.
   */
  const handleSort = (key: keyof T) => {
    if (key === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div
      className={combineClassNames(
        styles.dataTableWrapper,
        styles[theme],
        striped && styles.striped,
        className
      )}
      data-testid={testId}
    >
      <table className={styles.table} role="table">
        <thead>
          <tr role="row">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                role="columnheader"
                scope="col"
                className={combineClassNames(
                  col.sortable && styles.sortable,
                  styles[theme]
                )}
                onClick={() => col.sortable && handleSort(col.key)}
                aria-sort={
                  sortKey === col.key
                    ? sortOrder === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                {col.label}
                {col.sortable && (
                  <span className={styles.sortIcon} aria-hidden>
                    {sortKey === col.key ? (sortOrder === "asc" ? "▲" : "▼") : "⇅"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => {
            const rowKeyValue = rowKey ? rowKey(row) : idx;
            return (
              <tr
                key={rowKeyValue}
                role="row"
                className={combineClassNames(
                  onRowClick && styles.clickable,
                  striped && idx % 2 === 1 && styles.striped
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td key={String(col.key)} role="cell">
                    {col.render
                      ? col.render(row[col.key], row)
                      : typeof row[col.key] === "object"
                        ? JSON.stringify(row[col.key])
                        : String(row[col.key] ?? "")
                    }
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
