import "./DataTable.scss";
import DataTableBase from "../DataTableBase";
import { DataTableProps } from "../DataTable.types";

const classNames = {
  wrapper: "data_table_wrapper",
  table: "data_table",
  headerCell: "data_table_header_cell",
  sortable: "data_table_header_sortable",
  sortIcon: "data_table_sort_icon",
  clickable: "data_table_row_clickable",
  striped: "data_table_row_striped",
  cell: "data_table_cell",

  data_table_primary: "data_table_primary",
  data_table_primary_outline: "data_table_primary_outline",
  data_table_secondary: "data_table_secondary",
  data_table_secondary_outline: "data_table_secondary_outline",
  data_table_success: "data_table_success",
  data_table_success_outline: "data_table_success_outline",
  data_table_error: "data_table_error",
  data_table_error_outline: "data_table_error_outline",
  data_table_warning: "data_table_warning",
  data_table_warning_outline: "data_table_warning_outline",
};

function DataTable<T extends object>(props: DataTableProps<T>) {
  return <DataTableBase {...props} classMap={classNames} />;
}

export default DataTable;
