import "./DataTable.scss";
import DataTableBase from "../DataTableBase";
import { DataTableProps } from "../DataTable.types";

const classNames = {
  wrapper: "dataTableWrapper",
  striped: "striped",
  table: "table",
  headerCell: "headerCell",
  sortable: "sortable",
  clickable: "clickable",
  sortIcon: "sortIcon",
};

function DataTable<T extends object>(props: DataTableProps<T>) {
  return <DataTableBase {...props} classMap={classNames} />;
}

export default DataTable;
