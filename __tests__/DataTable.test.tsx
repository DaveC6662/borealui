import { render, screen, fireEvent } from "@testing-library/react";
import DataTableBase from "@/components/DataTable/DataTableBase";
import { Column } from "@/components/DataTable/DataTable.types";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

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
  it("renders a table with headers and rows", () => {
    render(<DataTableBase columns={columns} data={data} classMap={classMap} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(screen.getAllByRole("row")).toHaveLength(3);
  });

  it("sorts by defaultSortKey and defaultSortOrder on mount", () => {
    render(
      <DataTableBase
        columns={columns}
        data={data}
        classMap={classMap}
        defaultSortKey="age"
        defaultSortOrder="desc"
      />
    );

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Bob");
  });

  it("sorts columns when header is clicked", () => {
    render(<DataTableBase columns={columns} data={data} classMap={classMap} />);
    const header = screen.getByText("Age").closest("th");

    fireEvent.click(header!);
    expect(header).toHaveAttribute("aria-sort", "ascending");

    fireEvent.click(header!);
    expect(header).toHaveAttribute("aria-sort", "descending");
  });

  it("supports keyboard interaction for sorting", () => {
    render(<DataTableBase columns={columns} data={data} classMap={classMap} />);
    const header = screen.getByText("Name").closest("th");

    header && fireEvent.keyDown(header, { key: "Enter" });
    expect(header).toHaveAttribute("aria-sort", "ascending");

    header && fireEvent.keyDown(header, { key: " " });
    expect(header).toHaveAttribute("aria-sort", "descending");
  });

  it("calls onSortChange when serverSort is enabled", () => {
    const onSortChange = jest.fn();
    render(
      <DataTableBase
        columns={columns}
        data={data}
        classMap={classMap}
        serverSort
        onSortChange={onSortChange}
      />
    );

    fireEvent.click(screen.getByText("Name"));
    expect(onSortChange).toHaveBeenCalledWith("name", "asc");

    fireEvent.click(screen.getByText("Name"));
    expect(onSortChange).toHaveBeenCalledWith("name", "desc");
  });

  it("triggers onRowClick when a row is clicked", () => {
    const handleClick = jest.fn();
    render(
      <DataTableBase
        columns={columns}
        data={data}
        classMap={classMap}
        onRowClick={handleClick}
      />
    );

    const row = screen.getAllByRole("row")[1];
    fireEvent.click(row);
    expect(handleClick).toHaveBeenCalledWith(data[0]);
  });

  it("uses rowKey prop to assign row keys", () => {
    const rowKey = (row: { name: string }) => row.name;
    const { container } = render(
      <DataTableBase
        columns={columns}
        data={data}
        classMap={classMap}
        rowKey={rowKey}
      />
    );

    const rowElements = container.querySelectorAll("tbody tr");
    expect(rowElements[0].getAttribute("key")).toBe(null);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <DataTableBase columns={columns} data={data} classMap={classMap} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
