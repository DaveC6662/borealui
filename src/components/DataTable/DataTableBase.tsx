import React, { useMemo, useState } from "react";
import { combineClassNames } from "@/utils/classNames"; // adjust for core import if needed
import { DataTableBaseProps } from "./DataTable.types";

function DataTableBase<T extends object>({
  columns,
  data,
  onRowClick,
  classMap,
  className = "",
  striped = true,
  defaultSortKey,
  defaultSortOrder = "asc",
  rowKey,
  "data-testid": testId = "data-table",
}: DataTableBaseProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | undefined>(defaultSortKey);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSortOrder);

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
      if (isNumA && isNumB)
        return sortOrder === "asc" ? +valA - +valB : +valB - +valA;
      return sortOrder === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortKey, sortOrder]);

  const handleSort = (key: keyof T) => {
    if (key === sortKey)
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div
      className={combineClassNames(
        classMap.wrapper,
        striped && classMap.striped,
        className
      )}
      data-testid={testId}
    >
      <table className={classMap.table} role="table">
        <thead>
          <tr role="row">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                role="columnheader"
                scope="col"
                className={combineClassNames(
                  col.sortable && classMap.sortable,
                  classMap.headerCell
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
                  <span className={classMap.sortIcon} aria-hidden>
                    {sortKey === col.key
                      ? sortOrder === "asc"
                        ? "▲"
                        : "▼"
                      : "⇅"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => {
            const key = rowKey ? rowKey(row) : idx;
            return (
              <tr
                key={key}
                role="row"
                className={combineClassNames(
                  onRowClick && classMap.clickable,
                  striped && idx % 2 === 1 && classMap.striped
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td key={String(col.key)} role="cell" data-label={col.label}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : typeof row[col.key] === "object"
                        ? JSON.stringify(row[col.key])
                        : String(row[col.key] ?? "")}
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

export default DataTableBase;
