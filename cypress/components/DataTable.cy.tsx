import { Column } from "@/components/DataTable/DataTable.types";
import DataTableBase from "@/components/DataTable/DataTableBase";

const columns: Column<{ name: string; age: number }>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "age", label: "Age", sortable: true },
];

const data = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 34 },
];

const classMap = {
  wrapper: "tableWrapper",
  table: "table",
  striped: "striped",
  headerCell: "header",
  sortIcon: "sortIcon",
  sortable: "sortable",
  clickable: "clickable",
  cell: "cell",
};

describe("DataTableBase", () => {
  it("renders sortable table with data", () => {
    cy.mount(
      <DataTableBase
        columns={columns}
        data={data}
        classMap={classMap}
        data-testid="data-table"
      />
    );

    cy.findByTestId("data-table").should("exist");
    cy.findByRole("table").should("exist");
    cy.findAllByRole("row").should("have.length", 3);
    cy.findAllByRole("columnheader").should("have.length", 2);
  });

  it("sorts column when header is clicked", () => {
    cy.mount(
      <DataTableBase columns={columns} data={data} classMap={classMap} />
    );

    cy.findByRole("columnheader", { name: /Age/ }).click();
    cy.findByRole("columnheader", { name: /Age/ }).should(
      "have.attr",
      "aria-sort",
      "ascending"
    );

    cy.findByRole("columnheader", { name: /Age/ }).click();
    cy.findByRole("columnheader", { name: /Age/ }).should(
      "have.attr",
      "aria-sort",
      "descending"
    );
  });

  it("calls onRowClick when row is clicked", () => {
    const onRowClick = cy.stub().as("onRowClick");

    cy.mount(
      <DataTableBase
        columns={columns}
        data={data}
        classMap={classMap}
        onRowClick={onRowClick}
      />
    );

    cy.findAllByRole("row").eq(1).click();
    cy.get("@onRowClick").should("have.been.calledOnce");
  });
});
