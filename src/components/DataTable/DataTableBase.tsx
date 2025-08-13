import { useMemo, useState, KeyboardEvent } from "react";
import { combineClassNames } from "../../utils/classNames";
import { DataTableBaseProps } from "./DataTable.types";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "../../config/boreal-style-config";

function DataTableBase<T extends object>({
  columns,
  data,
  onRowClick,
  classMap,
  theme = getDefaultTheme(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  state = "",
  outline = false,
  className = "",
  striped = true,
  defaultSortKey,
  ariaLabel,
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

    return [...data].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA === valB) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;

      const numA = Number(valA);
      const numB = Number(valB);
      const bothNumeric = !Number.isNaN(numA) && !Number.isNaN(numB);

      if (bothNumeric) {
        return sortOrder === "asc" ? numA - numB : numB - numA;
      }
      const cmp = String(valA).localeCompare(String(valB), undefined, {
        numeric: true,
      });
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortOrder, serverSort]);

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

  const handleRowKeyDown =
    (row: T) => (e: KeyboardEvent<HTMLTableRowElement>) => {
      if (!onRowClick) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onRowClick(row);
      }
    };

  const captionId = `${testId}-caption`;

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
        aria-label={ariaLabel}
        aria-describedby={captionId}
      >
        <caption id={captionId} className={classMap.srOnly ?? "sr_only"}>
          Sortable data table
        </caption>

        <thead>
          <tr>
            {columns.map((col) => {
              const isActive = sortKey === col.key;
              return (
                <th
                  key={String(col.key)}
                  scope="col"
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
          {sortedData.length === 0 ? (
            <tr>
              <td
                className={classMap.emptyCell}
                colSpan={columns.length}
                // announce emptiness politely
                aria-live="polite"
              >
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row, idx) => {
              const key = rowKey ? rowKey(row) : idx;
              return (
                <tr
                  key={key}
                  className={combineClassNames(
                    onRowClick && classMap.clickable,
                    striped && idx % 2 === 1 && classMap.striped
                  )}
                  onClick={() => onRowClick?.(row)}
                  onKeyDown={handleRowKeyDown(row)}
                  tabIndex={onRowClick ? 0 : undefined}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
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
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
DataTableBase.displayName = "DataTableBase";
export default DataTableBase;
