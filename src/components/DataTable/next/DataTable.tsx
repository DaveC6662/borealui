"use client";

import styles from "./DataTable.module.scss";
import DataTableBase from "../DataTableBase";
import { DataTableProps } from "../DataTable.types";

function DataTable<T extends object>(props: DataTableProps<T>) {
  return <DataTableBase {...props} classMap={styles} />;
}

export default DataTable;
