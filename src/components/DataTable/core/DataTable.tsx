import "./DataTable.scss";
import DataTableBase from "../DataTableBase";
import { DataTableProps } from "../DataTable.types";

const classes = {
  wrapper: "data_table_wrapper",
  table: "data_table",
  headerCell: "data_table_header_cell",
  sortable: "data_table_header_sortable",
  sortIcon: "data_table_sort_icon",
  clickable: "data_table_row_clickable",
  striped: "data_table_row_striped",
  cell: "data_table_cell",

  primary: "data_table_primary",
  secondary: "data_table_secondary",
  tertiary: "data_table_tertiary",
  quaternary: "data_table_quaternary",

  success: "data_table_success",
  error: "data_table_error",
  warning: "data_table_warning",

  clear: "data_table_clear",

  outline: "data_table_outline",

  shadowNone: "data_table_shadow-None",
  shadowLight: "data_table_shadow-Light",
  shadowMedium: "data_table_shadow-Medium",
  shadowStrong: "data_table_shadow-Strong",
  shadowIntense: "data_table_shadow-Intense",

  roundNone: "data_table_round-None",
  roundSmall: "data_table_round-Small",
  roundMedium: "data_table_round-Medium",
  roundLarge: "data_table_round-Large",
};

function DataTable<T extends object>(props: DataTableProps<T>) {
  return <DataTableBase {...props} classMap={classes} />;
}

export default DataTable;
