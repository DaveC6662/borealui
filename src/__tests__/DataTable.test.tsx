import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataTable, { Column } from "../components/DataTable/DataTable";

interface TestData {
  name: string;
  age: number;
}

describe("DataTable Component", () => {
  const testData: TestData[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 22 },
  ];

  const testColumns: Column<TestData>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "age", label: "Age", sortable: true },
  ];

  it("renders headers and rows", () => {
    render(<DataTable columns={testColumns} data={testData} data-testid="data-table" />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("sorts rows when clicking a header", () => {
    render(<DataTable columns={testColumns} data={testData} />);

    const ageHeader = screen.getByText("Age");
    fireEvent.click(ageHeader);
    const firstRowCell = screen.getAllByRole("cell")[1]; // Age cell in first row
    expect(firstRowCell).toHaveTextContent("22"); // Charlie should be first by age ascending

    fireEvent.click(ageHeader);
    const newFirstRowCell = screen.getAllByRole("cell")[1];
    expect(newFirstRowCell).toHaveTextContent("30"); // Bob should be first by age descending
  });

  it("handles row clicks if onRowClick is provided", () => {
    const handleClick = jest.fn();
    render(<DataTable columns={testColumns} data={testData} onRowClick={handleClick} />);
    const firstRow = screen.getAllByRole("row")[1];
    fireEvent.click(firstRow);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(testData[0]);
  });

  it("supports custom cell rendering", () => {
    const customColumns: Column<TestData>[] = [
      {
        key: "name",
        label: "Name",
        render: (value: unknown) => <span data-testid="custom-name">{String(value)}</span>,
      },
      { key: "age", label: "Age" },
    ];

    render(<DataTable columns={customColumns} data={testData} />);
    expect(screen.getAllByTestId("custom-name").length).toBe(3);
  });

  it("applies striped rows when enabled", () => {
    render(<DataTable columns={testColumns} data={testData} striped={true} />);
    const rows = screen.getAllByRole("row");
    expect(rows[2].className).toMatch(/striped/);
  });
});
