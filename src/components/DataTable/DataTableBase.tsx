import { useMemo, useState, KeyboardEvent } from "react";
import { combineClassNames } from "@/utils/classNames";
import { DataTableBaseProps } from "./DataTable.types";
import { capitalize } from "@/utils/capitalize";
import {
  defaultRounding,
  defaultShadow,
  defaultTheme,
} from "@/config/boreal-style-config";

function DataTableBase<T extends object>({
  columns,
  data,
  onRowClick,
  classMap,
  theme = defaultTheme,
  rounding = defaultRounding,
  shadow = defaultShadow,
  state = "",
  outline = false,
  className = "",
  striped = true,
  defaultSortKey,
  defaultSortOrder = "asc",
  serverSort = false,
  onSortChange,
  rowKey,
  "data-testid": testId = "data-table",
}: DataTableBaseProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | undefined>(defaultSortKey);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSortOrder);

  const sortedData = useMemo(() => {
    if (serverSort || !sortKey) return data;
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
    const newOrder = key === sortKey && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);
    if (serverSort && onSortChange) onSortChange(key, newOrder);
  };

  const handleSortKeyDown = (e: KeyboardEvent, key: keyof T) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSort(key);
    }
  };

  return (
    <div
      className={combineClassNames(
        classMap.wrapper,
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        striped && classMap.striped,
        className
      )}
      data-testid={testId}
    >
      <table
        className={combineClassNames(
          classMap.table,
          classMap[theme],
          classMap[state],
          outline && classMap.outline
        )}
        role="table"
      >
        <caption className="sr_only">Sortable data table</caption>
        <thead>
          <tr role="row">
            {columns.map((col) => {
              const isActive = sortKey === col.key;
              return (
                <th
                  key={String(col.key)}
                  scope="col"
                  role="columnheader"
                  tabIndex={col.sortable ? 0 : undefined}
                  aria-sort={
                    col.sortable
                      ? isActive
                        ? sortOrder === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                      : undefined
                  }
                  onClick={() => col.sortable && handleSort(col.key)}
                  onKeyDown={(e) =>
                    col.sortable && handleSortKeyDown(e, col.key)
                  }
                  className={combineClassNames(
                    col.sortable && classMap.sortable,
                    classMap.headerCell
                  )}
                >
                  <span>{col.label}</span>
                  {col.sortable && (
                    <span className={classMap.sortIcon} aria-hidden="true">
                      {isActive ? (sortOrder === "asc" ? "▲" : "▼") : "⇅"}
                    </span>
                  )}
                </th>
              );
            })}
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
                tabIndex={onRowClick ? 0 : undefined}
                aria-label={onRowClick ? "Selectable row" : undefined}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    role="cell"
                    data-label={col.label}
                    className={classMap.cell}
                  >
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
