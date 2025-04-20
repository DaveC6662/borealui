"use client";

import styles from "./DataTable.module.scss";
import DataTableBase from "../DataTableBase";
import { DataTableProps } from "../DataTable.types";

const classNames = {
  wrapper: styles.dataTableWrapper,
  striped: styles.striped,
  table: styles.table,
  headerCell: styles.headerCell,
  sortable: styles.sortable,
  clickable: styles.clickable,
  sortIcon: styles.sortIcon,
};

function DataTable<T extends object>(props: DataTableProps<T>) {
  return <DataTableBase {...props} classMap={classNames} />;
}

export default DataTable;
